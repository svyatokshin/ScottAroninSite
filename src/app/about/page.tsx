import { AboutPage } from '@/types'
import { aboutPageData } from '@/data/static-content'
import Image from 'next/image'
import { AnimatedSection } from '@/components/animations/AnimatedSection'

/**
 * About page component - now using static data instead of Sanity CMS
 * @returns JSX element for the about page
 */
export default function About() {
  const data = aboutPageData

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
                  <p className="text-lg leading-relaxed">{data.mainContent.bio}</p>
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
                    src={data.mainContent.profileImage.src}
                    alt={data.mainContent.profileImage.alt}
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
                    <p className="text-xl font-light mb-4">Profile image placeholder</p>
                    <p className="text-sm opacity-80">Add your profile image to the static data</p>
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
                  <p className="text-lg leading-relaxed">{data.missionStatement.content}</p>
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
              <p className="text-lg leading-relaxed">{data.additionalContent}</p>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  )
} 