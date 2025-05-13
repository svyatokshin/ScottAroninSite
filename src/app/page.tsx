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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center w-full bg-black">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
          <Image
            src={background}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={100}
            placeholder="blur"
          />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="text-white/90 font-light tracking-[0.2em] bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">HOLISTIC WELLNESS COACHING</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-light text-white mb-8 leading-[1.1] tracking-tight"
          >
            Transform Your Life Through{" "}
            <span className="font-normal bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Mind-Body Wellness
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light"
          >
            Experience personalized wellness coaching that harmonizes mind, body, and spirit for lasting transformation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/services"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-light tracking-wider text-white rounded-full bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Discover Our Programs</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-light tracking-wider text-white rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-md border border-white/10"
            >
              <span className="relative z-10">Book Consultation</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="w-full bg-gray-100 py-24">
        <div className="text-center mb-16">
          <span style={{ color: '#3b4f7a' }} className="font-medium tracking-widest">HOLISTIC APPROACH</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">Five Pillars of Wellness</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience a comprehensive approach to wellness that integrates mind-body practices, physical fitness, and mindful nutrition.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-800 hover:border-gray-700"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6">
                  <div className={`bg-gradient-to-r ${program.color} p-4 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <program.icon className="text-4xl text-white" />
                  </div>
                </div>
                <div className="mb-6 w-28 h-28 rounded-xl overflow-hidden shadow-lg">
                  <Image src={program.image} alt={program.alt} className="object-cover w-full h-full" placeholder="blur" />
                </div>
                <h3 className="text-2xl font-light text-white mt-2 mb-4">{program.title}</h3>
                <p className="text-gray-400 mb-8 font-light leading-relaxed">{program.description}</p>
                <Link
                  href={program.link}
                  className="text-violet-400 font-light hover:text-violet-300 transition-colors inline-flex items-center gap-2 group/link"
                >
                  Explore {program.title}
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Services */}
      <section className="w-full bg-gradient-to-b from-gray-900 to-black py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-violet-400 font-light tracking-[0.2em]"
            >
              OUR APPROACH
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-light mt-6 mb-8 text-white"
            >
              Integrative{" "}
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Wellness Solutions
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
            >
              Each program is carefully crafted to address your unique needs while maintaining harmony between mind, body, and spirit.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Meditation & Mindfulness",
                description: "Guided meditation sessions and mindfulness practices to reduce stress and enhance mental clarity. Learn techniques that you can practice anywhere, anytime.",
                icon: <FaPeace className="text-4xl text-violet-400" />
              },
              {
                title: "Movement & Exercise",
                description: "Customized fitness programs that respect your body's needs and promote sustainable progress. Find joy in movement and build lasting habits.",
                icon: <FaHeartbeat className="text-4xl text-indigo-400" />
              },
              {
                title: "Nutritional Guidance",
                description: "Personalized nutrition plans that nourish both body and mind, focusing on whole, natural foods. Discover the power of mindful eating.",
                icon: <FaLeaf className="text-4xl text-rose-400" />
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-800 hover:border-gray-700"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative z-10">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-gradient-to-b from-black to-gray-900 py-32">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-violet-400 font-light tracking-[0.2em]"
          >
            CLIENT SUCCESS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-light mt-6 mb-8 text-white"
          >
            Transformational{" "}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Results
            </span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
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
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-800 hover:border-gray-700"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10">
                <div className="text-violet-400 text-5xl mb-6 font-serif">"</div>
                <p className="text-gray-300 text-lg mb-8 font-light leading-relaxed">{testimonial.quote}</p>
                <div>
                  <p className="font-light text-white">{testimonial.author}</p>
                  <p className="text-violet-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 1: Infinity Icon, Heading, Bold Text, Paragraphs --- */}
      <section className="w-full bg-gradient-to-b from-gray-900 to-black py-32">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <svg aria-label="infinity symbol" className="mx-auto" width="120" height="60" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,25 Q25,0 50,25 Q75,50 90,25 Q75,0 50,25 Q25,50 10,25 Z" stroke="url(#gradient)" strokeWidth="2" fill="none">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </path>
            </svg>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-white mb-8"
          >
            My passion is your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              well being
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-300 mb-6 font-light leading-relaxed"
          >
            I'm a wellness consultant and teacher with a broad approach to human wellbeing. It has long been my{" "}
            <span className="text-white font-normal">passion to help people work on their health and wellbeing to experience healthier and happier lives.</span>
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-300 font-light leading-relaxed"
          >
            My educational background includes Master's degrees in exercise physiology and nutrition as well as other exercise-related certifications. I've always had love for these disciplines and have professionally trained and counseled many in these broad categories of wellness behaviors.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 group"
          >
            <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors font-light">Learn more</a>
            <div className="w-48 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 mt-2 mx-auto transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: Bubble Diagram + Text --- */}
      <section className="w-full bg-gradient-to-b from-black to-gray-900 py-32">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center relative"
          >
            <div className="absolute inset-0 z-0">
              <Image src={waterdrop} alt="Zen water drop background" fill className="object-cover opacity-30 rounded-3xl" placeholder="blur" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent rounded-3xl" />
            </div>
            <div className="relative z-10">
              <HealthGraph />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col items-center md:items-start mt-12 md:mt-0 md:pl-12"
          >
            <h3 className="text-3xl font-light text-white mb-4">Your Health</h3>
            <svg aria-label="infinity symbol" className="mb-8" width="80" height="40" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,25 Q25,0 50,25 Q75,50 90,25 Q75,0 50,25 Q25,50 10,25 Z" stroke="url(#gradient2)" strokeWidth="2" fill="none">
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </path>
            </svg>
            <p className="max-w-md text-lg text-gray-300 font-light leading-relaxed">
              We'll approach your complete wellbeing holistically. By combining the best practices of nutrition, physical movement, and mind body healing, we'll work together and develop a fully integrated path for your optimal health: physically, mentally and spiritually.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 3: Two-Column, Text + Image --- */}
      <section className="w-full bg-gradient-to-b from-gray-900 to-black py-32">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 px-4 md:px-12"
          >
            <h3 className="text-3xl md:text-4xl font-light text-white mb-8 leading-relaxed">
              Life won't stop coming at you, but you can train to be much more{" "}
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                resilient
              </span>{" "}
              in the face of it.
            </h3>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              I teach a mind-body approach with techniques of meditation, energy practice (qigong), and ways to use everyday moments and activities as part of your practice towards better health and a higher experience of wellbeing. This includes, but is not limited to, eating-related mind-body practices aimed partly at crafting a healthier relationship with food and eating with all the attendant possible positive results that will bring.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center items-center mt-12 md:mt-0"
          >
            <div className="relative w-96 h-96 group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
              <Image 
                src={hiking1} 
                alt="Hiking" 
                className="object-cover w-full h-full rounded-3xl relative z-10 transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: Infinity Icon, Heading, Bulleted List, Dark BG --- */}
      <section className="w-full bg-gradient-to-b from-black to-gray-900 py-32">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <svg aria-label="infinity symbol" className="mx-auto" width="120" height="60" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,25 Q25,0 50,25 Q75,50 90,25 Q75,0 50,25 Q25,50 10,25 Z" stroke="url(#gradient3)" strokeWidth="2" fill="none">
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </path>
            </svg>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-light text-white mb-12"
          >
            How we work together
          </motion.h3>
          <motion.ul 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-300 text-left space-y-6 font-light"
          >
            <li className="flex items-start gap-4">
              <span className="text-violet-400 mt-1">•</span>
              <span><span className="text-white font-normal">Online live sessions</span> by whichever video chatting app platform we mutually decide on.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-violet-400 mt-1">•</span>
              <span>Sessions of either the standard 75 minute length or, in some cases, custom length sessions if you prefer.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-violet-400 mt-1">•</span>
              <span>Depending on your goals and which approaches we decide are best for you, you may exercise live with my guidance and instruction, discuss and assess food behaviors, practice various mind-body techniques to help reach any or all of your wellness goals.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-violet-400 mt-1">•</span>
              <span>If we work together for a period of time, I will also prepare materials for you to have as guidelines and items of practice for furthering your journey on your own as well.</span>
            </li>
          </motion.ul>
        </div>
      </section>

      {/* --- SECTION 5: Two Cards, Book a Session --- */}
      <section className="w-full bg-gradient-to-b from-gray-900 to-black py-32">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-stretch justify-center gap-16">
          {[
            {
              icon: "💻",
              title: "Book a Session Online",
              description: "I work with clients online to bring healing and good health practices into their lives.",
              buttonText: "Book Now"
            },
            {
              icon: "🤝",
              title: "Book an In-Person Session",
              description: "My practice in Pike County, Pennsylvania is where I help people with many aspects of their health and well being.",
              buttonText: "Book Now"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex-1 flex flex-col items-center justify-center px-4 group"
            >
              <div className="relative w-64 h-64 mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full transform group-hover:scale-105 transition-transform duration-500" />
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-gray-900 flex items-center justify-center border border-gray-800">
                  <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500">{card.icon}</span>
                </div>
              </div>
              <h4 className="text-2xl font-light text-white mb-4">{card.title}</h4>
              <p className="text-gray-300 text-lg mb-8 text-center font-light leading-relaxed">{card.description}</p>
              <button className="group/button relative px-8 py-3 overflow-hidden">
                <span className="relative z-10 text-violet-400 font-light tracking-wider">{card.buttonText}</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 transform origin-left scale-x-0 group-hover/button:scale-x-100 transition-transform duration-500" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

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
    </div>
  );
} 