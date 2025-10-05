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
import { openChat } from '../lib/openChat';
import { track } from '../lib/analytics';

import { BEST, COVERS, homePortfolioItems } from '../data/images';
import { GridPreset, bestGrid, coversGrid } from '../data/gridConfig';

const colsToClasses = (c: GridPreset['cols']) =>
  [
    c.base === 1 ? 'grid-cols-1' : c.base === 2 ? 'grid-cols-2' : c.base === 3 ? 'grid-cols-3' : 'grid-cols-4',
    c.sm ? (c.sm === 1 ? 'sm:grid-cols-1' : c.sm === 2 ? 'sm:grid-cols-2' : c.sm === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4') : '',
    c.md ? (c.md === 1 ? 'md:grid-cols-1' : c.md === 2 ? 'md:grid-cols-2' : c.md === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4') : '',
    c.lg ? (c.lg === 1 ? 'lg:grid-cols-1' : c.lg === 2 ? 'lg:grid-cols-2' : c.lg === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4') : '',
  ].join(' ');

/** Siatka: 1) LCP: pierwsze zdjęcie eager; 2) klik w kafel — otwiera Messenger; 3) eventy pomocnicze */
const Grid = ({ items, preset }: { items: string[]; preset: GridPreset }) => {
  const fit = preset.fit ?? 'cover';
  const lockAspect = preset.lockAspect ?? true;
  const gap = preset.gapClasses ?? 'gap-3 md:gap-4';

  return (
    <div className={`grid ${colsToClasses(preset.cols)} ${gap}`}>
      {items.map((src, i) => (
        <motion.button
          key={i}
          type="button"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.03 }}
          className={`overflow-hidden rounded-lg bg-metallic ${lockAspect ? 'aspect-[3/4] sm:aspect-square' : ''}`}
          onClick={(e) => {
            track('Grid_Image_Click', { index: i });
            openChat({ source: 'grid_image', index: i }, e as any);
          }}
          aria-label="Napisz do nas — przygotujemy podobny projekt"
        >
          <img
            src={src}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`w-full ${lockAspect ? 'h-full' : 'h-auto'} ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
          />
        </motion.button>
      ))}
    </div>
  );
};

const InlineCTA = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="section-tight bg-graphite">
    <div className="container text-center">
      <h3 className="text-2xl stack-tight">{title}</h3>
      <p className="text-gray-300 max-w-2xl mx-auto stack-tight">{subtitle}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary"
        onClick={(e) => openChat({ source: 'inline_cta', title }, e as any)}
      >
        Wyślij wiadomość — 2 propozycje i terminy
      </motion.button>
    </div>
  </section>
);

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
        // klucz: sprawia, że przewijanie do #prace uwzględnia sticky navbar
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

          <Grid items={BEST} preset={bestGrid} />
        </div>
      </section>

      <InlineCTA
        title="Widzisz coś w swoim stylu?"
        subtitle="Napisz — w 2–5 min podeślemy 2 propozycje i terminy."
      />

      {/* COVERS */}
      <section className="section-tight bg-metallic">
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
            Stare prace zmieniamy w świeże — Before/After i zagojone efekty.
          </p>

          <Grid items={COVERS} preset={coversGrid} />
        </div>
      </section>

      <InlineCTA
        title="Masz pomysł na tatuaż?"
        subtitle="Wyślij zdjęcie inspiracji lub starego tatuażu — podamy orientacyjną cenę i terminy."
      />

      <ArtistsTeaser
        artists={[
          { id: 'marzena-bonar',   name: 'Marzena Bonar',   specialty: 'Kolor, akwarela, covery, blizny', image: 'https://static.wixstatic.com/media/be828f_384a9c93395e4b8997fa962903b6cfd6~mv2.jpg' },
          { id: 'olena',           name: 'Olena',           specialty: 'Subtelne i kobiece tatuaże',       image: 'https://static.wixstatic.com/media/be828f_bba99e895c8e493580e7cf11e0b1f26f~mv2.jpg' },
          { id: 'kamil-talar',     name: 'Kamil Talar',     specialty: 'Graficzne, kolor, sketch, dotwork', image: 'https://static.wixstatic.com/media/be828f_c5abab41d0964feeba241ec519b23580~mv2.jpg' },
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
