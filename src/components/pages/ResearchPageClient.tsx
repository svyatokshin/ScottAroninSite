'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ResearchPage } from '@/types';
import { AnimatedSection } from '@/components/animations/AnimatedSection';

interface ResearchPageClientProps {
  data: ResearchPage;
}

export function ResearchPageClient({ data }: ResearchPageClientProps) {
  console.log('ResearchPageClient received data:', data);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    console.log('ResearchPageClient useEffect - data:', data);
    if (isInView) {
      controls.start('visible');
    }
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
    <div className="relative bg-gradient-to-br from-[#87CEEB] via-[#5DADE2] to-[#3498DB]">
      {/* Hero Section */}
      <motion.section 
        className="relative flex items-center justify-center min-h-[60vh] py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
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
        
        {data.heroSection.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={data.heroSection.heroImage.src}
              alt={data.heroSection.heroImage.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />
          </div>
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
            className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto font-light drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.heroSection.subheading}
          </motion.p>
        </div>
      </motion.section>

      {/* Research Sections */}
      <div className="container mx-auto px-4 py-32 space-y-28">
        {data.researchSections.map((section, index) => (
          <AnimatedSection
            key={section.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#2E86AB] via-[#1B4F72] to-[#1A5490] rounded-3xl p-10 md:p-14 shadow-2xl overflow-hidden border border-white/20" style={{boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'}}>
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
              
              {/* Category Badge */}
              <div className="absolute top-6 right-6 z-10">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white border border-white/40">
                  {section.category.charAt(0).toUpperCase() + section.category.slice(1)}
                </span>
              </div>

              {/* Section Title */}
              <h2 className="text-3xl md:text-4xl font-playfair font-light text-white mb-8 pr-32 relative z-10">
                {section.title}
              </h2>

              {/* Research Summary */}
              <div className="prose prose-lg max-w-none text-white/90 mb-12 relative z-10">
                <p className="text-lg leading-relaxed font-light">{section.summary}</p>
              </div>

              {/* Key Findings */}
              {section.keyFindings.length > 0 && (
                <div className="mb-12 relative z-10">
                  <h3 className="text-2xl font-playfair font-light text-white mb-6">
                    Key Findings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.keyFindings.map((finding, idx) => (
                      <div 
                        key={idx}
                        className="bg-[#2E86AB]/50 rounded-xl p-6 border border-zen-purple/30 backdrop-blur-sm"
                      >
                        <h4 className="text-lg font-medium text-white mb-3">
                          {finding.finding}
                        </h4>
                        <p className="text-white/80 mb-4 font-light">
                          {finding.description}
                        </p>
                        <p className="text-sm text-white/70">
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
                  <h3 className="text-2xl font-playfair font-light text-white mb-6">
                    Key Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {section.statistics.map((stat, idx) => (
                      <div 
                        key={idx}
                        className="text-center p-6 bg-gradient-to-br from-[#2E86AB]/50 to-[#1A5490]/50 rounded-xl border border-zen-purple/30 backdrop-blur-sm"
                      >
                        <div className="text-3xl font-light text-white mb-3">
                          {stat.statistic}
                        </div>
                        <p className="text-white/80 mb-2 font-light">
                          {stat.context}
                        </p>
                        <p className="text-sm text-white/70">
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
                  <h3 className="text-2xl font-playfair font-light text-white mb-6">
                    Visual Data
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.visualData.map((visual, idx) => (
                      <div key={idx} className="bg-[#2E86AB]/60 rounded-xl overflow-hidden shadow-lg border border-white/20 backdrop-blur-sm" style={{boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'}}>
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
                          <h4 className="text-xl font-medium text-white mb-3">
                            {visual.title}
                          </h4>
                          <p className="text-white/80 font-light">
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
                  <h3 className="text-2xl font-playfair font-light text-white mb-6">
                    Related Studies
                  </h3>
                  <div className="space-y-4">
                    {section.relatedStudies.map((study, idx) => (
              <a
                key={idx}
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-[#2E86AB]/60 rounded-xl border border-white/20 hover:bg-[#2E86AB]/80 transition-colors duration-300 backdrop-blur-sm"
                style={{boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'}}
              >
                        <h4 className="text-lg font-medium text-white mb-2">
                          {study.title}
                        </h4>
                        <p className="text-white/80 mb-2 font-light">
                          {study.authors} ({study.year})
                        </p>
                        <p className="text-sm text-white/70">
                          {study.journal}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
} 