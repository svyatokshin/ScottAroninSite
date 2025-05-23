'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { urlFor } from '@/sanity/queries';
import { HomePage } from '@/types/sanity';
import { PortableText } from '@portabletext/react';
import { FaArrowUp } from 'react-icons/fa';

interface HomePageClientProps {
  data: HomePage;
}

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

  console.log('wellnessPillarsImage', data.wellnessPillarsImage);
  
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
              src={urlFor(data.heroSection.heroImage).url()}
              alt="Hero background"
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
          >
            <Link 
              href={data.heroSection.ctaLink || "/contact"} 
              className="inline-flex items-center gap-3 bg-white/10 border border-zen-blue/70 px-12 py-4 text-xl rounded-full font-semibold text-zen-blue-light shadow-xl hover:bg-zen-blue/10 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zen-blue/60"
              style={{boxShadow: '0 4px 32px 0 rgba(56,189,248,0.15)'}}
              aria-label="Book a Session"
              tabIndex={0}
            >
              Book a Session
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

      {/* Title Section */}
      <motion.section 
        className="relative pt-12 pb-8 bg-gradient-to-br from-zen-blue-light/10 via-zen-purple-light/5 to-zen-yellow-light/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-zen-radial from-zen-purple/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-playfair font-light text-center text-zen-blue-dark mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="relative inline-block">
              {data.titleSection}
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-zen-blue-dark via-zen-purple to-zen-yellow-light" />
            </span>
          </motion.h2>
        </div>
      </motion.section>

      {/* Content Sections as Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            data.sectionOne && { ...data.sectionOne, key: 'sectionOne' },
            data.sectionTwo && { ...data.sectionTwo, key: 'sectionTwo' },
            data.sectionThree && { ...data.sectionThree, key: 'sectionThree' },
          ].filter(Boolean).map((section) => {
            const s = section as { image?: any; title: string; content: any; link?: string; key: string };
            return (
              <div
                key={s.key}
                className="group relative bg-gradient-to-br from-zen-blue-dark to-zen-purple-dark rounded-3xl p-8 shadow-2xl border border-zen-purple/20 hover:border-zen-purple/40 transition-all duration-500 hover:shadow-2xl hover:scale-[1.025]"
              >
                <div className="absolute inset-0 bg-zen-radial from-zen-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  {s.image && (
                    <Image
                      src={urlFor(s.image).url()}
                      alt={s.title}
                      width={128}
                      height={128}
                      className="w-32 h-32 mb-10 rounded-xl object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <h2 className="text-2xl font-playfair font-light text-white mb-4 mt-2">
                    {s.title}
                  </h2>
                  <div className="prose prose-invert text-zinc-200 font-light mb-6 max-w-none">
                    <PortableText value={s.content} />
                  </div>
                  <div className="flex flex-col items-center w-full mt-auto">
                    <Link
                      href="#"
                      onClick={e => { e.preventDefault(); handleOpenModal(s.key); }}
                      className="inline-block text-zen-yellow-light hover:text-white transition-colors text-lg font-light"
                      tabIndex={0}
                      aria-label={`More about ${s.title}`}
                    >
                      {s.key === 'sectionOne' && 'Explore Mind-Body Practices →'}
                      {s.key === 'sectionTwo' && 'Explore Physical Fitness →'}
                      {s.key === 'sectionThree' && 'Explore Nutrition & Wellness →'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wellness Pillars Section */}
      {data.wellnessPillars && data.wellnessPillars.length > 0 && (
        <section className="pt-32 pb-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative rounded-2xl overflow-hidden min-h-[600px] md:min-h-[800px]">
              <div className="absolute left-0 right-0 top-0 bg-zen-yellow-light/60" style={{ height: '120%' }} />
              <div className="relative z-10">
                <motion.h2 
                  className="text-5xl md:text-7xl font-playfair font-light text-center text-zen-blue-dark mb-16 mt-10 underline"
                  variants={fadeInUp}
                  initial="hidden"
                  animate={pillarsControls}
                  key="pillars-title"
                >
                  Pillars of Wellness
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  <div className="md:col-span-3 flex justify-center gap-20">
                    {data.wellnessPillars.slice(0, 3).map((pillar, index) => (
                      <motion.div
                        key={pillar._id}
                        className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-lg"
                        variants={fadeInUp}
                        initial="hidden"
                        animate={pillarsControls}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {pillar.icon && (
                          <div className="text-4xl mb-4">
                            <Image
                              src={urlFor(pillar.icon).url()}
                              alt={pillar.title}
                              width={48}
                              height={48}
                              className="inline-block"
                            />
                          </div>
                        )}
                        <h3 className="text-2xl font-playfair font-light text-zen-blue-dark mb-4">
                          {pillar.title}
                        </h3>
                        <p className="text-zen-purple-dark font-light">
                          {pillar.description}
                        </p>
                        {pillar.link && (
                          <Link
                            href={pillar.link}
                            className="inline-block mt-4 text-zen-blue-dark hover:text-zen-blue transition-colors"
                          >
                            Learn more →
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
          data.sectionOne && { ...data.sectionOne, key: 'sectionOne' },
          data.sectionTwo && { ...data.sectionTwo, key: 'sectionTwo' },
          data.sectionThree && { ...data.sectionThree, key: 'sectionThree' },
        ].filter(Boolean).find((s) => (s as any).key === openModalKey) as { image?: any; title: string; content: any; key: string } | undefined;
        if (!modalSection) return null;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            onClick={handleCloseModal}
          >
            <div
              className="bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative flex flex-col items-center text-center border border-zinc-700"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white text-2xl font-bold focus:outline-none"
                aria-label="Close modal"
              >
                ×
              </button>
              {modalSection.image && (
                <Image
                  src={urlFor(modalSection.image).url()}
                  alt={modalSection.title}
                  width={120}
                  height={120}
                  className="rounded-xl mb-6 object-cover w-28 h-28"
                />
              )}
              <h2 id="modal-title" className="text-2xl font-playfair font-light text-white mb-4 mt-2">
                {modalSection.title}
              </h2>
              <div className="prose prose-invert text-zinc-200 font-light mb-2 max-w-none">
                <PortableText value={modalSection.content} />
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
} 