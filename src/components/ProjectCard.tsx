/**
 * ProjectCard Component
 * Premium project card with image, clean layout, and minimal styling
 */

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectStatus } from '../data/projects';
import { getSimpleIconUrl, shouldUseWhiteSimpleIcon } from '../utils/simpleIcons';

interface StatusConfig {
  label: string;
  color: string;
  bg: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isDark: boolean;
  monoFont: string;
}

// Status configuration with muted colors
const STATUS_CONFIG: Record<ProjectStatus, StatusConfig> = {
  'coming-soon': { label: 'Coming Soon', color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)' },
  'building': { label: 'Building', color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)' },
  'live': { label: 'Live', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)' }
};

// Placeholder image patterns for projects (gradient backgrounds)
const PROJECT_IMAGES: Record<number, string> = {
  1: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  2: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
  3: 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 50%, #0a0a0a 100%)'
};

const ProjectCard = ({ project, index, isDark, monoFont }: ProjectCardProps): JSX.Element => {
  const { id, title, description, techStack, githubUrl, liveUrl, status } = project;
  const navigate = useNavigate();

  const statusConfig: StatusConfig = STATUS_CONFIG[status] || STATUS_CONFIG['coming-soon'];
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.article 
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ 
        y: -6,
        transition: { duration: 0.25, ease: 'easeOut' }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isDark ? '#111111' : '#fafafa',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
        borderRadius: '0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '670px',
        boxShadow: isDark 
          ? '0 4px 20px rgba(0,0,0,0.3)' 
          : '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s ease'
      }}
    >
      {/* Project Image / Preview Area */}
      <div 
        style={{
          height: '340px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: project.image ? `url(${project.image}) center/cover` : (PROJECT_IMAGES[id] || PROJECT_IMAGES[1]),
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            filter: isHovered ? 'brightness(1.3)' : 'brightness(1.15)',
            transition: 'transform 0.4s ease, filter 0.4s ease',
            transformOrigin: 'center'
          }}
        >
          {/* Dark overlay for consistency */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: isDark 
                ? 'rgba(0,0,0,0.2)' 
                : 'rgba(255,255,255,0.05)',
              transition: 'background 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* Card Content */}
      <div 
        style={{
          padding: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Title with Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 
            style={{
              fontFamily: monoFont,
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text)',
              lineHeight: 1.3,
              flex: 1,
              marginRight: '16px'
            }}
          >
            {title}
          </h3>
          
          {/* Status Badge - Positioned next to title */}
          <div 
            className="flex items-center justify-center font-medium transition-all duration-200"
            style={{
              fontFamily: monoFont,
              fontSize: '12px',
              fontWeight: 500,
              borderRadius: '0',
              letterSpacing: '0.05em',
              width: '80px',
              height: '28px',
              textAlign: 'center',
              flexShrink: 0,
              background: statusConfig.bg,
              color: statusConfig.color,
              padding: '4px 8px'
            }}
          >
            <span>{statusConfig.label}</span>
          </div>
        </div>

        {/* Description */}
        <p 
          style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            marginBottom: '16px'
          }}
        >
          {description.length > 120 ? description.slice(0, 120) + '...' : description}
        </p>

        {/* Technologies Label */}
        <p 
          style={{
            fontFamily: monoFont,
            fontSize: '11px',
            color: 'var(--color-text)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px'
          }}
        >
          Technologies
        </p>

        {/* Tech Stack Icons */}
        <div
          className="flex items-center gap-3 flex-wrap"
          style={{
            marginBottom: '20px',
            flex: 1
          }}
        >
          {techStack.map((tech: string, i: number) => (
            <span
              key={`${tech}-${i}`}
              className="group relative flex items-center justify-center p-2.5 bg-white/5 border border-white/10 rounded-md opacity-80 hover:opacity-100 transition duration-200"
              aria-label={tech}
            >
              <img
                src={getSimpleIconUrl(tech)}
                alt={tech}
                className="w-7 h-7"
                style={{
                  filter: isDark ? 'brightness(1.28) saturate(1.12) contrast(1.08)' : 'none',
                  transition: 'filter 0.2s ease'
                }}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  // Keep the layout stable even if a specific icon slug is unavailable on CDN.
                  event.currentTarget.onerror = null;
                  const shouldUseWhiteFallback = shouldUseWhiteSimpleIcon(tech);
                  event.currentTarget.src = getSimpleIconUrl('simpleicons', shouldUseWhiteFallback);
                }}
              />

              <span
                className={`pointer-events-none invisible absolute bottom-full z-50 mb-2 flex min-h-8 min-w-24 w-max max-w-[calc(100vw-2rem)] items-center justify-center whitespace-nowrap rounded-md border border-black/10 bg-white px-3 py-1.5 text-center text-xs text-zinc-800 opacity-0 shadow-sm transition duration-150 ease-in-out group-hover:visible group-hover:opacity-100 ${
                  i === 0
                    ? 'left-0 translate-x-0'
                    : i === techStack.length - 1
                      ? 'right-0 left-auto translate-x-0'
                      : 'left-1/2 -translate-x-1/2'
                }`}
                role="tooltip"
                aria-hidden="true"
              >
                {tech}
                <span
                  className={`absolute top-full h-2 w-2 -translate-y-1/2 rotate-45 border-r border-b border-black/10 bg-white ${
                    i === 0
                      ? 'left-4 -translate-x-1/2'
                      : i === techStack.length - 1
                        ? 'right-4 translate-x-1/2'
                        : 'left-1/2 -translate-x-1/2'
                  }`}
                />
              </span>
            </span>
          ))}
        </div>

        {/* Action Buttons - View More on left, Code/Demo on right */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
          }}
        >
          {/* View More Button - Left side */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('Navigating to project:', id);
              navigate(`/project/${id}`);
            }}
            style={{
              fontFamily: monoFont,
              fontSize: '11px',
              padding: '6px 12px',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            title="View More Details"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
            View More
          </motion.button>

          {/* Action Buttons - Right side */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* View Code Button */}
            <motion.a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: monoFont,
                fontSize: '11px',
                padding: '6px 12px',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              title="View Code on GitHub"
            >
              <img
                src={getSimpleIconUrl('GitHub')}
                alt="GitHub"
                width="14"
                height="14"
                style={{ width: '14px', height: '14px', filter: isDark ? 'brightness(1.22)' : 'none' }}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = getSimpleIconUrl('simpleicons', true);
                }}
              />
              Code
            </motion.a>

            {/* Live Demo Button or Coming Soon Button */}
            {liveUrl ? (
              <motion.a 
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: monoFont,
                  fontSize: '11px',
                  padding: '6px 12px',
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  color: 'var(--color-text)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                title="View Live Demo"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Demo
              </motion.a>
            ) : status === 'building' ? (
              <motion.button
                onClick={() => {
                  navigate(`/coming-soon/${id}`);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: monoFont,
                  fontSize: '11px',
                  padding: '6px 12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                title="View Development Status"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                Preview
              </motion.button>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
