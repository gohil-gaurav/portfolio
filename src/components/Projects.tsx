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

  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show 2 projects on mobile, 4 on desktop
  const projectsToShow = isMobile ? 2 : 4;

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
          style={{ marginBottom: '60px' }}
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

        {/* Projects Grid - Responsive */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '32px', marginBottom: '60px', maxWidth: '1000px', margin: '0 auto 60px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.slice(0, projectsToShow).map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              isDark={isDark}
              monoFont={monoFont}
            />
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div 
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/projects" style={{ textDecoration: 'none' }}>
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
              View All Projects
              <span>→</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
