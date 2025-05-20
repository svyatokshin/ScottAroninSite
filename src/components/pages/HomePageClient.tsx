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

  return (
    <div className="relative">
      {/* Hero Section */}
      <motion.section 
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: heroHeight }}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
          </motion.div>
        )}
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-playfair font-light text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            style={{
              y: useTransform(scrollY, [0, 300], [0, -50])
            }}
          >
            {data.heroSection.heading}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-light text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            style={{
              y: useTransform(scrollY, [0, 300], [0, -30])
            }}
          >
            {data.heroSection.subheading}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.6,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            style={{
              y: useTransform(scrollY, [0, 300], [0, -20])
            }}
          >
            <Link 
              href={data.heroSection.ctaLink || "/contact"} 
              className="inline-block bg-zen-blue-dark/90 text-white px-10 py-4 text-lg rounded-full hover:bg-zen-blue/90 transition-colors duration-300 shadow-lg"
            >
              {data.heroSection.ctaText || "Book a Session"}
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Scroll to Top Button */}
      <motion.button
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

      {/* Content Sections */}
      {data.sectionOne && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              ref={ref}
              className="grid md:grid-cols-2 gap-12 items-center"
              variants={fadeInUp}
              initial="hidden"
              animate={sectionOneControls}
              key="section-one"
            >
              <div>
                <h2 className="text-4xl font-playfair font-light text-zen-blue-dark mb-6">
                  {data.sectionOne.title}
                </h2>
                <div className="prose prose-lg text-zen-purple-dark font-light mb-6">
                  <PortableText value={data.sectionOne.content} />
                </div>
                {data.sectionOne.link && (
                  <Link 
                    href={data.sectionOne.link}
                    className="text-zen-blue-dark hover:text-zen-blue transition-colors duration-300 font-light"
                  >
                    Learn More →
                  </Link>
                )}
              </div>
              {data.sectionOne.image && (
                <motion.div 
                  className="relative h-[400px] rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  key="section-one-image"
                >
                  <Image
                    src={urlFor(data.sectionOne.image).url()}
                    alt={data.sectionOne.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {data.sectionTwo && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute left-0 right-0 top-0 bg-zen-yellow-light/60" style={{ height: '120%' }} />
              <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <motion.svg
                  className="relative block w-full h-[50px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  animate={{
                    d: [
                      "M0,0L0,120L1200,120L1200,0C1200,0,1100,120,1000,120C900,120,800,80,700,80C600,80,500,120,400,120C300,120,200,80,100,80C0,80,0,0,0,0Z",
                      "M0,0L0,120L1200,120L1200,0C1200,0,1100,100,1000,100C900,100,800,100,700,100C600,100,500,100,400,100C300,100,200,100,100,100C0,100,0,0,0,0Z",
                      "M0,0L0,120L1200,120L1200,0C1200,0,1100,80,1000,80C900,80,800,120,700,120C600,120,500,80,400,80C300,80,200,120,100,120C0,120,0,0,0,0Z",
                      "M0,0L0,120L1200,120L1200,0C1200,0,1100,100,1000,100C900,100,800,100,700,100C600,100,500,100,400,100C300,100,200,100,100,100C0,100,0,0,0,0Z",
                      "M0,0L0,120L1200,120L1200,0C1200,0,1100,120,1000,120C900,120,800,80,700,80C600,80,500,120,400,120C300,120,200,80,100,80C0,80,0,0,0,0Z"
                    ]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <motion.path
                    d="M0,0L0,120L1200,120L1200,0C1200,0,1100,120,1000,120C900,120,800,80,700,80C600,80,500,120,400,120C300,120,200,80,100,80C0,80,0,0,0,0Z"
                    className="fill-white"
                    animate={{
                      d: [
                        "M0,0L0,120L1200,120L1200,0C1200,0,1100,120,1000,120C900,120,800,80,700,80C600,80,500,120,400,120C300,120,200,80,100,80C0,80,0,0,0,0Z",
                        "M0,0L0,120L1200,120L1200,0C1200,0,1100,100,1000,100C900,100,800,100,700,100C600,100,500,100,400,100C300,100,200,100,100,100C0,100,0,0,0,0Z",
                        "M0,0L0,120L1200,120L1200,0C1200,0,1100,80,1000,80C900,80,800,120,700,120C600,120,500,80,400,80C300,80,200,120,100,120C0,120,0,0,0,0Z",
                        "M0,0L0,120L1200,120L1200,0C1200,0,1100,100,1000,100C900,100,800,100,700,100C600,100,500,100,400,100C300,100,200,100,100,100C0,100,0,0,0,0Z",
                        "M0,0L0,120L1200,120L1200,0C1200,0,1100,120,1000,120C900,120,800,80,700,80C600,80,500,120,400,120C300,120,200,80,100,80C0,80,0,0,0,0Z"
                      ]
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.svg>
              </div>
              <div className="relative z-10">
                <motion.div 
                  ref={ref}
                  className="grid md:grid-cols-2 gap-12 items-center p-16 md:p-24"
                  variants={fadeInUp}
                  initial="hidden"
                  animate={sectionTwoControls}
                  key="section-two"
                >
                  {data.sectionTwo.image && (
                    <motion.div 
                      className="relative h-[400px] rounded-lg overflow-hidden order-2 md:order-1"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      key="section-two-image"
                    >
                      <Image
                        src={urlFor(data.sectionTwo.image).url()}
                        alt={data.sectionTwo.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                  <div className="order-1 md:order-2">
                    <h2 className="text-4xl font-playfair font-light text-zen-blue-dark mb-6">
                      {data.sectionTwo.title}
                    </h2>
                    <div className="prose prose-lg text-zen-purple-dark font-light mb-6">
                      <PortableText value={data.sectionTwo.content} />
                    </div>
                    {data.sectionTwo.link && (
                      <Link 
                        href={data.sectionTwo.link}
                        className="text-zen-blue-dark hover:text-zen-blue transition-colors duration-300 font-light"
                      >
                        Explore More →
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {data.sectionThree && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              ref={ref}
              className="grid md:grid-cols-2 gap-12 items-center"
              variants={fadeInUp}
              initial="hidden"
              animate={sectionThreeControls}
              key="section-three"
            >
              <div>
                <h2 className="text-4xl font-playfair font-light text-zen-blue-dark mb-6">
                  {data.sectionThree.title}
                </h2>
                <div className="prose prose-lg text-zen-purple-dark font-light mb-6">
                  <PortableText value={data.sectionThree.content} />
                </div>
                {data.sectionThree.link && (
                  <Link 
                    href={data.sectionThree.link}
                    className="text-zen-blue-dark hover:text-zen-blue transition-colors duration-300 font-light"
                  >
                    Start Your Journey →
                  </Link>
                )}
              </div>
              {data.sectionThree.image && (
                <motion.div 
                  className="relative h-[400px] rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  key="section-three-image"
                >
                  <Image
                    src={urlFor(data.sectionThree.image).url()}
                    alt={data.sectionThree.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

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
            key="newsletter"
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
    </div>
  );
} 