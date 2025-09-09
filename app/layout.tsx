import "./globals.css";
import { Metadata } from 'next'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals-ios.css";

export const metadata: Metadata = {
  title: 'Local Moving Company | Professional Moving Services in Denver, CO',
  description: 'Trusted local and long-distance moving company in Denver. Professional, reliable, and affordable moving services for residential and commercial moves.',
  keywords: 'moving company Denver, local movers Denver, long distance movers, residential moving, commercial moving, Denver moving services, Colorado movers',
  // Enhanced favicon declarations for moving company
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Local Moving Company | Professional Moving Services',
    description: 'Professional, reliable, and affordable moving services for residential and commercial moves in Denver and surrounding areas.',
    url: 'https://localmovingcompany.com',
    siteName: 'Local Moving Company',
    images: [
      {
        url: '/images/hero/moving-truck.jpg',
        width: 1200,
        height: 630,
        alt: 'Local Moving Company professional moving truck and team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local Moving Company | Professional Moving Services',
    description: 'Trusted moving company in Denver. Get your free quote today for local and long-distance moves.',
    images: ['/images/hero/moving-truck.jpg'],
  },
  alternates: {
    canonical: 'https://localmovingcompany.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you set up Google Search Console and other tools
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'moving services',
  classification: 'business',
  other: {
    'application-name': 'Local Moving Company',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: '#2563eb', // Blue theme color for moving company
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ENHANCED SEO: Additional meta tags for moving company */}
        <meta name="author" content="Local Moving Company" />
        <meta name="publisher" content="Local Moving Company" />
        <meta name="copyright" content="© 2024 Local Moving Company. All rights reserved." />
        <meta name="language" content="en-US" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* ENHANCED SEO: Geographic and local business info */}
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Denver" />
        <meta name="geo.position" content="39.7392;-104.9903" />
        <meta name="ICBM" content="39.7392, -104.9903" />
        
        {/* ENHANCED SEO: Moving company specific meta tags */}
        <meta name="business:type" content="moving company" />
        <meta name="business:hours" content="Mo-Sa 07:00-19:00" />
        <meta name="business:phone" content="+1-720-555-MOVE" />
        <meta name="business:email" content="info@localmovingcompany.com" />
        <meta name="business:address" content="Denver, CO" />
        
        {/* ENHANCED SEO: Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        
        {/* ENHANCED SEO: DNS prefetch for faster loading */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        
        {/* ENHANCED SEO: Structured data for moving company */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              "@id": "https://localmovingcompany.com",
              "name": "Local Moving Company",
              "description": "Professional moving company serving Denver and surrounding areas. Specializing in residential and commercial moves, local and long-distance relocations.",
              "url": "https://localmovingcompany.com",
              "telephone": "+1-720-555-MOVE",
              "email": "info@localmovingcompany.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Denver",
                "addressRegion": "CO",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 39.7392,
                "longitude": -104.9903
              },
              "openingHours": ["Mo-Sa 07:00-19:00"],
              "priceRange": "$$",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Denver",
                  "sameAs": "https://en.wikipedia.org/wiki/Denver"
                },
                {
                  "@type": "State",
                  "name": "Colorado",
                  "sameAs": "https://en.wikipedia.org/wiki/Colorado"
                }
              ],
              "serviceType": [
                "Residential Moving",
                "Commercial Moving",
                "Local Moving",
                "Long Distance Moving",
                "Packing Services",
                "Storage Solutions"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Moving Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Local Moving",
                      "description": "Professional local moving services within Denver metro area"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Long Distance Moving",
                      "description": "Interstate and long-distance moving services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Commercial Moving",
                      "description": "Office and business relocation services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Packing Services",
                      "description": "Professional packing and unpacking services"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body className="ios-fix font-helvetica text-black bg-white flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}