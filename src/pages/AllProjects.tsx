/**
 * All Projects Page
 * Dedicated page showing all projects in detail
 */

import { useContext, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from '../App';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { Link, useSearchParams } from 'react-router-dom';

const AllProjects = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';
  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";
  
  // Get URL search params
  const [searchParams] = useSearchParams();
  const filterFromUrl = searchParams.get('filter') || 'All Work';

  // Filter state - initialize with URL parameter
  const [activeFilter, setActiveFilter] = useState<string>(filterFromUrl);

  const filters = ['All Work', 'Full Stack', 'AI / ML', 'Web Apps', 'Hackathons'];

  // Update filter when URL changes
  useEffect(() => {
    const urlFilter = searchParams.get('filter') || 'All Work';
    if (filters.includes(urlFilter)) {
      setActiveFilter(urlFilter);
    }
  }, [searchParams]);

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <Link 
            to="/"
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
            <span>←</span> Back to Home
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div 
          style={{ marginBottom: '60px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p 
            style={{ 
              fontFamily: monoFont,
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px'
            }}
          >
            // ALL PROJECTS
          </p>
          <h1 
            style={{ 
              fontFamily: monoFont,
              fontSize: '36px',
              fontWeight: 600,
              color: 'var(--color-text)',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}
          >
            My Work
          </h1>
          <p 
            style={{ 
              fontSize: '15px',
              color: 'var(--color-text-muted)',
              maxWidth: '600px',
              lineHeight: 1.6
            }}
          >
            A comprehensive collection of projects I've built, ranging from data analysis 
            dashboards to full-stack web applications. Each project represents a unique 
            challenge and learning experience.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '48px'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div style={{
            display: 'flex',
            gap: '2px',
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            borderRadius: '8px',
            padding: '4px',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
          }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  fontFamily: monoFont,
                  fontSize: '13px',
                  padding: '14px 32px',
                  background: activeFilter === filter 
                    ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')
                    : 'transparent',
                  color: activeFilter === filter 
                    ? 'var(--color-text)' 
                    : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'),
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: activeFilter === filter ? 500 : 400,
                  minWidth: '100px',
                  whiteSpace: 'nowrap'
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

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '32px', paddingBottom: '80px', maxWidth: '1000px', margin: '0 auto' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter} // Re-animate when filter changes
        >
          {filteredProjects.map((project, index) => (
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
      </div>
    </div>
  );
};

export default AllProjects;