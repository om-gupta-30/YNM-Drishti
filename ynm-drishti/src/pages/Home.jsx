import Hero from '../components/Hero';
import Features from '../components/Features';
import Timeline from '../components/Timeline';
import Comparison from '../components/Comparison';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import TechStack from '../components/TechStack';
import About from '../components/About';
import Stats from '../components/Stats';
import NeonParticles from '../components/NeonParticles';

const Home = () => {
  return (
    <>
      <Hero />
      
      {/* Sections with Neon Particles */}
      <div className="relative">
        <NeonParticles />
        <Features />
        <Timeline />
        <Comparison />
        <Benefits />
        <Testimonials />
        <TechStack />
        <About />
        <Stats />
      </div>
    </>
  );
};

export default Home;
