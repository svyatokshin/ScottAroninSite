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
    <div className="min-h-screen bg-gradient-to-br from-[#0F1B2D] via-[#1A2B42] to-[#2A3B52]">
      <section className="relative py-32 bg-gradient-to-br from-[#0F1B2D] via-[#1A2B42] to-[#2A3B52] overflow-hidden">
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
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <AnimatedSection 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 text-zen-blue-light/80 text-sm font-medium tracking-widest uppercase mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-zen-blue-light/50 to-transparent"></div>
              <span>Get in Touch</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-zen-blue-light/50"></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-white leading-tight tracking-tight mb-8">
              {data.title}
            </h1>
            <div className="mb-12">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-white/10 border border-zen-blue/70 px-12 py-4 text-xl rounded-full font-semibold text-zen-blue-light shadow-xl hover:bg-zen-blue/10 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zen-blue/60"
                style={{boxShadow: '0 4px 32px 0 rgba(56,189,248,0.15)'}}
              >
                Book a Session - Free Consultation Available
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-zen-blue-light group-hover:text-zen-blue transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            {(data.contactInfo.email || data.contactInfo.phone || data.contactInfo.address || (data.contactInfo.socialLinks && data.contactInfo.socialLinks.length > 0)) && (
              <AnimatedSection
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative bg-gradient-to-br from-[#0A1428] via-[#0F1B2D] to-[#1E0B3B] p-8 rounded-2xl shadow-2xl border border-zen-purple/20 overflow-hidden"
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
                  <h2 className="text-2xl font-light text-white mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    {data.contactInfo.email && (
                      <div>
                        <h3 className="text-lg font-light mb-2 text-zen-blue-light">Email</h3>
                        <p className="text-white/90">{data.contactInfo.email}</p>
                      </div>
                    )}
                    {data.contactInfo.phone && (
                      <div>
                        <h3 className="text-lg font-light mb-2 text-zen-blue-light">Phone</h3>
                        <p className="text-white/90">{data.contactInfo.phone}</p>
                      </div>
                    )}
                    {data.contactInfo.address && data.contactInfo.address.street && (
                      <div>
                        <h3 className="text-lg font-light mb-2 text-zen-blue-light">Location</h3>
                        <p className="text-white/90">
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
                    {data.contactInfo.socialLinks && data.contactInfo.socialLinks.length > 0 && (
                      <div>
                        <h3 className="text-lg font-light mb-2 text-zen-blue-light">Social Media</h3>
                        <div className="flex gap-4">
                          {data.contactInfo.socialLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-zen-blue-light hover:text-white transition-colors"
                            >
                              {link.platform}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Business Hours */}
                  {data.businessHours && data.businessHours.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-light mb-4 text-zen-blue-light">Business Hours</h3>
                      <div className="space-y-2">
                        {data.businessHours.map((hours, index) => (
                          <div key={index} className="flex justify-between text-white/90">
                            <span className="capitalize">{hours.day}</span>
                            <span>
                              {hours.isOpen ? (
                                <>
                                  {hours.openTime && hours.closeTime ? (
                                    `${hours.openTime} - ${hours.closeTime}`
                                  ) : hours.openTime ? (
                                    `Opens at ${hours.openTime}`
                                  ) : hours.closeTime ? (
                                    `Closes at ${hours.closeTime}`
                                  ) : (
                                    'Open'
                                  )}
                                </>
                              ) : (
                                'Closed'
                              )}
                              {hours.notes && ` (${hours.notes})`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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