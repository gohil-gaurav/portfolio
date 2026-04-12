/**
 * Hero Component
 * Minimal, clean, developer-focused landing section
 */

import { useContext, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import { ThemeContext } from '../App';
import { trackResumeDownload, trackSocialClick } from '../utils/analytics';
import { getSimpleIconUrl } from '../utils/simpleIcons';
import avatarImg from '../assets/images/avatar.jpeg';
import resumePdf from '../assets/images/project/Gaurav_Gohil_Resume.pdf';

interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities?: Array<{
    name: string;
    type: number;
    timestamps?: {
      start?: number;
      end?: number;
    };
  }>;
  discord_user?: {
    id: string;
    username: string;
  };
  active_on_discord_web?: boolean;
  active_on_discord_mobile?: boolean;
  active_on_discord_desktop?: boolean;
  listening_to_spotify?: boolean;
  kv?: {
    [key: string]: string;
  };
}

interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

const Hero = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';
  const [discordStatus, setDiscordStatus] = useState<string>('offline');
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch Discord status from Lanyard API
  useEffect(() => {
    if (!isClient) return; // Only run on client side

    const fetchDiscordStatus = async (): Promise<void> => {
      try {
        // Add timestamp to prevent caching
        const timestamp = Date.now();
        const response = await fetch(
          `https://api.lanyard.rest/v1/users/1369896039858835531?t=${timestamp}`,
          { 
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache'
            }
          }
        );
        const data: LanyardResponse = await response.json();
        
        if (data.success && data.data.discord_status) {
          const status = data.data.discord_status;
          setDiscordStatus(status);
        }
      } catch (error) {
        console.error('Failed to fetch Discord status:', error);
        setDiscordStatus('offline');
      }
    };

    // Fetch immediately on mount
    fetchDiscordStatus();

    // Refresh every 15 seconds
    const intervalId = setInterval(fetchDiscordStatus, 15000);

    return () => clearInterval(intervalId);
  }, [isClient]);

  // Get status dot color based on Discord status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'online':
        return '#23a55a';
      case 'idle':
        return '#faa61a';
      case 'dnd':
        return '#ed4245';
      case 'offline':
      default:
        return '#747f8d';
    }
  };

  // Get tooltip message based on status
  const getTooltipMessage = (status: string): string => {
    switch (status) {
      case 'online':
        return 'Coding…';
      case 'idle':
        return 'Away right now';
      case 'dnd':
        return 'Do Not Disturb';
      case 'offline':
        return 'Back soon';
      default:
        return 'Offline';
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center"
      style={{ 
        background: 'var(--color-bg)',
        paddingTop: '80px'
      }}
    >
      <div className="container">
        <div 
          className="w-full"
          style={{ 
            padding: '72px 0'
          }}
        >
          {/* Left Side - Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
            style={{ maxWidth: '100%' }}
          >
            {/* Profile Picture */}
            <motion.div
              variants={itemVariants}
              style={{ 
                marginBottom: '24px',
                position: 'relative',
                display: 'inline-block'
              }}
            >
              <img 
                src={avatarImg}
                alt="Gaurav Gohil"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,  
                  boxShadow: isDark 
                    ? '0 4px 12px rgba(0,0,0,0.3)' 
                    : '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              {/* Discord Status Dot with Tooltip */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  right: '6px',
                  zIndex: 2,
                  width: '18px',
                  height: '18px'
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {/* Pulsing ring animation (only when active) */}
                {(discordStatus === 'online' || discordStatus === 'idle' || discordStatus === 'dnd') && (
                  <motion.span
                    animate={{
                      scale: [1, 2.2],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: `2px solid ${getStatusColor(discordStatus)}`,
                      pointerEvents: 'none',
                      transformOrigin: 'center'
                    }}
                  />
                )}
                
                {/* Status dot */}
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(discordStatus),
                    border: `3px solid ${isDark ? '#000000' : '#ffffff'}`,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1
                  }}
                  aria-label={`Discord status: ${discordStatus}`}
                />
                {/* Tooltip */}
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '8px',
                      padding: '8px 12px',
                      background: isDark ? 'rgba(30, 30, 30, 0.98)' : 'rgba(0, 0, 0, 0.9)',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontFamily: monoFont,
                      fontWeight: 500,
                      borderRadius: '8px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      pointerEvents: 'none',
                      zIndex: 10
                    }}
                  >
                    {getTooltipMessage(discordStatus)}
                    {/* Tooltip Arrow */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        left: '50%',
                        width: '8px',
                        height: '8px',
                        background: isDark ? 'rgba(30, 30, 30, 0.98)' : 'rgba(0, 0, 0, 0.9)',
                        transform: 'translateX(-50%) rotate(45deg)',
                        borderRadius: '2px'
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Small intro text */}
            <motion.p 
              variants={itemVariants}
              style={{ 
                fontFamily: monoFont,
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: 400,
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                marginBottom: '12px',
                letterSpacing: '0.02em'
              }}
            >
              Hello, I'm
            </motion.p>

            {/* Main Name Heading */}
            <motion.h1 
              variants={itemVariants}
              style={{ 
                fontFamily: monoFont,
                fontSize: 'clamp(50px, 6.2vw, 75px)',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '16px',
                lineHeight: 1.1,
                letterSpacing: '-0.03em'
              }}
            >
              Gaurav Gohil
            </motion.h1>

            {/* Role/Title Heading */}
            <motion.h2 
              variants={itemVariants}
              style={{ 
                fontFamily: monoFont,
                fontSize: 'clamp(26px, 3.2vw, 42px)',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '24px',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                opacity: 0.9
              }}
            >
              Data Scientist & Python Backend Developer
            </motion.h2>

            {/* Description with inline technology badges */}
            <motion.div 
              variants={itemVariants}
              style={{ 
                fontSize: '18px',
                lineHeight: 1.8,
                color: 'var(--color-text-muted)',
                marginBottom: '32px',
                maxWidth: '100%'
              }}
            >
              <p style={{ marginBottom: '16px' }}>
                I build intelligent data-driven applications using{' '}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  borderRadius: '4px',
                  fontWeight: 500,
                  verticalAlign: 'middle'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" fill="url(#python-gradient)"/>
                    <defs>
                      <linearGradient id="python-gradient" x1="0" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#3776AB"/>
                        <stop offset="100%" stopColor="#FFD43B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  Python
                </span>
                ,{' '}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  borderRadius: '4px',
                  fontWeight: 500,
                  verticalAlign: 'middle'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.456zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67z" fill="#150458"/>
                  </svg>
                  Pandas
                </span>
                ,{' '}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  borderRadius: '4px',
                  fontWeight: 500,
                  verticalAlign: 'middle'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M10.315 4.876L6.3048 2.8918l-4.401 2.1699 4.1186 2.0726zm.794.3894l4.2045-2.0844-4.406-2.1841-4.2045 2.0844zM5.9 15.8562l4.0107-2.0845V9.5024L5.9 11.5869zm5.8984-2.0845l4.0107 2.0845v-4.2693L11.7984 9.5024zm-5.0835-7.555l4.1186 2.0726 4.1186-2.0726-4.1186-2.0845zm12.769 2.4218l-4.401-2.1699-4.0107 1.9943 4.1186 2.0726zm-7.2924 9.3369l4.0107-2.0845v-4.2693l-4.0107 2.0845zm-1.7889 0V13.772l-4.0107-2.0845v4.2693zm.8944 8.3548l4.2045-2.0844-4.406-2.1841-4.2045 2.0844zm4.9984-2.4699l-4.0107-2.0726-4.0107 2.0726 4.0107 2.0845zm5.0835-7.555l-4.1186-2.0726-4.1186 2.0726 4.1186 2.0845zm-9.2924-9.3369l-4.401 2.1699 4.0107 1.9943 4.1186-2.0726z" fill="#4DABCF"/>
                  </svg>
                  NumPy
                </span>
                ,{' '}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  borderRadius: '4px',
                  fontWeight: 500,
                  verticalAlign: 'middle'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.529 3.109-2.625.56-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z" fill="#092E20"/>
                  </svg>
                  Django
                </span>
                , and{' '}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  borderRadius: '4px',
                  fontWeight: 500,
                  verticalAlign: 'middle'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" fill="#F7931E"/>
                    <path d="M8 10h8M8 14h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Scikit-learn
                </span>
                , focusing on transforming raw data into meaningful insights and building scalable backend systems.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              variants={itemVariants}
              style={{ 
                display: 'flex',
                gap: '12px',
                marginBottom: '32px'
              }}
            >
              {/* Resume/CV Button */}
              <motion.a 
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackResumeDownload()}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: monoFont,
                  fontSize: '13px',
                  padding: '12px 24px',
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  color: 'var(--color-text)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
                Resume / CV
              </motion.a>

              {/* Get in Touch Button */}
              <motion.a 
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: monoFont,
                  fontSize: '13px',
                  padding: '12px 24px',
                  background: isDark ? '#ffffff' : '#171717',
                  color: isDark ? '#171717' : '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                </svg>
                Get in touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '32px'
              }}
            >
              {/* X (Twitter) */}
              <motion.a 
                href="https://x.com/GauravGohi01"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('twitter')}
                whileHover={{ y: -2 }}
                title="Follow me on X"
                aria-label="X (Twitter)"
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease',
                  filter: 'brightness(1.5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.5)';
                }}
              >
                <img
                  src={getSimpleIconUrl('X')}
                  alt="X"
                  width="24"
                  height="24"
                  style={{ width: '24px', height: '24px' }}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = getSimpleIconUrl('simpleicons', true);
                  }}
                />
              </motion.a>

              {/* LinkedIn */}
              <motion.a 
                href="https://www.linkedin.com/in/gaurav-gohil-344758346/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('linkedin')}
                whileHover={{ y: -2 }}
                title="Connect on LinkedIn"
                aria-label="LinkedIn"
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease',
                  filter: 'brightness(1.5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.5)';
                }}
              >
                <FaLinkedinIn
                  aria-hidden="true"
                  size={26}
                  style={{
                    width: '26px',
                    height: '26px',
                    color: isDark ? '#ffffff' : '#000000'
                  }}
                />
              </motion.a>

              {/* GitHub */}
              <motion.a 
                href="https://github.com/gohil-gaurav"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('github')}
                whileHover={{ y: -2 }}
                title="Check out my GitHub"
                aria-label="GitHub"
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease',
                  filter: 'brightness(1.5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.5)';
                }}
              >
                <img
                  src={getSimpleIconUrl('GitHub')}
                  alt="GitHub"
                  width="24"
                  height="24"
                  style={{ width: '24px', height: '24px' }}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = getSimpleIconUrl('simpleicons', true);
                  }}
                />
              </motion.a>
            </motion.div>

            {/* Status Badge */}
            <motion.div 
              variants={itemVariants}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span 
                style={{ 
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4ade80'
                }}
              />
              <span 
                style={{ 
                  fontFamily: monoFont,
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Available for opportunities
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
