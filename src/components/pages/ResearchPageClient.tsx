'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { urlFor } from '@/sanity/queries';
import { ResearchPage } from '@/types/sanity';
import { PortableText } from '@portabletext/react';
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
    <div className="relative">
      {/* Hero Section */}
      <motion.section 
        className="relative flex items-center justify-center min-h-[60vh] py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {data.heroSection.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(data.heroSection.heroImage).url()}
              alt="Research background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />
          </div>
        )}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-playfair font-light text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.heroSection.heading}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.heroSection.subheading}
          </motion.p>
        </div>
      </motion.section>

      {/* Research Sections */}
      <div className="container mx-auto px-4 py-16 space-y-24">
        {data.researchSections.map((section, index) => (
          <AnimatedSection
            key={section.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
              {/* Category Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-zen-blue-light/10 text-zen-blue-dark">
                  {section.category.charAt(0).toUpperCase() + section.category.slice(1)}
                </span>
              </div>

              {/* Section Title */}
              <h2 className="text-3xl md:text-4xl font-playfair font-light text-zen-blue-dark mb-8 pr-32">
                {section.title}
              </h2>

              {/* Research Summary */}
              <div className="prose prose-lg max-w-none text-zen-blue-dark/80 mb-12">
                <PortableText value={section.summary} />
              </div>

              {/* Key Findings */}
              {section.keyFindings.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-playfair font-light text-zen-blue-dark mb-6">
                    Key Findings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.keyFindings.map((finding, idx) => (
                      <div 
                        key={idx}
                        className="bg-zen-blue-light/5 rounded-xl p-6 border border-zen-blue-light/20"
                      >
                        <h4 className="text-lg font-medium text-zen-blue-dark mb-3">
                          {finding.finding}
                        </h4>
                        <p className="text-zen-blue-dark/70 mb-4">
                          {finding.description}
                        </p>
                        <p className="text-sm text-zen-blue-dark/50">
                          Source: {finding.source}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics */}
              {section.statistics.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-playfair font-light text-zen-blue-dark mb-6">
                    Key Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {section.statistics.map((stat, idx) => (
                      <div 
                        key={idx}
                        className="text-center p-6 bg-gradient-to-br from-zen-blue-light/10 to-zen-purple-light/10 rounded-xl"
                      >
                        <div className="text-3xl font-light text-zen-blue-dark mb-3">
                          {stat.statistic}
                        </div>
                        <p className="text-zen-blue-dark/70 mb-2">
                          {stat.context}
                        </p>
                        <p className="text-sm text-zen-blue-dark/50">
                          Source: {stat.source}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Data */}
              {section.visualData.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-playfair font-light text-zen-blue-dark mb-6">
                    Visual Data
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.visualData.map((visual, idx) => (
                      <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg">
                        {visual.image && (
                          <div className="relative aspect-video">
                            <Image
                              src={urlFor(visual.image).url()}
                              alt={visual.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h4 className="text-xl font-medium text-zen-blue-dark mb-3">
                            {visual.title}
                          </h4>
                          <p className="text-zen-blue-dark/70">
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
                <div>
                  <h3 className="text-2xl font-playfair font-light text-zen-blue-dark mb-6">
                    Related Studies
                  </h3>
                  <div className="space-y-4">
                    {section.relatedStudies.map((study, idx) => (
                      <a
                        key={idx}
                        href={study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-6 bg-zen-blue-light/5 rounded-xl border border-zen-blue-light/20 hover:bg-zen-blue-light/10 transition-colors duration-300"
                      >
                        <h4 className="text-lg font-medium text-zen-blue-dark mb-2">
                          {study.title}
                        </h4>
                        <p className="text-zen-blue-dark/70 mb-2">
                          {study.authors} ({study.year})
                        </p>
                        <p className="text-sm text-zen-blue-dark/50">
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