import { getServicesPage } from '@/sanity/queries'
import { ServicesPage } from '@/types/sanity'
import { urlFor } from '@/sanity/queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { AnimatedSection } from '@/components/animations/AnimatedSection'

async function getData(): Promise<ServicesPage> {
  return getServicesPage()
}

export default async function Services() {
  const data = await getData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-zen-blue-light/10 via-zen-purple-light/5 to-zen-yellow-light/10">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-zen-blue-dark animate-fade-in">
              {data.title}
            </h1>
            <div className="mb-12">
              <a
                href="/contact"
                className="inline-block bg-zen-blue-dark text-white px-8 py-3 rounded-lg font-light hover:bg-zen-blue-dark/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book a Session
              </a>
            </div>
          </AnimatedSection>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.servicesList.map((service, index) => (
              <AnimatedSection
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-zen-blue-dark to-zen-purple-dark rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-zen-purple/20 hover:border-zen-purple/40"
              >
                <div className="absolute inset-0 bg-zen-radial from-zen-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative z-10">
                  {service.icon && (
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src={urlFor(service.icon).url()}
                        alt={service.serviceTitle}
                        width={64}
                        height={64}
                        className="w-16 h-16 animate-float"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-light text-white mb-4 group-hover:text-zen-yellow-light transition-colors duration-300">
                    {service.serviceTitle}
                  </h3>
                  {service.description && (
                    <div className="prose prose-invert mb-6">
                      <PortableText value={service.description} />
                    </div>
                  )}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-zen-blue-light">
                          <span className="text-zen-yellow-light mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Call to Action */}
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <div className="relative bg-gradient-to-br from-zen-blue-dark to-zen-purple-dark rounded-3xl p-12 overflow-hidden">
              <div className="absolute inset-0 bg-zen-radial from-zen-purple/10 via-transparent to-transparent animate-zen-fade" />
              <div className="relative z-10">
                <h2 className="text-3xl font-light text-white mb-6">Ready to Begin Your Journey?</h2>
                <p className="text-zen-blue-light text-xl mb-8 font-light">
                  Take the first step towards holistic wellness and inner peace.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-white text-zen-blue-dark px-8 py-3 rounded-lg font-light hover:bg-zen-blue-light/10 transition-all duration-300 hover:scale-105"
                >
                  Book a Consultation
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
} 