'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { HomePage } from '@/types';
import { FaArrowUp } from 'react-icons/fa';
import { AnimatedSection } from '@/components/animations/AnimatedSection';

interface HomePageClientProps {
  data: HomePage;
}

/**
 * Client-side home page component with animations and interactivity
 * @param data - Static home page data
 * @returns JSX element for the interactive home page
 */
export function HomePageClient({ data }: HomePageClientProps) {
  const controls = useAnimation();
  const sectionOneControls = useAnimation();
  const sectionTwoControls = useAnimation();
  const sectionThreeControls = useAnimation();
  const pillarsControls = useAnimation();
  const newsletterControls = useAnimation();
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroHeight = useTransform(scrollY, [0, 300], ['100vh', '60vh']);
  const [openModalKey, setOpenModalKey] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      const scrollPosition = window.scrollY;
      
      // Trigger animations at different scroll positions
      if (scrollPosition > 100) {
        sectionOneControls.start('visible');
      }
      if (scrollPosition > 300) {
        sectionTwoControls.start('visible');
      }
      if (scrollPosition > 500) {
        sectionThreeControls.start('visible');
      }
      if (scrollPosition > 700) {
        pillarsControls.start('visible');
      }
      if (scrollPosition > 900) {
        newsletterControls.start('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionOneControls, sectionTwoControls, sectionThreeControls, pillarsControls, newsletterControls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handleOpenModal = (key: string) => setOpenModalKey(key);
  const handleCloseModal = () => setOpenModalKey(null);

  // Trap focus and close on Escape
  useEffect(() => {
    if (!openModalKey) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleCloseModal();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openModalKey]);

  // Add helper function for YouTube embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : '';
  };

  return (
    <div className="relative">
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />
            <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, rgba(255,215,102,0.10) 0%, rgba(0,0,0,0.0) 70%)'}} />
          </motion.div>
        )}
        <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center h-full">
          {/* Subtitle */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <span className="inline-block uppercase tracking-[0.35em] text-white/90 text-base md:text-lg font-medium bg-white/10 border border-zen-blue/60 rounded-full px-8 py-2 backdrop-blur-md shadow-md"
                  style={{letterSpacing: '0.25em', borderWidth: '1.5px', boxShadow: '0 2px 24px 0 rgba(56,189,248,0.10)'}}>
              Holistic Wellness Coaching
            </span>
          </motion.div>
          {/* Main Headline */}
          <motion.h1 
            className="text-[2.8rem] md:text-[5.5rem] leading-[1.05] font-playfair font-semibold text-white mb-8 drop-shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ y: useTransform(scrollY, [0, 300], [0, -60]) }}
            key="hero-heading"
          >
            Transform Your Life<br className="hidden md:block" />
            Through <span className="bg-gradient-to-r from-zen-blue via-zen-blue-dark to-zen-blue-light bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(56,189,248,0.25)] font-semibold">Mind-Body Wellness</span>
          </motion.h1>
          {/* Subheading */}
          <motion.p 
            className="text-lg md:text-xl font-light text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg tracking-wide"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ y: useTransform(scrollY, [0, 300], [0, -30]) }}
            key="hero-subheading"
          >
            Experience personalized wellness coaching that harmonizes mind, body, and spirit for lasting transformation.
          </motion.p>
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ y: useTransform(scrollY, [0, 300], [0, -20]) }}
            key="hero-cta"
            className="flex flex-col items-center gap-3"
          >
            <Link 
              href={data.heroSection.ctaLink || "/contact"} 
              className="inline-flex items-center gap-3 bg-white/10 border border-zen-blue/70 px-12 py-4 text-xl rounded-full font-semibold text-zen-blue-light shadow-xl hover:bg-zen-blue/10 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zen-blue/60"
              style={{boxShadow: '0 4px 32px 0 rgba(56,189,248,0.15)'}}
              aria-label="Book a Session - Free Consultation Available"
              tabIndex={0}
            >
              Book a Session - Free Consultation Available
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-zen-blue-light group-hover:text-zen-blue transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Scroll to Top Button */}
      <motion.button
        key="scroll-top-button"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-zen-blue-dark text-white p-4 rounded-full shadow-lg hover:bg-zen-blue transition-colors duration-300 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>

      {/* About Section */}
      {data.aboutSection && (
        <motion.section
          className="py-20 bg-gradient-to-br from-zen-blue-light/10 via-zen-purple-light/5 to-zen-yellow-light/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-zen-radial from-zen-purple/5 via-transparent to-transparent opacity-50" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                {data.aboutSection?.image && (
                  <div className="flex-shrink-0 w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg bg-zinc-100 group">
                    <Image
                      src={data.aboutSection.image.src}
                      alt={data.aboutSection.image.alt}
                      width={data.aboutSection.image.width || 600}
                      height={data.aboutSection.image.height || 600}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      priority={false}
                    />
                  </div>
                )}
                <div className="flex-1">
                  {data.aboutSection.title && (
                    <h2 className="text-3xl md:text-4xl font-playfair font-light text-zen-blue-dark mb-6">
                      {data.aboutSection.title}
                    </h2>
                  )}
                  <div className="prose prose-lg max-w-none text-zen-blue-dark/80">
                    {data.aboutSection?.content && (
                      <p className="text-lg leading-relaxed">{data.aboutSection.content}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Content Sections as Cards */}
      <motion.section
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {data.cardSectionsTitle && (
          <h2 className="text-4xl font-playfair font-light text-center text-zen-blue-dark mb-16">
            {data.cardSectionsTitle}
          </h2>
        )}
        <div className="relative max-w-6xl mx-auto">
          {/* Top Card - Centered */}
          {data.cardSectionOne && (
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-[#050A14] via-[#0F1B2D] to-[#1E0B3B] rounded-[2rem] p-10 md:p-12 shadow-2xl border border-zen-purple/20 hover:border-zen-purple/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(56,189,248,0.2)] hover:scale-[1.01] max-w-2xl mx-auto mb-[-2rem] z-10 overflow-hidden"
            >
              {/* Space background effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
              {/* Star effects */}
              <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_50px_160px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_90px_40px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_130px_80px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_160px_120px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-30" />
              <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_25px_5px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_50px_23px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_125px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_50px_93px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_16px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_33px_43px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_83px_4px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_34px_66px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-40" />
              {/* Nebula effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-zen-purple/10 via-transparent to-zen-blue/10 opacity-50 mix-blend-screen" />
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.1),rgba(147,51,234,0.1),rgba(56,189,248,0.1))] opacity-30" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 text-center md:text-left">
                {data.cardSectionOne.image && (
                  <div className="flex-shrink-0 transform group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={data.cardSectionOne.image.src}
                      alt={data.cardSectionOne.image.alt}
                      width={data.cardSectionOne.image.width || 128}
                      height={data.cardSectionOne.image.height || 128}
                      className="w-32 h-32 mb-10 rounded-xl object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-playfair font-light text-white mb-4 mt-2">
                    {data.cardSectionOne.title}
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none text-white">
                    <p className="text-base leading-relaxed">{data.cardSectionOne.content}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-playfair font-light text-white mb-6">
                    {data.cardSectionOne.title}
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none text-white/90">
                    {data.cardSectionOne.content && (
                      <p className="text-base leading-relaxed">{data.cardSectionOne.content}</p>
                    )}
                  </div>
                  <div className="mt-8">
                    <Link
                      href="#"
                      onClick={e => { e.preventDefault(); handleOpenModal('cardSectionOne'); }}
                      className="inline-flex items-center gap-2 text-zen-yellow-light hover:text-white transition-colors text-lg font-light group-hover:gap-3"
                      tabIndex={0}
                      aria-label={`More about ${data.cardSectionOne.title}`}
                    >
                      Explore Mind-Body Practices
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Bottom Row - Two Cards Forming Triangle Base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-16">
            {[
              data.cardSectionTwo && { ...data.cardSectionTwo, key: 'cardSectionTwo' },
              data.cardSectionThree && { ...data.cardSectionThree, key: 'cardSectionThree' },
            ].filter(Boolean).map((section, index) => {
              const s = section as { image?: any; title: string; content: any; link?: string; key: string };
              return (
                <AnimatedSection
                  key={s.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: (index + 1) * 0.2 }}
                  viewport={{ once: true }}
                  className={`group relative bg-gradient-to-br from-[#050A14] via-[#0F1B2D] to-[#1E0B3B] rounded-2xl p-8 shadow-xl border border-zen-purple/20 hover:border-zen-purple/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(56,189,248,0.2)] hover:scale-[1.01] overflow-hidden ${
                    index === 0 ? 'md:translate-x-8' : 'md:-translate-x-8'
                  }`}
                >
                  {/* Space background effects */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
                  {/* Star effects */}
                  <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_50px_160px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_90px_40px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_130px_80px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_160px_120px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-30" />
                  <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_25px_5px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_50px_23px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_125px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_50px_93px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_16px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_33px_43px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_83px_4px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_34px_66px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-40" />
                  {/* Nebula effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zen-purple/10 via-transparent to-zen-blue/10 opacity-50 mix-blend-screen" />
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.1),rgba(147,51,234,0.1),rgba(56,189,248,0.1))] opacity-30" />
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {s.image && (
                      <div className="mb-6 transform group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src={s.image.src}
                          alt={s.image.alt || s.title}
                          width={s.image.width || 144}
                          height={s.image.height || 144}
                          className="w-36 h-36 rounded-xl object-cover shadow-md"
                        />
                      </div>
                    )}
                    <h2 className="text-2xl font-playfair font-light text-white mb-4">
                      {s.title}
                    </h2>
                    <div className="prose prose-lg prose-invert max-w-none text-white/90">
                      <p className="text-base leading-relaxed">{s.content}</p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="#"
                        onClick={e => { e.preventDefault(); handleOpenModal(s.key); }}
                        className="inline-flex items-center gap-2 text-zen-yellow-light hover:text-white transition-colors text-lg font-light group-hover:gap-3"
                        tabIndex={0}
                        aria-label={`More about ${s.title}`}
                      >
                        {s.key === 'cardSectionTwo' && 'Explore Physical Fitness'}
                        {s.key === 'cardSectionThree' && 'Explore Nutrition & Wellness'}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Main Sections */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {data.mainSectionOne && (
          <motion.section
            className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              {data.mainSectionOne.title && (
                <h2 className="text-3xl font-playfair font-light text-zen-blue-dark mb-6">
                  {data.mainSectionOne.title}
                </h2>
              )}
              <div className="prose prose-lg max-w-none text-zen-blue-dark">
                <p className="text-lg leading-relaxed">{data.mainSectionOne.content}</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl bg-zinc-100">
              {data.mainSectionOne.mediaType === 'video' && data.mainSectionOne.video?.url ? (
                <div className="relative aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(data.mainSectionOne.video.url)}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={data.mainSectionOne.title || 'Video content'}
                  />
                </div>
              ) : data.mainSectionOne.image ? (
                <div className="relative aspect-video">
                  <Image
                    src={data.mainSectionOne.image.src}
                    alt={data.mainSectionOne.image.alt}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
              ) : null}
            </div>
          </motion.section>
        )}

        {data.mainSectionTwo && (
          <motion.section
            className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              {data.mainSectionTwo.title && (
                <h2 className="text-3xl font-playfair font-light text-zen-blue-dark mb-6">
                  {data.mainSectionTwo.title}
                </h2>
              )}
              <div className="prose prose-lg max-w-none text-zen-blue-dark">
                <p className="text-lg leading-relaxed">{data.mainSectionTwo.content}</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl bg-zinc-100">
              {data.mainSectionTwo.mediaType === 'video' && data.mainSectionTwo.video?.url ? (
                <div className="relative aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(data.mainSectionTwo.video.url)}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={data.mainSectionTwo.title || 'Video content'}
                  />
                </div>
              ) : data.mainSectionTwo.image ? (
                <div className="relative aspect-video">
                  <Image
                    src={data.mainSectionTwo.image.src}
                    alt={data.mainSectionTwo.image.alt}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
              ) : null}
            </div>
          </motion.section>
        )}


      </div>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={fadeInUp}
            initial="hidden"
            animate={newsletterControls}
            key="newsletter-content"
          >
            <h2 className="text-4xl font-playfair font-light text-zen-blue-dark mb-6">
              Stay Connected
            </h2>
            <p className="text-lg text-zen-purple-dark font-light mb-8">
              Join our community and receive insights, tips, and updates on wellness practices.
            </p>
            <form className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-full border border-zen-blue-light focus:outline-none focus:ring-2 focus:ring-zen-blue font-light"
              />
              <button
                type="submit"
                className="bg-zen-blue-dark text-white px-8 py-3 rounded-full hover:bg-zen-blue transition-colors duration-300 font-light"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Modal for card details */}
      {openModalKey && (() => {
        const modalSection = [
          data.cardSectionOne && { ...data.cardSectionOne, key: 'cardSectionOne' },
          data.cardSectionTwo && { ...data.cardSectionTwo, key: 'cardSectionTwo' },
          data.cardSectionThree && { ...data.cardSectionThree, key: 'cardSectionThree' },
        ].filter(Boolean).find((s) => (s as any).key === openModalKey) as { image?: any; title: string; content: any; key: string } | undefined;
        if (!modalSection) return null;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-4 relative flex flex-col items-center text-center border border-zinc-200"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 text-2xl font-bold focus:outline-none transition-colors"
                aria-label="Close modal"
              >
                ×
              </button>
              {modalSection.image && (
                <Image
                  src={modalSection.image.src}
                  alt={modalSection.image.alt}
                  width={modalSection.image.width || 160}
                  height={modalSection.image.height || 160}
                  className="rounded-xl mb-8 object-cover w-40 h-40"
                />
              )}
              <h2 id="modal-title" className="text-3xl font-playfair font-light text-zen-blue-dark mb-6 mt-2">
                {modalSection.title}
              </h2>
              <div className="prose prose-lg max-w-none text-zen-blue-dark">
                <p className="text-lg leading-relaxed">{modalSection.content}</p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
} 