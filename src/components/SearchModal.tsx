/**
 * SearchModal Component
 * Command palette style search for navigation
 */

import { useState, useEffect, useContext, KeyboardEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { projects } from '../data/projects';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'section' | 'project' | 'blog' | 'social';
  description?: string;
  action: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps): JSX.Element | null => {
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const monoFont = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  // Define all searchable items organized by category
  const sections: SearchResult[] = [
    {
      id: 'projects',
      title: 'Projects',
      type: 'section',
      description: 'View all my projects',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'blog',
      title: 'Blog',
      type: 'section',
      description: 'Read my blog posts',
      action: () => {
        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'about',
      title: 'About',
      type: 'section',
      description: 'Learn more about me',
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Contact',
      type: 'section',
      description: 'Get in touch',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    }
  ];

  const projectItems: SearchResult[] = projects.map(project => ({
    id: `project-${project.id}`,
    title: project.title,
    type: 'project' as const,
    description: project.description,
    action: () => {
      navigate('/projects');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      onClose();
    }
  }));

  const socialItems: SearchResult[] = [
    {
      id: 'social-x',
      title: 'X (Twitter)',
      type: 'social',
      description: 'Follow me on X',
      action: () => {
        window.open('https://x.com/GauravGohi01', '_blank');
        onClose();
      }
    },
    {
      id: 'social-linkedin',
      title: 'LinkedIn',
      type: 'social',
      description: 'Connect with me on LinkedIn',
      action: () => {
        window.open('https://www.linkedin.com/in/gaurav-gohil-344758346/', '_blank');
        onClose();
      }
    },
    {
      id: 'social-github',
      title: 'GitHub',
      type: 'social',
      description: 'Check out my code on GitHub',
      action: () => {
        window.open('https://github.com/gohil-gaurav', '_blank');
        onClose();
      }
    }
  ];

  const blogItems: SearchResult[] = [
    {
      id: 'blog-data-science',
      title: 'What is Data Science?',
      type: 'blog',
      description: 'A beginner-friendly guide to understanding data science',
      action: () => {
        window.open('https://www.quora.com/profile/Gaurav-Gohil-39/What-is-Data-Science-A-Simple-Explanation-for-Beginners', '_blank');
        onClose();
      }
    }
  ];

  const allItems: SearchResult[] = [...sections, ...projectItems, ...socialItems, ...blogItems];

  // Filter results based on query
  const filterItems = (items: SearchResult[]) => 
    query.trim() === ''
      ? items
      : items.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
        );

  const filteredSections = filterItems(sections);
  const filteredProjects = filterItems(projectItems);
  const filteredSocial = filterItems(socialItems);
  const filteredBlog = filterItems(blogItems);

  const results = [...filteredSections, ...filteredProjects, ...filteredSocial, ...filteredBlog];
  const hasResults = results.length > 0;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (results.length > 0) {
          setSelectedIndex(prev => (prev + 1) % results.length);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (results.length > 0) {
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          results[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, results, selectedIndex, onClose]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'section':
        return '📍';
      case 'project':
        return '💼';
      case 'blog':
        return '📝';
      case 'social':
        return '🔗';
      default:
        return '🔍';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
        background: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '90%',
          maxWidth: '540px',
          background: isDark ? '#1a1a1a' : '#ffffff',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          borderRadius: '12px',
          boxShadow: isDark
            ? '0 20px 60px rgba(0,0,0,0.5)'
            : '0 20px 60px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          animation: 'slideUp 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div style={{ padding: '16px 18px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
          <input
            type="text"
            placeholder="Search projects, blog, sections, social..."
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              fontFamily: monoFont,
              color: isDark ? '#ffffff' : '#000000',
              padding: '0'
            }}
          />
        </div>

        {/* Results */}
        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
          {!hasResults ? (
            <div style={{ padding: '32px 18px', textAlign: 'center', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', fontFamily: monoFont, fontSize: '13px' }}>
              No results found
            </div>
          ) : (
            <>
              {/* Sections */}
              {filteredSections.length > 0 && (
                <div>
                  <div style={{ padding: '10px 18px 6px', fontFamily: monoFont, fontSize: '11px', fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Sections
                  </div>
                  {filteredSections.map((result, index) => {
                    const globalIndex = results.indexOf(result);
                    return (
                      <div
                        key={result.id}
                        onClick={result.action}
                        style={{
                          padding: '10px 18px',
                          cursor: 'pointer',
                          background: selectedIndex === globalIndex
                            ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')
                            : 'transparent',
                          borderLeft: selectedIndex === globalIndex
                            ? `3px solid ${isDark ? '#ffffff' : '#000000'}`
                            : '3px solid transparent',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        <span style={{ fontSize: '18px' }}>{getTypeIcon(result.type)}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: monoFont, fontSize: '13px', fontWeight: 500, color: isDark ? '#ffffff' : '#000000' }}>
                            {result.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Projects */}
              {filteredProjects.length > 0 && (
                <div>
                  <div style={{ padding: '10px 18px 6px', fontFamily: monoFont, fontSize: '11px', fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Projects
                  </div>
                  {filteredProjects.map((result, index) => {
                    const globalIndex = results.indexOf(result);
                    return (
                      <div
                        key={result.id}
                        onClick={result.action}
                        style={{
                          padding: '10px 18px',
                          cursor: 'pointer',
                          background: selectedIndex === globalIndex
                            ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')
                            : 'transparent',
                          borderLeft: selectedIndex === globalIndex
                            ? `3px solid ${isDark ? '#ffffff' : '#000000'}`
                            : '3px solid transparent',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        <span style={{ fontSize: '18px' }}>{getTypeIcon(result.type)}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: monoFont, fontSize: '13px', fontWeight: 500, color: isDark ? '#ffffff' : '#000000' }}>
                            {result.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Social */}
              {filteredSocial.length > 0 && (
                <div>
                  <div style={{ padding: '10px 18px 6px', fontFamily: monoFont, fontSize: '11px', fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Social
                  </div>
                  {filteredSocial.map((result, index) => {
                    const globalIndex = results.indexOf(result);
                    return (
                      <div
                        key={result.id}
                        onClick={result.action}
                        style={{
                          padding: '10px 18px',
                          cursor: 'pointer',
                          background: selectedIndex === globalIndex
                            ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')
                            : 'transparent',
                          borderLeft: selectedIndex === globalIndex
                            ? `3px solid ${isDark ? '#ffffff' : '#000000'}`
                            : '3px solid transparent',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        <span style={{ fontSize: '18px' }}>{getTypeIcon(result.type)}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: monoFont, fontSize: '13px', fontWeight: 500, color: isDark ? '#ffffff' : '#000000' }}>
                            {result.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Blog */}
              {filteredBlog.length > 0 && (
                <div>
                  <div style={{ padding: '10px 18px 6px', fontFamily: monoFont, fontSize: '11px', fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Blog
                  </div>
                  {filteredBlog.map((result, index) => {
                    const globalIndex = results.indexOf(result);
                    return (
                      <div
                        key={result.id}
                        onClick={result.action}
                        style={{
                          padding: '10px 18px',
                          cursor: 'pointer',
                          background: selectedIndex === globalIndex
                            ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')
                            : 'transparent',
                          borderLeft: selectedIndex === globalIndex
                            ? `3px solid ${isDark ? '#ffffff' : '#000000'}`
                            : '3px solid transparent',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        <span style={{ fontSize: '18px' }}>{getTypeIcon(result.type)}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: monoFont, fontSize: '13px', fontWeight: 500, color: isDark ? '#ffffff' : '#000000' }}>
                            {result.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 18px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, display: 'flex', gap: '14px', fontSize: '10px', fontFamily: monoFont, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SearchModal;
