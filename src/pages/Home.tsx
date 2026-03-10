/**
 * Home Page
 * Main landing page with all sections
 */

import Hero from '../components/Hero';
import TechStack from '../components/TechStack';
import GitHubActivity from '../components/GitHubActivity';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = (): JSX.Element => {
  return (
    <>
      <Hero />
      <TechStack />
      <GitHubActivity />
      <Projects />
      <Blog />
      <About />
      <Contact />
    </>
  );
};

export default Home;
