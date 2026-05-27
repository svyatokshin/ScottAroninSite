'use client'

import { ServicesPage } from '@/types'
import { servicesPageData } from '@/data/static-content'
import Image from 'next/image'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { motion } from 'framer-motion'

/**
 * Services page component - now using static data instead of Sanity CMS
 * @returns JSX element for the services page
 */
export default function Services() {
  const data = servicesPageData

  return (
    <div className="min-h-screen">
      {/* First Section - Light Blue Background - Hero + Services List + CTA */}
      <motion.section 
        className="pt-24 pb-32 bg-gradient-to-br from-bgLight-4 via-bgLight-4 to-bgLight-3 relative overflow-hidden z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Bottom fade-out - Blue to White - Extended and smoother */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/70 via-bgNeutral-eggshell/40 via-bgNeutral-cream/15 to-transparent z-0 pointer-events-none" />
        {/* Premium space background effects - starting below transition area */}
        <div className="absolute top-0 inset-x-0 bottom-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/15 via-transparent to-transparent opacity-50" />
        <div className="absolute top-0 inset-x-0 bottom-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.10),transparent_70%)]" />
        <div className="absolute top-0 inset-x-0 bottom-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
          <AnimatedSection 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 text-gray-900/90 text-sm font-medium tracking-widest uppercase mb-6 drop-shadow-sm">
              <div className="w-12 h-px bg-gradient-to-r from-bgDark-2/50 to-transparent"></div>
              <span>Wellness Services</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-bgDark-2/50"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-light text-gray-900 leading-tight tracking-tight mb-6 sm:mb-8 drop-shadow-lg px-4">
              {data.title}
            </h1>
            <div className="mb-8 sm:mb-12 px-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-3 bg-bgDark-2/20 border border-bgDark-2/50 px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-sm sm:text-base md:text-xl rounded-full font-semibold text-gray-900 shadow-xl hover:bg-bgDark-2/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 min-h-[44px] justify-center"
                style={{boxShadow: '0 4px 32px 0 rgba(0,70,201,0.25)'}}
              >
                <span className="text-center">Book a Session - Free Consultation Available</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 group-hover:text-gray-700 transition-colors flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </AnimatedSection>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-12 sm:mt-16 md:mt-24">
            {data.servicesList.map((service, index) => (
              <AnimatedSection
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div 
                  className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-gray-200/50 hover:border-gray-300/70 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden"
                  style={{boxShadow: '0 10px 40px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)'}}
                >
                {/* Subtle background effects for white cards */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,70,201,0.03),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,0,0,0.02),transparent_50%)]" />
                <div className="relative z-10">
                  {service.icon && (
                    <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500 flex justify-center">
                      <Image
                        src={service.icon.src}
                        alt={service.icon.alt}
                        width={service.icon.width || 128}
                        height={service.icon.height || 128}
                        className="w-32 h-32 animate-float rounded-2xl object-cover shadow-xl"
                        style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'}}
                      />
                    </div>
                  )}
                  <h3 className={`text-2xl font-light text-gray-900 mb-4 group-hover:text-bgDark-2 transition-colors duration-300 ${index < 3 ? 'text-center' : ''}`}>
                    {service.serviceTitle}
                  </h3>
                  {service.description && (
                    <div className="mb-6">
                      <p className="text-base leading-relaxed text-gray-900">{service.description}</p>
                    </div>
                  )}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-gray-900">
                          <span className="text-gray-900 mt-1">•</span>
                          <span className="text-gray-900">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* CTA after Services List */}
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-bgDark-2/20 border border-bgDark-2/50 px-8 py-3 rounded-full font-semibold text-gray-900 shadow-xl hover:bg-bgDark-2/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60"
              style={{boxShadow: '0 4px 32px 0 rgba(0,70,201,0.25)'}}
            >
              Book a Session - Free Consultation Available
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-900 group-hover:text-gray-700 transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </AnimatedSection>
        </div>
      </motion.section>

      {/* Second Section - White Background - 5 Pillars + Final CTA */}
      <motion.section 
        className="py-16 sm:py-24 md:py-32 -mt-16 relative overflow-hidden z-10 bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Top fade-in - Blue to White - Extended and smoother - starts with blue to cover blue section immediately */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bgLight-4 via-bgLight-4/80 via-bgLight-3/60 via-white/40 via-white/70 via-white/90 to-white z-0 pointer-events-none" />
        {/* Premium space background effects - starting below transition area */}
        <div className="absolute top-48 inset-x-0 bottom-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/15 via-transparent to-transparent opacity-40" />
        <div className="absolute top-48 inset-x-0 bottom-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.08),transparent_70%)]" />
        <div className="absolute top-48 inset-x-0 bottom-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
          {/* 5 Pillars of Wellness Section */}
          <AnimatedSection
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
            id="5-pillars-of-wellness"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 text-gray-800/90 text-sm font-medium tracking-widest uppercase mb-6 drop-shadow-sm">
                <div className="w-12 h-px bg-gradient-to-r from-bgDark-2/50 to-transparent"></div>
                <span>Framework</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-bgDark-2/50"></div>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light text-gray-900 leading-tight tracking-tight mb-8 drop-shadow-md">
                5 Pillars of Wellness
              </h2>
            </div>

            <div 
              className="relative rounded-3xl p-10 md:p-16 overflow-hidden shadow-2xl border border-white/20" 
              style={{
                background: 'linear-gradient(to bottom right, #9DD0EB, #9DD0EB, #8FC5E0)',
                boxShadow: '0 20px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              {/* Space background effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/20 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.08),transparent_50%)]" />
              {/* Nebula effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-zen-purple/10 via-transparent to-zen-blue/10 opacity-40 mix-blend-screen" />
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.08),rgba(147,51,234,0.08),rgba(56,189,248,0.08))] opacity-25" />
              
              <div className="relative z-10 max-w-5xl mx-auto">
                {/* Introduction */}
                <div className="text-center mb-12">
                  <p className="text-xl leading-relaxed text-gray-900 font-light mb-8">
                    A framework for mind body work, personal transformation and spiritual pursuit. To discover and maximize your own potential to direct your mind, focus and mental power to change your experience of life as well as aspects of the material reality of your life, including your health and wellbeing. The training and coaching we do utilizes this framework in every category in which we help people.
                  </p>
                  
                  {/* Quick Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
                    {[
                      "Presence, awareness, witnessing",
                      "Unwinding, peeling back layers, deciphering", 
                      "Energy, body-centering, healing",
                      "Kindness, compassion and your true self",
                      "Movement- fast, slow, meditative, attentive, with purpose"
                    ].map((pillar, index) => (
                      <div 
                        key={index} 
                        className="relative rounded-xl p-4 border border-bgDark-2/20 hover:border-bgDark-2/30 transition-all duration-300 overflow-hidden"
                        style={{
                          background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)',
                          boxShadow: '0 10px 40px -12px rgba(0,70,201,0.15), 0 0 0 1px rgba(0,70,201,0.1)'
                        }}
                      >
                        {/* Light blue background effects */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,70,201,0.08),transparent_70%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,85,201,0.06),transparent_50%)]" />
                        <div className="relative z-10 text-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-zen-blue-light to-zen-purple rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-3">
                            {index + 1}
                          </div>
                          <p className="text-sm text-gray-900 font-light leading-tight">{pillar}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Descriptions */}
                <div className="space-y-8">
                  {[
                    {
                      number: 1,
                      title: "Awareness. Witnessing. Non-judgment.",
                      description: "Developing objective, sensory awareness- of thoughts, emotions and body sensations. Being present with what is without judgment or, for a time, interference. Cultivating and existing in an aware observer state; cultivating witness consciousness allowing you to observe (and understand) what is happening within you as if seeing from the outside. This helps to bring stillness and calm and is like a superpower for psychological wellbeing and a clearer view of reality."
                    },
                    {
                      number: 2,
                      title: "Peeling back the layers, looking at sources of internal suffering",
                      description: "Looking at sources of internal suffering or challenging internal experiences, understanding the sources and causes. This type of practice becomes more therapeutic. It is a way to face difficulties, circumstances, one's own patterns and understanding where they come from. It is a way to go more into the subconscious and to release and change patterns that cause you suffering. It is also a way of sensing and aligning with your true self, beyond stories, ego and societal identifiers, beyond what you think you are. Escaping the cloud of thought, you come into more uninterrupted oneness with your core essence. To a great extent, it's consciousness- a flexible, adaptable consciousness. This where and when there is greater clarity."
                    },
                    {
                      number: 3,
                      title: "Energy, body, healing.",
                      description: "Ancient Taoists understood what modern quantum physics also understands: ultimately, everything in the observable universe, and perhaps beyond, is made of energy. Every atom, when observed at a quantum level, is essentially a cloud of energy. You are made of atoms. Qigong is an example of a tradition and set of practices meant to optimize human functioning- physically, emotionally and spiritually- by cultivating and moving life energy. This is accomplished through particular meditative practices done with and without movement. These are often done with an aspect of connecting to the energy of certain elements of nature and the universe. Creating a balanced abundance of life energy that flows freely is key to optimized health and life. There are practices to do this."
                    },
                    {
                      number: 4,
                      title: "Kindness, compassion and your true self.",
                      description: "A lens to viewing the world, viewing others and viewing the self, this is based on the premise that the root of everyone's psyche and at the center of everyone's being is a core of goodness. Add to this modern research showing we are happier and our lives more complete and balanced when we cultivate and express kindness and compassion. (And, of course, we help make the world a bit better for everyone else as well.) Feeling this, making it central, caring about others as a prime directive is all developable. You don't have to be resigned to feeling, 'well, I'm just this type of person,' as if there is nothing you can do to change that. Humans are trainable, programmable and educable. By finding your core inner goodness and practicing at bringing it out, you can change both your outlook and your wellbeing."
                    },
                    {
                      number: 5,
                      title: "Movement.",
                      description: "Most modern people understand that there are many known, scientifically proven benefits of exercise. This is true. But there are so many ways to move, so many ways to focus the mind while doing it and so many different types of benefits to be had depending on how and how much you choose to move. Having movement as a pillar of mind-body wellbeing means not only doing 'mindless' Western exercise to get one's heart rate up or build one's muscular strength (though these are part of healthy movement.) It also means cultivating present moment awareness in your movements, making them meditative and also doing some slow movements like qigong, tai chi and yoga- or spontaneous movement done by letting your body guide you to what it feels like at the moment and moving accordingly- fast or slow, intense or gentle or any combination."
                    }
                  ].map((pillar, index) => (
                    <div 
                      key={index} 
                      className="relative rounded-2xl p-6 md:p-8 border border-bgDark-2/20 hover:border-bgDark-2/30 transition-all duration-300 overflow-hidden"
                      style={{
                        background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)',
                        boxShadow: '0 10px 40px -12px rgba(0,70,201,0.15), 0 0 0 1px rgba(0,70,201,0.1)'
                      }}
                    >
                      {/* Light blue background effects */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,70,201,0.08),transparent_70%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,85,201,0.06),transparent_50%)]" />
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-zen-blue-light to-zen-purple rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {pillar.number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-playfair font-light text-gray-900 mb-4">
                            {pillar.title}
                          </h3>
                          <p className="text-gray-900 leading-relaxed font-light">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Call to Action */}
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div 
              className="relative rounded-3xl p-12 overflow-hidden shadow-2xl border border-bgDark-2/20" 
              style={{
                background: 'linear-gradient(to bottom right, #9DD0EB, #9DD0EB, #8FC5E0)',
                boxShadow: '0 20px 60px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,70,201,0.1)'
              }}
            >
              {/* Light blue background effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,70,201,0.08),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,85,201,0.06),transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-light text-gray-900 mb-6">Ready to Begin Your Journey?</h2>
                <p className="text-gray-900 text-xl mb-8 font-light">
                  Take the first step towards holistic wellness and inner peace.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-bgDark-2/20 border border-bgDark-2/50 px-8 py-3 rounded-full font-semibold text-gray-900 shadow-xl hover:bg-bgDark-2/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60"
                  style={{boxShadow: '0 4px 32px 0 rgba(0,70,201,0.25)'}}
                >
                  Book a Session - Free Consultation Available
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-900 group-hover:text-gray-700 transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </motion.section>
    </div>
  )
} 