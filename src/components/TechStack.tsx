/**
 * TechStack Component
 * Horizontal carousel-style data science workflow section
 */

import { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiCpu,
  FiDatabase,
  FiFilter,
  FiSliders,
  FiTarget
} from 'react-icons/fi';
import { IconType } from 'react-icons';

interface WorkflowStep {
  title: string;
  description: string;
  icon: IconType;
}

const steps: WorkflowStep[] = [
  { title: 'Problem', description: 'Define objective and success criteria.', icon: FiTarget },
  { title: 'Data', description: 'Collect relevant, trustworthy sources.', icon: FiDatabase },
  { title: 'Cleaning', description: 'Fix quality issues and standardize inputs.', icon: FiFilter },
  { title: 'Features', description: 'Create useful signals from raw variables.', icon: FiSliders },
  { title: 'Model', description: 'Train and tune the best-fit approach.', icon: FiCpu },
  { title: 'Evaluation', description: 'Validate performance on real scenarios.', icon: FiCheckCircle },
  { title: 'Insights', description: 'Translate outputs into clear actions.', icon: FiBarChart2 }
];

const TechStack = (): JSX.Element => {
  const monoFont: string = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  const cardRowVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.12
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const scrollCards = (direction: 'left' | 'right'): void => {
    const scroller = carouselRef.current;
    if (!scroller) {
      return;
    }

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>('.how-think-carousel-card'));
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
      id="how-i-think"
      style={{
        background: '#0d0d0d',
        paddingTop: '90px',
        paddingBottom: '90px',
        minHeight: '560px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          paddingLeft: '64px',
          paddingRight: '64px'
        }}
      >
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          className="how-think-header"
          style={{ marginBottom: '38px' }}
        >
          <div>
            <h2
              style={{
                fontFamily: monoFont,
                fontSize: '42px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.98)',
                marginBottom: '10px',
                lineHeight: 1.08
              }}
            >
              How I Think
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: '15px',
                color: 'rgba(255,255,255,0.68)',
                letterSpacing: '0.01em',
                maxWidth: '560px'
              }}
            >
              My approach to solving real-world data problems
            </p>
          </div>

          <div className="how-think-nav" aria-label="How I Think navigation">
            <button
              type="button"
              onClick={() => scrollCards('left')}
              className="how-think-arrow"
              aria-label="Scroll cards left"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollCards('right')}
              className="how-think-arrow"
              aria-label="Scroll cards right"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={cardRowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          ref={carouselRef}
          className="how-think-carousel-track"
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
            paddingBottom: '30px',
            paddingTop: '22px',
            paddingRight: '14px',
            minHeight: '408px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const stepNumber = `${index + 1}.`;

            return (
              <motion.article
                key={step.title}
                variants={itemVariants}
                className="how-think-carousel-card"
                style={{
                  scrollSnapAlign: 'start',
                  flex: '0 0 clamp(300px, 30vw, 360px)',
                  height: 'clamp(300px, 34vw, 350px)',
                  borderRadius: '0px',
                  border: '1px solid rgba(255,255,255,0.16)',
                  background: '#161616',
                  padding: '30px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 14px 0 rgba(0,0,0,0.45), 0 26px 36px rgba(0,0,0,0.5)',
                  transform: 'translateY(0) scale(1)',
                  transformOrigin: 'top center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  color: 'rgba(255,255,255,0.95)'
                }}
              >
                <div
                  className="how-think-card-title-row"
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    marginBottom: '18px'
                  }}
                >
                  <span
                    className="how-think-card-step-number"
                    style={{
                      fontFamily: monoFont,
                      fontSize: '30px',
                      fontWeight: 700,
                      lineHeight: 1.12,
                      color: 'rgba(255,255,255,0.58)',
                      minWidth: '36px'
                    }}
                  >
                    {stepNumber}
                  </span>
                  <h3
                    className="how-think-card-title"
                    style={{
                      fontFamily: monoFont,
                      fontSize: '30px',
                      fontWeight: 700,
                      lineHeight: 1.12
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
                    marginBottom: '20px'
                  }}
                >
                  {step.description}
                </p>

                <div
                  style={{
                    width: '68px',
                    height: '68px',
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

        <style>{`
          .how-think-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 20px;
          }

          .how-think-nav {
            display: flex;
            gap: 12px;
            flex-shrink: 0;
          }

          .how-think-arrow {
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

          .how-think-arrow:hover {
            transform: translateY(-2px);
            border-color: rgba(255,255,255,0.4);
            box-shadow: 0 10px 18px rgba(0,0,0,0.45);
          }

          .how-think-carousel-card:hover {
            transform: translateY(-10px) scale(1.03) !important;
            box-shadow: 0 22px 0 rgba(0,0,0,0.48), 0 38px 52px rgba(0,0,0,0.58) !important;
          }

          .how-think-carousel-card:first-child {
            transform-origin: top left;
          }

          .how-think-carousel-track {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .how-think-carousel-track::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }

          @media (max-width: 1080px) {
            section#how-i-think {
              min-height: 520px !important;
            }

            section#how-i-think .container {
              padding-left: 36px !important;
              padding-right: 36px !important;
            }

            .how-think-carousel-track {
              gap: 20px !important;
              padding-left: 12px !important;
              padding-right: 12px !important;
              scroll-padding-left: 12px !important;
              scroll-padding-right: 12px !important;
            }

            .how-think-carousel-card {
              flex-basis: 320px !important;
              height: 320px !important;
              padding: 26px 24px !important;
              border-radius: 0 !important;
            }
          }

          @media (max-width: 768px) {
            section#how-i-think {
              padding-top: 76px !important;
              padding-bottom: 76px !important;
            }

            section#how-i-think .container {
              padding-left: 22px !important;
              padding-right: 22px !important;
            }

            .how-think-header {
              gap: 14px;
            }

            .how-think-nav {
              gap: 10px;
            }

            .how-think-arrow {
              width: 42px;
              height: 42px;
            }

            .how-think-carousel-track {
              gap: 18px !important;
              min-height: 344px !important;
              padding-top: 18px !important;
              padding-left: 10px !important;
              padding-right: 10px !important;
              scroll-padding-left: 10px !important;
              scroll-padding-right: 10px !important;
            }

            .how-think-carousel-card {
              flex-basis: 280px !important;
              height: 300px !important;
              border-radius: 0 !important;
              padding: 24px 22px !important;
            }
          }

          @media (max-width: 540px) {
            section#how-i-think {
              min-height: 500px !important;
            }

            section#how-i-think .container {
              padding-left: 16px !important;
              padding-right: 16px !important;
            }

            .how-think-header h2 {
              font-size: 34px !important;
            }

            .how-think-header p {
              font-size: 13px !important;
            }

            .how-think-carousel-card {
              flex-basis: 84vw !important;
              min-width: 260px !important;
              max-width: 300px !important;
              height: 286px !important;
            }

            .how-think-carousel-card h3 {
              font-size: 26px !important;
            }

            .how-think-card-title-row {
              gap: 10px !important;
            }

            .how-think-card-step-number,
            .how-think-card-title {
              font-size: 26px !important;
            }

            .how-think-carousel-card p {
              font-size: 13px !important;
            }
          }

          @media (hover: none) {
            .how-think-carousel-card:hover {
              transform: translateY(0) scale(1) !important;
              box-shadow: 0 14px 0 rgba(0,0,0,0.45), 0 26px 36px rgba(0,0,0,0.5) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default TechStack;
