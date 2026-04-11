/**
 * About Component
 * Personal introduction with minimal, developer-focused aesthetic
 */

import { useContext, MouseEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from '../App';
import avatarImg from '../assets/images/avatar.jpeg';
import { getSimpleIconUrl, shouldUseWhiteSimpleIcon } from '../utils/simpleIcons';

interface Skill {
  name: string;
  letter: string;
}

// Skills
const skills: Skill[] = [
  { name: 'Python', letter: 'Py' },
  { name: 'NumPy', letter: 'Np' },
  { name: 'Pandas', letter: 'Pd' },
  { name: 'Django', letter: 'Dj' },
  { name: 'React', letter: 'Re' },
  { name: 'JavaScript', letter: 'Js' },
  { name: 'Git', letter: 'Gt' },
  { name: 'C', letter: 'C' }
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
      className="site-section"
      style={{ 
        background: 'var(--color-bg)',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16 lg:gap-20 items-start justify-items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
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
                src={avatarImg}
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
              className="site-section-title"
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
                  const skillIconUrl = getSimpleIconUrl(skill.name);

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
                      <img
                        src={skillIconUrl}
                        alt={skill.name}
                        width="20"
                        height="20"
                        style={{
                          width: '20px',
                          height: '20px',
                          filter: isDark ? 'brightness(1.25) saturate(1.1)' : 'none'
                        }}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          const shouldUseWhiteFallback = shouldUseWhiteSimpleIcon(skill.name);
                          event.currentTarget.src = getSimpleIconUrl('simpleicons', shouldUseWhiteFallback);
                        }}
                      />
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
