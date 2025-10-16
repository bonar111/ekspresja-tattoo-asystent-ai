// src/pages/OfferLandingPage.tsx
import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Hero from '../components/home/Hero';
import ArtistsTeaser from '../components/home/ArtistsTeaser';
import Benefits from '../components/home/Benefits';
import Proof from '../components/home/Proof';
import Process from '../components/home/Process';
import Testimonials from '../components/home/Testimonials';
import Portfolio, { PortfolioItem } from '../components/home/Portfolio';
import FinalCTA from '../components/home/FinalCTA';

import ImageGrid from '../components/common/ImageGrid';
import InlineCTA from '../components/common/InlineCTA';

import { BEST, COVERS, homePortfolioItems } from '../data/images';
import { bestGrid, coversGrid, type GridPreset } from '../data/gridConfig';

type SectionCfg = {
  id: string;
  title: string;
  desc: string;
  items: string[];
  preset: GridPreset;
};

type Config = {
  pageTitle: string;
  primary: SectionCfg;
  secondary: SectionCfg;
};

const configs: Record<string, Config> = {
  'cover-tatuazu': {
    pageTitle: 'Covery tatuażu | Ekspresja Tattoo Studio',
    primary: {
      id: 'covers',
      title: 'Covery tatuażu',
      desc: 'Stare prace zmieniamy w dzieła sztuki — Przed/Po i zagojone efekty.',
      items: COVERS,
      preset: coversGrid,
    },
    secondary: {
      id: 'prace',
      title: 'Zobacz nasze prace',
      desc: 'Delikatna akwarela, covery i tatuaże na bliznach — przegląd realizacji.',
      items: BEST,
      preset: bestGrid,
    },
  },

  // PRZYKŁAD na przyszłość:
  // 'tatuaze-na-bliznach': { ... }
};

const OfferLandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const cfg = slug ? configs[slug] : undefined;

  useEffect(() => {
    if (cfg) {
      document.title = cfg.pageTitle;
      window.scrollTo(0, 0);
    }
  }, [cfg]);

  // Jeśli slug nieobsłużony — wróć na home (zabezpieczenie)
  if (!cfg) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Hero />

      {/* PRIORYTET kampanii */}
      <section
        id={cfg.primary.id}
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
          >
            {cfg.primary.title}
          </motion.h2>
          <p className="text-center text-gray-300 stack-tight">{cfg.primary.desc}</p>

          <ImageGrid
            items={cfg.primary.items}
            preset={cfg.primary.preset}
            maxRows={5}
            collapsible
            sectionId={cfg.primary.id}
          />
        </div>
      </section>

      <InlineCTA
        title="Masz stary tatuaż do zakrycia?"
        subtitle="Wyślij zdjęcie — podamy orientacyjną cenę oraz zaproponujemy 2 kierunki projektu i najbliższe terminy."
      />

      {/* Sekcja druga */}
      <section
        id={cfg.secondary.id}
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
          >
            {cfg.secondary.title}
          </motion.h2>
          <p className="text-center text-gray-300 stack-tight">{cfg.secondary.desc}</p>

          <ImageGrid
            items={cfg.secondary.items}
            preset={cfg.secondary.preset}
            maxRows={5}
            collapsible
            sectionId={cfg.secondary.id}
          />
        </div>
      </section>

      {/* Reszta jak na Home */}
      <ArtistsTeaser
        artists={[
          { id: 'marzena-bonar', name: 'Marzena Bonar', specialty: 'Kolor, akwarela, covery, blizny', image: 'https://static.wixstatic.com/media/be828f_384a9c93395e4b8997fa962903b6cfd6~mv2.jpg' },
          { id: 'olena',         name: 'Olena',         specialty: 'Subtelne i kobiece tatuaże',       image: 'https://static.wixstatic.com/media/be828f_bba99e895c8e493580e7cf11e0b1f26f~mv2.jpg' },
          { id: 'kamil-talar',   name: 'Kamil Talar',   specialty: 'Graficzne, kolor, sketch, dotwork', image: 'https://static.wixstatic.com/media/be828f_c5abab41d0964feeba241ec519b23580~mv2.jpg' },
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

export default OfferLandingPage;
