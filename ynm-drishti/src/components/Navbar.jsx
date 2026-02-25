import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Technology', href: '/technology' },
  { name: 'Clients', href: '/clients' },
  { 
    name: 'Company', 
    href: '#',
    dropdown: [
      { name: 'About Us', href: '/about' },
      { name: 'Leadership', href: '/leadership' },
      { name: 'Global Partnerships', href: '/partnerships' },
      { name: 'Investor Relations', href: '/investors' },
    ]
  },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  
  // Smooth scroll-based animations
  const { scrollY } = useScroll();
  
  // Spring config for ultra smooth transitions
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  
  // Transform scroll position to animation values
  const scrollProgress = useTransform(scrollY, [0, 80], [0, 1]);
  const smoothProgress = useSpring(scrollProgress, springConfig);
  
  // Animated values based on scroll - dramatic expand/compress
  const containerMaxWidth = useTransform(smoothProgress, [0, 1], [1400, 800]);
  const containerY = useTransform(smoothProgress, [0, 1], [0, 8]);
  const backdropBlur = useTransform(smoothProgress, [0, 1], [12, 20]);
  const backgroundOpacity = useTransform(smoothProgress, [0, 1], [0.6, 0.85]);
  const borderOpacity = useTransform(smoothProgress, [0, 1], [0.15, 0.35]);
  const shadowOpacity = useTransform(smoothProgress, [0, 1], [0.4, 1]);
  const borderRadius = useTransform(smoothProgress, [0, 1], [16, 9999]);
  const innerPaddingY = useTransform(smoothProgress, [0, 1], [14, 10]);
  const innerPaddingX = useTransform(smoothProgress, [0, 1], [24, 20]);
  const logoScale = useTransform(smoothProgress, [0, 1], [1, 0.9]);

  // Check if a link is active
  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  // Check if any dropdown item is active
  const isDropdownActive = (dropdown) => {
    return dropdown?.some(item => location.pathname === item.href);
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDropdownEnter = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-3"
    >
      {/* Main navbar container - centered with mx-auto, maxWidth animates */}
      <motion.div 
        className="relative mx-auto w-full"
        style={{
          maxWidth: useTransform(containerMaxWidth, v => `${v}px`),
          y: containerY,
        }}
      >
        {/* Glass background - animates from rounded rectangle to pill */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius,
            opacity: backgroundOpacity,
            background: 'linear-gradient(135deg, rgba(12, 18, 30, 0.95) 0%, rgba(20, 30, 50, 0.9) 50%, rgba(12, 20, 35, 0.95) 100%)',
          }}
        />
        
        {/* Blur overlay - always active for glass effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius,
            backdropFilter: useTransform(backdropBlur, v => `blur(${v}px) saturate(140%)`),
            WebkitBackdropFilter: useTransform(backdropBlur, v => `blur(${v}px) saturate(140%)`),
          }}
        />
        
        {/* Subtle gradient shine on top edge */}
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            borderRadius,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 50%, transparent 100%)',
          }}
        />
        
        {/* Border layer - gold/blue gradient border */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius,
            border: '1px solid',
            borderColor: useTransform(borderOpacity, v => `rgba(255, 215, 0, ${v})`),
            boxShadow: useTransform(borderOpacity, v => `inset 0 0 30px rgba(30, 144, 255, ${v * 0.1})`),
          }}
        />
        
        {/* Shadow layer - soft glow */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius,
            opacity: shadowOpacity,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.1), 0 0 80px rgba(30, 144, 255, 0.06)',
          }}
        />
        
        {/* Content container */}
        <motion.div 
          className="relative flex items-center justify-between"
          style={{
            paddingTop: innerPaddingY,
            paddingBottom: innerPaddingY,
            paddingLeft: innerPaddingX,
            paddingRight: innerPaddingX,
          }}
        >
          {/* Logo */}
          <motion.div style={{ scale: logoScale }}>
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <img
                  src="/logo.png"
                  alt="YNM Drishti"
                  className="h-9 sm:h-10"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))'
                  }}
                />
                <span className="font-bold text-white hidden sm:block text-base sm:text-lg">
                  YNM{' '}
                  <span 
                    style={{
                      background: 'linear-gradient(135deg, #FFD700, #1E90FF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    className="group-hover:opacity-80 transition-opacity duration-300"
                  >
                    Drishti
                  </span>
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const active = link.dropdown ? isDropdownActive(link.dropdown) : isActive(link.href);
              
              if (link.dropdown) {
                return (
                  <div 
                    key={link.name}
                    className="relative dropdown-container"
                    onMouseEnter={() => handleDropdownEnter(link.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <motion.button
                      className="relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 flex items-center gap-1"
                      style={{
                        color: active ? '#FFC857' : '#9ca3af',
                        backgroundColor: active ? 'rgba(255, 215, 0, 0.08)' : 'transparent',
                      }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      whileHover={{ 
                        color: '#ffffff',
                        backgroundColor: 'rgba(255, 215, 0, 0.08)',
                      }}
                    >
                      {link.name}
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`}
                      />
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 py-2 min-w-[200px] rounded-xl overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(12, 18, 30, 0.98) 0%, rgba(20, 30, 50, 0.98) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 215, 0, 0.15)',
                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block px-4 py-2.5 text-sm transition-all duration-200 hover:bg-white/5"
                              style={{
                                color: isActive(item.href) ? '#FFC857' : '#9ca3af',
                              }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link key={link.name} to={link.href}>
                  <motion.div
                    className="relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300"
                    style={{
                      color: active ? '#FFC857' : '#9ca3af',
                      backgroundColor: active ? 'rgba(255, 215, 0, 0.08)' : 'transparent',
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ 
                      color: '#ffffff',
                      backgroundColor: 'rgba(255, 215, 0, 0.08)',
                    }}
                  >
                    {link.name}
                    
                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId="navActiveIndicator"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #FFD700, #1E90FF)',
                          boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)'
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
            
            {/* CTA Button */}
            <Link to="/contact">
              <motion.div
                className="relative ml-3 px-5 py-2 rounded-xl font-semibold text-sm overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div 
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}
                />
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.35), 0 0 40px rgba(30, 144, 255, 0.2)' }}
                />
                <div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                />
                <span className="relative z-10 text-white">Get Started</span>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2.5 text-white rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 top-0 bg-black/70 backdrop-blur-sm z-[-1]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden mx-1 mt-2"
            >
              <div 
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.98) 0%, rgba(18, 20, 30, 0.98) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 215, 0, 0.15)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.06)'
                }}
              >
                <div className="p-4 space-y-1">
                  {navLinks.map((link) => {
                    if (link.dropdown) {
                      return (
                        <div key={link.name} className="space-y-1">
                          <div 
                            className="px-4 py-2 text-gray-500 text-xs font-semibold uppercase tracking-wider"
                          >
                            {link.name}
                          </div>
                          {link.dropdown.map((item) => {
                            const active = isActive(item.href);
                            return (
                              <motion.div key={item.name}>
                                <Link
                                  to={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-300"
                                  style={{
                                    background: active ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(30, 144, 255, 0.08))' : 'transparent',
                                    color: active ? '#FFC857' : '#9ca3af',
                                    border: active ? '1px solid rgba(255, 215, 0, 0.2)' : '1px solid transparent',
                                  }}
                                >
                                  {active && (
                                    <span 
                                      className="w-1.5 h-1.5 rounded-full"
                                      style={{
                                        background: 'linear-gradient(135deg, #FFD700, #1E90FF)',
                                        boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)'
                                      }}
                                    />
                                  )}
                                  <span className={active ? '' : 'ml-4'}>{item.name}</span>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    }

                    const active = isActive(link.href);
                    return (
                      <motion.div key={link.name}>
                        <Link
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-300"
                          style={{
                            background: active ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(30, 144, 255, 0.08))' : 'transparent',
                            color: active ? '#FFC857' : '#9ca3af',
                            border: active ? '1px solid rgba(255, 215, 0, 0.2)' : '1px solid transparent',
                          }}
                        >
                          {active && (
                            <span 
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                background: 'linear-gradient(135deg, #FFD700, #1E90FF)',
                                boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)'
                              }}
                            />
                          )}
                          <span className={active ? '' : 'ml-4'}>{link.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* Mobile CTA */}
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.div
                      className="w-full mt-3 py-3.5 rounded-xl font-semibold text-white relative overflow-hidden group text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="absolute inset-0 rounded-xl"
                        style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}
                      />
                      <div 
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                      />
                      <span className="relative z-10">Get Started</span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
