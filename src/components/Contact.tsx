/**
 * Contact / CTA Section
 * Minimal, centered call-to-action before the footer
 * Confident, calm, developer-portfolio tone
 */

import { useContext, useState, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const Contact = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';
  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
    // Don't lock scroll - allow background to be visible and scrollable
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="contact"
      className="site-section"
      style={{
        background: 'var(--color-bg)',
        position: 'relative',
        zIndex: 1,
        minHeight: '60vh'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full text-center"
          style={{
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: '0px',
            padding: '48px 60px',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            ...(isHovered ? {
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)',
              boxShadow: isDark
                ? '0 0 40px rgba(255,255,255,0.02)'
                : '0 0 40px rgba(0,0,0,0.03)',
            } : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        {/* Heading */}
        <h2
          style={{
            fontFamily: monoFont,
            fontWeight: 500,
            fontSize: '20px',
            color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)',
            letterSpacing: '0.02em',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Hey, you scrolled this far — let's talk.
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.1em',
              background: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              marginLeft: '4px',
              verticalAlign: 'text-bottom',
              animation: 'cursorBlink 1s steps(1) infinite',
            }}
          />
        </h2>

        {/* CTA Button */}
        <motion.button
          onClick={openModal}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="inline-flex items-center gap-3"
          style={{
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: '8px',
            fontFamily: monoFont,
            fontWeight: 500,
            fontSize: '16px',
            padding: '18px 40px',
            marginTop: '32px',
            color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = isDark
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = isDark
              ? 'rgba(255,255,255,0.15)'
              : 'rgba(0,0,0,0.15)';
            e.currentTarget.style.boxShadow = isDark
              ? '0 4px 20px rgba(255,255,255,0.04)'
              : '0 4px 20px rgba(0,0,0,0.06)';
          }}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = isDark
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Small avatar icon */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>

          Book a Free Call
        </motion.button>
        </motion.div>
      </div>

      {/* Cal.com Modal */}
      {isModalOpen && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-out',
            pointerEvents: 'auto'
          }}
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1000px',
              height: '85vh',
              maxHeight: '750px',
              background: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.8)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Cal.com Embed Container */}
            <div
              style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                position: 'relative'
              }}
            >
              <iframe
                src="https://cal.com/gaurav-gohil/portfolio-consultation"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                title="Book a consultation"
              />
            </div>
          </motion.div>
        </div>,
        document.body
      )}

      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
