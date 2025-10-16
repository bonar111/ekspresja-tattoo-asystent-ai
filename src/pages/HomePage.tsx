// src/pages/HomePage.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';

import Hero from '../components/home/Hero';
import Benefits from '../components/home/Benefits';
import Portfolio, { PortfolioItem } from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import Proof from '../components/home/Proof';
import Process from '../components/home/Process';
import FinalCTA from '../components/home/FinalCTA';
import ArtistsTeaser from '../components/home/ArtistsTeaser';

import ImageGrid from '../components/common/ImageGrid';
import InlineCTA from '../components/common/InlineCTA';

import { track } from '../lib/analytics';
import { BEST, COVERS, homePortfolioItems } from '../data/images';
import { bestGrid, coversGrid } from '../data/gridConfig';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Ekspresja Tattoo Studio | Studio Tatuażu w Krakowie';
  }, []);

  return (
    <>
      <Hero />

      {/* BEST */}
      <section
        id="prace"
        className="section-tight bg-graphite"
        style={{ scrollMarginTop: 'var(--header-h, 72px)' }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
            className="text-center stack-tight"
            onViewportEnter={() => track('Gallery_Open', { section: 'best' })}
          >
            Zobacz nasze prace
          </motion.h2>
          <p className="text-center text-gray-300 stack-tight">
            Delikatna akwarela, cover-up i tatuaże na bliznach — zobacz efekty.
          </p>

          <ImageGrid items={BEST} preset={bestGrid} maxRows={5} collapsible sectionId="prace" />
        </div>
      </section>

      <InlineCTA
        title="Widzisz coś w swoim stylu?"
        subtitle="Napisz — w 2–5 min podeślemy 2 propozycje i terminy."
      />

      {/* COVERS */}
      <section
        className="section-tight bg-metallic"
        style={{ scrollMarginTop: 'var(--header-h, 72px)' }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
            className="text-center stack-tight"
            onViewportEnter={() => track('Gallery_Open', { section: 'covers' })}
          >
            Covery tatuażu
          </motion.h2>
          <p className="text-center text-gray-300 stack-tight">
            Stare prace zmieniamy w dzieła sztuki — Przed/Po i zagojone efekty.
          </p>

          <ImageGrid items={COVERS} preset={coversGrid} maxRows={5} collapsible sectionId="covers" />
        </div>
      </section>

      <InlineCTA
        title="Masz pomysł na tatuaż?"
        subtitle="Wyślij zdjęcie inspiracji lub starego tatuażu — podamy orientacyjną cenę i terminy."
      />

      <ArtistsTeaser
        artists={[
          {
            id: 'marzena-bonar',
            name: 'Marzena Bonar',
            specialty: 'Kolor, akwarela, covery, blizny',
            image:
              'https://static.wixstatic.com/media/be828f_384a9c93395e4b8997fa962903b6cfd6~mv2.jpg',
          },
          {
            id: 'olena',
            name: 'Olena',
            specialty: 'Subtelne i kobiece tatuaże',
            image:
              'https://static.wixstatic.com/media/be828f_bba99e895c8e493580e7cf11e0b1f26f~mv2.jpg',
          },
          {
            id: 'kamil-talar',
            name: 'Kamil Talar',
            specialty: 'Graficzne, kolor, sketch, dotwork',
            image:
              'https://static.wixstatic.com/media/be828f_c5abab41d0964feeba241ec519b23580~mv2.jpg',
          },
        ]}
      />

      <Benefits />
      <Proof />
      <Process />
      <Testimonials />

      <Portfolio
        portfolioItems={homePortfolioItems as PortfolioItem[]}
        title="Więcej naszych realizacji"
        description="Krótki przegląd różnych stylów. Pełne portfolio znajdziesz u artystów."
        viewAllHref="/team"
        viewAllLabel="Przeglądaj artystów"
        slidesToShow={3}
      />

      <FinalCTA />
    </>
  );
};

export default HomePage;
