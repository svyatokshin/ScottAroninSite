'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import background from '@/assets/pexels-goumbik-669576.jpg';
import { FaLeaf, FaHeartbeat, FaBrain, FaBalanceScale, FaAppleAlt, FaMedal } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-custom-blue/40 to-custom-blue-light/40" />
          <Image
            src={background}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-custom-blue-lighter font-medium tracking-widest">PREMIUM WELLNESS COACHING</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Transform Your Life Through <span className="text-custom-blue-lighter">Holistic Wellness</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Experience personalized wellness coaching that harmonizes mind, body, and spirit for lasting transformation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/services"
              className="inline-block bg-custom-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-custom-blue-light transition-colors text-lg"
            >
              Discover Our Programs
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors text-lg backdrop-blur-sm"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-custom-blue font-medium tracking-widest">EXCLUSIVE PROGRAMS</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Premium Wellness Experiences</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our signature programs are designed to deliver exceptional results through personalized attention and proven methodologies.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Elite Performance Coaching',
              description: 'One-on-one coaching for high achievers seeking optimal physical and mental performance.',
              icon: <FaMedal className="text-4xl text-custom-blue" />
            },
            {
              title: 'Mind-Body Harmony',
              description: 'Integrative approach combining mindfulness, movement, and nutrition for holistic wellness.',
              icon: <FaBalanceScale className="text-4xl text-custom-blue" />
            },
            {
              title: 'Executive Wellness',
              description: 'Tailored programs for busy professionals to maintain peak performance and vitality.',
              icon: <FaBrain className="text-4xl text-custom-blue" />
            }
          ].map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="mb-6">{program.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{program.title}</h3>
              <p className="text-gray-600 mb-6">{program.description}</p>
              <Link
                href="/services"
                className="text-custom-blue font-semibold hover:text-custom-blue-light transition-colors"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-custom-blue font-medium tracking-widest">OUR EXPERTISE</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Comprehensive Wellness Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Corporate Wellness Programs',
                description: 'Tailored wellness initiatives that enhance employee productivity, engagement, and overall well-being.',
                icon: <FaLeaf className="text-4xl text-custom-blue" />
              },
              {
                title: 'Nutritional Excellence',
                description: 'Personalized nutrition plans and education to optimize health and performance.',
                icon: <FaAppleAlt className="text-4xl text-custom-blue" />
              },
              {
                title: 'Stress Management',
                description: 'Evidence-based techniques to reduce stress and enhance mental resilience.',
                icon: <FaHeartbeat className="text-4xl text-custom-blue" />
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-custom-blue font-medium tracking-widest">CLIENT SUCCESS</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Transformational Results</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "Working with this program has completely transformed my approach to health and wellness. The results have been life-changing.",
              author: "Sarah Johnson",
              role: "CEO, Tech Startup"
            },
            {
              quote: "The personalized attention and expert guidance helped me achieve my fitness goals while maintaining a balanced lifestyle.",
              author: "Michael Chen",
              role: "Professional Athlete"
            },
            {
              quote: "Our company's wellness program has significantly improved employee satisfaction and productivity. Highly recommended!",
              author: "Emily Rodriguez",
              role: "HR Director"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <p className="text-gray-600 text-lg mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-custom-blue py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Wellness Community</h2>
            <p className="text-white/80 text-xl mb-8">
              Subscribe to receive exclusive wellness tips, program updates, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-custom-blue-lighter"
              />
              <button className="bg-white text-custom-blue px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 