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
  type: 'section' | 'project' | 'blog';
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

  // Define all searchable items
  const allItems: SearchResult[] = [
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
    },
    ...projects.map(project => ({
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
    })),
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

  // Filter results based on query
  const results = query.trim() === ''
    ? allItems
    : allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        results[selectedIndex].action();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
          maxWidth: '600px',
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
        <div style={{ padding: '20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
          <input
            type="text"
            placeholder="Search projects, blog, sections..."
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontFamily: monoFont,
              color: isDark ? '#ffffff' : '#000000',
              padding: '0'
            }}
          />
        </div>

        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {results.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', fontFamily: monoFont, fontSize: '14px' }}>
              No results found
            </div>
          ) : (
            results.map((result, index) => (
              <div
                key={result.id}
                onClick={result.action}
                style={{
                  padding: '12px 20px',
                  cursor: 'pointer',
                  background: selectedIndex === index
                    ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')
                    : 'transparent',
                  borderLeft: selectedIndex === index
                    ? `3px solid ${isDark ? '#ffffff' : '#000000'}`
                    : '3px solid transparent',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span style={{ fontSize: '20px' }}>{getTypeIcon(result.type)}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: monoFont, fontSize: '14px', fontWeight: 500, color: isDark ? '#ffffff' : '#000000', marginBottom: '2px' }}>
                    {result.title}
                  </div>
                  {result.description && (
                    <div style={{ fontFamily: monoFont, fontSize: '12px', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                      {result.description.length > 60 ? result.description.slice(0, 60) + '...' : result.description}
                    </div>
                  )}
                </div>
                <span style={{ fontFamily: monoFont, fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>
                  {result.type}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, display: 'flex', gap: '16px', fontSize: '11px', fontFamily: monoFont, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
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
