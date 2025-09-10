import Link from "next/link";
import { Phone, Mail, MapPin, Star, Quote, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto pt-32 pb-24 px-4">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light mb-6 text-gray-900">Let's Move You Forward</h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
          Your neighbors helping you move. Founded by CSU alumni, born and raised in Colorado. No corporate hassles—just honest, reliable moving by people who call this community home.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {/* Primary Contact */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">Ready to Move?</h3>
          <div className="space-y-4">
            <a
              href="tel:720-357-9499"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group"
            >
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Phone size={18} />
              </div>
              <div>
                <span className="font-medium block">(720) 357-9499</span>
                <span className="text-sm text-gray-500">Call or text anytime</span>
              </div>
            </a>
            <a
              href="mailto:info@localmovingcompany.co"
              className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors group"
            >
              <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <span className="font-medium block">info@localmovingcompany.co</span>
                <span className="text-sm text-gray-500">Quick quote responses</span>
              </div>
            </a>
          </div>
        </div>

        {/* Service Area */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">Denver Metro & Front Range</h3>
          <div className="flex items-start gap-3 text-gray-700">
            <div className="p-2 bg-orange-50 rounded-lg mt-1">
              <MapPin size={18} />
            </div>
            <div>
              <p className="font-medium leading-relaxed mb-2">
                Denver Metro Area<br />
                Plus Boulder & Fort Collins
              </p>
              <p className="text-sm text-gray-500">
                Based in Denver • Serving the Front Range
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Reviews Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="currentColor" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">5.0</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">What Our Neighbors Say</h2>
          <p className="text-gray-600">Real reviews from real Denver moves</p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Review 1 */}
          <div className="bg-gray-50 rounded-xl p-6 relative">
            <Quote className="absolute top-4 right-4 text-blue-200" size={32} />
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-800 mb-4 leading-relaxed">
              "We had a great experience with Local Moving! With only a week to plan our move things were stressful and I didn’t think we would find good movers with such short notice. Man did we get lucky finding them! These guys are friendly, professional, and affordable! Highly recommend giving this locally owned business a try."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-semibold text-sm">SJ</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Karoleigh Cosner</p>
                <p className="text-sm text-gray-500">Fort Collins homeowner</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-gray-50 rounded-xl p-6 relative">
            <Quote className="absolute top-4 right-4 text-emerald-200" size={32} />
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-800 mb-4 leading-relaxed">
              "Spencer and Cole were great. We had a very small job and they took care of everything we needed help with. They were prompt, careful, and did great work!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 font-semibold text-sm">MR</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Jen Krafchick</p>
                <p className="text-sm text-gray-500">Fort Collins Resident</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-gray-50 rounded-xl p-6 relative">
            <Quote className="absolute top-4 right-4 text-purple-200" size={32} />
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-800 mb-4 leading-relaxed">
              "Here’s the deal, those two young gentlemen worked like they were in a pit crew changing tires in the Daytona 500, lighting fast got my 5 bed house packed and in the truck in no time. Very respectful and easy to communicate with. Highly recommend"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-700 font-semibold text-sm">AC</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Brayden Edwards</p>
                <p className="text-sm text-gray-500">Fort Collins family</p>
              </div>
            </div>
          </div>

          {/* Review 4 */}
          <div className="bg-gray-50 rounded-xl p-6 relative">
            <Quote className="absolute top-4 right-4 text-orange-200" size={32} />
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-800 mb-4 leading-relaxed">
              "Exceptional service! They handled our piano and antique furniture with extreme care. The team was punctual, courteous, and went above and beyond. Worth every penny for the peace of mind."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-700 font-semibold text-sm">DW</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">David Wilson</p>
                <p className="text-sm text-gray-500">Denver business owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Reviews Link */}
        <div className="text-center">
          <a
            href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-lg group"
          >
            <div className="flex text-yellow-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            Read All Reviews on Google
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-gray-500 mt-3">
            See what your neighbors are saying about their moving experience
          </p>
        </div>
      </div>
    </main>
  );
}