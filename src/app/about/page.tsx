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
          </AnimatedSection>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <AnimatedSection
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {data.mainContent.heading && (
                <h2 className="text-3xl font-light mb-6 text-zen-blue-dark">{data.mainContent.heading}</h2>
              )}
              {data.mainContent.bio && (
                <div className="prose prose-lg text-zen-blue-dark/80">
                  <PortableText value={data.mainContent.bio} />
                </div>
              )}
            </AnimatedSection>
            <AnimatedSection
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {data.mainContent.profileImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={urlFor(data.mainContent.profileImage).url()}
                    alt={data.mainContent.heading || 'Profile'}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-zen-blue-light/20 to-zen-purple-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zen-blue-light to-zen-purple-light flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <p className="text-xl font-light mb-4">Add your profile image in Sanity Studio</p>
                    <p className="text-sm opacity-80">Recommended size: 800x1000px</p>
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>

          {/* Mission Statement */}
          <div className="relative bg-gradient-to-br from-zen-blue-dark to-zen-purple-dark rounded-3xl p-12 mb-24 overflow-hidden">
            <div className="absolute inset-0 bg-zen-radial from-zen-purple/10 via-transparent to-transparent animate-zen-fade" />
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10 text-center"
            >
              {data.missionStatement.heading && (
                <h2 className="text-3xl font-light text-white mb-8">{data.missionStatement.heading}</h2>
              )}
              {data.missionStatement.content && (
                <div className="prose prose-lg prose-invert max-w-3xl mx-auto text-white">
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
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-3xl mx-auto text-zen-blue-dark/80"
            >
              <PortableText value={data.additionalContent} />
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  )
} 