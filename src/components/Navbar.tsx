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
  const [searchHovered, setSearchHovered] = useState<boolean>(false);
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

  // Smooth scroll tracking for navbar transformation
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY: number = window.scrollY;
      const progress: number = Math.min(scrollY / 150, 1);
      setScrollProgress(progress);

      // Detect active section
      const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean) as HTMLElement[];
      for (const section of sections.reverse()) {
        if (section.getBoundingClientRect().top <= 150) {
          setActiveSection(section.id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, id: string): void => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Dynamic values based on scroll progress
  const navWidth: number = 94 - (scrollProgress * 22);
  const navPadding: number = 20 - (scrollProgress * 8);
  const navHeight: number = 64 - (scrollProgress * 8);
  const bgOpacity: number = isDark 
    ? 0.4 + (scrollProgress * 0.35)
    : 0.5 + (scrollProgress * 0.35);
  const blurAmount: number = 16 + (scrollProgress * 8);

  // Glass background colors - softer charcoal instead of pure black
  const glassBg: string = isDark
    ? `rgba(28, 30, 35, ${bgOpacity})`
    : `rgba(250, 250, 252, ${bgOpacity})`;
  
  const borderColor: string = isDark
    ? `rgba(255, 255, 255, ${0.04 + scrollProgress * 0.02})`
    : `rgba(0, 0, 0, ${0.04 + scrollProgress * 0.02})`;

  // Refined color palette - text gets darker as you scroll
  const textOpacity = 0.55 + (scrollProgress * 0.25); // Gets darker on scroll
  const colors: Colors = {
    text: isDark ? `rgba(255, 255, 255, ${textOpacity})` : `rgba(0, 0, 0, ${0.5 + scrollProgress * 0.25})`,
    textHover: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
    textActive: isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.95)',
    muted: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)',
    subtleBg: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
    hoverBg: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
    activeDot: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
    statusOnline: '#22c55e'
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{ paddingTop: `${navPadding}px` }}
    >
      <nav 
        className="pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out"
        style={{
          width: `${navWidth}%`,
          maxWidth: '1200px',
          height: `${navHeight}px`,
          padding: '0 20px',
          background: glassBg,
          backdropFilter: `blur(${blurAmount}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blurAmount}px) saturate(180%)`,
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          boxShadow: isDark
            ? `0 4px 24px rgba(0, 0, 0, ${0.25 + scrollProgress * 0.15}), 
               inset 0 1px 0 rgba(255, 255, 255, 0.02)`
            : `0 4px 24px rgba(0, 0, 0, ${0.06 + scrollProgress * 0.04}), 
               inset 0 1px 0 rgba(255, 255, 255, 0.6)`
        }}
      >
        {/* Left: Avatar + Navigation */}
        <div className="flex items-center gap-6">
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
              opacity: 0.85,
              boxShadow: `0 0 0 1.5px ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`
            }}
          >
            <img 
              src={avatarImg} 
              alt="Gaurav" 
              className="w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-110"
              style={{ filter: 'grayscale(100%) contrast(1.05)' }}
            />
          </div>
            {/* Elegant status dot */}
            <span 
              className="absolute -bottom-0.5 -right-0.5 rounded-full transition-all duration-300"
              style={{
                width: '6px',
                height: '6px',
                background: colors.statusOnline,
                boxShadow: `0 0 0 2px ${isDark ? 'rgba(28,30,35,0.9)' : 'rgba(250,250,252,0.9)'}`,
                opacity: 0.9
              }}
            />
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
                  className="relative block px-2 py-2 text-[13px] tracking-wide transition-all duration-200"
                  style={{ 
                    color: isActive ? colors.textActive : colors.text,
                    fontFamily: monoFont,
                    fontWeight: isActive ? 500 : 400,
                    textTransform: 'lowercase',
                    letterSpacing: '0.02em'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = colors.textHover;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.target as HTMLAnchorElement).style.color = colors.text;
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
        <div className="flex items-center gap-3">
          {/* Search - Command bar style */}
          <button 
            className="relative flex items-center gap-2 transition-all duration-300 ease-out"
            style={{ 
              height: `${32 - scrollProgress * 2}px`,
              padding: '0 14px',
              minWidth: '180px',
              background: colors.subtleBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              color: colors.muted,
              cursor: 'pointer',
              fontFamily: monoFont
            }}
            onMouseEnter={(e) => {
              setSearchHovered(true);
              e.currentTarget.style.color = colors.textHover;
              e.currentTarget.style.background = colors.hoverBg;
              e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              setSearchHovered(false);
              e.currentTarget.style.color = colors.muted;
              e.currentTarget.style.background = colors.subtleBg;
              e.currentTarget.style.borderColor = borderColor;
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
              className="flex items-center gap-0.5 text-[11px] font-medium px-2 py-0.5 rounded transition-all duration-200"
              style={{ 
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                opacity: 0.7,
                fontFamily: monoFont
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
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.muted;
              e.currentTarget.style.background = 'transparent';
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
            className="md:hidden flex items-center justify-center transition-all duration-200"
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
        className="md:hidden pointer-events-auto absolute left-1/2 -translate-x-1/2 py-2 px-2 transition-all duration-300"
        style={{
          width: `${navWidth - 4}%`,
          maxWidth: '1160px',
          top: `${navPadding + navHeight + 8}px`,
          background: glassBg,
          backdropFilter: `blur(${blurAmount}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blurAmount}px) saturate(180%)`,
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          boxShadow: isDark
            ? '0 8px 32px rgba(0, 0, 0, 0.35)'
            : '0 8px 32px rgba(0, 0, 0, 0.08)',
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        <ul className="flex flex-col">
          {navLinks.map((link: NavLink, index: number) => {
            const isActive: boolean = activeSection === link.id;
            return (
              <li key={`mobile-${link.id}-${index}`}>
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="flex items-center gap-2 px-4 py-3 text-[13px] font-normal rounded-lg transition-all duration-200"
                  style={{ 
                    color: isActive ? colors.textActive : colors.text,
                    background: isActive ? colors.subtleBg : 'transparent',
                    fontFamily: monoFont,
                    textTransform: 'lowercase'
                  }}
                >
                  {isActive && (
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: colors.activeDot }}
                    />
                  )}
                  {link.label}
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
