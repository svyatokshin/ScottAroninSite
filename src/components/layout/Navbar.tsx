'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname() ?? '';

  useEffect(() => {
    const supabase = createClient();
    const checkAuth = async (userId: string | undefined) => {
      setIsLoggedIn(!!userId);
      if (!userId) {
        setIsAdmin(false);
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      setIsAdmin(profile?.role === 'admin');
    };
    supabase.auth.getUser().then(({ data: { user } }) => checkAuth(user?.id));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAuth(session?.user?.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Research', href: '/research' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2 backdrop-blur-md z-50 shadow-lg border-b border-white/20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-4"
      >
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2 hover:opacity-80 transition-opacity group min-h-[44px]">
              <div className="relative flex-shrink-0">
                <Image  
                  src="/logo3.png" 
                  alt="Scott Aronin" 
                  width={60} 
                  height={60} 
                  className="rounded-full animate-float group-hover:animate-glow transition-all duration-300 w-12 h-12 sm:w-[60px] sm:h-[60px]" 
                />
                <div className="absolute inset-0 rounded-full bg-zen-purple-light/20 animate-pulse-slow" />
              </div>
              <span className="animate-fade-in group-hover:text-gray-600 transition-colors duration-300">Scott Aronin</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                      active ? 'text-bgDark-2 font-semibold' : 'text-gray-800 hover:text-gray-600'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gray-800 transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
            <div className="ml-4 flex items-center gap-2">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-[#1C6ED5] border border-[#1C6ED5] hover:bg-[#1C6ED5]/10 transition-colors min-h-[44px] inline-flex items-center justify-center"
                  aria-label="View admin panel"
                >
                  View Admin Panel
                </Link>
              )}
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors min-h-[44px] inline-flex items-center justify-center"
                  aria-label="Go to dashboard"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors min-h-[44px] inline-flex items-center justify-center"
                >
                  Login / Sign up
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 transition-colors hover:bg-gray-200/50 min-w-[44px] min-h-[44px]"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 }
        }}
        className="md:hidden bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2 backdrop-blur-md overflow-hidden border-b border-white/20"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-300 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 ${
                  active
                    ? 'text-bgDark-2 font-semibold bg-gray-200/50'
                    : 'text-gray-800 hover:text-gray-600 hover:bg-gray-200/50'
                }`}
                aria-current={active ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin"
              className="block mx-4 mt-2 px-4 py-3 rounded-lg text-base font-semibold text-[#1C6ED5] border border-[#1C6ED5] hover:bg-[#1C6ED5]/10 transition-colors min-h-[44px] text-center"
              onClick={() => setIsOpen(false)}
              aria-label="View admin panel"
            >
              View Admin Panel
            </Link>
          )}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="block mx-4 mt-2 px-4 py-3 rounded-lg text-base font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors min-h-[44px] text-center"
              onClick={() => setIsOpen(false)}
              aria-label="Go to dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="block mx-4 mt-2 px-4 py-3 rounded-lg text-base font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors min-h-[44px] text-center"
              onClick={() => setIsOpen(false)}
            >
              Login / Sign up
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar; 