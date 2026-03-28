/**
 * ProjectCard Component
 * Premium project card with image, clean layout, and minimal styling
 */

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectStatus } from '../data/projects';

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
  'building': { label: 'Building', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
  'live': { label: 'Live', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)' }
};

// Placeholder image patterns for projects (gradient backgrounds)
const PROJECT_IMAGES: Record<number, string> = {
  1: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  2: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
  3: 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 50%, #0a0a0a 100%)'
};

const ProjectCard = ({ project, index, isDark, monoFont }: ProjectCardProps): JSX.Element => {
  const { id, filename, title, description, techStack, githubUrl, liveUrl, status } = project;
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
        minHeight: '500px',
        boxShadow: isDark 
          ? '0 4px 20px rgba(0,0,0,0.3)' 
          : '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s ease'
      }}
    >
      {/* Project Image / Preview Area */}
      <div 
        style={{
          height: '280px',
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
            className="flex items-center justify-center bg-green-500/20 text-green-400 font-medium transition-all duration-200 hover:bg-green-500/30"
            style={{
              fontFamily: monoFont,
              fontSize: '12px',
              fontWeight: 500,
              borderRadius: '0',
              letterSpacing: '0.05em',
              width: '60px',
              height: '24px',
              textAlign: 'center',
              flexShrink: 0
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
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '20px',
            flex: 1,
            alignItems: 'center'
          }}
        >
          <style>
            {`
              .tech-icon-wrapper:hover .tech-tooltip {
                opacity: 1 !important;
                transform: translateX(-50%) translateY(-12px) !important;
              }
            `}
          </style>
          {techStack.map((tech: string, i: number) => {
            // Map technology names to colored SVG icons
            const getTechIcon = (techName: string) => {
              switch(techName) {
                case 'Python':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" fill="url(#python-gradient)"/>
                      <defs>
                        <linearGradient id="python-gradient" x1="0" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#3776AB"/>
                          <stop offset="100%" stopColor="#FFD43B"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  );
                case 'Pandas':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.456zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67z" fill="#150458"/>
                    </svg>
                  );
                case 'NumPy':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M10.315 4.876L6.3048 2.8918l-4.401 2.1699 4.1186 2.0726zm.794.3894l4.2045-2.0844-4.406-2.1841-4.2045 2.0844zM5.9 15.8562l4.0107-2.0845V9.5024L5.9 11.5869zm5.8984-2.0845l4.0107 2.0845v-4.2693L11.7984 9.5024zm-5.0835-7.555l4.1186 2.0726 4.1186-2.0726-4.1186-2.0845zm12.769 2.4218l-4.401-2.1699-4.0107 1.9943 4.1186 2.0726zm-7.2924 9.3369l4.0107-2.0845v-4.2693l-4.0107 2.0845zm-1.7889 0V13.772l-4.0107-2.0845v4.2693zm.8944 8.3548l4.2045-2.0844-4.406-2.1841-4.2045 2.0844zm4.9984-2.4699l-4.0107-2.0726-4.0107 2.0726 4.0107 2.0845zm5.0835-7.555l-4.1186-2.0726-4.1186 2.0726 4.1186 2.0845zm-9.2924-9.3369l-4.401 2.1699 4.0107 1.9943 4.1186-2.0726z" fill="#4DABCF"/>
                    </svg>
                  );
                case 'Scikit-Learn':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#F7931E"/>
                      <path d="M8 10h8M8 14h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  );
                case 'Streamlit':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.2 18.947V5.053l-6 3.464v6.966l6 3.464zm7.2-4.137l-6 3.464V5.053l6 3.464v6.293z" fill="#FF4B4B"/>
                    </svg>
                  );
                case 'Matplotlib':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" stroke="#11557C" strokeWidth="2" fill="none"/>
                      <path d="M7 17L10 10L14 14L17 7" stroke="#11557C" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="7" cy="17" r="1.5" fill="#11557C"/>
                      <circle cx="10" cy="10" r="1.5" fill="#11557C"/>
                      <circle cx="14" cy="14" r="1.5" fill="#11557C"/>
                      <circle cx="17" cy="7" r="1.5" fill="#11557C"/>
                    </svg>
                  );
                case 'Seaborn':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="4" width="16" height="16" stroke="#4C72B0" strokeWidth="2" fill="none"/>
                      <path d="M8 16L10 12L12 14L14 10L16 8" stroke="#55A868" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8" cy="16" r="1.5" fill="#C44E52"/>
                      <circle cx="10" cy="12" r="1.5" fill="#8172B2"/>
                      <circle cx="12" cy="14" r="1.5" fill="#CCB974"/>
                      <circle cx="14" cy="10" r="1.5" fill="#64B5CD"/>
                      <circle cx="16" cy="8" r="1.5" fill="#4C72B0"/>
                    </svg>
                  );
                case 'Django':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.529 3.109-2.625.56-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z" fill="#092E20"/>
                    </svg>
                  );
                case 'SQLite':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M21.678 5.856c-2.372-2.371-5.52-3.676-8.86-3.676-3.338 0-6.487 1.305-8.86 3.676C1.587 8.228.282 11.377.282 14.715c0 3.34 1.305 6.488 3.676 8.86 2.373 2.372 5.522 3.677 8.86 3.677 3.34 0 6.488-1.305 8.86-3.677 2.372-2.372 3.677-5.52 3.677-8.86 0-3.338-1.305-6.487-3.677-8.859zm-8.86 19.898c-6.014 0-10.898-4.884-10.898-10.898S6.804 3.958 12.818 3.958c6.015 0 10.899 4.884 10.899 10.898s-4.884 10.898-10.899 10.898z" fill="#003B57"/>
                      <path d="M16.35 11.04h-2.532V8.508h-2.532v2.532H8.754v2.532h2.532v2.532h2.532V13.572h2.532z" fill="#003B57"/>
                    </svg>
                  );
                case 'HTML/CSS':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
                    </svg>
                  );
                case 'HTML':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
                    </svg>
                  );
                case 'CSS':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#1572B6"/>
                    </svg>
                  );
                case 'JavaScript':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" fill="#F7DF1E"/>
                      <path d="M7.5 15.5c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5v-7h-2v7c0 .5-.5 1-1 1s-1-.5-1-1h-1zm7-7h-2v7c0 1.5 1 2.5 2.5 2.5 1.5 0 2.5-1 2.5-2.5v-1h-1.5v1c0 .5-.5 1-1 1s-1-.5-1-1v-7z" fill="#000000"/>
                    </svg>
                  );
                case 'React':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" fill="#61DAFB"/>
                    </svg>
                  );
                case 'Tailwind':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
                    </svg>
                  );
                case 'Vite':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M23.834 8.101a13.912 13.912 0 0 1-13.643 11.72a10.105 10.105 0 0 1-1.994-.12a6.111 6.111 0 0 1-5.082-5.761a5.934 5.934 0 0 1 11.867-.084c.025.983-.401 1.846-1.277 1.871c-.936 0-1.374-.668-1.374-1.567v-2.5a1.531 1.531 0 0 0-1.52-1.533H8.715a3.648 3.648 0 1 0 2.695 6.08l.073-.11l.074.121a2.58 2.58 0 0 0 2.2 1.048a2.909 2.909 0 0 0 2.695-3.04a7.912 7.912 0 0 0-.217-1.933a7.404 7.404 0 0 0-14.64 1.603a7.497 7.497 0 0 0 7.308 7.405s.549.05 1.167.035a15.803 15.803 0 0 0 8.475-2.528c.036-.025.072.025.048.061a12.44 12.44 0 0 1-9.69 3.963a8.744 8.744 0 0 1-8.9-8.972a9.049 9.049 0 0 1 3.635-7.247a8.863 8.863 0 0 1 5.229-1.726h2.813a7.915 7.915 0 0 0 5.839-2.578a.11.11 0 0 1 .059-.034a.112.112 0 0 1 .12.053a.113.113 0 0 1 .015.067a7.934 7.934 0 0 1-1.227 3.549a.107.107 0 0 0-.014.06a.11.11 0 0 0 .073.095a.109.109 0 0 0 .062.004a8.505 8.505 0 0 0 5.913-4.876a.155.155 0 0 1 .055-.053a.15.15 0 0 1 .147 0a.153.153 0 0 1 .054.053A10.779 10.779 0 0 1 23.834 8.1zM8.895 11.628a2.188 2.188 0 1 0 2.188 2.188v-2.042a.158.158 0 0 0-.15-.15Z" fill="url(#vite-gradient)"/>
                      <defs>
                        <linearGradient id="vite-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#41D1FF"/>
                          <stop offset="100%" stopColor="#BD34FE"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  );
                case 'Next.js':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="11" fill="#000000"/>
                      <path d="M9 9h6v1.5H9zm0 3h6v1.5H9z" fill="#FFFFFF"/>
                      <path d="M18.5 12c0 3.59-2.91 6.5-6.5 6.5S5.5 15.59 5.5 12 8.41 5.5 12 5.5s6.5 2.91 6.5 6.5z" stroke="#FFFFFF" strokeWidth="1.5" fill="none"/>
                    </svg>
                  );
                case 'PostgreSQL':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M17.128 0c-.506.018-1.043.106-1.6.27-2.083.613-2.144 1.388-2.144 3.117v2.286h4.288v.571H11.53c-1.248 0-2.34.75-2.683 2.177-.394 1.635-.411 2.656 0 4.363.305 1.271 1.034 2.177 2.282 2.177h1.476v-1.962c0-1.418 1.227-2.668 2.683-2.668h4.286c1.194 0 2.144-.97 2.144-2.177V3.387c0-1.164-.982-2.038-2.144-2.286-.732-.156-1.494-.22-2.446-.101zm-2.43 1.32c.445 0 .806.367.806.82 0 .45-.361.815-.806.815-.444 0-.805-.365-.805-.815 0-.453.361-.82.805-.82z" fill="#336791"/>
                      <path d="M18.696 7.429v1.905c0 1.476-1.252 2.725-2.683 2.725h-4.286c-1.175 0-2.144 1.002-2.144 2.177v4.071c0 1.164 1.012 1.849 2.144 2.177 1.355.393 2.654.464 4.286 0 1.083-.308 2.144-.928 2.144-2.177v-2.286h-4.286v-.571h6.43c1.248 0 1.713-.87 2.144-2.177.444-1.346.425-2.641 0-4.363-.306-1.243-.896-2.177-2.144-2.177h-1.605zm-2.377 10.5c.445 0 .806.365.806.815 0 .453-.361.82-.806.82-.444 0-.805-.367-.805-.82 0-.45.361-.815.805-.815z" fill="#336791"/>
                    </svg>
                  );
                case 'Prisma':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M21.807 18.285L13.553.757a1.324 1.324 0 00-1.129-.754 1.31 1.31 0 00-1.206.626l-8.952 14.5a1.356 1.356 0 00.016 1.455l4.376 6.778a1.408 1.408 0 001.58.581l12.703-3.757c.389-.115.707-.39.873-.755s.164-.783-.007-1.146zm-1.848.752L9.18 22.224a.452.452 0 01-.575-.52l3.85-18.438c.072-.345.549-.4.699-.08l7.129 15.138a.515.515 0 01-.325.713z" fill="#2D3748"/>
                      <path d="M21.807 18.285L13.553.757a1.324 1.324 0 00-1.129-.754 1.31 1.31 0 00-1.206.626l-8.952 14.5a1.356 1.356 0 00.016 1.455l4.376 6.778a1.408 1.408 0 001.58.581l12.703-3.757c.389-.115.707-.39.873-.755s.164-.783-.007-1.146zm-1.848.752L9.18 22.224a.452.452 0 01-.575-.52l3.85-18.438c.072-.345.549-.4.699-.08l7.129 15.138a.515.515 0 01-.325.713z" fill="url(#prisma-gradient)"/>
                      <defs>
                        <linearGradient id="prisma-gradient" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#5A67D8"/>
                          <stop offset="100%" stopColor="#2D3748"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  );
                case 'NextAuth':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="#000000"/>
                      <path d="M12 7v10M7 12h10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="2" fill="#FFFFFF"/>
                    </svg>
                  );
                case 'Radix UI':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#000000"/>
                      <path d="M12 6v12M6 12h12" stroke="#FFFFFF" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="#FFFFFF" strokeWidth="2" fill="none"/>
                    </svg>
                  );
                case 'Bootstrap':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.172 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z" fill="#7952B3"/>
                    </svg>
                  );
                case 'TypeScript':
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="2" fill="#3178C6"/>
                      <path d="M12.5 15.5v3.5h1.75v-3.5h2.5v-1.5h-6.5v1.5h2.25zm4.5-5.5v-1.5h-6v1.5h2v6h2v-6h2z" fill="#FFFFFF"/>
                      <path d="M13.5 7h-3v1.5h3V7zm-3 3h3v1.5h-3V10z" fill="#FFFFFF"/>
                    </svg>
                  );
                default:
                  return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#888888" strokeWidth="2"/>
                      <path d="M12 8v8M8 12h8" stroke="#888888" strokeWidth="2"/>
                    </svg>
                  );
              }
            };
            
            return (
              <span 
                key={i}
                className="tech-icon-wrapper"
                style={{
                  display: 'inline-flex',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  filter: 'brightness(1.3) saturate(1.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.5) saturate(1.3)';
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.3) saturate(1.2)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {getTechIcon(tech)}
                {/* Tooltip */}
                <span
                  className="tech-tooltip"
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-8px)',
                    background: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.9)',
                    color: isDark ? '#000000' : '#ffffff',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: monoFont,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    zIndex: 10,
                    boxShadow: isDark 
                      ? '0 4px 12px rgba(0,0,0,0.3)' 
                      : '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  {tech}
                  {/* Arrow */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: `5px solid ${isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.9)'}`,
                    }}
                  />
                </span>
              </span>
            );
          })}
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </motion.a>

            {/* Live Demo Button (only if liveUrl exists) */}
            {liveUrl && (
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
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
