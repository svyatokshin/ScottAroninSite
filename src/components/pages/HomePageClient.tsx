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
             <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40" />
             <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, rgba(255,215,102,0.10) 0%, rgba(0,0,0,0.0) 70%)'}} />
             {/* Seamless transition overlay for water-to-space blend */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#87CEEB]/80" />
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#87CEEB] via-[#87CEEB]/90 to-transparent" />
             <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#5DADE2] via-[#5DADE2]/80 to-transparent" />
             <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#3498DB] via-[#3498DB]/60 to-transparent" />
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
            <span className="inline-block uppercase tracking-[0.35em] text-white text-base md:text-lg font-medium bg-white/30 border border-white/40 rounded-full px-8 py-2 backdrop-blur-md shadow-md"
                  style={{letterSpacing: '0.25em', borderWidth: '1.5px', boxShadow: '0 2px 24px 0 rgba(255,255,255,0.20)'}}>
              Integrated Wellness Coaching
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
            Through <span className="bg-gradient-to-r from-[#87CEEB] via-[#5DADE2] to-[#3498DB] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(255,255,255,0.5)] font-semibold">Mind-Body Wellness</span>
          </motion.h1>
          {/* Subheading */}
          <motion.p 
            className="text-lg md:text-xl font-light text-white/95 mb-12 max-w-3xl mx-auto drop-shadow-lg tracking-wide"
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
              className="inline-flex items-center gap-3 bg-white/30 border border-white/50 px-12 py-4 text-xl rounded-full font-semibold text-white shadow-xl hover:bg-white/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60"
              style={{boxShadow: '0 4px 32px 0 rgba(255,255,255,0.25)'}}
              aria-label="Book a Session - Free Consultation Available"
              tabIndex={0}
            >
              Book a Session - Free Consultation Available
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white group-hover:text-white/80 transition-colors">
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
        className="fixed bottom-8 right-8 bg-[#0D47A1] text-white p-4 rounded-full shadow-lg hover:bg-[#1565C0] transition-colors duration-300 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>

             {/* About Section - Premium Design */}
               {data.aboutSection && (
          <motion.section
            className="pt-16 pb-32 bg-gradient-to-br from-[#87CEEB] via-[#5DADE2] to-[#3498DB] relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Top fade-in for seamless hero transition */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#87CEEB] via-[#87CEEB]/90 to-transparent" />
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
           
           <div className="container mx-auto px-4 relative z-10">
             <div className="max-w-7xl mx-auto">
                 <div className="relative bg-[#2E86AB]/90 backdrop-blur-sm rounded-[2rem] p-12 md:p-20 shadow-2xl overflow-hidden border border-white/20" style={{boxShadow: '0 20px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)'}}>
                 {/* Premium card background matching space theme */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#2E86AB] via-[#1B4F72]/95 to-[#1A5490]/90" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.12),transparent_40%)]" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.08),transparent_40%)]" />
                 
                 <div className="relative z-10 flex flex-col lg:flex-row items-start gap-16 lg:gap-20">
                   {data.aboutSection?.image && (
                     <div className="flex-shrink-0 w-full lg:w-2/5">
                       <div className="relative group">
                         <div className="absolute -inset-4 bg-gradient-to-r from-zen-blue/20 via-zen-purple/20 to-zen-yellow/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                         <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-zen-blue-light/10 to-zen-purple-light/10 p-1.5">
                           <Image
                             src={data.aboutSection.image.src}
                             alt={data.aboutSection.image.alt}
                             width={data.aboutSection.image.width || 600}
                             height={data.aboutSection.image.height || 600}
                             className="object-cover w-full h-full rounded-2xl group-hover:scale-105 transition-all duration-700 shadow-xl"
                       style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'}}
                             priority={false}
                           />
                         </div>
                       </div>
                     </div>
                   )}
                   
                   <div className="flex-1 space-y-8">
                     {data.aboutSection?.title && (
                       <div className="space-y-4">
                        <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase drop-shadow-sm">
                          <div className="w-8 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
                          <span>Integrated Wellness & Fitness</span>
                          <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/50"></div>
                        </div>
                         <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light text-white leading-tight tracking-tight drop-shadow-md">
                           {data.aboutSection.title}
                         </h2>
                       </div>
                     )}
                     
                     <div className="space-y-8">
                       {data.aboutSection?.content && typeof data.aboutSection.content === 'string' && (() => {
                         const content = data.aboutSection!.content;
                         const paragraphs = content.split('\n\n');
                         return (
                           <div className="prose prose-xl max-w-none">
                             <div className="text-lg md:text-xl leading-relaxed text-[#1565C0]/90 font-light">
                               {paragraphs.map((paragraph: string, index: number) => (
                                 <div key={index} className={`mb-8 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                   <p className={`leading-[1.9] tracking-wide max-w-none ${index === 0 ? 'text-2xl md:text-3xl font-light text-white/95' : 'text-lg md:text-xl text-white/85'}`}>
                                     {paragraph}
                                   </p>
                                   {index < paragraphs.length - 1 && (
                                     <div className={`mt-4 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} w-16 h-px bg-gradient-to-r ${index % 2 === 0 ? 'from-zen-blue/40 to-transparent' : 'from-transparent to-zen-blue/40'}`} />
                                   )}
                                 </div>
                               ))}
                             </div>
                           </div>
                         );
                       })()}
                     </div>
                     
                     {/* Premium call-to-action */}
                     <div className="pt-6">
                       <Link href="/contact" className="inline-flex items-center gap-4 text-white hover:text-white/80 transition-colors duration-300 group cursor-pointer">
                         <span className="text-lg font-light">Discover Your Path</span>
                         <div className="w-8 h-px bg-white/50 group-hover:w-12 transition-all duration-300"></div>
                         <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                         </svg>
                       </Link>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </motion.section>
       )}

             {/* Content Sections as Cards - Premium Dark Theme */}
       <motion.section
          className="py-32 bg-gradient-to-br from-[#87CEEB] via-[#5DADE2] to-[#3498DB] relative overflow-hidden"
         initial={{ opacity: 0, y: 40 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         viewport={{ once: true }}
       >
         {/* Premium space background effects */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/15 via-transparent to-transparent opacity-50" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.10),transparent_70%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.05),transparent_50%)]" />
         {/* Star effects */}
         <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_15px_20px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_30px_50px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_40px_100px,#fff,rgba(0,0,0,0))] bg-[length:150px_150px] opacity-15" />
         
         <div className="container mx-auto px-4 relative z-10">
           {data.cardSectionsTitle && (
             <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase mb-4 drop-shadow-sm">
                <div className="w-12 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
                <span>Transformative Journey</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50"></div>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-white leading-tight tracking-tight mb-6 drop-shadow-md">
                {data.cardSectionsTitle}
              </h2>
               <div className="w-24 h-px bg-gradient-to-r from-zen-purple/60 via-zen-blue/60 to-zen-yellow/60 mx-auto"></div>
             </div>
           )}
           
           <div className="relative max-w-6xl mx-auto">
             {/* Top Card - Centered */}
             {data.cardSectionOne && (
               <AnimatedSection
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 viewport={{ once: true }}
               >
                 <div 
                  className="group relative bg-gradient-to-br from-[#2E86AB] via-[#1B4F72] to-[#1A5490] rounded-3xl p-10 shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.15)] hover:scale-[1.02] max-w-2xl mx-auto mb-4 overflow-hidden cursor-pointer"
                  onClick={() => handleOpenModal('cardSectionOne')}
                  style={{boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'}}
                >
                 {/* Space background effects */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
                 {/* Star effects */}
                 <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_50px_160px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_90px_40px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_130px_80px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_160px_120px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-30" />
                 <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_25px_5px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_50px_23px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_125px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_50px_93px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_16px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_33px_43px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_83px_4px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_34px_66px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-40" />
                 {/* Nebula effect */}
                 <div className="absolute inset-0 bg-gradient-to-br from-zen-purple/10 via-transparent to-zen-blue/10 opacity-50 mix-blend-screen" />
                 <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.1),rgba(147,51,234,0.1),rgba(56,189,248,0.1))] opacity-30" />
                 
                 <div className="relative z-10 flex flex-col items-center text-center h-full">
                   {data.cardSectionOne.image && (
                     <div className="mb-6 transform group-hover:scale-105 transition-transform duration-500">
                       <Image
                         src={data.cardSectionOne.image.src}
                         alt={data.cardSectionOne.image.alt}
                         width={data.cardSectionOne.image.width || 144}
                         height={data.cardSectionOne.image.height || 144}
                         className="w-36 h-36 rounded-xl object-cover shadow-xl"
                      style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'}}
                       />
                     </div>
                   )}
                   <h2 className="text-2xl font-playfair font-light text-white mb-4">
                     {data.cardSectionOne.title}
                   </h2>
                   <div className="prose prose-lg prose-invert max-w-none text-white/90">
                     <p className="text-base leading-relaxed">{data.cardSectionOne.preview || data.cardSectionOne.content}</p>
                   </div>
                   <div className="mt-6">
                     <div className="inline-flex items-center gap-2 text-white group-hover:text-white/80 transition-colors text-lg font-light group-hover:gap-3">
                       Explore Mind-Body Work
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                       </svg>
                     </div>
                   </div>
                 </div>
                 </div>
               </AnimatedSection>
             )}

             {/* Bottom Row - Two Cards Forming Triangle Base */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-2">
               {[
                 data.cardSectionTwo && { ...data.cardSectionTwo, key: 'cardSectionTwo' },
                 data.cardSectionThree && { ...data.cardSectionThree, key: 'cardSectionThree' },
               ].filter(Boolean).map((section, index) => {
                 const s = section as { image?: any; title: string; content: any; preview?: string; link?: string; key: string };
                 return (
                   <AnimatedSection
                     key={s.key}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: (index + 1) * 0.2 }}
                     viewport={{ once: true }}
                   >
                     <div 
                      className="group relative bg-gradient-to-br from-[#2E86AB] via-[#1B4F72] to-[#1A5490] rounded-3xl p-10 shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.15)] hover:scale-[1.02] overflow-hidden cursor-pointer h-full flex flex-col"
                      onClick={() => handleOpenModal(s.key)}
                      style={{boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'}}
                    >
                     {/* Space background effects */}
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
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
                             className="w-36 h-36 rounded-xl object-cover shadow-xl"
                      style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'}}
                           />
                         </div>
                       )}
                       <h2 className="text-2xl font-playfair font-light text-white mb-4">
                         {s.title}
                       </h2>
                       <div className="prose prose-lg prose-invert max-w-none text-white/90 flex-grow flex items-center">
                         <p className="text-base leading-relaxed">{s.preview || s.content}</p>
                       </div>
                       <div className="mt-6">
                         <div className="inline-flex items-center gap-2 text-white group-hover:text-white/80 transition-colors text-lg font-light group-hover:gap-3">
                           {s.key === 'cardSectionTwo' && 'Explore Fitness & Conditioning'}
                           {s.key === 'cardSectionThree' && 'Explore Food & Nutrition'}
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                           </svg>
                         </div>
                       </div>
                     </div>
                     </div>
                   </AnimatedSection>
                 );
               })}
             </div>
           </div>
         </div>
       </motion.section>

             {/* Main Sections - Premium Dark Theme */}
        <div className="py-32 bg-gradient-to-br from-[#87CEEB] via-[#5DADE2] to-[#3498DB] relative overflow-hidden">
         {/* Premium space background effects */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/15 via-transparent to-transparent opacity-50" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.10),transparent_70%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.05),transparent_50%)]" />
         {/* Star effects */}
         <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_15px_20px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_30px_50px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_40px_100px,#fff,rgba(0,0,0,0))] bg-[length:150px_150px] opacity-15" />
         
         <div className="container mx-auto px-4 relative z-10 space-y-32">
           {data.mainSectionOne && (
             <motion.section
               className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24"
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
             >
               <div className="flex-1 space-y-8">
                 {data.mainSectionOne.title && (
                   <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase drop-shadow-sm">
                      <div className="w-6 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
                      <span>Holistic Wellness</span>
                      <div className="w-6 h-px bg-gradient-to-r from-transparent to-white/50"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light text-white leading-[1.1] tracking-tight drop-shadow-md">
                      {data.mainSectionOne.title}
                    </h2>
                   </div>
                 )}
                 <div className="prose prose-xl max-w-none">
                   <p className="text-xl leading-relaxed text-white/90 font-light tracking-wide">{data.mainSectionOne.content}</p>
                 </div>
                 <div className="mt-8">
                   <Link
                     href="/about"
                     className="inline-flex items-center gap-3 bg-white/20 border border-white/50 px-8 py-3 rounded-full font-semibold text-white shadow-xl hover:bg-white/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60"
                     style={{boxShadow: '0 4px 32px 0 rgba(255,255,255,0.25)'}}
                   >
                     Learn More About Me
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white group-hover:text-white/80 transition-colors">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                     </svg>
                   </Link>
                 </div>
               </div>
               <div className="flex-shrink-0 w-full lg:w-1/2">
                 <div className="relative group">
                   <div className="absolute -inset-4 bg-gradient-to-r from-zen-blue/20 via-zen-purple/20 to-zen-yellow/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                   <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-zen-blue-light/10 to-zen-purple-light/10 p-1.5">
                     {data.mainSectionOne.mediaType === 'video' && data.mainSectionOne.video?.url ? (
                       <div className="relative aspect-video">
                         <iframe
                           src={getYouTubeEmbedUrl(data.mainSectionOne.video.url)}
                           className="absolute inset-0 w-full h-full rounded-2xl"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                           title={data.mainSectionOne.title || 'Video content'}
                         />
                       </div>
                     ) : data.mainSectionOne.image ? (
                       <Image
                         src={data.mainSectionOne.image.src}
                         alt={data.mainSectionOne.image.alt}
                         width={600}
                         height={400}
                         className="object-cover w-full h-full rounded-2xl group-hover:scale-105 transition-all duration-700 shadow-xl"
                       style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'}}
                         priority={false}
                       />
                     ) : null}
                   </div>
                 </div>
               </div>
             </motion.section>
           )}

                   {data.mainSectionTwo && (
             <motion.section
               className="flex flex-col lg:flex-row-reverse items-center gap-20 lg:gap-24"
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
             >
               <div className="flex-1 space-y-8">
                 {data.mainSectionTwo.title && (
                   <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase drop-shadow-sm">
                      <div className="w-6 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
                      <span>Mind-Body Connection</span>
                      <div className="w-6 h-px bg-gradient-to-r from-transparent to-white/50"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light text-white leading-[1.1] tracking-tight drop-shadow-md">
                      {data.mainSectionTwo.title}
                    </h2>
                   </div>
                 )}
                 <div className="prose prose-xl max-w-none">
                   <div className="text-xl leading-relaxed text-white/90 font-light tracking-wide">
                     {typeof data.mainSectionTwo.content === 'string' ? data.mainSectionTwo.content.split('\n\n**The 5 Pillars:**\n\n')[0] : data.mainSectionTwo.content}
                   </div>
                   {typeof data.mainSectionTwo.content === 'string' && data.mainSectionTwo.content.includes('**The 5 Pillars:**') && (
                     <div className="mt-8">
                       <h3 className="text-2xl font-playfair font-light text-white mb-6">The 5 Pillars:</h3>
                       <ol className="text-xl leading-relaxed text-white/85 font-light space-y-3 list-decimal list-inside">
                         {data.mainSectionTwo.content.split('**The 5 Pillars:**\n\n')[1]?.split('\n').filter((item: string) => item.trim().match(/^\d+\./)).map((item: string, index: number) => (
                           <li key={index} className="ml-4">
                             {item.replace(/^\d+\.\s*/, '')}
                           </li>
                         ))}
                       </ol>
                     </div>
                   )}
                 </div>
                 <div className="mt-8">
                   <Link
                     href="/services#5-pillars-of-wellness"
                     className="inline-flex items-center gap-3 text-white hover:text-white/80 transition-colors text-lg font-light group"
                   >
                     <span>Learn More About the 5 Pillars</span>
                     <div className="w-8 h-px bg-zen-blue-light/50 group-hover:w-12 transition-all duration-300"></div>
                     <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                     </svg>
                   </Link>
                 </div>
               </div>
               <div className="flex-shrink-0 w-full lg:w-1/2">
                 <div className="relative group">
                   <div className="absolute -inset-4 bg-gradient-to-r from-zen-blue/20 via-zen-purple/20 to-zen-yellow/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                   <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-zen-blue-light/10 to-zen-purple-light/10 p-1.5">
                     {data.mainSectionTwo.mediaType === 'video' && data.mainSectionTwo.video?.url ? (
                       <div className="relative aspect-video">
                         <iframe
                           src={getYouTubeEmbedUrl(data.mainSectionTwo.video.url)}
                           className="absolute inset-0 w-full h-full rounded-2xl"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                           title={data.mainSectionTwo.title || 'Video content'}
                         />
                       </div>
                     ) : data.mainSectionTwo.image ? (
                       <Image
                         src={data.mainSectionTwo.image.src}
                         alt={data.mainSectionTwo.image.alt}
                         width={600}
                         height={400}
                         className="object-cover w-full h-full rounded-2xl group-hover:scale-105 transition-all duration-700 shadow-xl"
                       style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'}}
                         priority={false}
                       />
                     ) : null}
                   </div>
                 </div>
               </div>
             </motion.section>
           )}

           {data.mainSectionThree && (
             <motion.section
               className={`${data.mainSectionThree.image || (data.mainSectionThree.mediaType === 'video' && data.mainSectionThree.video?.url) ? 'flex flex-col lg:flex-row items-center gap-20 lg:gap-24' : 'max-w-4xl mx-auto text-center'}`}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
             >
               <div className={`${data.mainSectionThree.image || (data.mainSectionThree.mediaType === 'video' && data.mainSectionThree.video?.url) ? 'flex-1 space-y-8' : 'space-y-10'}`}>
                 {data.mainSectionThree.title && (
                   <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase drop-shadow-sm">
                      <div className="w-6 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
                      <span>Research & Evidence</span>
                      <div className="w-6 h-px bg-gradient-to-r from-transparent to-white/50"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light text-white leading-[1.1] tracking-tight drop-shadow-md">
                      {data.mainSectionThree.title}
                    </h2>
                   </div>
                 )}
                 <div className={`max-w-none ${data.mainSectionThree.image || (data.mainSectionThree.mediaType === 'video' && data.mainSectionThree.video?.url) ? '' : ''}`}>
                   {typeof data.mainSectionThree.content === 'string' ? (() => {
                     // Parse content into sections with better grouping
                     const lines = data.mainSectionThree.content.split('\n');
                     const sections: Array<{ type: 'header' | 'paragraph'; content: string }> = [];
                     let currentParagraph: string[] = [];
                     
                     lines.forEach((line) => {
                       const trimmedLine = line.trim();
                       const isHeader = trimmedLine.includes('🧠 NEUROPLASTICITY') || 
                                        trimmedLine.includes('🛡️ IMMUNE SYSTEM') || 
                                        trimmedLine.includes('❤️ STRESS RESPONSE') || 
                                        trimmedLine.includes('🧘 QIGONG');
                       
                       if (isHeader) {
                         // Save current paragraph if exists
                         if (currentParagraph.length > 0) {
                           sections.push({
                             type: 'paragraph',
                             content: currentParagraph.join(' ')
                           });
                           currentParagraph = [];
                         }
                         // Add header
                         sections.push({
                           type: 'header',
                           content: trimmedLine
                         });
                       } else if (trimmedLine) {
                         // Add to current paragraph
                         currentParagraph.push(trimmedLine);
                       } else if (currentParagraph.length > 0) {
                         // Empty line - end current paragraph
                         sections.push({
                           type: 'paragraph',
                           content: currentParagraph.join(' ')
                         });
                         currentParagraph = [];
                       }
                     });
                     
                     // Add last paragraph if exists
                     if (currentParagraph.length > 0) {
                       sections.push({
                         type: 'paragraph',
                         content: currentParagraph.join(' ')
                       });
                     }
                     
                     // Group sections by topic (header + following paragraphs)
                     const topics: Array<{ header: string; paragraphs: string[] }> = [];
                     let currentTopic: { header: string; paragraphs: string[] } | null = null;
                     
                     sections.forEach((section) => {
                       if (section.type === 'header') {
                         // Save previous topic if exists
                         if (currentTopic) {
                           topics.push(currentTopic);
                         }
                         // Start new topic
                         currentTopic = {
                           header: section.content,
                           paragraphs: []
                         };
                       } else if (currentTopic) {
                         currentTopic.paragraphs.push(section.content);
                       }
                     });
                     
                     // Add last topic if exists
                     if (currentTopic) {
                       topics.push(currentTopic);
                     }
                     
                     return (
                       <div className="space-y-8">
            {topics.map((topic, topicIndex) => (
            <div
              key={topicIndex}
              className="relative w-full bg-gradient-to-br from-[#2E86AB] via-[#1B4F72] to-[#1A5490] rounded-3xl p-10 md:p-14 shadow-2xl border border-white/20 overflow-hidden"
              style={{boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'}}
            >
                             {/* Space background effects */}
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.1),transparent_70%)]" />
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.08),transparent_50%)]" />
                             
                             <div className="relative z-10">
                               {/* Header */}
                               <h3 className="text-2xl md:text-3xl font-semibold text-white text-center mb-6 tracking-tight">
                                 {topic.header}
                               </h3>
                               
                               {/* Paragraphs */}
                               <div className="space-y-6">
                                 {topic.paragraphs.map((paragraph, pIndex) => (
                                   <p 
                                     key={pIndex} 
                                     className={`${data.mainSectionThree?.image || (data.mainSectionThree?.mediaType === 'video' && data.mainSectionThree?.video?.url) ? 'text-lg md:text-xl' : 'text-base md:text-lg'} leading-relaxed text-white/90 font-light max-w-4xl mx-auto`}
                                     style={{ lineHeight: '1.8' }}
                                   >
                                     {paragraph}
                                   </p>
                                 ))}
                               </div>
                             </div>
                           </div>
                         ))}
                       </div>
                     );
                   })() : (
                     <div className={`${data.mainSectionThree.image || (data.mainSectionThree.mediaType === 'video' && data.mainSectionThree.video?.url) ? 'text-xl leading-relaxed text-[#1565C0]/90 font-light' : 'text-lg leading-relaxed text-[#1565C0]/90 font-light whitespace-pre-line'}`}>
                       {data.mainSectionThree.content}
                     </div>
                   )}
                 </div>
                 <div className={`${data.mainSectionThree.image || (data.mainSectionThree.mediaType === 'video' && data.mainSectionThree.video?.url) ? 'mt-8' : 'mt-12'}`}>
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-3 bg-white/20 border border-white/50 px-8 py-4 text-lg rounded-full font-semibold text-white shadow-xl hover:bg-white/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60"
                    style={{boxShadow: '0 4px 32px 0 rgba(255,255,255,0.25)'}}
                    aria-label="View More Research Articles"
                    tabIndex={0}
                  >
                    More Research Articles
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white group-hover:text-white/80 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </Link>
                 </div>
               </div>
               {(data.mainSectionThree.image || (data.mainSectionThree.mediaType === 'video' && data.mainSectionThree.video?.url)) && (
                 <div className="flex-shrink-0 w-full lg:w-1/2">
                   <div className="relative group">
                     <div className="absolute -inset-4 bg-gradient-to-r from-zen-blue/20 via-zen-purple/20 to-zen-yellow/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-zen-blue-light/10 to-zen-purple-light/10 p-1.5">
                       {data.mainSectionThree.mediaType === 'video' && data.mainSectionThree.video?.url ? (
                         <div className="relative aspect-video">
                           <iframe
                             src={getYouTubeEmbedUrl(data.mainSectionThree.video.url)}
                             className="absolute inset-0 w-full h-full rounded-2xl"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen
                             title={data.mainSectionThree.title || 'Video content'}
                           />
                         </div>
                       ) : data.mainSectionThree.image ? (
                         <Image
                           src={data.mainSectionThree.image.src}
                           alt={data.mainSectionThree.image.alt}
                           width={600}
                           height={400}
                           className="object-cover w-full h-full rounded-2xl group-hover:scale-105 transition-all duration-700 shadow-xl"
                       style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'}}
                           priority={false}
                         />
                       ) : null}
                     </div>
                   </div>
                 </div>
               )}
             </motion.section>
           )}
         </div>
       </div>

             {/* Newsletter Section - Premium Dark Theme */}
       <section className="py-32 bg-gradient-to-br from-[#87CEEB] via-[#5DADE2] to-[#3498DB] relative overflow-hidden">
         {/* Premium space background effects */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/15 via-transparent to-transparent opacity-40" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.08),transparent_70%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
         {/* Star effects */}
         <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_10px_15px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_25px_40px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_35px_80px,#fff,rgba(0,0,0,0))] bg-[length:100px_100px] opacity-10" />
         
         <div className="container mx-auto px-4 relative z-10">
           <motion.div 
             className="max-w-3xl mx-auto text-center"
             variants={fadeInUp}
             initial="hidden"
             animate={newsletterControls}
             key="newsletter-content"
           >
            <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase mb-6 drop-shadow-sm">
              <div className="w-8 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
              <span>Community Connection</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/50"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-playfair font-light text-white leading-tight tracking-tight mb-8 drop-shadow-md">
              Stay Connected
            </h2>
            <p className="text-xl text-white/95 font-light mb-12 max-w-2xl mx-auto">
              Join our community and receive insights, tips, and updates on wellness practices.
            </p>
             <form className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <input
                 type="email"
                 placeholder="Enter your email"
                 className="px-8 py-4 rounded-full border border-white/50 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 font-light backdrop-blur-sm min-w-[300px]"
               />
               <button
                 type="submit"
                 className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white px-10 py-4 rounded-full hover:from-[#1565C0] hover:to-[#1976D2] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            onClick={handleCloseModal}
          >
                         <div
               className="bg-gradient-to-br from-[#2E86AB] via-[#1B4F72] to-[#1A5490] rounded-3xl shadow-2xl p-8 md:p-10 max-w-4xl w-full mx-6 md:mx-8 max-h-[90vh] overflow-y-auto relative flex flex-col items-center text-center border border-zen-purple/30 backdrop-blur-sm"
               onClick={e => e.stopPropagation()}
             >
               {/* Premium background effects */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.08),transparent_40%)]" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.05),transparent_40%)]" />
               
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 text-white hover:text-white/80 text-3xl font-bold focus:outline-none transition-colors z-10"
                aria-label="Close modal"
              >
                ×
              </button>
               {modalSection.image && (
                 <div className="relative mb-8 md:mb-10">
                   <div className="absolute -inset-2 bg-gradient-to-r from-zen-blue/20 via-zen-purple/20 to-zen-yellow/20 rounded-2xl blur-lg opacity-50" />
                   <Image
                     src={modalSection.image.src}
                     alt={modalSection.image.alt}
                     width={modalSection.image.width || 160}
                     height={modalSection.image.height || 160}
                     className="relative rounded-2xl object-cover w-32 h-32 md:w-48 md:h-48 border border-zen-purple/20"
                   />
                 </div>
               )}
               <h2 id="modal-title" className="text-3xl md:text-4xl font-playfair font-light text-white mb-6 md:mb-8 mt-2 relative z-10">
                 {modalSection.title}
               </h2>
               <div className="prose prose-lg md:prose-xl max-w-none relative z-10">
                 <p className="text-lg md:text-xl leading-relaxed text-white/90 font-light">{modalSection.content}</p>
               </div>
             </div>
          </div>
        );
      })()}
    </div>
  );
} 