import { getAboutPage } from '@/sanity/queries'
import { AboutPage } from '@/types/sanity'
import { urlFor } from '@/sanity/queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { AnimatedSection } from '@/components/animations/AnimatedSection'

async function getData(): Promise<AboutPage> {
  return getAboutPage()
}

export default async function About() {
  const data = await getData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-6">{data.title}</h1>
          </AnimatedSection>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <AnimatedSection
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              {data.mainContent.heading && (
                <h2 className="text-3xl font-light mb-6">{data.mainContent.heading}</h2>
              )}
              {data.mainContent.bio && (
                <div className="prose prose-lg">
                  <PortableText value={data.mainContent.bio} />
                </div>
              )}
            </AnimatedSection>
            {data.mainContent.profileImage && (
              <AnimatedSection
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative h-[500px] rounded-2xl overflow-hidden"
              >
                <Image
                  src={urlFor(data.mainContent.profileImage).url()}
                  alt={data.mainContent.heading || 'Profile'}
                  fill
                  className="object-cover"
                />
              </AnimatedSection>
            )}
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl p-12 mb-24">
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {data.missionStatement.heading && (
                <h2 className="text-3xl font-light text-white mb-8">{data.missionStatement.heading}</h2>
              )}
              {data.missionStatement.content && (
                <div className="prose prose-lg prose-invert max-w-3xl mx-auto">
                  <PortableText value={data.missionStatement.content} />
                </div>
              )}
            </AnimatedSection>
          </div>

          {/* Additional Content */}
          {data.additionalContent && (
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="prose prose-lg max-w-3xl mx-auto"
            >
              <PortableText value={data.additionalContent} />
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  )
} 