/**
 * Navbar Component
 * Premium floating navigation with glass morphism
 * Inspired by modern developer portfolios
 */

import { useState, useEffect, useContext, MouseEvent } from 'react';
import { ThemeContext } from '../App';
import avatarImg from '../assets/images/avatar.jpeg';

interface NavLink {
  id: string;
  label: string;
}

interface NavbarProps {
  onSearchClick: () => void;
}

interface Colors {
  text: string;
  textHover: string;
  textActive: string;
  muted: string;
  subtleBg: string;
  hoverBg: string;
  activeDot: string;
  statusOnline: string;
}

const Navbar = ({ onSearchClick }: NavbarProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';

  const navLinks: NavLink[] = [
    { id: 'projects', label: 'Work' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  // Monospace font for terminal aesthetic
  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  // Smooth scroll tracking for navbar transformation - EXTREMELY SLOW animation
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY: number = window.scrollY;
      // Increase from 800 to 1500 for extremely slow animation (takes much more scroll to complete)
      const progress: number = Math.min(scrollY / 1500, 1);
      setScrollProgress(progress);

      // Detect active section - check from top to bottom
      const sections = navLinks.map(link => ({
        id: link.id,
        element: document.getElementById(link.id)
      })).filter(section => section.element !== null);

      let currentSection = '';
      
      // Find the section that is currently in view
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          // Check if section is in viewport (top is above middle of screen)
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            currentSection = section.id;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleScroll = (): void => {
      setIsMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, id: string): void => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Dynamic values based on scroll progress - Full width initially, then smaller (EXTREMELY SLOW)
  const navWidth: number = 100 - (scrollProgress * 15); // Reduced from 20 to 15 for extremely gentle transition
  const navPadding: number = 16 + (scrollProgress * 12); // Start with 16px, increase to 28px for more spacing
  const navHeight: number = 64 - (scrollProgress * 3); // Reduced from 4 to 3 for barely noticeable height change
  const bgOpacity: number = isDark 
    ? 0.85 + (scrollProgress * 0.1)
    : 0.9 + (scrollProgress * 0.05);
  const blurAmount: number = 20 + (scrollProgress * 10);

  // Minimal glass background matching website aesthetic
  const glassBg: string = isDark
    ? `rgba(17, 17, 17, ${bgOpacity})`
    : `rgba(255, 255, 255, ${bgOpacity})`;
  
  const borderColor: string = isDark
    ? `rgba(255, 255, 255, ${0.08 + scrollProgress * 0.04})`
    : `rgba(0, 0, 0, ${0.08 + scrollProgress * 0.04})`;

  // Neutral color palette matching website
  const textOpacity = 0.7 + (scrollProgress * 0.2);
  const colors: Colors = {
    text: isDark ? `rgba(255, 255, 255, ${textOpacity})` : `rgba(0, 0, 0, ${textOpacity})`,
    textHover: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)',
    textActive: isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
    muted: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
    subtleBg: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
    hoverBg: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
    activeDot: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
    statusOnline: '#10b981'
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{ 
        paddingTop: `${navPadding}px`,
        paddingLeft: '20px', // Always maintain side spacing
        paddingRight: '20px'
      }}
    >
      <nav 
        className="pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out"
        style={{
          width: `${navWidth}%`,
          maxWidth: scrollProgress > 0.8 ? '1200px' : 'none', // Changed from 0.7 to 0.8 for extremely late transition
          height: `${navHeight}px`,
          padding: `0 ${24 - (scrollProgress * 3)}px`, // Reduced from 4 to 3 for extremely gentle padding change
          background: glassBg,
          backdropFilter: `blur(${blurAmount}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blurAmount}px) saturate(180%)`,
          border: `1px solid ${borderColor}`,
          borderRadius: scrollProgress > 0.8 ? '8px' : '0px', // Changed from 0.7 to 0.8
          boxShadow: isDark
            ? `0 4px 24px rgba(0, 0, 0, ${0.25 + scrollProgress * 0.15}), 
               inset 0 1px 0 rgba(255, 255, 255, 0.02)`
            : `0 4px 24px rgba(0, 0, 0, ${0.06 + scrollProgress * 0.04}), 
               inset 0 1px 0 rgba(255, 255, 255, 0.6)`
        }}
      >
        {/* Left: Avatar + Navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a 
            href="#" 
            onClick={scrollToTop}
            className="shrink-0 relative group"
            aria-label="Go to top"
          >
          <div 
            className="relative overflow-hidden rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${28 - scrollProgress * 2}px`,
              height: `${28 - scrollProgress * 2}px`,
              opacity: 1,
              boxShadow: isDark 
                ? `0 0 0 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.2)` 
                : `0 0 0 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08)`
            }}
          >
            <img 
              src={avatarImg} 
              alt="Gaurav" 
              className="w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-110"
              style={{ filter: 'grayscale(0%) contrast(1.05) brightness(1.02)' }}
            />
          </div>
          </a>

          {/* Navigation Links - Left aligned */}
          <ul className="hidden md:flex items-center gap-3">
          {navLinks.map((link: NavLink, index: number) => {
            const isActive: boolean = activeSection === link.id;
            return (
              <li key={`${link.id}-${index}`} className="relative">
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="relative block px-3 py-2 text-[13px] tracking-wide transition-all duration-200 rounded-lg"
                  style={{ 
                    color: isActive ? colors.textActive : colors.text,
                    fontFamily: monoFont,
                    fontWeight: isActive ? 600 : 500,
                    textTransform: 'lowercase',
                    letterSpacing: '0.02em',
                    background: isActive ? colors.subtleBg : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = colors.textHover;
                    if (!isActive) (e.target as HTMLAnchorElement).style.background = colors.subtleBg;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.target as HTMLAnchorElement).style.color = colors.text;
                      (e.target as HTMLAnchorElement).style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          </ul>
        </div>

        {/* Right: Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search - Command bar style */}
          <button 
            className="relative flex items-center gap-2 transition-all duration-300 ease-out"
            style={{ 
              height: `${32 - scrollProgress * 2}px`,
              padding: '0 12px',
              minWidth: '110px',
              background: colors.subtleBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              color: colors.muted,
              cursor: 'pointer',
              fontFamily: monoFont
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.textHover;
              e.currentTarget.style.background = colors.hoverBg;
              e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.boxShadow = isDark 
                ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
                : '0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.muted;
              e.currentTarget.style.background = colors.subtleBg;
              e.currentTarget.style.borderColor = borderColor;
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={onSearchClick}
            aria-label="Search (Ctrl+K)"
            title="Search"
          >
            <svg 
              className="transition-all duration-200 shrink-0" 
              style={{ width: '14px', height: '14px' }}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M8.5 3a5.5 5.5 0 014.383 8.823l3.896 3.9a.75.75 0 01-1.06 1.06l-3.9-3.896A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
            <span 
              className="text-[12px] transition-all duration-200 flex-1"
              style={{ opacity: 0.6 }}
            >Search</span>
            <kbd 
              className="hidden sm:flex items-center gap-0.5 text-[11px] font-medium px-2 py-0.5 rounded transition-all duration-200"
              style={{ 
                background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                opacity: 0.9,
                fontFamily: monoFont,
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
              }}
            >
              <span style={{ fontSize: '10px' }}>Ctrl</span>
              <span style={{ fontSize: '9px', opacity: 0.5 }}>+</span>
              <span style={{ fontSize: '10px' }}>K</span>
            </kbd>
          </button>

          {/* Divider */}
          <span 
            className="hidden sm:block"
            style={{ 
              width: '1px', 
              height: '14px', 
              background: borderColor,
              opacity: 0.4,
              marginLeft: '4px',
              marginRight: '4px'
            }}
          />

          {/* Theme Toggle - Clean icon-based */}
          <button 
            className="flex items-center justify-center transition-all duration-300 ease-out"
            style={{ 
              width: `${28 - scrollProgress * 2}px`,
              height: `${28 - scrollProgress * 2}px`,
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: colors.muted,
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.textHover;
              e.currentTarget.style.background = colors.subtleBg;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.muted;
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            <div className="relative" style={{ width: '16px', height: '16px' }}>
              {/* Sun icon */}
              <svg 
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{ 
                  opacity: isDark ? 1 : 0,
                  transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.5)'
                }}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              {/* Moon icon */}
              <svg 
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{ 
                  opacity: isDark ? 0 : 1,
                  transform: isDark ? 'rotate(-90deg) scale(0.5)' : 'rotate(0deg) scale(1)'
                }}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden mobile-menu-button flex items-center justify-center transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              width: '28px',
              height: '28px',
              marginLeft: '2px',
              background: 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: colors.text,
              cursor: 'pointer'
            }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="relative" style={{ width: '14px', height: '10px' }}>
              <span 
                className="absolute left-0 w-full h-px rounded-full transition-all duration-300"
                style={{ 
                  background: 'currentColor',
                  top: isMenuOpen ? '50%' : '0',
                  transform: isMenuOpen ? 'rotate(45deg)' : 'none'
                }}
              />
              <span 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px rounded-full transition-all duration-300"
                style={{ 
                  background: 'currentColor',
                  opacity: isMenuOpen ? 0 : 1
                }}
              />
              <span 
                className="absolute left-0 w-full h-px rounded-full transition-all duration-300"
                style={{ 
                  background: 'currentColor',
                  bottom: isMenuOpen ? '50%' : '0',
                  top: isMenuOpen ? '50%' : 'auto',
                  transform: isMenuOpen ? 'rotate(-45deg)' : 'none'
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className="md:hidden mobile-menu-dropdown pointer-events-auto absolute right-4 transition-all duration-300"
        style={{
          width: '260px',
          top: `${navPadding + navHeight + 12}px`,
          background: isDark ? 'rgba(25, 25, 25, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'}`,
          borderRadius: '16px',
          boxShadow: isDark
            ? '0 12px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 12px 40px rgba(0, 0, 0, 0.2)',
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.95)',
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          padding: '16px',
          zIndex: 100
        }}
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map((link: NavLink, index: number) => {
            const isActive: boolean = activeSection === link.id;
            return (
              <li key={`mobile-${link.id}-${index}`}>
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="flex items-center justify-between text-[16px] transition-all duration-200"
                  style={{ 
                    color: isDark ? '#f5f5f5' : '#171717',
                    background: isActive 
                      ? (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)')
                      : 'transparent',
                    fontFamily: monoFont,
                    fontWeight: isActive ? 600 : 500,
                    textTransform: 'lowercase',
                    letterSpacing: '0.02em',
                    borderRadius: isActive ? '4px' : '8px',
                    border: isActive 
                      ? `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'}`
                      : '1px solid transparent',
                    paddingLeft: '24px',
                    paddingRight: '20px',
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }}
                  onTouchStart={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.background = isDark 
                        ? 'rgba(255, 255, 255, 0.08)' 
                        : 'rgba(0, 0, 0, 0.04)';
                    }
                  }}
                  onTouchEnd={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.background = isDark 
                        ? 'rgba(255, 255, 255, 0.08)' 
                        : 'rgba(0, 0, 0, 0.04)';
                      (e.currentTarget as HTMLAnchorElement).style.borderRadius = '8px';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    }
                  }}
                >
                  <span className="flex items-center gap-3.5">
                    <span style={{ fontSize: '16px', fontWeight: isActive ? 600 : 500 }}>
                      {link.label}
                    </span>
                  </span>
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ 
                      opacity: isActive ? 0.9 : 0.5,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
