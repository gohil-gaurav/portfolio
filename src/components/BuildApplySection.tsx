/**
 * BuildApplySection Component
 * Unified section combining workflow and real-world AI implementations
 */

import { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  FiBarChart2,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
  FiDatabase,
  FiFilter,
  FiGithub,
  FiSliders,
  FiTarget
} from 'react-icons/fi';
import { IconType } from 'react-icons';

interface WorkflowStep {
  title: string;
  description: string;
  icon: IconType;
}

interface ModelProject {
  title: string;
  description: string;
  tag: string;
  githubUrl: string;
}

const workflowSteps: WorkflowStep[] = [
  { title: 'Problem', description: 'Define objective and success criteria.', icon: FiTarget },
  { title: 'Data', description: 'Collect relevant, trustworthy sources.', icon: FiDatabase },
  { title: 'Cleaning', description: 'Fix quality issues and standardize inputs.', icon: FiFilter },
  { title: 'Features', description: 'Create useful signals from raw variables.', icon: FiSliders },
  { title: 'Model', description: 'Train and tune the best-fit approach.', icon: FiCpu },
  { title: 'Evaluation', description: 'Validate performance on real scenarios.', icon: FiCheckCircle },
  { title: 'Insights', description: 'Translate outputs into clear actions.', icon: FiBarChart2 }
];

const modelProjects: ModelProject[] = [
  {
    title: 'Fraud Detection System',
    tag: 'Classification',
    description: 'Machine learning model to identify suspicious financial transactions using robust classification techniques.',
    githubUrl: 'https://github.com/gohil-gaurav/ml-projects-portfolio/tree/main/Fraud%20Detection'
  },
  {
    title: 'Spam Classifier',
    tag: 'NLP',
    description: 'Natural language workflow for email spam detection with practical feature engineering and evaluation.',
    githubUrl: 'https://github.com/gohil-gaurav/ai-models-hub/tree/main/spam-classifier'
  },
  {
    title: 'Customer Churn Prediction',
    tag: 'Random Forest',
    description: 'Predictive model for churn risk analysis to help prioritize retention actions and improve outcomes.',
    githubUrl: 'https://github.com/gohil-gaurav/ml-projects-portfolio/tree/main/Customer%20Churn%20Prediction'
  }
];

