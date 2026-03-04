/**
 * Hero Component
 * Minimal, clean, developer-focused landing section
 */

import { useContext } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

interface TerminalColors {
  close: string;
  minimize: string;
  maximize: string;
}

interface TerminalStyle {
  bg: string;
  headerBg: string;
  border: string;
  text: string;
  muted: string;
  prompt: string;
  command: string;
  output: string;
  shadow: string;
  controls: TerminalColors;
}

interface TerminalLine {
  command: string;
  output?: string | string[];
  cursor?: boolean;
}

const Hero = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';

  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  // Terminal styling - pure black, minimal
  const terminal: TerminalStyle = {
    bg: isDark ? '#0a0a0a' : '#ffffff',
    headerBg: isDark ? '#111111' : '#f8f8f8',
    border: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.1)',
    text: isDark ? '#e5e5e5' : '#1a1a1a',
    muted: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
    prompt: isDark ? '#6ee7b7' : '#555555',
    command: isDark ? '#f5f5f5' : '#1a1a1a',
    output: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.55)',
    shadow: isDark 
      ? '0 4px 24px rgba(0, 0, 0, 0.3)'
      : '0 4px 20px rgba(0, 0, 0, 0.08)',
    controls: isDark 
      ? { close: '#3a3a3a', minimize: '#3a3a3a', maximize: '#3a3a3a' }
      : { close: '#d4d4d4', minimize: '#d4d4d4', maximize: '#d4d4d4' }
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

  // Terminal content
  const terminalLines: TerminalLine[] = [
    { command: 'whoami', output: 'Gaurav' },
    { command: 'cat skills.txt', output: ['Python, Pandas, NumPy', 'Django, React, Git'] },
    { command: 'echo $STATUS', output: 'Open to opportunities' },
    { command: '', cursor: true }
  ];

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
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{ 
            gap: '80px',
            padding: '60px 0'
          }}
        >
          {/* Left Side - Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: '520px' }}
          >
            {/* Profile Picture */}
            <motion.div
              variants={itemVariants}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                marginBottom: '24px'
              }}
            >
              <img 
                src={new URL('../assets/images/avatar.jpeg', import.meta.url).href}
                alt="Gaurav"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>

            {/* Greeting */}
            <motion.p 
              variants={itemVariants}
              style={{ 
                fontFamily: monoFont,
                fontSize: '20px',
                color: 'var(--color-text-muted)',
                marginBottom: '12px',
                letterSpacing: '0.02em'
              }}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1 
              variants={itemVariants}
              style={{ 
                fontFamily: monoFont,
                fontSize: '52px',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '16px',
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}
            >
              Gaurav
            </motion.h1>

            {/* Role */}
            <motion.p 
              variants={itemVariants}
              style={{ 
                fontFamily: monoFont,
                fontSize: '16px',
                color: 'var(--color-text-secondary)',
                marginBottom: '24px',
                letterSpacing: '0.01em'
              }}
            >
              Data Scientist & Backend Developer
            </motion.p>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              style={{ 
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                marginBottom: '32px',
                maxWidth: '440px'
              }}
            >
              Passionate about turning data into insights and building 
              scalable backend solutions. I specialize in Python, Data Scientist, 
              and Web Technologies.
            </motion.p>

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
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
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
              {/* Twitter/X */}
              <motion.a 
                href="https://x.com/GauravGohi01"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                title="Follow me on X"
                aria-label="X (Twitter)"
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a 
                href="https://www.linkedin.com/in/gaurav-gohil-344758346/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                title="Connect on LinkedIn"
                aria-label="LinkedIn"
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </motion.a>

              {/* GitHub */}
              <motion.a 
                href="https://github.com/gohil-gaurav"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                title="Check out my GitHub"
                aria-label="GitHub"
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>

              {/* Email */}
              <motion.a 
                href="mailto:your.email@example.com"
                whileHover={{ y: -2 }}
                title="Send me an email"
                aria-label="Email"
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
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

          {/* Right Side - Terminal */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div 
              style={{
                background: terminal.bg,
                border: `1px solid ${terminal.border}`,
                borderRadius: '0',
                boxShadow: terminal.shadow,
                overflow: 'hidden',
                width: '380px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Terminal Header */}
              <div 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  background: terminal.headerBg,
                  borderBottom: `1px solid ${terminal.border}`
                }}
              >
                {/* Window Controls */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%',
                    background: terminal.controls.close 
                  }} />
                  <span style={{ 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%',
                    background: terminal.controls.minimize 
                  }} />
                  <span style={{ 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%',
                    background: terminal.controls.maximize 
                  }} />
                </div>
                {/* Title */}
                <span 
                  style={{ 
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: monoFont,
                    fontSize: '11px',
                    color: isDark ? '#ffffff' : '#000000',
                    letterSpacing: '0.05em'
                  }}
                >
                  terminal
                </span>
                <div style={{ width: '42px' }} />
              </div>

              {/* Terminal Body */}
              <div 
                style={{ 
                  flex: 1,
                  padding: '24px',
                  fontFamily: monoFont,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around'
                }}
              >
                {terminalLines.map((line: TerminalLine, index: number) => (
                  <div key={index}>
                    {/* Command */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontSize: '13px'
                    }}>
                      <span style={{ color: terminal.prompt }}>$</span>
                      <span style={{ color: terminal.command }}>{line.command}</span>
                      {line.cursor && (
                        <span 
                          style={{ 
                            color: terminal.command,
                            animation: 'blink 1s step-end infinite'
                          }}
                        >_</span>
                      )}
                    </div>
                    {/* Output */}
                    {line.output && (
                      <div 
                        style={{ 
                          marginTop: '6px',
                          marginLeft: '20px',
                          fontSize: '13px',
                          color: terminal.output,
                          lineHeight: 1.6
                        }}
                      >
                        {Array.isArray(line.output) 
                          ? line.output.map((text: string, i: number) => <div key={i}>{text}</div>)
                          : line.output
                        }
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
