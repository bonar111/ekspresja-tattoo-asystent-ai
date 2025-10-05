// src/pages/HomePage.tsx
import { useEffect, useMemo, useState, useRef } from 'react';
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

// ——— liczba kolumn wg breakpointów Tailwinda
function useCurrentCols(preset: GridPreset['cols']) {
  const [w, setW] = useState<number>(() => (typeof window !== 'undefined' ? window.innerWidth : 0));
  useEffect(() => {
    const onR = () => setW(window.innerWidth);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  return useMemo(() => {
    if (w >= 1024 && preset.lg) return preset.lg;
    if (w >= 768 && preset.md) return preset.md!;
    if (w >= 640 && preset.sm) return preset.sm!;
    return preset.base;
  }, [w, preset]);
}

function getHeaderHeight() {
  const varVal = getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '72px';
  return parseInt(varVal, 10) || 72;
}

/** Siatka z „Zobacz więcej” i przewijaniem do ostatniego wiersza przy „Zwiń” */
const Grid = ({
  items,
  preset,
  maxRows = 5,
  collapsible = true,
  sectionId,
}: {
  items: string[];
  preset: GridPreset;
  maxRows?: number;
  collapsible?: boolean;
  sectionId: string; // unikalne ID sekcji (np. "prace", "covers")
}) => {
  const fit = preset.fit ?? 'cover';
  const lockAspect = preset.lockAspect ?? true;
  const gap = preset.gapClasses ?? 'gap-3 md:gap-4';
  const cols = useCurrentCols(preset.cols);
  const initialCount = maxRows * cols;

  const [expanded, setExpanded] = useState(false);
  const gridWrapRef = useRef<HTMLDivElement>(null);

  const hasMore = collapsible && items.length > initialCount;
  const visibleItems =
    expanded || !collapsible ? items : items.slice(0, Math.min(initialCount, items.length));

  const scrollToLastVisibleRow = () => {
    if (!hasMore) return;
    const lastIdx = Math.min(initialCount, items.length) - 1;
    // Szukamy ostatniego widocznego kafla po zwinięciu
    const container = gridWrapRef.current;
    const tile = container?.querySelector<HTMLElement>(
      `[data-grid="${sectionId}"] [data-idx="${lastIdx}"]`
    );
    if (tile) {
      const header = getHeaderHeight();
      const rect = tile.getBoundingClientRect();
      const y = rect.top + window.pageYOffset + rect.height - header - 12; // dolna krawędź kafla
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      // Fallback: do początku sekcji (lekko poniżej nagłówka)
      const target = document.getElementById(sectionId);
      if (target) {
        const header = getHeaderHeight();
        const y = target.getBoundingClientRect().top + window.pageYOffset - header - 8;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const toggle = () => {
    if (expanded) {
      // Najpierw zwijamy, potem po wyrenderowaniu przewijamy do końca ostatniego widocznego wiersza
      setExpanded(false);
      requestAnimationFrame(() => {
        // jeszcze jedna klatka, aby wysokości się przeliczyły
        requestAnimationFrame(scrollToLastVisibleRow);
      });
    } else {
      setExpanded(true);
    }
  };

  return (
    <>
      <div ref={gridWrapRef}>
        <div className={`grid ${colsToClasses(preset.cols)} ${gap}`} data-grid={sectionId}>
          {visibleItems.map((src, i) => (
            <motion.button
              key={`${src}-${i}`}
              type="button"
              data-idx={i} // <- ważne dla przewijania
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % (cols * 2)) * 0.03 }}
              className={`overflow-hidden rounded-lg bg-metallic ${lockAspect ? 'aspect-[3/4] sm:aspect-square' : ''}`}
              onClick={(e) => {
                track('Grid_Image_Click', { index: i, section: sectionId });
                openChat({ source: 'grid_image', index: i, section: sectionId }, e);
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
      </div>

      {hasMore && (
        <div className="text-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={sectionId}
          >
            {expanded ? 'Zwiń' : 'Zobacz więcej'}
          </button>
        </div>
      )}
    </>
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
        onClick={(e) => openChat({ source: 'inline_cta', title }, e)}
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

          <Grid items={BEST} preset={bestGrid} maxRows={5} collapsible sectionId="prace" />
        </div>
      </section>

      <InlineCTA
        title="Widzisz coś w swoim stylu?"
        subtitle="Napisz — w 2–5 min podeślemy 2 propozycje i terminy."
      />

      {/* COVERS */}
      <section className="section-tight bg-metallic" style={{ scrollMarginTop: 'var(--header-h, 72px)' }}>
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

          <Grid items={COVERS} preset={coversGrid} maxRows={5} collapsible sectionId="covers" />
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