const BuildApplySection = (): JSX.Element => {
  const monoFont = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  const rowVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const projectCardVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  const scrollCards = (direction: 'left' | 'right'): void => {
    const scroller = carouselRef.current;
    if (!scroller) {
      return;
    }

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>('.build-apply-workflow-card'));
    if (cards.length === 0) {
      return;
    }

    const currentLeft = scroller.scrollLeft;
    const scrollerStyles = window.getComputedStyle(scroller);
    const leadingPadding = Number.parseFloat(scrollerStyles.paddingLeft) || 0;
    const epsilon = 8;

    const getCardLeft = (card: HTMLElement): number => Math.max(0, card.offsetLeft - leadingPadding);

    let currentIndex = cards.findIndex((card, index) => {
      const currentOffset = getCardLeft(card);
      const nextOffset = cards[index + 1] ? getCardLeft(cards[index + 1]) : undefined;

      if (nextOffset === undefined) {
        return currentLeft >= currentOffset - epsilon;
      }

      return currentLeft >= currentOffset - epsilon && currentLeft < nextOffset - epsilon;
    });

    if (currentIndex === -1) {
      currentIndex = cards.reduce((closestIndex, card, index) => {
        const closestDistance = Math.abs(getCardLeft(cards[closestIndex]) - currentLeft);
        const currentDistance = Math.abs(getCardLeft(card) - currentLeft);
        return currentDistance < closestDistance ? index : closestIndex;
      }, 0);
    }

    const nextIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    const boundedIndex = Math.max(0, Math.min(cards.length - 1, nextIndex));

    scroller.scrollTo({
      left: getCardLeft(cards[boundedIndex]),
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="how-i-build-apply"
      className="site-section"
      style={{
        background: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="container">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          className="build-apply-header"
          style={{ marginBottom: '34px' }}
        >
          <div>
            <h2
              className="site-section-title"
              style={{
                fontFamily: monoFont,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.98)',
                marginBottom: '10px',
                lineHeight: 1.08
              }}
            >
              How I Build & Apply Data Science
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: '15px',
                color: 'rgba(255,255,255,0.68)',
                letterSpacing: '0.01em',
                maxWidth: '640px'
              }}
            >
              My workflow and real-world implementations
            </p>
          </div>

          <div className="build-apply-nav" aria-label="Workflow navigation">
            <button
              type="button"
              onClick={() => scrollCards('left')}
              className="build-apply-arrow"
              aria-label="Scroll workflow left"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollCards('right')}
              className="build-apply-arrow"
              aria-label="Scroll workflow right"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          ref={carouselRef}
          className="build-apply-workflow-track"
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            overflowY: 'visible',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            scrollPaddingLeft: '14px',
            scrollPaddingRight: '14px',
            paddingLeft: '14px',
            paddingRight: '14px',
            paddingTop: '18px',
            paddingBottom: '24px',
            minHeight: '380px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                variants={cardVariants}
                className="build-apply-workflow-card"
                style={{
                  scrollSnapAlign: 'start',
                  flex: '0 0 clamp(300px, 30vw, 360px)',
                  height: 'clamp(300px, 34vw, 348px)',
                  borderRadius: '0px',
                  border: '1px solid rgba(255,255,255,0.16)',
                  background: '#151515',
                  padding: '28px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 12px 22px rgba(0,0,0,0.42)',
                  transform: 'translateY(0) scale(1)',
                  transformOrigin: 'top center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.45)',
                      marginBottom: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    Step {index + 1}
                  </p>
                  <h3
                    style={{
                      fontFamily: monoFont,
                      fontSize: '31px',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: 'rgba(255,255,255,0.96)',
                      marginBottom: '16px'
                    }}
                  >
                    {step.title}
                  </h3>
                </div>

                <p
                  style={{
                    fontFamily: monoFont,
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.72)',
                    marginBottom: '24px'
                  }}
                >
                  {step.description}
                </p>

                <div
                  style={{
                    width: '66px',
                    height: '66px',
                    borderRadius: '0px',
                    border: '1px solid rgba(255,255,255,0.16)',
                    background: '#101010',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Icon size={30} />
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            marginTop: '16px',
            marginBottom: '54px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'rgba(255,255,255,0.1)',
              marginBottom: '14px'
            }}
          />
          <p
            style={{
              fontFamily: monoFont,
              fontSize: '13px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.46)'
            }}
          >
            From process to real-world solutions
          </p>
        </motion.div>

        <motion.div
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="build-apply-project-grid"
        >
          {modelProjects.map((project) => (
            <motion.article
              key={project.title}
              variants={projectCardVariants}
              className="build-apply-project-card"
              style={{
                border: '1px solid rgba(255,255,255,0.14)',
                background: '#151515',
                borderRadius: '0px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '252px',
                transition: 'transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease',
                boxShadow: '0 10px 20px rgba(0,0,0,0.35)'
              }}
              whileHover={{ y: -5, scale: 1.01 }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '12px'
                  }}
                >
                  <h3
                    style={{
                      fontFamily: monoFont,
                      fontSize: '20px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.95)',
                      lineHeight: 1.2
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: '11px',
                      padding: '5px 10px',
                      borderRadius: '0px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.78)',
                      background: 'rgba(255,255,255,0.04)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {project.tag}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: monoFont,
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '20px'
                  }}
                >
                  {project.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    fontFamily: monoFont,
                    fontSize: '12px',
                    padding: '10px 12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0px',
                    color: 'rgba(255,255,255,0.92)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.03)'
                  }}
                >
                  <FiGithub size={14} />
                  View Code
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <style>{`
          .build-apply-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 20px;
          }

          .build-apply-nav {
            display: flex;
            gap: 12px;
            flex-shrink: 0;
          }

          .build-apply-arrow {
            width: 46px;
            height: 46px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.22);
            background: #121212;
            color: rgba(255,255,255,0.92);
            display: grid;
            place-items: center;
            cursor: pointer;
            transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          }

          .build-apply-arrow:hover {
            transform: translateY(-2px);
            border-color: rgba(255,255,255,0.38);
            box-shadow: 0 10px 18px rgba(0,0,0,0.45);
          }

          .build-apply-workflow-card:hover {
            transform: translateY(-9px) scale(1.02) !important;
            box-shadow: 0 20px 34px rgba(0,0,0,0.52) !important;
          }

          .build-apply-workflow-track {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .build-apply-workflow-track::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }

          .build-apply-project-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
          }

          .build-apply-project-card:hover {
            border-color: rgba(255,255,255,0.3) !important;
            box-shadow: 0 18px 34px rgba(0,0,0,0.5) !important;
          }

          @media (max-width: 1140px) {
            .build-apply-workflow-track {
              gap: 20px !important;
            }

            .build-apply-workflow-card {
              flex-basis: 320px !important;
              height: 320px !important;
              padding: 24px !important;
            }

            .build-apply-project-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 768px) {
            section#how-i-build-apply {
              padding-top: 84px !important;
              padding-bottom: 84px !important;
            }

            .build-apply-header {
              gap: 14px;
            }

            .build-apply-arrow {
              width: 42px;
              height: 42px;
            }

            .build-apply-workflow-track {
              min-height: 344px !important;
              gap: 18px !important;
              padding-left: 10px !important;
              padding-right: 10px !important;
              scroll-padding-left: 10px !important;
              scroll-padding-right: 10px !important;
            }

            .build-apply-workflow-card {
              flex-basis: 280px !important;
              height: 300px !important;
            }

            .build-apply-project-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
          }

          @media (max-width: 560px) {
            .build-apply-header p {
              font-size: 13px !important;
            }

            .build-apply-workflow-card {
              flex-basis: 84vw !important;
              min-width: 262px !important;
              max-width: 300px !important;
              height: 286px !important;
            }

            .build-apply-workflow-card h3 {
              font-size: 27px !important;
            }

            .build-apply-workflow-card p {
              font-size: 13px !important;
            }
          }

          @media (hover: none) {
            .build-apply-workflow-card:hover {
              transform: translateY(0) scale(1) !important;
              box-shadow: 0 12px 22px rgba(0,0,0,0.42) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default BuildApplySection;
