/**
 * Projects Component
 * Premium project cards section with minimal, developer-focused aesthetic
 */

import { useContext, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { getSimpleIconUrl } from '../utils/simpleIcons';

const Projects = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';
  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  // State to track if we're on mobile and active filter
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('All Work');

  const filters = ['All Work', 'Full Stack', 'AI / ML', 'Web Apps', 'Hackathons'];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All Work' 
    ? projects 
    : projects.filter(project => {
        // Map new filter names to old tag names
        const filterMap: { [key: string]: string } = {
          'Full Stack': 'Django',
          'AI / ML': 'ML',
          'Web Apps': 'Web',
          'Hackathons': 'Hackathon'
        };
        const tagToMatch = filterMap[activeFilter];
        return tagToMatch ? project.tags.includes(tagToMatch) : false;
      });

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show 2 projects on mobile, 4 on desktop (from filtered projects)
  const projectsToShow = isMobile ? 2 : 4;
  const displayProjects = filteredProjects.slice(0, projectsToShow);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  return (
    <section 
      id="projects" 
      style={{ 
        background: 'var(--color-bg)',
        paddingTop: '60px',
        paddingBottom: '120px'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div 
          style={{ marginBottom: '40px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p 
            style={{ 
              fontFamily: monoFont,
              fontSize: '12px',
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px'
            }}
          >
            [PROJECTS]
          </p>
          <h2 
            className="text-2xl md:text-3xl"
            style={{ 
              fontFamily: monoFont,
              fontWeight: 600,
              color: 'var(--color-text)',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}
          >
            My Work
          </h2>
          <p 
            style={{ 
              fontSize: '15px',
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
              maxWidth: '480px',
              lineHeight: 1.6
            }}
          >
            Projects where I turn data into insights and ideas into real applications.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '48px',
            padding: '0 16px' // Add padding for mobile
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div style={{
            display: 'flex',
            flexWrap: isMobile ? 'wrap' : 'nowrap', // Wrap on mobile
            gap: '2px',
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            borderRadius: '0px', // Square border
            padding: '4px',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
          }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  fontFamily: monoFont,
                  fontSize: isMobile ? '11px' : '13px', // Smaller font on mobile
                  padding: isMobile ? '10px 16px' : '14px 32px', // Smaller padding on mobile
                  background: activeFilter === filter 
                    ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')
                    : 'transparent',
                  color: activeFilter === filter 
                    ? 'var(--color-text)' 
                    : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'),
                  border: 'none',
                  borderRadius: '0px', // Square border
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: activeFilter === filter ? 500 : 400,
                  minWidth: isMobile ? 'auto' : '100px', // Remove min-width on mobile
                  whiteSpace: 'nowrap',
                  flex: isMobile ? '1' : 'none' // Equal width on mobile
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                    e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
                  }
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid - Responsive */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '32px', marginBottom: '60px', maxWidth: '1000px', margin: '0 auto 60px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          key={activeFilter} // Re-animate when filter changes
        >
          {displayProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              isDark={isDark}
              monoFont={monoFont}
            />
          ))}
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              fontFamily: monoFont,
              fontSize: '14px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            No projects found for "{activeFilter}" category.
          </motion.div>
        )}

        {/* View All Link - Always show with filter-specific text */}
        {filteredProjects.length > 0 && (
          <motion.div 
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to={`/projects?filter=${encodeURIComponent(activeFilter)}`} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: monoFont,
                  fontSize: '13px',
                  padding: '12px 28px',
                  background: 'transparent',
                  color: 'var(--color-text)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                  borderRadius: '0',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {activeFilter === 'All Work' 
                  ? 'View All Projects'
                  : `View All ${activeFilter} Projects`
                }
                <span>→</span>
              </motion.div>
            </Link>
          </motion.div>
        )}

        {/* AI Models Hub Section - Only show in AI/ML and All Work tabs */}
        {(activeFilter === 'AI / ML' || activeFilter === 'All Work') && (
          <motion.div
            style={{
              marginTop: '80px',
              paddingTop: '40px',
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              maxWidth: '1000px',
              margin: '80px auto 0'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Section Header */}
            <div style={{ marginBottom: '32px', textAlign: 'left' }}>
              <h3 
                style={{
                  fontFamily: monoFont,
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: '12px',
                  letterSpacing: '-0.02em'
                }}
              >
                AI Models Hub
              </h3>
              <p 
                style={{
                  fontSize: '15px',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  maxWidth: '600px',
                  margin: '0 0 24px 0',
                  lineHeight: 1.6
                }}
              >
                A modular collection of machine learning systems including fraud detection, spam classification, and recommendation engines.
              </p>
              
              {/* Explore Repository Button */}
              <motion.a
                href="https://github.com/gohil-gaurav/ml-projects-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: monoFont,
                  fontSize: '13px',
                  padding: '12px 24px',
                  background: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                  color: '#8b5cf6',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '0',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
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
                Explore Repository
              </motion.a>
            </div>

            {/* AI Models List - 2 Column Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '16px',
              maxWidth: '1000px'
            }}>
              {[
                {
                  name: 'Fraud Detection System',
                  tag: 'Classification',
                  description: 'Machine learning model to detect fraudulent transactions using advanced algorithms',
                  githubLink: 'https://github.com/gohil-gaurav/ml-projects-portfolio/tree/main/Fraud%20Detection'
                },
                {
                  name: 'Spam Classifier',
                  tag: 'NLP',
                  description: 'Natural language processing model for email spam detection and filtering',
                  githubLink: 'https://github.com/gohil-gaurav/ai-models-hub/tree/main/spam-classifier'
                },
                {
                  name: 'Customer Churn Prediction',
                  tag: 'Random Forest',
                  description: 'Machine learning model to predict customer churn using behavioral data and analytics',
                  githubLink: 'https://github.com/gohil-gaurav/ml-projects-portfolio/tree/main/Customer%20Churn%20Prediction'
                }
              ].map((model, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{
                    padding: '24px',
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    borderRadius: '0',
                    transition: 'all 0.2s ease'
                  }}
                  whileHover={{
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                    y: -2
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <h4 style={{
                      fontFamily: monoFont,
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: 0
                    }}>
                      {model.name}
                    </h4>
                    <span style={{
                      fontFamily: monoFont,
                      fontSize: '11px',
                      padding: '4px 12px',
                      background: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                      color: '#8b5cf6',
                      borderRadius: '0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 500
                    }}>
                      {model.tag}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: '0 0 16px 0'
                  }}>
                    {model.description}
                  </p>
                  <a
                    href={model.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: monoFont,
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s ease',
                      padding: '6px 12px',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      borderRadius: '0'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-text)';
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.background = 'transparent';
                    }}
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
                    View Code
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
