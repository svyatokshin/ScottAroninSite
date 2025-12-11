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
    <div className="min-h-screen bg-gradient-to-br from-bgLight-1 via-bgLight-2 to-bgLight-3">
      <section className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-br from-bgLight-1 via-bgLight-2 to-bgLight-3 overflow-hidden">
        {/* Premium space background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/20 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.08),transparent_50%)]" />
        {/* Star effects */}
        <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_50px_160px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_90px_40px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_130px_80px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_160px_120px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_25px_5px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_50px_23px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_125px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_50px_93px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_16px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_33px_43px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_83px_4px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_34px_66px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-30" />
        {/* Nebula effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-zen-purple/10 via-transparent to-zen-blue/10 opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.08),rgba(147,51,234,0.08),rgba(56,189,248,0.08))] opacity-25" />
        {/* Subtle border lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zen-purple/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zen-blue/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 text-[#0046ff]/90 text-sm font-medium tracking-widest uppercase mb-6 drop-shadow-sm">
              <div className="w-12 h-px bg-gradient-to-r from-bgDark-2/50 to-transparent"></div>
              <span>Get in Touch</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-bgDark-2/50"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-light text-[#0046ff] leading-tight tracking-tight mb-6 sm:mb-8 drop-shadow-lg px-4">
              {data.title}
            </h1>
            <div className="mb-8 sm:mb-12 px-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-3 bg-bgDark-2/20 border border-bgDark-2/50 px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-sm sm:text-base md:text-xl rounded-full font-semibold text-[#0046ff] shadow-xl hover:bg-bgDark-2/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 min-h-[44px] justify-center"
                style={{boxShadow: '0 4px 32px 0 rgba(0,70,201,0.25)'}}
              >
                <span className="text-center">Book a Session - Free Consultation Available</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-[#0046ff] group-hover:text-[#0033cc] transition-colors flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Information */}
            {(data.contactInfo.email || (data.contactInfo.address && data.contactInfo.address.street)) && (
              <AnimatedSection
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative bg-transparent self-start"
              >
                <div 
                  className="bg-gradient-to-br from-bgDark-1 via-bgDark-3 to-bgDark-2 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
                  style={{boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'}}
                >
                {/* Space background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/30 via-transparent to-transparent opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
                {/* Star effects */}
                <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_50px_160px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_90px_40px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_130px_80px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_160px_120px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-30" />
                <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_25px_5px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_50px_23px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_125px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_50px_93px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_16px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_33px_43px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_83px_4px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_34px_66px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-40" />
                {/* Nebula effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-zen-purple/10 via-transparent to-zen-blue/10 opacity-50 mix-blend-screen" />
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.1),rgba(147,51,234,0.1),rgba(56,189,248,0.1))] opacity-30" />
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-light text-[#0046ff] mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    {data.contactInfo.email && (
                      <div>
                        <h3 className="text-lg font-light mb-2 text-[#0046ff]">Email</h3>
                        <p className="text-[#0046ff]">{data.contactInfo.email}</p>
                      </div>
                    )}
                    {data.contactInfo.address && data.contactInfo.address.street && (
                      <div>
                        <h3 className="text-lg font-light mb-2 text-[#0046ff]">Location</h3>
                        <p className="text-[#0046ff]">
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
      </section>
    </div>
  )
} 