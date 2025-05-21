import Hero from '../components/sales/Hero';
import Benefits from '../components/sales/Benefits';
import Portfolio from '../components/sales/Portfolio';
import Testimonials from '../components/sales/Testimonials';
import Proof from '../components/sales/Proof';
import Process from '../components/sales/Process';
import FinalCTA from '../components/sales/FinalCTA';
import { useEffect } from 'react';

const SalePage = () => {
  useEffect(() => {
    document.title = 'Twoja Przewaga | Zapisy sesji AI';
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

export default SalePage;