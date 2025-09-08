// app/lib/calendar.js - FIXED AM/PM CONVERSION
// The issue was in the AM/PM logic - it was backwards!

import { google } from 'googleapis';

async function getGoogleAuth() {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing Google Calendar credentials');
    }

    let privateKey = process.env.GOOGLE_PRIVATE_KEY;

    console.log('🔑 Processing Google private key...');

    if (typeof privateKey === 'string') {
      privateKey = privateKey.replace(/^["']|["']$/g, '');
      if (privateKey.includes('\\n')) {
        privateKey = privateKey.replace(/\\n/g, '\n');
      }

      if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
        throw new Error('Private key must start with -----BEGIN PRIVATE KEY-----');
      }
      if (!privateKey.endsWith('-----END PRIVATE KEY-----')) {
        throw new Error('Private key must end with -----END PRIVATE KEY-----');
      }

      privateKey = privateKey
        .replace(/-----BEGIN PRIVATE KEY-----\s*/, '-----BEGIN PRIVATE KEY-----\n')
        .replace(/\s*-----END PRIVATE KEY-----/, '\n-----END PRIVATE KEY-----')
        .replace(/\n{2,}/g, '\n');
    }

    console.log('✅ Private key format validated');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
        type: 'service_account',
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    console.log('✅ Google Auth initialized');
    return auth;

  } catch (error) {
    console.error('❌ Google Auth setup error:', error);
    throw error;
  }
}

// FIXED: Corrected AM/PM conversion logic
export async function checkCalendarAvailability(date) {
  try {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error('Invalid date format. Expected YYYY-MM-DD');
    }

    console.log('🗓️ Checking calendar availability for:', date);

    const auth = await getGoogleAuth();
    const calendar = google.calendar('v3');

    // Create proper Denver timezone date range
    const targetDate = new Date(date + 'T00:00:00-07:00');
    const startTime = new Date(targetDate);
    startTime.setHours(0, 0, 0, 0);

    const endTime = new Date(targetDate);
    endTime.setHours(23, 59, 59, 999);

    console.log('🕐 Checking time range (Denver):', {
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      localStart: startTime.toLocaleString('en-US', { timeZone: 'America/Denver' }),
      localEnd: endTime.toLocaleString('en-US', { timeZone: 'America/Denver' })
    });

    const response = await calendar.events.list({
      auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
      timeZone: 'America/Denver'
    });

    const events = response.data.items || [];
    console.log('📅 Found', events.length, 'existing events on', date);

    // Enhanced event processing with better timezone handling
    const processedEvents = events.map(event => {
      let eventStart, eventEnd;

      if (event.start.dateTime) {
        // Timed event
        eventStart = new Date(event.start.dateTime);
        eventEnd = new Date(event.end.dateTime);
      } else if (event.start.date) {
        // All-day event - these should block the entire day
        eventStart = new Date(event.start.date + 'T00:00:00-07:00');
        eventEnd = new Date(event.end.date + 'T00:00:00-07:00');
        eventEnd.setDate(eventEnd.getDate() - 1);
        eventEnd.setHours(23, 59, 59, 999);
      } else {
        return null;
      }

      return {
        summary: event.summary,
        start: eventStart,
        end: eventEnd,
        isAllDay: !event.start.dateTime,
        originalEvent: event
      };
    }).filter(Boolean);

    // Log processed events for debugging
    processedEvents.forEach(event => {
      console.log('📌 Processed event:', {
        summary: event.summary,
        start: event.start.toLocaleString('en-US', { timeZone: 'America/Denver' }),
        end: event.end.toLocaleString('en-US', { timeZone: 'America/Denver' }),
        isAllDay: event.isAllDay
      });
    });

    // Define available time slots
    const timeSlots = [
      '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
      '6:00 PM', '7:00 PM', '8:00 PM'
    ];

    // FIXED: Corrected slot availability checking with proper AM/PM conversion
    const availability = {};

    timeSlots.forEach(slot => {
      try {
        // Parse slot time with CORRECTED timezone handling
        const [time, period] = slot.split(' ');
        const [hours, minutes] = time.split(':').map(Number);

        let hour24 = hours;
        
        // 🚨 FIXED: Correct AM/PM conversion logic
        if (period === 'AM') {
          if (hours === 12) {
            hour24 = 0; // 12:00 AM = midnight (00:00)
          }
          // Other AM hours (1-11) stay the same
        } else if (period === 'PM') {
          if (hours === 12) {
            hour24 = 12; // 12:00 PM = noon (12:00)
          } else {
            hour24 = hours + 12; // 1:00 PM = 13:00, 2:00 PM = 14:00, etc.
          }
        }

        console.log(`🕐 Converting ${slot}: hours=${hours}, period=${period} → hour24=${hour24}`);

        // Create slot datetime in Denver timezone
        const slotDateTime = new Date(date + 'T00:00:00-07:00');
        slotDateTime.setHours(hour24, minutes, 0, 0);

        // Use minimum booking duration (30 minutes) for conflict checking
        const slotEndTime = new Date(slotDateTime.getTime() + 30 * 60 * 1000);

        console.log(`📍 Slot ${slot} converts to:`, {
          localTime: slotDateTime.toLocaleString('en-US', { timeZone: 'America/Denver' }),
          hour24: hour24,
          isoTime: slotDateTime.toISOString()
        });

        // Check if this slot conflicts with any existing event
        const hasConflict = processedEvents.some(event => {
          if (event.isAllDay) {
            const eventDate = event.start.toDateString();
            const slotDate = slotDateTime.toDateString();
            return eventDate === slotDate;
          } else {
            // Timed events - check for overlap
            const overlap = slotDateTime < event.end && slotEndTime > event.start;

            if (overlap) {
              console.log('🚫 CONFLICT DETECTED:', {
                slot: slot,
                slotStart: slotDateTime.toLocaleString('en-US', { timeZone: 'America/Denver' }),
                slotEnd: slotEndTime.toLocaleString('en-US', { timeZone: 'America/Denver' }),
                eventSummary: event.summary,
                eventStart: event.start.toLocaleString('en-US', { timeZone: 'America/Denver' }),
                eventEnd: event.end.toLocaleString('en-US', { timeZone: 'America/Denver' })
              });
            }

            return overlap;
          }
        });

        availability[slot] = !hasConflict;

        if (!hasConflict) {
          console.log('✅ Available:', slot);
        } else {
          console.log('❌ Blocked:', slot);
        }

      } catch (slotError) {
        console.warn('⚠️ Error processing slot:', slot, slotError.message);
        availability[slot] = true;
      }
    });

    console.log('✅ Final availability calculated:', {
      date,
      totalSlots: Object.keys(availability).length,
      availableSlots: Object.values(availability).filter(Boolean).length,
      bookedSlots: Object.values(availability).filter(slot => !slot).length,
      availability
    });

    return availability;

  } catch (error) {
    console.error('❌ Calendar availability error:', error);
    throw new Error(`Calendar integration failed: ${error.message}`);
  }
}

