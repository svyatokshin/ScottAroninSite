'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import background from '@/assets/meditation1.jpeg';
import hiking1 from '@/assets/hiking1.jpeg';
import space from '@/assets/space.jpg';
import meditation5 from '@/assets/meditation5.jpg';
import running from '@/assets/running.jpg';
import garden from '@/assets/garden.jpg';
import waterdrop from '@/assets/waterdrop.jpg';
import { FaLeaf, FaHeartbeat, FaBrain, FaBalanceScale, FaAppleAlt, FaMedal, FaRunning, FaUtensils, FaPeace, FaSun, FaMoon } from 'react-icons/fa';
import { getHomePage, urlFor } from '@/sanity/queries'
import { HomePage } from '@/types/sanity'
import { PortableText } from '@portabletext/react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'

const programs = [
  {
    title: "Mind-Body Practices",
    description: "Meditation, qigong, and mindfulness techniques to cultivate inner peace and mental clarity. Experience the transformative power of ancient wisdom combined with modern science.",
    icon: FaBalanceScale,
    link: "/services/mind-body",
    color: "from-violet-500 to-purple-600",
    image: meditation5,
    alt: "Person meditating peacefully in nature"
  },
  {
    title: "Physical Fitness",
    description: "Personalized training programs to enhance strength, flexibility, and overall physical wellbeing. Achieve your fitness goals while maintaining harmony with your body's natural rhythms.",
    icon: FaRunning,
    link: "/services/fitness",
    color: "from-blue-500 to-indigo-600",
    image: running,
    alt: "Person running outdoors"
  },
  {
    title: "Nutrition & Wellness",
    description: "Holistic nutrition guidance and mindful eating practices for optimal health and vitality. Discover how food can be your medicine and fuel for a vibrant life.",
    icon: FaUtensils,
    link: "/services/nutrition",
    color: "from-rose-500 to-pink-600",
    image: garden,
    alt: "Fresh garden vegetables and crops"
  }
];

// New HealthGraph component matching the provided image
const HealthGraph = () => (
  <div className="flex items-center justify-center w-full h-full">
    <svg
      viewBox="0 0 800 750"
      width="540"
      height="520"
      className="max-w-full h-auto"
      aria-label="Complete Wellbeing Graph"
    >
      {/* Dotted lines */}
      <line x1="320" y1="300" x2="640" y2="170" stroke="#222" strokeWidth="2" strokeDasharray="4,4" />
      <line x1="320" y1="340" x2="180" y2="500" stroke="#222" strokeWidth="2" strokeDasharray="4,4" />
      <line x1="320" y1="320" x2="620" y2="440" stroke="#222" strokeWidth="2" strokeDasharray="4,4" />

      {/* Central: COMPLETE WELLBEING */}
      <circle cx="320" cy="320" r="170" fill="#FACC15" />
      <text x="320" y="295" textAnchor="middle" fontSize="48" fontWeight="700" fill="#fff" fontFamily="Inter, Arial, Helvetica, sans-serif" letterSpacing="3" dominantBaseline="middle" style={{ textTransform: 'uppercase' }}>COMPLETE</text>
      <text x="320" y="350" textAnchor="middle" fontSize="48" fontWeight="700" fill="#fff" fontFamily="Inter, Arial, Helvetica, sans-serif" letterSpacing="3" dominantBaseline="middle" style={{ textTransform: 'uppercase' }}>WELLBEING</text>

      {/* NUTRITION */}
      <circle cx="670" cy="170" r="110" fill="#F472B6" />
      <text x="670" y="180" textAnchor="middle" fontSize="32" fontWeight="500" fill="#fff" fontFamily="Inter, Arial, Helvetica, sans-serif" letterSpacing="2" dominantBaseline="middle" style={{ textTransform: 'uppercase' }}>NUTRITION</text>

      {/* FITNESS AND MOVEMENT */}
      <circle cx="180" cy="500" r="90" fill="#60A5FA" />
      <text x="180" y="495" textAnchor="middle" fontSize="24" fontWeight="500" fill="#fff" fontFamily="Inter, Arial, Helvetica, sans-serif" letterSpacing="1.5" dominantBaseline="middle" style={{ textTransform: 'uppercase' }}>FITNESS AND</text>
      <text x="180" y="525" textAnchor="middle" fontSize="24" fontWeight="500" fill="#fff" fontFamily="Inter, Arial, Helvetica, sans-serif" letterSpacing="1.5" dominantBaseline="middle" style={{ textTransform: 'uppercase' }}>MOVEMENT</text>

      {/* MIND BODY HEALING (most prominent of the three) */}
      <circle cx="620" cy="440" r="140" fill="#A78BFA" />
      <text x="620" y="430" textAnchor="middle" fontSize="32" fontWeight="500" fill="#fff" fontFamily="Inter, Arial, Helvetica, sans-serif" letterSpacing="2" dominantBaseline="middle" style={{ textTransform: 'uppercase' }}>MIND BODY</text>
      <text x="620" y="470" textAnchor="middle" fontSize="32" fontWeight="500" fill="#fff" fontFamily="Inter, Arial, Helvetica, sans-serif" letterSpacing="2" dominantBaseline="middle" style={{ textTransform: 'uppercase' }}>HEALING</text>
    </svg>
  </div>
);

