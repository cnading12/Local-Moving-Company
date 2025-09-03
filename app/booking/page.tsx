'use client';
import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Mail, Phone, CreditCard, CheckCircle, MapPin, ArrowRight, Loader2, AlertCircle, Star, TrendingUp, Plus, Minus, DollarSign, Info } from 'lucide-react';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState({});
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // NEW: Multiple bookings state
  const [bookings, setBookings] = useState([{
    id: 1,
    eventName: '',
    eventType: '',
    selectedDate: '',
    selectedTime: '',
    hoursRequested: '',
    specialRequests: ''
  }]);

  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    businessName: '',
    websiteUrl: '',
    isRecurring: false,
    recurringDetails: '',
    paymentMethod: 'card' // NEW: Default to card, but allow pay-later
  });

  // Updated event types with real business focus
  const eventTypes = [
    { 
      id: 'yoga-class', 
      name: 'Yoga Classes', 
      description: 'Vinyasa, Hatha, Restorative, Hot Yoga',
      icon: '🧘‍♀️',
      popular: true
    },
    { 
      id: 'meditation', 
      name: 'Meditation & Mindfulness', 
      description: 'Guided meditation, breathwork, sound healing',
      icon: '🕯️'
    },
    { 
      id: 'fitness', 
      name: 'Fitness Classes', 
      description: 'Pilates, barre, strength training, cardio',
      icon: '💪'
    },
    { 
      id: 'martial-arts', 
      name: 'Martial Arts', 
      description: 'Judo, BJJ, wrestling, self-defense',
      icon: '🥋',
      popular: true
    },
    { 
      id: 'dance', 
      name: 'Dance Classes', 
      description: 'Contemporary, ballroom, salsa, hip-hop',
      icon: '💃'
    },
    { 
      id: 'workshop', 
      name: 'Workshops & Seminars', 
      description: 'Educational events, team building',
      icon: '📚'
    },
    { 
      id: 'therapy', 
      name: 'Therapy & Healing', 
      description: 'Art therapy, sound baths, energy work',
      icon: '🌟'
    },
    { 
      id: 'private-event', 
      name: 'Private Events', 
      description: 'Birthday parties, celebrations, retreats',
      icon: '🎉'
    },
    { 
      id: 'other', 
      name: 'Other Wellness Practice', 
      description: 'Tell us about your unique offering',
      icon: '✨'
    }
  ];

  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  // Pricing calculation with Stripe fees disclosure
  const HOURLY_RATE = 95;
  const STRIPE_FEE_PERCENTAGE = 3; // 2.9% + 30 cents ≈ 3%

  const calculatePricing = () => {
    let totalHours = 0;
    let totalBookings = 0;
    let minimumApplied = false;
    
    // Calculate total hours across all bookings
    bookings.forEach(booking => {
      if (booking.hoursRequested) {
        let hours = parseFloat(booking.hoursRequested) || 0;
        
        // Apply minimums per booking
        const isMultipleBookings = bookings.length > 1;
        const hasRecurringMultiple = formData.isRecurring && formData.recurringDetails.includes('multiple');
        
        if (!formData.isRecurring && hours < 4) {
          hours = 4;
          minimumApplied = true;
        } else if (formData.isRecurring && hasRecurringMultiple && hours < 2) {
          hours = 2;
          minimumApplied = true;
        }
        
        totalHours += hours;
        totalBookings++;
      }
    });

    // Apply discounts
    let discount = 0;
    let savings = 0;
    
    if (formData.isRecurring && formData.recurringDetails.includes('multiple')) {
      discount = 5; // 5% discount for multiple weekly bookings
      savings = (totalHours * HOURLY_RATE * discount) / 100;
    }

    const subtotal = totalHours * HOURLY_RATE - savings;
    const stripeFee = Math.round(subtotal * (STRIPE_FEE_PERCENTAGE / 100));
    const totalWithFees = subtotal + (formData.paymentMethod === 'card' ? stripeFee : 0);
    
    return {
      totalHours,
      totalBookings,
      hourlyRate: HOURLY_RATE,
      subtotal,
      discount,
      savings,
      stripeFee,
      total: totalWithFees,
      minimumApplied,
      isRecurring: formData.isRecurring,
      hasMultipleEvents: formData.recurringDetails.includes('multiple')
    };
  };

  // NEW: Add booking function
  const addBooking = () => {
    const newId = Math.max(...bookings.map(b => b.id)) + 1;
    setBookings([...bookings, {
      id: newId,
      eventName: '',
      eventType: '',
      selectedDate: '',
      selectedTime: '',
      hoursRequested: '',
      specialRequests: ''
    }]);
  };

  // NEW: Remove booking function
  const removeBooking = (id) => {
    if (bookings.length > 1) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  // NEW: Update individual booking
  const updateBooking = (id, field, value) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, [field]: value } : booking
    ));
  };

  // Check availability when date changes
  useEffect(() => {
    if (selectedDate) {
      checkAvailability(selectedDate);
    }
  }, [selectedDate]);

  const checkAvailability = async (date) => {
    setIsCheckingAvailability(true);
    setSelectedTime('');

    try {
      const response = await fetch(`/api/check-availability?date=${date}`);
      const availability = await response.json();

      if (response.ok) {
        setAvailableSlots(availability);
      } else {
        console.error('Availability check failed:', availability);
        // Fallback: assume all slots available
        const fallbackAvailability = {};
        timeSlots.forEach(time => {
          fallbackAvailability[time] = true;
        });
        setAvailableSlots(fallbackAvailability);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      const fallbackAvailability = {};
      timeSlots.forEach(time => {
        fallbackAvailability[time] = true;
      });
      setAvailableSlots(fallbackAvailability);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pricing = calculatePricing();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      console.log('🚀 Submitting booking(s)...');

      // Prepare submission data
      const submissionData = {
        bookings: bookings,
        contactInfo: formData,
        pricing: pricing,
        paymentMethod: formData.paymentMethod
      };

      const bookingResponse = await fetch('/api/booking-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const bookingResult = await bookingResponse.json();

      if (bookingResponse.ok && bookingResult.success) {
        if (formData.paymentMethod === 'pay-later') {
          // Redirect to confirmation page
          window.location.href = `/booking/success?booking_id=${bookingResult.id}`;
        } else {
          // Redirect to payment page
          window.location.href = `/booking/payment?booking_id=${bookingResult.id}`;
        }
      } else {
        setSubmitMessage(`❌ ${bookingResult.error || 'Failed to create booking'}`);
        console.error('Booking creation error:', bookingResult);
      }
    } catch (error) {
      console.error('❌ Network/JSON error:', error);
      setSubmitMessage('❌ Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    // Check if at least one booking has required fields
    const hasValidBooking = bookings.some(booking => 
      booking.eventName && booking.eventType && booking.selectedDate && 
      booking.selectedTime && booking.hoursRequested
    );
    
    // Check contact info
    const hasContactInfo = formData.contactName && formData.email;
    
    return hasValidBooking && hasContactInfo;
  };

  return (
    <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-light mb-4 text-gray-900">Reserve Your Sacred Space</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of wellness professionals in Denver's most inspiring historic sanctuary. 
            <span className="font-semibold text-emerald-700"> $95/hour • Flexible long-term partnerships available</span>
          </p>
        </div>

        {/* Business Focus Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-8 border border-emerald-100">
          <div className="flex items-center justify-center gap-4 mb-4">
            <TrendingUp className="text-emerald-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">We're Building Something Special</h2>
          </div>
          <p className="text-center text-gray-700 max-w-4xl mx-auto">
            Our vision: <span className="font-semibold">7-10 long-term wellness partners</span> who call Merritt Fitness home. 
            We're seeking dedicated practitioners ready to build their business in our beautiful 2,400 sq ft sanctuary with 24-foot ceilings, 
            original 1905 architecture, and perfect acoustics.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            {/* Calendar Section - UPDATED: Public access */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Calendar className="text-emerald-700" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Live Availability Calendar</h2>
              </div>

              {/* Public Google Calendar */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=04ac99c7464fa75a7fe252eccd8fff5cffd50a9de27f25555cb8886708b8ef21@group.calendar.google.com&ctz=America/Denver&mode=WEEK&showTitle=0&showPrint=0&showCalendars=0&showTz=0"
                  className="w-full h-96"
                  title="Public Live Availability Calendar - Anyone can view"
                />
                <div className="p-4 bg-green-50 border-t border-green-200">
                  <p className="text-sm text-green-800">
                    ✅ <strong>Live Calendar:</strong> This shows real-time availability. Red blocks = booked, white spaces = available for your events!
                  </p>
                </div>
              </div>
            </div>

            {/* Multiple Bookings Section - NEW */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="text-blue-700" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Your Booking(s)</h2>
                </div>
                <button
                  onClick={addBooking}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus size={16} />
                  Add Another Class
                </button>
              </div>

              {/* Individual Bookings */}
              {bookings.map((booking, index) => (
                <div key={booking.id} className="border border-gray-200 rounded-xl p-6 mb-6 last:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Class #{index + 1}</h3>
                    {bookings.length > 1 && (
                      <button
                        onClick={() => removeBooking(booking.id)}
                        className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Minus size={14} />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Class/Event Name *</label>
                      <input
                        type="text"
                        value={booking.eventName}
                        onChange={(e) => updateBooking(booking.id, 'eventName', e.target.value)}
                        placeholder="e.g., Morning Flow Yoga"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Practice Type *</label>
                      <select
                        value={booking.eventType}
                        onChange={(e) => updateBooking(booking.id, 'eventType', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="">Select your practice...</option>
                        {eventTypes.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.icon} {type.name} - {type.description}
                            {type.popular ? ' (Popular!)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                      <input
                        type="date"
                        value={booking.selectedDate}
                        onChange={(e) => updateBooking(booking.id, 'selectedDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                      <select
                        value={booking.selectedTime}
                        onChange={(e) => updateBooking(booking.id, 'selectedTime', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="">Select time...</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>
                            {time} {availableSlots[time] === false ? '(Booked)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hours Needed *</label>
                      <select
                        value={booking.hoursRequested}
                        onChange={(e) => updateBooking(booking.id, 'hoursRequested', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="">Select duration...</option>
                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8].map(hours => (
                          <option key={hours} value={hours}>
                            {hours === 1 ? '1 hour' : `${hours} hours`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Notes for This Class</label>
                      <textarea
                        value={booking.specialRequests}
                        onChange={(e) => updateBooking(booking.id, 'specialRequests', e.target.value)}
                        rows={3}
                        placeholder="Equipment needs, setup requirements, etc."
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact & Payment Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="text-purple-700" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Contact & Payment</h2>
              </div>

              <div className="space-y-6">
                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(303) 555-0123"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder="e.g., Serene Soul Yoga"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Payment Method Selection - NEW */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-start p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mt-1 mr-3 text-emerald-600"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="text-emerald-600" size={20} />
                          <span className="font-medium">Pay Online Now</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Secure card payment via Stripe</p>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Info className="text-amber-600 mt-0.5" size={16} />
                            <div>
                              <p className="text-sm text-amber-800 font-medium">Processing Fee</p>
                              <p className="text-xs text-amber-700">
                                3% processing fee applies (required by Stripe). 
                                Choose "Pay Later" for no fees with alternative payment methods.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pay-later"
                        checked={formData.paymentMethod === 'pay-later'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mt-1 mr-3 text-blue-600"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="text-blue-600" size={20} />
                          <span className="font-medium">Pay Later</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Alternative payment arrangements</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">💰 No Processing Fees!</p>
                            <ul className="text-xs space-y-1">
                              <li>• Pay by phone: (720) 357-9499</li>
                              <li>• Check payments accepted</li>
                              <li>• Venmo/Zelle available</li>
                              <li>• Bank transfer options</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col items-center pt-6">
                  {submitMessage && (
                    <div className={`mb-4 p-4 rounded-xl text-center max-w-md ${submitMessage.includes('✅')
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                      <p className="text-sm font-medium">{submitMessage}</p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid() || isSubmitting}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${isFormValid() && !isSubmitting
                        ? 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Creating Your Booking...
                      </>
                    ) : (
                      <>
                        {formData.paymentMethod === 'pay-later' ? (
                          <CheckCircle size={20} />
                        ) : (
                          <CreditCard size={20} />
                        )}
                        {formData.paymentMethod === 'pay-later' ? 'Confirm Booking' : 'Proceed to Payment'}
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>

                  {isFormValid() && (
                    <p className="text-sm text-gray-500 mt-3 text-center">
                      {formData.paymentMethod === 'pay-later' 
                        ? 'We\'ll contact you within 24 hours about payment arrangements'
                        : 'You\'ll be redirected to our secure payment page'
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar with Multiple Bookings Support */}
          <div className="lg:col-span-1">
            {/* Pricing Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="mr-2" size={20} />
                Pricing Summary
              </h3>

              {/* Booking Count */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-900">Total Classes</span>
                  <span className="text-xl font-bold text-blue-900">{pricing.totalBookings}</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  {pricing.totalHours} total hours • ${HOURLY_RATE}/hour
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${pricing.subtotal}</span>
                </div>
                
                {pricing.savings > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Partnership Discount ({pricing.discount}%)</span>
                    <span>-${pricing.savings}</span>
                  </div>
                )}

                {/* Stripe Fee Disclosure */}
                {formData.paymentMethod === 'card' && pricing.stripeFee > 0 && (
                  <div className="flex justify-between text-amber-600 border-t pt-2">
                    <span>Processing Fee (3%)</span>
                    <span>+${pricing.stripeFee}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <span className="font-medium text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  ${pricing.total || 0}
                </span>
              </div>
              
              {/* Payment Method Notice */}
              <div className="mt-3 text-xs text-gray-500">
                {formData.paymentMethod === 'card' ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                    <p className="text-amber-800">
                      💳 <strong>Card Payment:</strong> 3% processing fee applies (Stripe requirement)
                    </p>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                    <p className="text-blue-800">
                      💰 <strong>Pay Later:</strong> No processing fees! Alternative payment methods available.
                    </p>
                  </div>
                )}
              </div>

              {/* Minimums Applied Notice */}
              {pricing.minimumApplied && (
                <div className="mt-3 text-xs text-gray-500">
                  <p className="bg-gray-50 p-2 rounded-lg">
                    ℹ️ <strong>Minimums Applied:</strong> {pricing.isRecurring && pricing.hasMultipleEvents ? '2-hour' : '4-hour'} minimum per booking enforced
                  </p>
                </div>
              )}
            </div>

            {/* Payment Options Info */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="mr-2 text-blue-600" size={20} />
                Payment Options
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">💳</span>
                  <span><strong>Online Card Payment:</strong> Instant confirmation + 3% processing fee</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">📞</span>
                  <span><strong>Phone Payment:</strong> Call (720) 357-9499 - No fees!</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">💸</span>
                  <span><strong>Venmo/Zelle:</strong> @MerrittFitness - No fees!</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">🏛️</span>
                  <span><strong>Check/Bank Transfer:</strong> Traditional options - No fees!</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4 italic">
                💡 Choose "Pay Later" to avoid the 3% processing fee and use any of our alternative payment methods!
              </p>
            </div>

            {/* Partnership Benefits */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="mr-2 text-emerald-600" size={20} />
                Partnership Benefits
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span><strong>Multiple Bookings:</strong> Book several classes at once with ease</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span><strong>Priority Booking:</strong> First access to prime time slots</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span><strong>Marketing Support:</strong> Featured on our website & social media</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span><strong>Flexible Scheduling:</strong> 2-hour minimums for regular partners</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span><strong>Community Building:</strong> Cross-promotion with other practitioners</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span><strong>Revenue Sharing:</strong> Opportunities for joint workshops & events</span>
                </div>
              </div>
            </div>

            {/* Security & Trust */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Security & Trust</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">🔒</span>
                  <span>SSL encrypted & PCI compliant payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🛡️</span>
                  <span>Stripe-powered secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">📱</span>
                  <span>Multiple payment options for your convenience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-600">👥</span>
                  <span>Trusted by 500+ wellness professionals</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Questions About Your Booking?</h3>
              <p className="text-sm text-gray-600 mb-4">
                We're here to help you create the perfect experience for your classes and events.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={14} />
                  <span>(720) 357-9499</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={14} />
                  <span>merrittfitnessmanager@gmail.com</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                💡 Pro tip: Call us for bulk discounts on 10+ classes or custom partnership arrangements!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}