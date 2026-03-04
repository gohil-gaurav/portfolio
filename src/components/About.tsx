/**
 * About Component
 * Personal introduction with minimal, developer-focused aesthetic
 */

import { useContext, MouseEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from '../App';

interface Skill {
  name: string;
  letter: string;
  icon: string;
}

// Skills - simplified icons (monochrome)
const skills: Skill[] = [
  { name: 'Python', letter: 'Py', icon: '🐍' },
  { name: 'NumPy', letter: 'Np', icon: '🔢' },
  { name: 'Pandas', letter: 'Pd', icon: '🐼' },
  { name: 'Django', letter: 'Dj', icon: '🎸' },
  { name: 'React', letter: 'Re', icon: '⚛️' },
  { name: 'JavaScript', letter: 'Js', icon: '⚡' },
  { name: 'Git', letter: 'Gt', icon: '📦' },
  { name: 'C', letter: 'C', icon: '©️' }
];

const About = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';
  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section 
      id="about" 
      className="py-20 md:py-24 lg:py-28"
      style={{ 
        background: 'var(--color-bg)',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16 lg:gap-20 items-start justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          {/* Left - Avatar */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start" style={{ paddingTop: '24px' }}>
            <div 
              className="w-56 h-64 md:w-[240px] md:h-[280px]"
              style={{
                overflow: 'hidden',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: '4px'
              }}
            >
              <img 
                src="/src/assets/images/avatar.jpeg"
                alt="Gaurav" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: 'grayscale(0%)',
                  opacity: 1,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e: MouseEvent<HTMLImageElement>) => {
                  e.currentTarget.style.filter = 'grayscale(0%)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e: MouseEvent<HTMLImageElement>) => {
                  e.currentTarget.style.filter = 'grayscale(0%)';
                  e.currentTarget.style.opacity = '1';
                }}
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <div style={{ paddingTop: '8px' }}>
            {/* Subtle label */}
            <motion.p 
              variants={itemVariants}
              style={{
                fontFamily: monoFont,
                fontSize: '11px',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '12px'
              }}
            >
              [ABOUT]
            </motion.p>
            
            {/* Main headline */}
            <motion.h2 
              variants={itemVariants}
              className="text-2xl md:text-3xl"
              style={{
                fontFamily: monoFont,
                fontWeight: 600,
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                marginBottom: '8px'
              }}
            >
              About Me
            </motion.h2>
            
            {/* Name - smaller, lighter */}
            <motion.p 
              variants={itemVariants}
              style={{
                fontFamily: monoFont,
                fontSize: '14px',
                fontWeight: 400,
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                marginBottom: '32px'
              }}
            >
              Gaurav
            </motion.p>
            
            {/* Description - concise, confident */}
            <motion.div variants={itemVariants}>
              <p 
                style={{
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  marginBottom: '12px',
                  maxWidth: '480px'
                }}
              >
                Data Scientist and Backend Developer focused on building 
                clean, efficient solutions.
              </p>
              <p 
                style={{
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  marginBottom: '12px',
                  maxWidth: '480px'
                }}
              >
                I work with Python, machine learning, and modern web technologies.
              </p>
              <p 
                style={{
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  maxWidth: '480px'
                }}
              >
                Currently learning, building, and sharing what I create.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div 
              variants={itemVariants}
              style={{ marginTop: '48px' }}
            >
              <p 
                style={{
                  fontFamily: monoFont,
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  marginBottom: '16px'
                }}
              >
                Skills
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {skills.map((skill: Skill, index: number) => {
                  // Get colored SVG icon for each skill
                  const getSkillIcon = (skillName: string) => {
                    switch(skillName) {
                      case 'Python':
                        return (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" fill="url(#python-gradient-about)"/>
                            <defs>
                              <linearGradient id="python-gradient-about" x1="0" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#3776AB"/>
                                <stop offset="100%" stopColor="#FFD43B"/>
                              </linearGradient>
                            </defs>
                          </svg>
                        );
                      case 'NumPy':
                        return (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M10.315 4.876L6.3048 2.8918l-4.401 2.1699 4.1186 2.0726zm.794.3894l4.2045-2.0844-4.406-2.1841-4.2045 2.0844zM5.9 15.8562l4.0107-2.0845V9.5024L5.9 11.5869zm5.8984-2.0845l4.0107 2.0845v-4.2693L11.7984 9.5024zm-5.0835-7.555l4.1186 2.0726 4.1186-2.0726-4.1186-2.0845zm12.769 2.4218l-4.401-2.1699-4.0107 1.9943 4.1186 2.0726zm-7.2924 9.3369l4.0107-2.0845v-4.2693l-4.0107 2.0845zm-1.7889 0V13.772l-4.0107-2.0845v4.2693zm.8944 8.3548l4.2045-2.0844-4.406-2.1841-4.2045 2.0844zm4.9984-2.4699l-4.0107-2.0726-4.0107 2.0726 4.0107 2.0845zm5.0835-7.555l-4.1186-2.0726-4.1186 2.0726 4.1186 2.0845zm-9.2924-9.3369l-4.401 2.1699 4.0107 1.9943 4.1186-2.0726z" fill="#4DABCF"/>
                          </svg>
                        );
                      case 'Pandas':
                        return (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.456zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67z" fill="#150458"/>
                          </svg>
                        );
                      case 'Django':
                        return (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.529 3.109-2.625.56-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z" fill="#092E20"/>
                          </svg>
                        );
                      case 'React':
                        return (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" fill="#61DAFB"/>
                          </svg>
                        );
                      case 'JavaScript':
                        return (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" fill="#F7DF1E"/>
                            <path d="M6.5 15.5l1.5-1 1 2.5-1.5 1-1-2.5zm4.5-2l2-1 1.5 3-2 1-1.5-3zm3.5 5.5l1.5-1 1 2.5-1.5 1-1-2.5z" fill="#000000"/>
                          </svg>
                        );
                      case 'Git':
                        return (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.658 2.66a1.838 1.838 0 011.958 2.96 1.838 1.838 0 01-2.6 0 1.838 1.838 0 01-.203-2.076l-2.48-2.48v6.537a1.838 1.838 0 01.484 3.049 1.838 1.838 0 01-2.599 0 1.838 1.838 0 01.484-3.049V8.146a1.838 1.838 0 01-.997-2.405L7.74 2.98.452 10.267a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.188 0l10.426-10.426a1.55 1.55 0 000-2.188" fill="#F05032"/>
                          </svg>
                        );
                      case 'C':
                        return (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M16.5921 9.1962C16.5921 5.9482 13.9641 3.3202 10.7161 3.3202C7.4681 3.3202 4.8401 5.9482 4.8401 9.1962C4.8401 12.4442 7.4681 15.0722 10.7161 15.0722C13.9641 15.0722 16.5921 12.4442 16.5921 9.1962Z" fill="#A8B9CC"/>
                            <path d="M10.7161 3.8202C7.7441 3.8202 5.3401 6.2242 5.3401 9.1962C5.3401 12.1682 7.7441 14.5722 10.7161 14.5722C13.6881 14.5722 16.0921 12.1682 16.0921 9.1962C16.0921 6.2242 13.6881 3.8202 10.7161 3.8202ZM10.7161 13.5722C8.2961 13.5722 6.3401 11.6162 6.3401 9.1962C6.3401 6.7762 8.2961 4.8202 10.7161 4.8202C13.1361 4.8202 15.0921 6.7762 15.0921 9.1962C15.0921 11.6162 13.1361 13.5722 10.7161 13.5722Z" fill="#5C6BC0"/>
                          </svg>
                        );
                      default:
                        return <span style={{ fontSize: '16px', lineHeight: 1, opacity: 1 }}>{skill.icon}</span>;
                    }
                  };

                  return (
                    <motion.div 
                      key={skill.name}
                      title={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        opacity: 1,
                        scale: 1.05
                      }}
                      style={{
                        fontFamily: monoFont,
                        fontSize: '12px',
                        fontWeight: 500,
                        color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
                        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                        padding: '10px 14px',
                        borderRadius: '0',
                        cursor: 'default',
                        transition: 'all 0.2s ease',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        filter: 'brightness(1.2) saturate(1.2)'
                      }}
                      onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
                        e.currentTarget.style.color = isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)';
                        e.currentTarget.style.filter = 'brightness(1.4) saturate(1.3)';
                      }}
                      onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
                        e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)';
                        e.currentTarget.style.filter = 'brightness(1.2) saturate(1.2)';
                      }}
                    >
                      {getSkillIcon(skill.name)}
                      <span>{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
