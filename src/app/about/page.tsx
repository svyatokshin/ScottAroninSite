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
    <div className="min-h-screen bg-gradient-to-br from-[#87CEEB] via-[#5DADE2] to-[#3498DB]">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#87CEEB] via-[#5DADE2] to-[#3498DB] overflow-hidden">
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
            <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase mb-6 drop-shadow-sm">
              <div className="w-12 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
              <span>About Scott</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50"></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-white leading-tight tracking-tight mb-8 drop-shadow-lg">
              {data.title}
            </h1>
            <div className="mb-12">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-white/20 border border-white/50 px-12 py-4 text-xl rounded-full font-semibold text-white shadow-xl hover:bg-white/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60"
                style={{boxShadow: '0 4px 32px 0 rgba(255,255,255,0.25)'}}
              >
                Book a Session - Free Consultation Available
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white group-hover:text-white/80 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </AnimatedSection>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center mt-24">
            <AnimatedSection
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              {data.mainContent.heading && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase drop-shadow-sm">
                    <div className="w-6 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
                    <span>Personal Journey</span>
                    <div className="w-6 h-px bg-gradient-to-r from-transparent to-white/50"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light text-white leading-[1.1] tracking-tight drop-shadow-md">
                    {data.mainContent.heading}
                  </h2>
                </div>
              )}
              {data.mainContent.bio && (
                <div className="prose prose-xl max-w-none">
                  {data.mainContent.bio.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-xl leading-relaxed text-white/90 font-light mb-8 tracking-wide">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </AnimatedSection>
            <AnimatedSection
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group"
            >
              {data.mainContent.profileImage ? (
                <div className="relative w-full h-full">
                  <div className="absolute -inset-4 bg-gradient-to-r from-zen-blue/20 via-zen-purple/20 to-zen-yellow/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-zen-blue-light/10 to-zen-purple-light/10 p-1.5 h-full">
                    <Image
                      src={data.mainContent.profileImage.src}
                      alt={data.mainContent.profileImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl shadow-xl"
                      style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'}}
                      priority
                    />
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zen-blue-light to-zen-purple-light flex items-center justify-center rounded-3xl">
                  <div className="text-center text-white p-8">
                    <p className="text-xl font-light mb-4">Profile image placeholder</p>
                    <p className="text-sm opacity-80">Add your profile image to the static data</p>
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>

          {/* Mission Statement */}
          <div className="relative bg-gradient-to-br from-[#2E86AB] via-[#1B4F72] to-[#1A5490] rounded-3xl p-12 md:p-16 mb-32 overflow-hidden shadow-2xl border border-white/20 mt-24" style={{boxShadow: '0 20px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)'}}>
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
              className="prose prose-xl max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase mb-6 drop-shadow-sm">
                <div className="w-8 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
                <span>Additional Insights</span>
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/50"></div>
              </div>
              <p className="text-xl leading-relaxed text-white/90 font-light">{data.additionalContent}</p>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  )
} 