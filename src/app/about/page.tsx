import { getAboutPage } from '@/sanity/queries'
import { AboutPage } from '@/types/sanity'
import { urlFor } from '@/sanity/queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import scottImage from '@/assets/Scott2.jpg'

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
            <div className="mb-12">
              <a
                href="/contact"
                className="inline-block bg-zen-blue-dark text-white px-8 py-3 rounded-lg font-light hover:bg-zen-blue-dark/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book a Session - Free Consultation Available
              </a>
            </div>
          </AnimatedSection>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
              <div className="relative w-full h-full">
                <Image
                  src={scottImage}
                  alt="Scott Aronin"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-zen-blue-light/20 to-zen-purple-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </AnimatedSection>
          </div>

          {/* Mission Statement */}
          <div className="relative bg-gradient-to-br from-[#050A14] via-[#0F1B2D] to-[#1E0B3B] rounded-3xl p-12 mb-24 overflow-hidden shadow-2xl border border-zen-purple/20 mt-20">
            {/* Space background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
            {/* Star effects */}
            <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_50px_160px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_90px_40px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_130px_80px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_160px_120px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_25px_5px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_50px_23px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_125px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_50px_93px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_16px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_33px_43px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_83px_4px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_34px_66px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-40" />
            {/* Nebula effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-zen-purple/10 via-transparent to-zen-blue/10 opacity-50 mix-blend-screen" />
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.1),rgba(147,51,234,0.1),rgba(56,189,248,0.1))] opacity-30" />
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