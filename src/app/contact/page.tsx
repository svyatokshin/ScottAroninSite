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
    <div className="min-h-screen">
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-6">{data.title}</h1>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            {(data.contactInfo.email || data.contactInfo.phone || data.contactInfo.address || (data.contactInfo.socialLinks && data.contactInfo.socialLinks.length > 0)) && (
              <AnimatedSection
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-light mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  {data.contactInfo.email && (
                    <div>
                      <h3 className="text-lg font-light mb-2">Email</h3>
                      <p className="text-gray-600">{data.contactInfo.email}</p>
                    </div>
                  )}
                  {data.contactInfo.phone && (
                    <div>
                      <h3 className="text-lg font-light mb-2">Phone</h3>
                      <p className="text-gray-600">{data.contactInfo.phone}</p>
                    </div>
                  )}
                  {data.contactInfo.address && data.contactInfo.address.street && (
                    <div>
                      <h3 className="text-lg font-light mb-2">Location</h3>
                      <p className="text-gray-600">
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
                      <h3 className="text-lg font-light mb-2">Social Media</h3>
                      <div className="flex gap-4">
                        {data.contactInfo.socialLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-600 hover:text-violet-700 transition-colors"
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
                    <h3 className="text-lg font-light mb-4">Business Hours</h3>
                    <div className="space-y-2">
                      {data.businessHours.map((hours, index) => (
                        <div key={index} className="flex justify-between text-gray-600">
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