/**
 * Blog Component
 * Premium blog preview section with intentional "coming soon" state
 */

import { useContext, MouseEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from '../App';

interface UpcomingPost {
  id: number;
  category: string;
  title: string;
  description: string;
}

// Upcoming blog post drafts
const upcomingPosts: UpcomingPost[] = [
  {
    id: 1,
    category: 'Blogs',
    title: 'What is Data Science? A Simple Explanation for Beginners',
    description: 'A beginner-friendly guide to understanding data science, its applications, and why it matters in today\'s world.',
  }
];

const Blog = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';
  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section 
      id="blog" 
      className="py-32 md:py-40 lg:py-48"
      style={{ 
        background: isDark ? '#0f0f0f' : '#f5f5f5'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div 
          style={{ marginBottom: '80px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle label */}
          <p 
            style={{ 
              fontFamily: monoFont,
              fontSize: '11px',
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px'
            }}
          >
            [BLOG]
          </p>

          {/* Main title */}
          <div style={{ marginBottom: '20px' }}>
            <h2 
              style={{ 
                fontFamily: monoFont,
                fontSize: '32px',
                fontWeight: 600,
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
                display: 'inline-block'
              }}
            >
              Sometimes, I write.
            </h2>
          </div>

          {/* Subtitle */}
          <p 
            style={{ 
              fontSize: '15px',
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
              maxWidth: '420px',
              lineHeight: 1.6
            }}
          >
            Articles about what I'm learning, building, and discovering in tech.
          </p>
        </motion.div>

        {/* Blog Cards Grid - Full Width Single Card */}
        <div 
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            paddingBottom: '40px'
          }}
        >
          {upcomingPosts.map((post: UpcomingPost, index: number) => (
            <motion.article 
              key={post.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ 
                scale: 1.005,
                transition: { duration: 0.2 }
              }}
              style={{
                background: isDark ? '#141414' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
                borderRadius: '2px',
                padding: '24px 32px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative'
              }}
              onMouseEnter={(e: MouseEvent<HTMLElement>) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)';
                e.currentTarget.style.background = isDark ? '#171717' : '#fefefe';
              }}
              onMouseLeave={(e: MouseEvent<HTMLElement>) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
                e.currentTarget.style.background = isDark ? '#141414' : '#ffffff';
              }}
            >
              {/* Date in top right */}
              <span 
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '32px',
                  fontFamily: monoFont,
                  fontSize: '11px',
                  color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
                  letterSpacing: '0.02em'
                }}
              >
                Feb · 2026
              </span>

              {/* Category Label */}
              <span 
                style={{
                  fontFamily: monoFont,
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  display: 'inline-block',
                  width: 'fit-content'
                }}
              >
                {post.category}
              </span>

              {/* Post Title */}
              <h3 
                style={{
                  fontFamily: monoFont,
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: '12px',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em'
                }}
              >
                {post.title}
              </h3>

              {/* Description */}
              <p 
                style={{
                  fontSize: '14px',
                  lineHeight: 1.5,
                  color: 'var(--color-text-muted)',
                  marginBottom: '16px',
                  maxWidth: '720px'
                }}
              >
                {post.description}
              </p>

              {/* Read More Link */}
              <a 
                href="https://www.quora.com/profile/Gaurav-Gohil-39/What-is-Data-Science-A-Simple-Explanation-for-Beginners"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  textDecoration: 'none'
                }}
              >
                <span 
                  style={{
                    fontFamily: monoFont,
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#d97706',
                    letterSpacing: '0.02em'
                  }}
                >
                  Read →
                </span>
              </a>
            </motion.article>
          ))}
        </div>

        {/* Footer Message - Removed */}
      </div>
    </section>
  );
};

export default Blog;
