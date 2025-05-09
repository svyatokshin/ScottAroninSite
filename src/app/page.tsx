'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import background from '@/assets/meditation1.jpeg';
import hiking1 from '@/assets/hiking1.jpeg';
import nutrition1 from '@/assets/nutrition-1.jpeg';
import { FaLeaf, FaHeartbeat, FaBrain, FaBalanceScale, FaAppleAlt, FaMedal, FaRunning, FaUtensils, FaPeace, FaSun, FaMoon } from 'react-icons/fa';

const programs = [
  {
    title: "Mind-Body Practices",
    description: "Meditation, qigong, and mindfulness techniques to cultivate inner peace and mental clarity. Experience the transformative power of ancient wisdom combined with modern science.",
    icon: FaBalanceScale,
    link: "/services/mind-body",
    color: "from-blue-400 to-indigo-500"
  },
  {
    title: "Physical Fitness",
    description: "Personalized training programs to enhance strength, flexibility, and overall physical wellbeing. Achieve your fitness goals while maintaining harmony with your body's natural rhythms.",
    icon: FaRunning,
    link: "/services/fitness",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Nutrition & Wellness",
    description: "Holistic nutrition guidance and mindful eating practices for optimal health and vitality. Discover how food can be your medicine and fuel for a vibrant life.",
    icon: FaUtensils,
    link: "/services/nutrition",
    color: "from-indigo-400 to-blue-500"
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center w-full bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-cyan-500/40" />
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
            <span style={{ color: '#3b4f7a' }} className="text-white font-medium tracking-widest bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">HOLISTIC WELLNESS COACHING</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Transform Your Life Through <span style={{ color: '#3b4f7a' }} className="text-blue-400">Mind-Body Wellness</span>
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
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all text-lg shadow-lg hover:shadow-xl"
            >
              Discover Our Programs
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all text-lg backdrop-blur-sm border border-white/20"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="w-full bg-gray-100 py-24">
        <div className="text-center mb-16">
          <span style={{ color: '#3b4f7a' }} className="font-medium tracking-widest">HOLISTIC APPROACH</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">Three Pillars of Wellness</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience a comprehensive approach to wellness that integrates mind-body practices, physical fitness, and mindful nutrition.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="mb-6">
                <div className={`bg-gradient-to-r ${program.color} p-4 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300`}>
                  <program.icon className="text-4xl text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">{program.title}</h3>
              <p className="text-gray-600 mb-6">{program.description}</p>
              <Link
                href={program.link}
                className="text-blue-800 font-semibold hover:text-blue-900 transition-colors inline-flex items-center gap-2"
              >
                Explore {program.title} 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Services */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span style={{ color: '#3b4f7a' }} className="font-medium tracking-widest">OUR APPROACH</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">Integrative Wellness Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each program is carefully crafted to address your unique needs while maintaining harmony between mind, body, and spirit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Meditation & Mindfulness",
                description: "Guided meditation sessions and mindfulness practices to reduce stress and enhance mental clarity. Learn techniques that you can practice anywhere, anytime.",
                icon: <FaPeace className="text-4xl text-blue-700" />
              },
              {
                title: "Movement & Exercise",
                description: "Customized fitness programs that respect your body's needs and promote sustainable progress. Find joy in movement and build lasting habits.",
                icon: <FaHeartbeat className="text-4xl text-indigo-700" />
              },
              {
                title: "Nutritional Guidance",
                description: "Personalized nutrition plans that nourish both body and mind, focusing on whole, natural foods. Discover the power of mindful eating.",
                icon: <FaLeaf className="text-4xl text-cyan-700" />
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
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
      <section className="w-full bg-white py-24">
        <div className="text-center mb-16">
          <span style={{ color: '#3b4f7a' }} className="font-medium tracking-widest">CLIENT SUCCESS</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">Transformational Results</h2>
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
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-blue-700 text-4xl mb-4">"</div>
              <p className="text-gray-600 text-lg mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-blue-700">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 1: Infinity Icon, Heading, Bold Text, Paragraphs --- */}
      <section className="w-full bg-gray-100 py-24 flex flex-col items-center text-center">
        <svg aria-label="infinity symbol" className="mx-auto mb-8" width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,25 Q25,0 50,25 Q75,50 90,25 Q75,0 50,25 Q25,50 10,25 Z" stroke="#19507E" strokeWidth="4" fill="none" />
        </svg>
        <h2 style={{ color: '#3b4f7a' }} className="text-4xl font-light text-blue-700 mb-6">My passion is your well being.</h2>
        <p style={{ color: '#3b4f7a' }} className="max-w-3xl mx-auto text-lg text-blue-900 mb-2">
          I'm a wellness consultant and teacher with a broad approach to human wellbeing. It has long been my <span style={{ fontWeight: 'bold', color: '#3b4f7a' }}>passion to help people work on their health and wellbeing to experience healthier and happier lives.</span>
        </p>
        <p style={{ color: '#3b4f7a' }} className="max-w-3xl mx-auto text-lg text-blue-900">
          My educational background includes Master's degrees in exercise physiology and nutrition as well as other exercise-related certifications. I've always had love for these disciplines and have professionally trained and counseled many in these broad categories of wellness behaviors.
        </p>
        <a href="#" className="mt-12 text-blue-700 hover:underline">Learn more</a>
        <div className="w-48 h-0.5 bg-blue-700 mt-2 mx-auto" />
      </section>

      {/* --- SECTION 2: Bubble Diagram + Text --- */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center bg-white py-24">
        <div className="flex-1 flex justify-center">
          <div className="relative w-[420px] h-[340px]">
            <Image src={nutrition1} alt="Nutrition Bubble Diagram" className="object-contain w-full h-full" />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start mt-12 md:mt-0 md:pl-12">
          <h3 style={{ color: '#3b4f7a' }} className="text-2xl mb-2">Your Health</h3>
          <svg aria-label="infinity symbol" className="mb-4" width="60" height="30" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,25 Q25,0 50,25 Q75,50 90,25 Q75,0 50,25 Q25,50 10,25 Z" stroke="#19507E" strokeWidth="3" fill="none" />
          </svg>
          <p style={{ color: '#3b4f7a' }} className="max-w-md text-lg">
            We'll approach your complete wellbeing holistically. By combining the best practices of nutrition, physical movement, and mind body healing, we'll work together and develop a fully integrated path for your optimal health: physically, mentally and spiritually.
          </p>
        </div>
      </section>

      {/* --- SECTION 3: Two-Column, Text + Image --- */}
      <section className="w-full flex flex-col md:flex-row items-center bg-lime-300 py-24">
        <div className="flex-1 px-8 md:px-24">
          <h3 style={{ color: '#3b4f7a' }} className="text-3xl font-light mb-6">Life won't stop coming at you, but you can train to be much more resilient in the face of it.</h3>
          <p style={{ color: '#3b4f7a' }} className="text-lg text-black">
            I teach a mind-body approach with techniques of meditation, energy practice (qigong), and ways to use everyday moments and activities as part of your practice towards better health and a higher experience of wellbeing. This includes, but is not limited to, eating-related mind-body practices aimed partly at crafting a healthier relationship with food and eating with all the attendant possible positive results that will bring.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
          <div className="w-96 h-96 bg-white flex items-center justify-center rounded-lg overflow-hidden">
            <Image src={hiking1} alt="Hiking" className="object-cover w-full h-full" />
          </div>
        </div>
      </section>

      {/* --- SECTION 4: Infinity Icon, Heading, Bulleted List, Dark BG --- */}
      <section className="w-full bg-blue-900 text-white text-center flex flex-col items-center py-24">
        <svg aria-label="infinity symbol" className="mx-auto mb-8" width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,25 Q25,0 50,25 Q75,50 90,25 Q75,0 50,25 Q25,50 10,25 Z" stroke="#fff" strokeWidth="4" fill="none" />
        </svg>
        <h3 className="text-3xl mb-8 text-white">How we work together</h3>
        <ul className="max-w-3xl mx-auto text-lg text-white text-left space-y-4">
          <li><span className="font-bold text-white">Online live sessions</span> by whichever video chatting app platform we mutually decide on.</li>
          <li>Sessions of either the standard 75 minute length or, in some cases, custom length sessions if you prefer.</li>
          <li>Depending on your goals and which approaches we decide are best for you, you may exercise live with my guidance and instruction, discuss and assess food behaviors, practice various mind-body techniques to help reach any or all of your wellness goals.</li>
          <li>If we work together for a period of time, I will also prepare materials for you to have as guidelines and items of practice for furthering your journey on your own as well.</li>
        </ul>
      </section>

      {/* --- SECTION 5: Two Cards, Book a Session --- */}
      <section className="w-full bg-white flex flex-col md:flex-row items-stretch justify-center gap-16 py-24">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-64 h-64 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-8">
            <span style={{ color: '#3b4f7a' }} className="text-6xl text-gray-400">💻</span>
          </div>
          <h4 style={{ color: '#3b4f7a' }} className="text-2xl text-blue-700 mb-4">Book a Session Online</h4>
          <p style={{ color: '#3b4f7a' }} className="text-lg text-blue-900 mb-8 text-center">I work with clients online to bring healing and good health practices into their lives.</p>
          <button className="px-8 py-2 border-b-2 border-blue-700 text-blue-700 font-semibold hover:underline bg-transparent">Book Now</button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-64 h-64 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-8">
            <span style={{ color: '#3b4f7a' }} className="text-6xl text-gray-400">🤝</span>
          </div>
          <h4 style={{ color: '#3b4f7a' }} className="text-2xl text-blue-700 mb-4">Book an In-Person Session</h4>
          <p style={{ color: '#3b4f7a' }} className="text-lg text-blue-900 mb-8 text-center">My practice in Pike County, Pennsylvania is where I help people with many aspects of their health and well being.</p>
          <button className="px-8 py-2 border-b-2 border-blue-700 text-blue-700 font-semibold hover:underline bg-transparent">Book Now</button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ color: '#3b4f7a' }} className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Wellness Community</h2>
            <p style={{ color: '#3b4f7a' }} className="text-white/90 text-xl mb-8">
              Subscribe to receive exclusive wellness tips, program updates, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 text-white placeholder-white/70 backdrop-blur-sm border border-white/20"
              />
              <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 