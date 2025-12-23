// src/pages/RealismPage.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';

import HeroRealism from './HeroRealism';
import ArtistsTeaser from './ArtistsTeaser';
import Proof from './Proof';
import Process from './Process';
import Testimonials from './Testimonials';
import Portfolio, { PortfolioItem } from './Portfolio';

import ImageGrid from '../common/ImageGrid';
import InlineCTA from '../common/InlineCTA';

import { track } from '../../lib/analytics';
import { bestGrid, coversGrid } from '../../data/gridConfig';
import { REALISM_MAIN, REALISM_SECONDARY, realismPortfolioItems } from '../../data/realismImages';
import BenefitsRealism from "./Benefits";
import FinalCTARealism from '../home/FinalCTARealism';
import ArtistsTeaserRealizm from './ArtistsTeaserRealizm';

const RealismPage = () => {
  useEffect(() => {
    document.title = 'Realizm | Ekspresja Tattoo Studio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroRealism />

      {/* REALIZM MAIN */}
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
            onViewportEnter={() => track('Gallery_Open', { section: 'realism_main' })}
          >
            Realizm w kolorze — duże projekty
          </motion.h2>

          <p className="text-center text-gray-300 stack-tight">
            Portrety, zwierzęta, duże motywy i mocny kolor — zobacz przykłady realizacji.
          </p>

          <ImageGrid items={REALISM_MAIN} preset={bestGrid} maxRows={5} collapsible sectionId="prace" />
        </div>
      </section>

      <InlineCTA
        title="Chcesz podobny klimat w realizmie?"
        subtitle="Podeślij inspiracje + miejsce na ciele. Odpiszemy z 2 propozycjami stylu i terminami."
      />

      {/* REALIZM SECONDARY */}
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
            onViewportEnter={() => track('Gallery_Open', { section: 'realism_secondary' })}
          >
            Realizm — detale i kompozycje
          </motion.h2>

          <p className="text-center text-gray-300 stack-tight">
            Więcej przykładów: faktury, światło i głębia — prace nastawione na efekt “wow”.
          </p>

          <ImageGrid
            items={REALISM_SECONDARY}
            preset={coversGrid} // pokazuje więcej całości (contain, naturalna wysokość)
            maxRows={5}
            collapsible
            sectionId="realizm2"
          />
        </div>
      </section>

      <InlineCTA
        title="Masz temat na duży tatuaż?"
        subtitle="Napisz ile cm i gdzie ma być. Damy orientacyjną wycenę i plan sesji."
      />

      <ArtistsTeaserRealizm
        title="Kto robi realizm?"
        artists={[
          {
            id: 'marcin-kudosz',
            name: 'Marcin Kudosz',
            specialty: 'Kolorowy realizm, portrety, duże projekty',
            image: 'https://static.wixstatic.com/media/be828f_59e2f9f789254b25b5cbc50ea9b77249~mv2.jpg',
          },
          {
            id: 'andrev',
            name: 'Andrev',
            specialty: 'Kolorowy realizm, covery, duże projekty',
            image: 'https://static.wixstatic.com/media/be828f_c0202e795bcd46a0af70478ab5ffad97~mv2.jpg',
          },
          {
            id: 'jarek',
            name: 'jarek',
            specialty: 'Kolorowy realizm, covery, duże projekty',
            image: 'https://static.wixstatic.com/media/be828f_b523c8126ede42a58d2e8b26c02b1b37~mv2.jpg',
          },
        ]}
      />

      <BenefitsRealism />
      <Proof />
      <Process />
      <Testimonials />

      <Portfolio
        portfolioItems={realismPortfolioItems as PortfolioItem[]}
        title="Więcej realizmu"
        description="Krótki przegląd kolejnych prac w realizmie. Pełne portfolio znajdziesz u artysty."
        viewAllHref="/artist/marcin-kudosz"
        viewAllLabel="Zobacz portfolio Marcina"
        slidesToShow={3}
      />

      <FinalCTARealism />
    </>
  );
};

export default RealismPage;