// FIXED: Enhanced calendar event creation with CORRECT timezone
export async function createCalendarEvent(booking, includeAttendees = false) {
  try {
    console.log('📅 Creating calendar event for booking:', booking.id);

    const auth = await getGoogleAuth();
    const calendar = google.calendar('v3');

    const eventDate = booking.event_date;
    const eventTime = booking.event_time;

    console.log('📅 Event details:', { eventDate, eventTime });

    // FIXED: Proper time parsing with CORRECTED AM/PM logic
    const [time, period] = eventTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let hour24 = hours;
    
    // 🚨 FIXED: Same corrected AM/PM conversion logic
    if (period === 'AM') {
      if (hours === 12) {
        hour24 = 0; // 12:00 AM = midnight (00:00)
      }
      // Other AM hours (1-11) stay the same
    } else if (period === 'PM') {
      if (hours === 12) {
        hour24 = 12; // 12:00 PM = noon (12:00)
      } else {
        hour24 = hours + 12; // 1:00 PM = 13:00, 2:00 PM = 14:00, etc.
      }
    }

    console.log(`🕐 Creating event: ${eventTime} → hour24=${hour24}`);

    // Create event start time with explicit Denver timezone
    const eventDateTime = new Date(eventDate + 'T00:00:00-07:00');
    eventDateTime.setHours(hour24, minutes, 0, 0);

    // Calculate end time based on actual hours_requested
    const duration = parseFloat(booking.hours_requested) || 2;
    const endDateTime = new Date(eventDateTime.getTime() + duration * 60 * 60 * 1000);

    console.log('📅 Creating calendar event:', {
      event: booking.event_name,
      start: eventDateTime.toISOString(),
      end: endDateTime.toISOString(),
      startLocal: eventDateTime.toLocaleString('en-US', { timeZone: 'America/Denver' }),
      endLocal: endDateTime.toLocaleString('en-US', { timeZone: 'America/Denver' }),
      duration: duration + ' hours'
    });

    // Create event that blocks the time slot
    const event = {
      summary: `🔒 BOOKED: ${booking.event_name}`,
      description: `
BOOKING CONFIRMED - This Time Slot is RESERVED

Event: ${booking.event_name}
Type: ${booking.event_type || 'Not specified'}
Organizer: ${booking.contact_name}
Email: ${booking.email}
Phone: ${booking.phone || 'Not provided'}
Duration: ${duration} hours
${booking.business_name ? `Business: ${booking.business_name}\n` : ''}
${booking.special_requests ? `Special Requests: ${booking.special_requests}\n` : ''}

🚨 THIS TIME SLOT IS NOW UNAVAILABLE FOR OTHER BOOKINGS

Booking ID: ${booking.id}
Status: ${booking.status}
Created: ${booking.created_at}

Contact manager@merrittfitness.net for changes.
      `.trim(),
      start: {
        dateTime: eventDateTime.toISOString(),
        timeZone: 'America/Denver',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Denver',
      },
      location: 'Merritt Fitness, 2246 Irving St, Denver, CO 80211',
      colorId: '11', // Red color to clearly show it's booked
      transparency: 'opaque', // Blocks the time slot
      visibility: 'public', // Visible to availability checking
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'email', minutes: 60 }       // 1 hour before
        ]
      },
      extendedProperties: {
        private: {
          bookingId: booking.id,
          bookingStatus: booking.status,
          merrittFitnessBooking: 'true'
        }
      }
    };

    const response = await calendar.events.insert({
      auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
      sendUpdates: 'none'
    });

    console.log('✅ Calendar event created successfully!');
    console.log('📅 Event ID:', response.data.id);
    console.log('🔒 Time slot now blocked for other users');

    return response.data;

  } catch (error) {
    console.error('❌ Calendar event creation failed:', error);
    throw new Error(`Calendar event creation failed: ${error.message}`);
  }
}