async function getData(): Promise<HomePage> {
  return getHomePage()
}

export default async function Home() {
  const data = await getData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {data.heroSection.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(data.heroSection.heroImage).url()}
              alt={data.heroSection.heroImage.alt || 'Hero background'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}
        <div className="relative z-10 text-center text-white px-4">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              {data.heroSection.heading}
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8">
              {data.heroSection.subheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-light hover:bg-gray-100 transition-colors"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-violet-600 text-white px-8 py-3 rounded-lg font-light hover:bg-violet-700 transition-colors"
              >
                Book an Appointment
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section One */}
          {data.sectionOne && (
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light mb-6">
                    {data.sectionOne.heading}
                  </h2>
                  <div className="prose prose-lg">
                    <PortableText value={data.sectionOne.content} />
                  </div>
                </div>
                {data.sectionOne.image && (
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <Image
                      src={urlFor(data.sectionOne.image).url()}
                      alt={data.sectionOne.image.alt || 'Section one image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Section Two */}
          {data.sectionTwo && (
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {data.sectionTwo.image && (
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <Image
                      src={urlFor(data.sectionTwo.image).url()}
                      alt={data.sectionTwo.image.alt || 'Section two image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-3xl md:text-4xl font-light mb-6">
                    {data.sectionTwo.heading}
                  </h2>
                  <div className="prose prose-lg">
                    <PortableText value={data.sectionTwo.content} />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Section Three */}
          {data.sectionThree && (
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light mb-6">
                    {data.sectionThree.heading}
                  </h2>
                  <div className="prose prose-lg">
                    <PortableText value={data.sectionThree.content} />
                  </div>
                </div>
                {data.sectionThree.image && (
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <Image
                      src={urlFor(data.sectionThree.image).url()}
                      alt={data.sectionThree.image.alt || 'Section three image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Wellness Pillars */}
      {data.wellnessPillars && data.wellnessPillars.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6">Our Wellness Pillars</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the core principles that guide our approach to holistic wellness
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.wellnessPillars.map((pillar, index) => (
                <AnimatedSection
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  {pillar.icon && (
                    <div className="w-16 h-16 mb-6 mx-auto">
                      <Image
                        src={urlFor(pillar.icon).url()}
                        alt={pillar.icon.alt || `${pillar.title} icon`}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-light mb-4">{pillar.title}</h3>
                  <p className="text-gray-600 mb-6">{pillar.description}</p>
                  {pillar.link && (
                    <Link
                      href={pillar.link.url}
                      className="text-violet-600 hover:text-violet-700 transition-colors"
                    >
                      {pillar.link.text} →
                    </Link>
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="w-full bg-gradient-to-b from-black to-gray-900 py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-3xl transform -rotate-1" />
            <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black p-12 rounded-3xl border border-gray-800">
              <h2 className="text-4xl font-light text-white mb-6">Join Our Wellness Community</h2>
              <p className="text-gray-300 text-xl mb-8 font-light">
                Subscribe to receive exclusive wellness tips, program updates, and special offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500/50 bg-gray-800/50 text-white placeholder-gray-400 backdrop-blur-sm border border-gray-700 font-light"
                />
                <button className="group relative px-8 py-3 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="relative z-10 text-white font-light tracking-wider">Subscribe</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-light mb-4">About Us</h3>
              <p className="text-gray-400">
                Dedicated to helping you achieve optimal health and wellness through personalized care and holistic approaches.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-light mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services#nutrition" className="text-gray-400 hover:text-white transition-colors">
                    Nutrition Counseling
                  </Link>
                </li>
                <li>
                  <Link href="/services#wellness" className="text-gray-400 hover:text-white transition-colors">
                    Wellness Programs
                  </Link>
                </li>
                <li>
                  <Link href="/services#health" className="text-gray-400 hover:text-white transition-colors">
                    Health Coaching
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-light mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Wellness Street</li>
                <li>City, State 12345</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@wellness.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Your Wellness Practice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 