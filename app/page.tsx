// app/page.tsx - Professional Moving Company Homepage
'use client';

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Truck,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Package,
  Home,
  Building,
  ArrowRight,
  Calendar,
  Award,
  TrendingUp,
  Plus,
  Minus,
  DollarSign,
  Info
} from "lucide-react";

export default function MovingHomepage() {
  const [testimonialsLoaded, setTestimonialsLoaded] = useState(false);

  // Enhanced SEO structured data for moving company
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["MovingCompany", "LocalBusiness"],
    "name": "Local Moving Company",
    "description": "Professional moving services in Denver Metro area, including Greenwood Village, Boulder, and Fort Collins. Residential and commercial moves with expert packing, loading, and secure transportation.",
    "url": "https://localmovingcompany.com",
    "telephone": "+1-303-555-6683",
    "email": "info@localmovingcompany.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Greenwood Village",
      "addressLocality": "Denver",
      "addressRegion": "CO",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.6037",
      "longitude": "-104.9511"
    },
    "openingHours": [
      "Mo-Sa 07:00-19:00",
      "Su 09:00-17:00"
    ],
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Denver"
      },
      {
        "@type": "City",
        "name": "Boulder"
      },
      {
        "@type": "City",
        "name": "Fort Collins"
      },
      {
        "@type": "City",
        "name": "Greenwood Village"
      }
    ],
    "services": [
      "Residential Moving",
      "Commercial Moving",
      "Packing Services",
      "Storage Solutions",
      "Long Distance Moving"
    ]
  };

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar />

      <main className="bg-white font-sans">

        {/* Updated Hero Section - Replace text with logo */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/50 to-blue-900/80"></div>
          <Image
            src="/images/hero/team.png"
            alt="Professional Local Moving Company truck in Denver Metro area"
            fill
            className="object-cover brightness-75 scale-105 animate-slow-zoom"
            priority
            quality={95}
          />

          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400/40 rounded-full animate-float blur-sm"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-orange-300/30 rounded-full animate-float-delay blur-sm"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-orange-400/35 rounded-full animate-float-slow blur-sm"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-300/25 rounded-full animate-float blur-sm"></div>

          <div className="relative z-20 text-center text-white px-6 max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-in-up">
              {/* UPDATED: Logo instead of text */}
              <div className="mb-8 flex justify-center">
                <Image
                  src="/images/hero/logo.png" // Update this path to your actual logo file
                  alt="Local Moving Company - Professional Denver Metro Moving Services"
                  width={400} // Adjust width as needed
                  height={200} // Adjust height as needed
                  className="drop-shadow-2xl max-w-full h-auto hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-400/80 to-transparent mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto opacity-95 drop-shadow-md">
                Denver Metro's trusted moving professionals - where Colorado State graduate expertise meets reliable local service across Colorado
              </p>
            </div>

            {/* Enhanced CTA Section */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up-delay">
              <Link
                href="#quote"
                className="group relative bg-orange-500 text-white font-semibold px-12 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center">
                  <Truck className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Get Free Quote
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              <Link
                href="/about"
                className="group border-2 border-white/70 text-white font-semibold px-12 py-5 rounded-full backdrop-blur-sm hover:bg-white hover:text-blue-900 transition-all duration-500 hover:border-white"
              >
                <span className="flex items-center">
                  Our Story
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>
        {/* ABOUT SECTION */}
        <section id="about" className="relative py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full tracking-wide uppercase mb-6">
                    <Award className="w-4 h-4 mr-2" />
                    Colorado State Graduate • Local Denver Experts
                  </span>
                  <h2 className="text-4xl md:text-5xl font-light leading-tight text-gray-900 mb-6">
                    Professional Moving
                    <span className="block font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text">Redefined for Colorado</span>
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-transparent mb-8"></div>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Founded in Denver Metro's Greenwood Village by a Colorado State University graduate, Local Moving Company combines academic excellence with real-world moving expertise. We're not just another moving company—we're your neighbors who understand Colorado living.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      From downtown Denver apartments to Boulder family homes, Fort Collins student moves to Greenwood Village relocations, we bring educated precision and genuine care to every move across the Front Range.
                    </p>
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">98%</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Customer Satisfaction</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">500+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Successful Moves</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">3</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Cities Served</div>
                  </div>
                </div>

                {/* Call-to-Action */}
                <div className="pt-8">
                  <Link
                    href="/about"
                    className="inline-flex items-center bg-blue-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:-translate-y-1 group shadow-lg hover:shadow-xl"
                  >
                    <span>Our Full Story</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Right Features Grid */}
              <div className="grid grid-cols-2 gap-6 auto-rows-fr">
                <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Shield className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300 flex-shrink-0">Fully Insured & Licensed</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    Complete protection for your belongings with comprehensive insurance and Colorado state licensing for peace of mind
                  </p>
                </div>

                <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Clock className="w-8 h-8 text-orange-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors duration-300 flex-shrink-0">On-Time Guarantee</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    Punctual service that respects your schedule with accurate timing and efficient execution
                  </p>
                </div>

                <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Users className="w-8 h-8 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300 flex-shrink-0">Expert Team</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    Trained professionals who treat your possessions with the same care they'd show their own
                  </p>
                </div>

                <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Star className="w-8 h-8 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300 flex-shrink-0">5-Star Local Service</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    Consistently rated the top choice for Denver Metro moves with unmatched customer satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full tracking-wide uppercase mb-6">
                <Package className="w-4 h-4 mr-2" />
                Complete Moving Solutions
              </span>
              <h2 className="text-4xl md:text-5xl font-light leading-tight text-gray-900 mb-6">
                Services That Cover
                <span className="block font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">Every Moving Need</span>
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-orange-500 to-transparent mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Residential Moving */}
              <div className="group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">Residential Moving</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  From cozy Denver apartments to spacious Boulder homes, we handle every residential move with personal care and professional expertise.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Local & long-distance moves',
                    'Professional packing services',
                    'Furniture disassembly/assembly',
                    'Specialty item handling',
                    'Same-day availability'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/residential"
                  className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold group-hover:translate-x-1 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              {/* Commercial Moving */}
              <div className="group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-8 h-8 text-orange-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300">Commercial Moving</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Business relocations require precision and minimal downtime. Our commercial moving expertise keeps your operations running smoothly.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Office relocations',
                    'Weekend & after-hours service',
                    'Equipment & technology moving',
                    'Minimal business disruption',
                    'Project management included'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/commercial"
                  className="inline-flex items-center text-orange-700 hover:text-orange-900 font-semibold group-hover:translate-x-1 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              {/* Specialty Services */}
              <div className="group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-purple-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">Specialty Services</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  High-value items, fragile pieces, and unique moving challenges require specialized expertise and equipment.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Piano & fine art moving',
                    'Antique & collectible handling',
                    'Storage solutions',
                    'Packing & unpacking services',
                    'White-glove service'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/specialty"
                  className="inline-flex items-center text-purple-700 hover:text-purple-900 font-semibold group-hover:translate-x-1 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE SECTION */}
        <section id="quote" className="py-24 bg-blue-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/team.png"
              alt="Local Moving Company professional team in Denver"
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/95 via-blue-900/90 to-blue-900/95"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="mb-16">
              <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-blue-300 text-sm font-semibold rounded-full tracking-wide uppercase mb-6">
                <Calendar className="w-4 h-4 mr-2" />
                Free Quote & Consultation
              </span>
              <h2 className="text-4xl md:text-6xl font-light text-white mb-8">
                Ready to Move?
                <span className="block font-bold bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent">Let's Get Started</span>
              </h2>
              <p className="text-xl text-blue-300 max-w-3xl mx-auto leading-relaxed mb-12">
                Get your free, no-obligation quote today. Our Denver Metro moving experts are standing by to make your next move seamless and stress-free.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <Phone className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Call Now</h3>
                <a href="tel:720-357-9499" className="text-orange-300 hover:text-orange-200 transition-colors">
                  (720) 357-9499
                </a>
                <p className="text-blue-300 text-sm mt-2">Instant quotes available</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <Mail className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Email Us</h3>
                <a href="mailto:info@localmovingcompany.com" className="text-orange-300 hover:text-orange-200 transition-colors text-sm">
                  info@localmovingcompany.com
                </a>
                <p className="text-blue-300 text-sm mt-2">Detailed estimates</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <MapPin className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Service Area</h3>
                <p className="text-orange-300 text-sm">Denver Metro + Boulder + Fort Collins</p>
                <p className="text-blue-300 text-sm mt-2">Same-day availability</p>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link
                href="/quote"
                className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-16 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center text-lg">
                  <Calendar className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Get Free Quote Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <Link
                href="/contact"
                className="group border-2 border-white/70 text-white font-bold px-16 py-6 rounded-full backdrop-blur-sm hover:bg-white hover:text-blue-900 transition-all duration-500 hover:border-white text-lg"
              >
                <span className="flex items-center">
                  <Users className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Schedule Consultation
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Successful Moves" },
                { number: "98%", label: "Customer Satisfaction" },
                { number: "24/7", label: "Support Available" },
                { number: "0", label: "Damage Claims" }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">{item.number}</div>
                  <div className="text-blue-400 text-sm uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full tracking-wide uppercase mb-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  Serving the Front Range
                </span>
                <h2 className="text-4xl md:text-5xl font-light leading-tight text-gray-900 mb-8">
                  Your Local
                  <span className="block font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">Moving Experts</span>
                </h2>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">Service Areas</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        <strong>Primary:</strong> Denver Metro (Greenwood Village, Littleton, Centennial)<br />
                        <strong>Extended:</strong> Boulder & Fort Collins<br />
                        <span className="text-sm text-gray-500">Colorado State alumni advantage</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors duration-300">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors duration-300">Business Hours</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Monday - Saturday: 7:00 AM - 7:00 PM<br />
                        Sunday: 9:00 AM - 5:00 PM<br />
                        <span className="text-sm text-gray-500">Emergency moves available</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors duration-300">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">Get In Touch</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        <a href="tel:720-357-9499" className="text-green-600 hover:text-green-700 font-semibold">(720) 357-9499</a><br />
                        <a href="mailto:info@localmovingcompany.com" className="text-green-600 hover:text-green-700">info@localmovingcompany.com</a><br />
                        <span className="text-sm text-gray-500">Free quotes & consultations</span>
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center bg-black text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <Mail className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Start Your Move
                </Link>
              </div>

              {/* Right Map */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196281.06489548736!2d-105.07715708536875!3d39.73871446397243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c7c4d8b8b5e6b%3A0x6b61b1b5b5b5b5b5!2sDenver%2C%20CO!5e0!3m2!1sen!2sus!4v1635123456789!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Local Moving Company service area - Denver Metro, Boulder, Fort Collins"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Enhanced Location Badge */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Local Moving Company</div>
                      <div className="text-sm text-gray-600">Denver Metro + Front Range</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up-delay {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up-delay 1s ease-out 0.6s both;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hover\\:-translate-y-2:hover {
            transform: translateY(-4px);
          }
          
          .hover\\:scale-105:hover {
            transform: scale(1.02);
          }
        }
      `}</style>
    </>
  );
}