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
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-6">{data.title}</h1>
          </AnimatedSection>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.servicesList.map((service, index) => (
              <AnimatedSection
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-800 hover:border-gray-700"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative z-10">
                  {service.icon && (
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src={urlFor(service.icon).url()}
                        alt={service.serviceTitle}
                        width={64}
                        height={64}
                        className="w-16 h-16"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-light text-white mb-4">{service.serviceTitle}</h3>
                  {service.description && (
                    <div className="prose prose-invert mb-6">
                      <PortableText value={service.description} />
                    </div>
                  )}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-gray-300">
                          <span className="text-violet-400 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 