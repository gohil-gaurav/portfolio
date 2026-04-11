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
      className="site-section"
      style={{ 
        background: 'var(--color-bg)'
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
            className="site-section-title"
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
          style={{ gap: '32px', marginBottom: '60px' }}
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

      </div>
    </section>
  );
};

export default Projects;
