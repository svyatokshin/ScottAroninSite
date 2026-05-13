'use client'

import { contactPageData } from '@/data/static-content'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { ContactForm } from '@/components/forms/ContactForm'

/**
 * Contact page component - now using static data instead of Sanity CMS
 * @returns JSX element for the contact page
 */
export default function Contact() {
  const data = contactPageData

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-16 sm:py-24 md:py-32 bg-white overflow-hidden">
        {/* Bottom fade-out to blend with footer */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bgLight-4 via-bgLight-4/80 via-bgLight-3/60 via-white/40 via-white/70 to-white z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 text-gray-800/90 text-sm font-medium tracking-widest uppercase mb-6 drop-shadow-sm">
              <div className="w-12 h-px bg-gradient-to-r from-bgDark-2/50 to-transparent"></div>
              <span>Get in Touch</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-bgDark-2/50"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-light text-gray-900 leading-tight tracking-tight mb-6 sm:mb-8 drop-shadow-lg px-4">
              {data.title}
            </h1>
          </AnimatedSection>

          {/* Container with darker light blue background - similar to 5 Pillars */}
          <div 
            className="relative rounded-3xl p-6 sm:p-8 md:p-10 lg:p-16 overflow-hidden shadow-2xl border border-white/20"
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
            
            <div className="relative z-10">
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-12">
            {/* Contact Information */}
            <AnimatedSection
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative w-full"
            >
                <div 
                      className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden border border-bgDark-2/20"
                      style={{
                        background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)',
                        boxShadow: '0 10px 40px -12px rgba(0,70,201,0.15), 0 0 0 1px rgba(0,70,201,0.1)'
                      }}
                >
                      {/* Light blue background effects */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,70,201,0.08),transparent_70%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,85,201,0.06),transparent_50%)]" />
                
                <div className="relative z-10">
                        <h2 className="text-2xl font-light text-gray-900 mb-6 text-center">Get in Touch</h2>
                  <div className="space-y-6 text-center">
                    {data.contactInfo.email && (
                      <div>
                              <h3 className="text-lg font-light mb-4 text-gray-900">Email me directly or fill the contact form below</h3>
                              <a 
                                href={`mailto:${data.contactInfo.email}`}
                                className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold text-black hover:text-gray-700 transition-all duration-300 transform hover:scale-105 drop-shadow-lg"
                                style={{
                                  letterSpacing: '0.02em',
                                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                }}
                              >
                                {data.contactInfo.email}
                              </a>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-900">
                        Most sessions are online. Some people in Northeast Pennsylvania can also schedule in-person sessions.
                      </p>
                    </div>
                  </div>
                    </div>
                </div>
              </AnimatedSection>

            {/* Contact Form */}
            <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 