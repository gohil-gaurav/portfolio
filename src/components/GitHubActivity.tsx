/**
 * GitHub Activity Component
 * Displays GitHub contribution calendar with exact GitHub data and styling
 */

import { useContext, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ThemeContext } from '../App';

interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubEvent {
  type: string;
  created_at: string;
}

const GitHubActivity = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const isDark: boolean = theme === 'dark';
  const username: string = 'gohil-gaurav';

  const [contributionData, setContributionData] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [lastCommitTime, setLastCommitTime] = useState<string>('Loading...');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

  // Get color based on contribution count
  const getContributionColor = (count: number): string => {
    if (count === 0) return '#161b22';
    if (count <= 3) return '#0e4429';
    if (count <= 6) return '#006d32';
    if (count <= 9) return '#26a641';
    return '#39d353';
  };

  // Fetch GitHub contribution data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Check if GitHub token is available
        if (!import.meta.env.VITE_GITHUB_TOKEN) {
          console.error('GitHub token not found in environment variables');
          console.error('Please add VITE_GITHUB_TOKEN to your .env file or Vercel environment variables');
          setIsLoading(false);
          return;
        }

        // GitHub GraphQL query for real contribution data
        const graphqlQuery = {
          query: `
            query {
              user(login: "gohil-gaurav") {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                        weekday
                      }
                    }
                  }
                }
              }
            }
          `
        };

        // Fetch real contribution data from GitHub GraphQL API
        const graphqlResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
          },
          body: JSON.stringify(graphqlQuery)
        });

        if (graphqlResponse.ok) {
          const data = await graphqlResponse.json();
          
          if (data.errors) {
            console.error('GraphQL API errors:', data.errors);
            if (data.errors[0]?.message?.includes('401')) {
              console.error('Authentication failed. Check if VITE_GITHUB_TOKEN is valid.');
            }
            setIsLoading(false);
            return;
          }
          
          if (data.data?.user?.contributionsCollection) {
            const calendar = data.data.user.contributionsCollection.contributionCalendar;
            
            // Filter out future weeks - only show weeks up to today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
            
            const filteredWeeks = calendar.weeks.filter((week: ContributionWeek) => {
              const firstDayOfWeek = new Date(week.contributionDays[0].date);
              return firstDayOfWeek <= today;
            });
            
            // Also filter future days inside the last week and remove empty weeks
            const trimmedWeeks = filteredWeeks
              .map((week: ContributionWeek) => ({
                ...week,
                contributionDays: week.contributionDays.filter((day: ContributionDay) => {
                  const dayDate = new Date(day.date);
                  dayDate.setHours(0, 0, 0, 0);
                  return dayDate <= today;
                })
              }))
              .filter((week: ContributionWeek) => week.contributionDays.length > 0); // Remove weeks with no days
            
            setContributionData(trimmedWeeks);
            setTotalContributions(calendar.totalContributions);
            console.log('Real GitHub data loaded:', calendar.totalContributions, 'contributions');
            console.log('Trimmed weeks:', trimmedWeeks.length, 'out of', calendar.weeks.length);
          } else {
            console.error('No contribution data in response:', data);
          }
        } else {
          console.error('GraphQL API error:', graphqlResponse.status, await graphqlResponse.text());
        }

        // Fetch last commit time from REST API
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`);
        
        if (eventsResponse.ok) {
          const events: GitHubEvent[] = await eventsResponse.json();
          const lastPushEvent = events.find(event => event.type === 'PushEvent');
          
          if (lastPushEvent) {
            const lastCommitDate = new Date(lastPushEvent.created_at);
            const timeAgo = formatTimeAgo(lastCommitDate);
            setLastCommitTime(timeAgo);
          } else {
            setLastCommitTime('No recent commits');
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  // Format time ago helper function
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffMs / 604800000);
    const diffMonths = Math.floor(diffMs / 2592000000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    return `${diffMonths}mo ago`;
  };

  // Get month labels based on actual contribution data
  const getMonthLabels = () => {
    if (contributionData.length === 0) return [];
    
    const months: { label: string; weekIndex: number }[] = [];
    let currentMonth = '';
    
    contributionData.forEach((week: ContributionWeek, index: number) => {
      // Only process weeks that have contribution days
      if (week.contributionDays.length === 0) return;
      
      const firstDay = new Date(week.contributionDays[0].date);
      const monthName = firstDay.toLocaleDateString('en-US', { month: 'short' });
      
      // Add label if it's a new month
      if (monthName !== currentMonth) {
        months.push({ label: monthName, weekIndex: index });
        currentMonth = monthName;
      }
    });
    
    return months;
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section 
      id="github-activity"
      style={{ 
        background: 'var(--color-bg)',
        padding: '60px 20px'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div 
            variants={itemVariants}
            style={{ 
              textAlign: 'left',
              marginBottom: '32px'
            }}
          >
            <p 
              style={{ 
                fontFamily: monoFont,
                fontSize: 'clamp(11px, 2.5vw, 13px)',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                marginBottom: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              [GITHUB ACTIVITY]
            </p>
            <h2 
              style={{ 
                fontFamily: monoFont,
                fontSize: 'clamp(24px, 5vw, 32px)',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '12px'
              }}
            >
              GitHub Activity
            </h2>
            <p 
              style={{ 
                fontFamily: monoFont,
                fontSize: 'clamp(13px, 3vw, 15px)',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                maxWidth: '600px'
              }}
            >
              My coding consistency and open source activity
            </p>
          </motion.div>

          {/* GitHub Contribution Calendar Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '12px',
              padding: 'clamp(16px, 4vw, 32px)',
              transition: 'all 0.3s ease',
              width: 'fit-content',
              maxWidth: '100%',
              overflow: 'hidden',
              margin: '0 auto'
            }}
          >
            {/* Stats Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
              flexDirection: window.innerWidth < 640 ? 'column' : 'row',
              gap: '12px',
              minWidth: 'fit-content'
            }}>
              <div style={{
                fontFamily: monoFont,
                fontSize: 'clamp(11px, 2.5vw, 14px)',
                color: '#c9d1d9'
              }}>
                <span style={{ fontWeight: 600, color: '#f0f6fc' }}>Total:</span>{' '}
                {isLoading ? (
                  <span style={{ opacity: 0.5 }}>Loading...</span>
                ) : (
                  <span style={{ display: window.innerWidth < 640 ? 'block' : 'inline' }}>
                    {totalContributions} contributions{window.innerWidth >= 640 ? ' in the last year' : ''}
                  </span>
                )}
              </div>
              <div style={{
                fontFamily: monoFont,
                fontSize: 'clamp(11px, 2.5vw, 14px)',
                color: '#c9d1d9'
              }}>
                <span style={{ fontWeight: 600, color: '#f0f6fc' }}>Last commit:</span>{' '}
                {isLoading ? (
                  <span style={{ opacity: 0.5 }}>Loading...</span>
                ) : (
                  lastCommitTime
                )}
              </div>
            </div>

            {/* Contribution Calendar Grid */}
            <div style={{ 
              background: '#0d1117',
              borderRadius: '8px',
              padding: 'clamp(12px, 3vw, 20px)',
              overflow: 'auto',
              border: '1px solid #30363d',
              width: 'fit-content',
              maxWidth: '100%',
              margin: '0 auto'
            }}>
              {/* Month Labels */}
              <div style={{
                display: 'flex',
                marginBottom: '8px',
                marginLeft: 'clamp(24px, 5vw, 32px)',
                position: 'relative',
                height: '16px',
                width: 'fit-content'
              }}>
                {getMonthLabels().map((month, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: `${month.weekIndex * 14}px`,
                      fontFamily: monoFont,
                      fontSize: 'clamp(9px, 2vw, 11px)',
                      color: '#8b949e',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {month.label}
                  </div>
                ))}
              </div>

              {/* Contribution Grid */}
              <div style={{ 
                display: 'flex', 
                gap: '3px', 
                width: 'fit-content'
              }}>
                {contributionData.length === 0 ? (
                  <div style={{
                    padding: 'clamp(20px, 5vw, 40px)',
                    textAlign: 'center',
                    color: '#8b949e',
                    fontFamily: monoFont,
                    fontSize: 'clamp(12px, 2.5vw, 14px)'
                  }}>
                    <p>Unable to load contribution data.</p>
                    <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', marginTop: '8px', opacity: 0.7 }}>
                      Check browser console for details.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Day Labels */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      marginRight: 'clamp(4px, 1.5vw, 8px)',
                      flexShrink: 0
                    }}>
                      <div style={{ height: '11px' }} />
                      <div style={{
                        fontFamily: monoFont,
                        fontSize: 'clamp(8px, 1.8vw, 10px)',
                        color: '#8b949e',
                        height: '11px',
                        lineHeight: '11px'
                      }}>Mon</div>
                      <div style={{ height: '11px' }} />
                      <div style={{
                        fontFamily: monoFont,
                        fontSize: 'clamp(8px, 1.8vw, 10px)',
                        color: '#8b949e',
                        height: '11px',
                        lineHeight: '11px'
                      }}>Wed</div>
                      <div style={{ height: '11px' }} />
                      <div style={{
                        fontFamily: monoFont,
                        fontSize: 'clamp(8px, 1.8vw, 10px)',
                        color: '#8b949e',
                        height: '11px',
                        lineHeight: '11px'
                      }}>Fri</div>
                      <div style={{ height: '11px' }} />
                    </div>

                    {/* Weeks Grid - Dynamic Width */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '3px', 
                      flexWrap: 'nowrap',
                      width: 'fit-content',
                      minWidth: 'fit-content'
                    }}>
                      {contributionData.map((week, weekIndex) => (
                        <div key={weekIndex} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          {week.contributionDays.map((day, dayIndex) => (
                            <div
                              key={dayIndex}
                              title={`${day.contributionCount} contributions on ${day.date}`}
                              style={{
                                width: '11px',
                                height: '11px',
                                backgroundColor: getContributionColor(day.contributionCount),
                                borderRadius: '2px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flexShrink: 0
                              }}
                              onMouseEnter={(e) => {
                                if (window.innerWidth >= 768) {
                                  e.currentTarget.style.transform = 'scale(1.2)';
                                  e.currentTarget.style.outline = '1px solid #8b949e';
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.outline = 'none';
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Color Legend */}
            <div style={{
              display: 'flex',
              justifyContent: window.innerWidth < 640 ? 'center' : 'flex-end',
              alignItems: 'center',
              marginTop: '16px',
              gap: 'clamp(6px, 1.5vw, 8px)',
              fontFamily: monoFont,
              fontSize: 'clamp(10px, 2vw, 12px)',
              color: '#8b949e',
              minWidth: 'fit-content'
            }}>
              <span>Less</span>
              <div style={{ display: 'flex', gap: '3px' }}>
                <div style={{ 
                  width: '11px', 
                  height: '11px', 
                  background: '#161b22', 
                  borderRadius: '2px',
                  border: '1px solid #21262d',
                  flexShrink: 0
                }} />
                <div style={{ 
                  width: '11px', 
                  height: '11px', 
                  background: '#0e4429', 
                  borderRadius: '2px',
                  flexShrink: 0
                }} />
                <div style={{ 
                  width: '11px', 
                  height: '11px', 
                  background: '#006d32', 
                  borderRadius: '2px',
                  flexShrink: 0
                }} />
                <div style={{ 
                  width: '11px', 
                  height: '11px', 
                  background: '#26a641', 
                  borderRadius: '2px',
                  flexShrink: 0
                }} />
                <div style={{ 
                  width: '11px', 
                  height: '11px', 
                  background: '#39d353', 
                  borderRadius: '2px',
                  flexShrink: 0
                }} />
              </div>
              <span>More</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
