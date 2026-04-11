/**
 * Project Detail Page
 * Shows detailed information about a specific project
 */

import { useContext, useEffect, useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { projects, Project } from '../data/projects';
import { getSimpleIconUrl, shouldUseWhiteSimpleIcon } from '../utils/simpleIcons';

// Custom hook for responsive design
const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowWidth < 768,
    isTablet: windowWidth >= 768 && windowWidth < 1024,
    isDesktop: windowWidth >= 1024
  };
};

const ProjectDetail = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams<{ id: string }>();
  const { isMobile, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const isDark: boolean = theme === 'dark';
  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  const [project, setProject] = useState<Project | null>(null);

  // Enhanced content for Movie Recommendation System
  const getProjectContent = (projectId: number) => {
    if (projectId === 2) { // Movie Recommendation System
      return {
        aboutProject: "CineVault is an AI-powered movie recommendation platform that suggests similar movies using a content-based model (TF-IDF + cosine similarity). Integrated with TMDB API for real-time movie data.",
        projectOverview: "An end-to-end ML + full-stack project where a FastAPI backend serves recommendations and a React frontend delivers a responsive, Netflix-style movie discovery experience.",
        keyHighlights: [
          {
            title: "AI Recommendation Engine",
            description: "Content-based filtering using TF-IDF and cosine similarity",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.07 2.07 0 0 1-2.44-2.44 2.07 2.07 0 0 1-2.44-2.44 2.07 2.07 0 0 1-2.44-2.44A2.5 2.5 0 0 1 2.5 9.5h15A2.5 2.5 0 0 1 9.5 2Z"/>
              </svg>
            )
          },
          {
            title: "TMDB API Integration",
            description: "Real-time movie data with posters, ratings, and genres",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="m16 10-4-4-4 4"/>
                <path d="M12 6v8"/>
              </svg>
            )
          },
          {
            title: "Full-Stack Architecture",
            description: "FastAPI backend with React frontend for seamless UX",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            )
          },
          {
            title: "Smart Watchlist",
            description: "Persistent user preferences with localStorage",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
              </svg>
            )
          },
          {
            title: "Cloud Deployment",
            description: "Production-ready hosting on Vercel and Render",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
            )
          },
          {
            title: "Netflix-Style UI",
            description: "Modern, responsive interface with smooth animations",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="15" x="2" y="3" rx="2" ry="2"/>
                <path d="m10 21 4-10 4 10"/>
                <path d="M6 21h12"/>
              </svg>
            )
          }
        ]
      };
    }
    return {
      aboutProject: project?.description || "",
      projectOverview: "This project demonstrates modern web development practices with a focus on user experience, performance, and maintainable code architecture.",
      keyHighlights: []
    };
  };

  const projectContent = getProjectContent(project?.id || 0);

  useEffect(() => {
    console.log('ProjectDetail received ID:', id);
    if (id) {
      const foundProject = projects.find(p => p.id === parseInt(id));
      console.log('Found project:', foundProject);
      setProject(foundProject || null);
    }
  }, [id]);

  // Loading state
  if (!project && id) {
    return (
      <div style={{ 
        background: 'var(--color-bg)', 
        minHeight: '100vh', 
        paddingTop: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: 'var(--color-text)' }}>Loading...</div>
      </div>
    );
  }

  // If project not found after loading, redirect to projects page
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const statusConfig = {
    'coming-soon': { label: 'Coming Soon', color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)' },
    'building': { label: 'Building', color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)' },
    'live': { label: 'Live', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)' }
  };

  const currentStatus = statusConfig[project.status];

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <Link 
            to="/projects"
            style={{
              fontFamily: monoFont,
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.2s ease'
            }}
          >
            <span>←</span> Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '32px' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <h1 
              style={{ 
                fontFamily: monoFont,
                fontSize: isMobile ? '24px' : '36px',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: 0,
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              {project.title}
            </h1>
            
            {/* Status Badge */}
            <div 
              className="flex items-center justify-center font-medium"
              style={{
                fontFamily: monoFont,
                fontSize: '12px',
                fontWeight: 500,
                borderRadius: '0',
                letterSpacing: '0.05em',
                width: '80px',
                height: '28px',
                textAlign: 'center',
                background: currentStatus.bg,
                color: currentStatus.color,
                padding: '4px 8px'
              }}
            >
              <span>{currentStatus.label}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <motion.a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: monoFont,
                fontSize: '12px',
                padding: '10px 20px',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                borderRadius: '0',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                minWidth: '120px',
                justifyContent: 'center'
              }}
            >
              <img
                src={getSimpleIconUrl('GitHub')}
                alt="GitHub"
                width="16"
                height="16"
                style={{ width: '16px', height: '16px', filter: isDark ? 'brightness(1.22)' : 'none' }}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = getSimpleIconUrl('simpleicons', true);
                }}
              />
              View Code
            </motion.a>

            {project.liveUrl ? (
              <motion.a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: monoFont,
                  fontSize: '12px',
                  padding: '10px 20px',
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  color: 'var(--color-text)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                  borderRadius: '0',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  minWidth: '120px',
                  justifyContent: 'center'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Live Demo
              </motion.a>
            ) : project.status === 'building' ? (
              <motion.button
                onClick={() => {
                  navigate(`/coming-soon/${project.id}`);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: monoFont,
                  fontSize: '12px',
                  padding: '10px 20px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '0',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  minWidth: '120px',
                  justifyContent: 'center'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                Preview
              </motion.button>
            ) : null}
          </div>
        </motion.div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: '40px' }}
        >
          <div
            style={{
              width: '100%',
              height: isMobile ? '300px' : '450px',
              background: project.image ? `url(${project.image}) center/cover` : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              borderRadius: '0',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
              overflow: 'hidden'
            }}
          />
        </motion.div>

        {/* 2-Column Layout: About Project (Left) and Technologies (Right) */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2" 
          style={{ 
            gap: isDesktop ? '60px' : '32px', 
            marginBottom: isMobile ? '40px' : '60px' 
          }}
        >
          {/* About Project - Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 
              style={{ 
                fontFamily: monoFont,
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '16px',
                letterSpacing: '-0.01em'
              }}
            >
              About Project
            </h2>
            
            {/* Enhanced content for Movie Recommendation System */}
            {project?.id === 2 ? (
              <div>
                {/* About Project - Always visible */}
                <div style={{ marginBottom: '32px' }}>
                  <p 
                    style={{ 
                      fontSize: isMobile ? '14px' : '16px',
                      lineHeight: 1.7,
                      color: 'var(--color-text-secondary)',
                      margin: 0
                    }}
                  >
                    {projectContent.aboutProject}
                  </p>
                </div>

                {/* Project Overview - Always visible */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 
                    style={{ 
                      fontFamily: monoFont,
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: '16px',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Project Overview
                  </h3>
                  <p 
                    style={{ 
                      fontSize: isMobile ? '14px' : '16px',
                      lineHeight: 1.7,
                      color: 'var(--color-text-secondary)',
                      margin: 0
                    }}
                  >
                    {projectContent.projectOverview}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p 
                  style={{ 
                    fontSize: isMobile ? '14px' : '16px',
                    lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '24px'
                  }}
                >
                  {project?.description}
                </p>
              </div>
            )}
          </motion.div>

          {/* Technologies - Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 
              style={{ 
                fontFamily: monoFont,
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '16px',
                letterSpacing: '-0.01em'
              }}
            >
              Technologies
            </h2>
            
            {/* Tech Stack Icons */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? '12px' : '16px',
                alignItems: 'center'
              }}
            >
              {project.techStack.map((tech: string, i: number) => (
                <span
                  key={`${tech}-${i}`}
                  className="group relative flex items-center justify-center p-2.5 bg-white/5 border border-white/10 rounded-md opacity-80 hover:opacity-100 transition duration-200"
                  aria-label={tech}
                >
                  <img
                    src={getSimpleIconUrl(tech)}
                    alt={tech}
                    className={isMobile ? 'w-7 h-7' : 'w-8 h-8'}
                    style={{
                      filter: isDark ? 'brightness(1.28) saturate(1.12) contrast(1.08)' : 'none',
                      transition: 'filter 0.2s ease'
                    }}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      const shouldUseWhiteFallback = shouldUseWhiteSimpleIcon(tech);
                      event.currentTarget.src = getSimpleIconUrl('simpleicons', shouldUseWhiteFallback);
                    }}
                  />

                  <span
                    className={`pointer-events-none invisible absolute bottom-full z-50 mb-2 flex min-h-8 min-w-24 w-max max-w-[calc(100vw-2rem)] items-center justify-center whitespace-nowrap rounded-md border border-black/10 bg-white px-3 py-1.5 text-center text-xs text-zinc-800 opacity-0 shadow-sm transition duration-150 ease-in-out group-hover:visible group-hover:opacity-100 ${
                      i === 0
                        ? 'left-0 translate-x-0'
                        : i === project.techStack.length - 1
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
                          : i === project.techStack.length - 1
                            ? 'right-4 translate-x-1/2'
                            : 'left-1/2 -translate-x-1/2'
                      }`}
                    />
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Key Features - Separate Full-Width Section */}
        {project?.id === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ 
              marginBottom: isMobile ? '60px' : '80px',
              paddingTop: isMobile ? '0px' : '20px'
            }}
          >
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
              <h2 
                style={{ 
                  fontFamily: monoFont,
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: '32px',
                  letterSpacing: '-0.01em',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  opacity: 0.9
                }}
              >
                Key Features
              </h2>
              
              {/* Features Grid - Professional Square Cards */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: '16px'
                }}
              >
                {projectContent.keyHighlights.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ 
                      scale: 1.01,
                      transition: { duration: 0.2, ease: 'easeOut' }
                    }}
                    style={{
                      background: isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                      borderRadius: '0px', // Square borders
                      padding: '24px',
                      cursor: 'default',
                      transition: 'all 0.25s ease',
                      backdropFilter: 'blur(8px)',
                      boxShadow: isDark 
                        ? '0 2px 12px rgba(0, 0, 0, 0.15)' 
                        : '0 2px 12px rgba(0, 0, 0, 0.04)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      minHeight: '90px'
                    }}
                    onMouseEnter={(e) => {
                      const element = e.currentTarget;
                      element.style.background = isDark ? 'rgba(22, 22, 22, 0.9)' : 'rgba(255, 255, 255, 0.95)';
                      element.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                      element.style.boxShadow = isDark 
                        ? '0 4px 24px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.05)' 
                        : '0 4px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      const element = e.currentTarget;
                      element.style.background = isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.9)';
                      element.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
                      element.style.boxShadow = isDark 
                        ? '0 2px 12px rgba(0, 0, 0, 0.15)' 
                        : '0 2px 12px rgba(0, 0, 0, 0.04)';
                    }}
                  >
                    {/* Icon - Left Side */}
                    <div 
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '0px', // Square icon container
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <div style={{ 
                        color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                        fontSize: '20px'
                      }}>
                        {feature.icon}
                      </div>
                    </div>
                    
                    {/* Content - Right Side */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4
                        style={{
                          fontFamily: monoFont,
                          fontSize: isMobile ? '14px' : '15px',
                          fontWeight: 600,
                          color: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.9)',
                          marginBottom: '8px',
                          lineHeight: 1.3,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {feature.title}
                      </h4>
                      <p
                        style={{
                          fontSize: isMobile ? '12px' : '13px',
                          lineHeight: 1.5,
                          color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                          margin: 0,
                          fontWeight: 400
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;