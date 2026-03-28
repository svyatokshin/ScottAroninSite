'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { ResearchPage } from '@/types';
import { AnimatedSection } from '@/components/animations/AnimatedSection';

interface ResearchPageClientProps {
  data: ResearchPage;
}

export function ResearchPageClient({ data }: ResearchPageClientProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const [heroHeight, setHeroHeight] = useState(600);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
    
    // Set hero height based on viewport
    const updateHeight = () => {
      setHeroHeight(Math.max(window.innerHeight * 0.7, 600));
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [controls, isInView, data]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: heroHeight }}
        key="hero-section"
      >
        {data.heroSection.heroImage && (
          <motion.div 
            className="absolute inset-0 z-0"
            style={{
              y: useTransform(scrollY, [0, 300], [0, 100]),
              scale: useTransform(scrollY, [0, 300], [1, 1.1])
            }}
          >
            <Image
              src={data.heroSection.heroImage.src}
              alt={data.heroSection.heroImage.alt}
              fill
              className="object-cover"
              priority
            />
            {/* Luxury overlay: dark vignette + gold gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40" />
            <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, rgba(255,215,102,0.10) 0%, rgba(0,0,0,0.0) 70%)'}} />
            {/* Seamless transition overlay for water-to-space blend */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bgLight-4/90" />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bgLight-4 via-bgLight-4/95 via-bgLight-4/80 via-bgLight-3/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bgLight-3 via-bgLight-3/90 via-bgLight-3/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bgLight-2 via-bgLight-2/80 to-transparent" />
          </motion.div>
        )}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-playfair font-light text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.heroSection.heading}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white max-w-3xl mx-auto font-light drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.heroSection.subheading}
          </motion.p>
        </div>
      </motion.section>

      {/* Research Sections - Light Blue Background */}
      <motion.section 
        className="pt-24 pb-24 -mb-16 relative overflow-hidden z-10"
        style={{background: 'linear-gradient(to bottom right, #AEDEFC, #AFDDFF, #BBE9FF)'}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Bottom fade-out - Blue to White - Extended and smoother - Blends with footer - starts later */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/95 via-white/85 via-white/75 via-white/65 via-white/55 via-bgNeutral-eggshell/50 via-bgNeutral-cream/40 via-bgLight-3/30 via-bgLight-4/60 via-bgLight-4/80 via-bgLight-3/95 to-transparent z-0 pointer-events-none" />
        {/* Premium space background effects - starting below transition area */}
        <div className="absolute top-0 inset-x-0 bottom-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/15 via-transparent to-transparent opacity-50" />
        <div className="absolute top-0 inset-x-0 bottom-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.10),transparent_70%)]" />
        <div className="absolute top-0 inset-x-0 bottom-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-32 space-y-28 relative z-20">
        {data.researchSections.map((section, index) => (
          <AnimatedSection
            key={section.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl p-10 md:p-14 shadow-2xl overflow-hidden border border-gray-200/50" style={{boxShadow: '0 10px 40px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)'}}>
              {/* Subtle background effects for white cards */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,70,201,0.03),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,0,0,0.02),transparent_50%)]" />
              
              {/* Category Badge */}
              <div className="absolute top-6 right-6 z-10">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-bgDark-2/20 text-black border border-bgDark-2/50">
                  {section.category.charAt(0).toUpperCase() + section.category.slice(1)}
                </span>
              </div>

              {/* Section Title */}
              <h2 className="text-3xl md:text-4xl font-playfair font-light text-black mb-8 pr-32 relative z-10">
                {section.title}
              </h2>

              {/* Research Summary */}
              <div className="prose prose-lg max-w-none text-black mb-12 relative z-10">
                <p className="text-lg leading-relaxed font-light">{section.summary}</p>
              </div>

              {/* Key Findings */}
              {section.keyFindings.length > 0 && (
                <div className="mb-12 relative z-10">
                  <h3 className="text-2xl font-playfair font-light text-black mb-6">
                    Key Findings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.keyFindings.map((finding, idx) => (
                      <div 
                        key={idx}
                        className="rounded-xl p-6 border border-bgDark-2/20 shadow-lg"
                        style={{background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)', boxShadow: '0 10px 40px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)'}}
                      >
                        <h4 className="text-lg font-medium text-black mb-3">
                          {finding.finding}
                        </h4>
                        <p className="text-black mb-4 font-light">
                          {finding.description}
                        </p>
                        <p className="text-sm text-black">
                          Source: {finding.source}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics */}
              {section.statistics.length > 0 && (
                <div className="mb-12 relative z-10">
                  <h3 className="text-2xl font-playfair font-light text-black mb-6">
                    Key Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {section.statistics.map((stat, idx) => (
                      <div 
                        key={idx}
                        className="text-center p-6 rounded-xl border border-bgDark-2/20 shadow-lg"
                        style={{background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)', boxShadow: '0 10px 40px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)'}}
                      >
                        <div className="text-3xl font-light text-black mb-3">
                          {stat.statistic}
                        </div>
                        <p className="text-black mb-2 font-light">
                          {stat.context}
                        </p>
                        <p className="text-sm text-black">
                          Source: {stat.source}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Data */}
              {section.visualData && section.visualData.length > 0 && (
                <div className="mb-12 relative z-10">
                  <h3 className="text-2xl font-playfair font-light text-black mb-6">
                    Visual Data
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.visualData.map((visual, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden shadow-lg border border-bgDark-2/20" style={{background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)', boxShadow: '0 10px 40px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)'}}>
                        {visual.image && (
                          <div className="relative aspect-video">
                            <Image
                              src={visual.image.src}
                              alt={visual.image.alt || visual.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h4 className="text-xl font-medium text-black mb-3">
                            {visual.title}
                          </h4>
                          <p className="text-black font-light">
                            {visual.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Studies */}
              {section.relatedStudies.length > 0 && (
                <div className="relative z-10">
                  <h3 className="text-2xl font-playfair font-light text-black mb-6">
                    Related Studies
                  </h3>
                  <div className="space-y-4">
                    {section.relatedStudies.map((study, idx) => {
                      const hasLink = study.url && study.url !== '#';
                      const Wrapper = hasLink ? 'a' : 'div';
                      const linkProps = hasLink
                        ? {
                            href: study.url,
                            target: '_blank' as const,
                            rel: 'noopener noreferrer',
                          }
                        : {};
                      return (
                        <Wrapper
                          key={idx}
                          {...linkProps}
                          className={`block p-6 rounded-xl border border-bgDark-2/20 transition-all duration-300 ${hasLink ? 'hover:scale-[1.02] cursor-pointer group' : ''}`}
                          style={{background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)', boxShadow: '0 10px 40px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)'}}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-black mb-2">
                                {study.title}
                              </h4>
                              <p className="text-black mb-2 font-light">
                                {study.authors} ({study.year})
                              </p>
                              <p className="text-sm text-black">
                                {study.journal}
                              </p>
                            </div>
                            {hasLink && (
                              <svg
                                className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )}
                          </div>
                        </Wrapper>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
      
        {/* CTA Button within Light Blue Section */}
        <div className="text-center relative z-20">
        <a
          href="/book"
            className="inline-flex items-center gap-3 border border-bgDark-2/50 px-8 py-3 rounded-full font-semibold text-black shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 bg-white"
            style={{boxShadow: '0 4px 32px 0 rgba(0,70,201,0.25)'}}
        >
          Book a Session - Free Consultation Available
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-black group-hover:text-gray-700 transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
        </div>
      </motion.section>
    </div>
  );
} 