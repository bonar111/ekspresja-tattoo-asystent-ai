import Hero from '../components/home/Hero';
import Benefits from '../components/home/Benefits';
import Portfolio from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import Proof from '../components/home/Proof';
import Process from '../components/home/Process';
import FinalCTA from '../components/home/FinalCTA';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Ekspresja Tattoo Studio | Professional Tattoos with Heart and Art';
  }, []);

  return (
    <>
      <Hero />
      <Benefits />
      <Portfolio />
      <Testimonials />
      <Proof />
      <Process />
      <FinalCTA />
    </>
  );
};

export default HomePage;