'use client'

import { ContactPage } from '@/types'
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
            <div className="mb-8 sm:mb-12 px-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-3 border border-bgDark-2/50 px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-sm sm:text-base md:text-xl rounded-full font-semibold text-gray-900 shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 min-h-[44px] justify-center"
                style={{background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)', boxShadow: '0 4px 32px 0 rgba(0,70,201,0.25)'}}
              >
                <span className="text-center">Book a Session - Free Consultation Available</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 group-hover:text-gray-700 transition-colors flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                {/* Contact Information */}
                {(data.contactInfo.email || (data.contactInfo.address && data.contactInfo.address.street)) && (
                  <AnimatedSection
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative self-start"
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
                        <h2 className="text-2xl font-light text-gray-900 mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                          {data.contactInfo.email && (
                            <div>
                              <h3 className="text-lg font-light mb-2 text-gray-900">Email</h3>
                              <p className="text-gray-900">{data.contactInfo.email}</p>
                            </div>
                          )}
                          {data.contactInfo.address && data.contactInfo.address.street && (
                            <div>
                              <h3 className="text-lg font-light mb-2 text-gray-900">Location</h3>
                              <p className="text-gray-900">
                                {[
                                  data.contactInfo.address.street,
                                  data.contactInfo.address.city,
                                  data.contactInfo.address.state,
                                  data.contactInfo.address.postalCode,
                                  data.contactInfo.address.country
                                ].filter(Boolean).join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                )}

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