/**
 * Coming Soon Component
 * Custom page for projects under development
 */

import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

interface ComingSoonProps {
  projectTitle: string;
  description?: string;
}

const ComingSoon = ({ projectTitle, description }: ComingSoonProps): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';
  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  return (
    <div style={{ 
      background: 'var(--color-bg)', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          padding: '60px 40px',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          borderRadius: '0'
        }}
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: '24px' }}
        >
          <span
            style={{
              fontFamily: monoFont,
              fontSize: '12px',
              padding: '8px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '0',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500
            }}
          >
            Under Development
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontFamily: monoFont,
            fontSize: '32px',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}
        >
          {projectTitle}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            marginBottom: '32px'
          }}
        >
          {description || 'This project is currently under active development. Check back soon for updates!'}
        </motion.p>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ marginBottom: '32px' }}
        >
          <div style={{
            width: '100%',
            height: '4px',
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '80%' }}
              transition={{ duration: 1.5, delay: 0.8 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #ef4444, #f97316)',
                borderRadius: '2px'
              }}
            />
          </div>
          <p style={{
            fontFamily: monoFont,
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            marginTop: '8px',
            textAlign: 'center'
          }}>
            Development Progress: 80%
          </p>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{ marginBottom: '32px' }}
        >
          <h3 style={{
            fontFamily: monoFont,
            fontSize: '14px',
            color: 'var(--color-text)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Coming Features
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            textAlign: 'left'
          }}>
            {[
              'AI-Powered Recommendations',
              'Interactive User Interface',
              'Real-time Data Processing',
              'Advanced Filtering Options'
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)'
                }}
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  background: '#4ade80',
                  borderRadius: '50%'
                }} />
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.history.back()}
          style={{
            fontFamily: monoFont,
            fontSize: '14px',
            padding: '12px 24px',
            background: 'transparent',
            color: 'var(--color-text)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
            borderRadius: '0',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Projects
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ComingSoon;