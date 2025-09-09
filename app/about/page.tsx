import Image from "next/image";
import { Home, Heart, Users, Handshake } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="pt-36 pb-20">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl lg:text-6xl font-light mb-6 text-gray-900 leading-tight">
              Friends Helping
              <br />
              <span className="italic text-emerald-700">Neighbors Move</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Moving means inviting people into your home—your most personal space. That's why we built a moving company based on trust, friendship, and genuine care. Founded by Cole Nading and powered by Colorado natives who've been friends for years, we bring the local back to moving.
            </p>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Home size={16} />
                <span>Colorado Born & Raised</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Friends First</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Trust-Based Service</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <Image
                src="/images/hero/boys.JPG"
                alt="Cole and his team of Colorado native friends helping a neighbor move"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">100%</div>
                  <div className="text-xs text-gray-500">Colorado Natives</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gradient-to-br from-gray-50 to-emerald-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-6 text-gray-900">Our Story</h2>
            <div className="w-16 h-0.5 bg-emerald-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Heart size={24} className="text-emerald-700" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">The Problem</h3>
              <p className="text-gray-600 leading-relaxed">
                Moving companies became faceless franchises. Strangers in your home, rushed timelines, and zero accountability. We knew there had to be a better way.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users size={24} className="text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">The Solution</h3>
              <p className="text-gray-600 leading-relaxed">
                Cole founded this company with his closest friends—all Colorado natives who understand what it means to be good neighbors and treat your home with respect.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                <Handshake size={24} className="text-rose-700" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">The Result</h3>
              <p className="text-gray-600 leading-relaxed">
                A moving experience built on trust, friendship, and local values. When we show up, you're not hiring strangers—you're welcoming neighbors.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Quote text */}
              <div className="md:col-span-2">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  "I started this company because the idea of a local, trustworthy, and affordable moving company seems to have become obsolete. Local Moving Company strives to do just that- put the local back in moving company."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 font-semibold text-lg">CN</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Cole Nading</div>
                    <div className="text-gray-600">Founder & Colorado Native</div>
                  </div>
                </div>
              </div>

              {/* Cole's portrait */}
              <div className="md:col-span-1">
                <Image
                  src="/images/hero/studs.jpg"
                  alt="Cole Nading, Founder of Local Moving Company"
                  width={240}
                  height={320}
                  className="rounded-xl shadow-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-6 text-gray-900">Why Friends Make Better Movers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              When you hire us, you're not just getting a moving service—you're getting neighbors who care about your home as much as you do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">We Know Each Other</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Every person on our team has been friends with Cole for years. We work together because we trust each other, and that trust extends to how we treat your belongings and your home.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Long-standing friendships, not just coworkers</li>
                <li>• Mutual accountability and respect</li>
                <li>• Shared Colorado values and work ethic</li>
                <li>• Personal investment in our reputation</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">We Know Colorado</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Born and raised here, we understand Denver neighborhoods, mountain moves, and the unique challenges of Colorado living. We're not a national franchise—we're your neighbors.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Familiar with every Denver neighborhood</li>
                <li>• Experience with mountain and altitude moves</li>
                <li>• Understanding of local building quirks</li>
                <li>• Weather-smart moving strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-emerald-400 mb-4">
            <Heart size={20} />
            <span className="text-sm font-medium uppercase tracking-wide">Built on Trust</span>
          </div>
          <h3 className="text-2xl font-light mb-6 text-white">Moving is Personal</h3>
          <p className="text-lg leading-relaxed text-gray-300 mb-6">
            Your home holds your most precious belongings, your memories, your life. When you invite us in, we don't take that trust lightly. We're not just moving your stuff—we're helping you transition to your next chapter, with the care and respect you'd expect from a good friend.
          </p>
          <p className="text-emerald-400 font-medium">
            Friends helping neighbors move. It's that simple.
          </p>
        </div>
      </section>
    </main>
  );
}