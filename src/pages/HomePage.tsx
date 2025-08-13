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

// 🔗 dane obrazów w osobnym pliku
import { BEST, COVERS, homePortfolioItems } from '../data/images';

/* =========
   Grid (parametryzowane kolumny bez ryzyka purge)
   ========= */
type GridCols = {
  base?: 1 | 2 | 3 | 4 | 5 | 6;
  sm?:   1 | 2 | 3 | 4 | 5 | 6;
  md?:   1 | 2 | 3 | 4 | 5 | 6;
  lg?:   1 | 2 | 3 | 4 | 5 | 6;
  xl?:   1 | 2 | 3 | 4 | 5 | 6;
};

const COLS_BASE = { 1:'grid-cols-1',2:'grid-cols-2',3:'grid-cols-3',4:'grid-cols-4',5:'grid-cols-5',6:'grid-cols-6' } as const;
const COLS_SM   = { 1:'sm:grid-cols-1',2:'sm:grid-cols-2',3:'sm:grid-cols-3',4:'sm:grid-cols-4',5:'sm:grid-cols-5',6:'sm:grid-cols-6' } as const;
const COLS_MD   = { 1:'md:grid-cols-1',2:'md:grid-cols-2',3:'md:grid-cols-3',4:'md:grid-cols-4',5:'md:grid-cols-5',6:'md:grid-cols-6' } as const;
const COLS_LG   = { 1:'lg:grid-cols-1',2:'lg:grid-cols-2',3:'lg:grid-cols-3',4:'lg:grid-cols-4',5:'lg:grid-cols-5',6:'lg:grid-cols-6' } as const;
const COLS_XL   = { 1:'xl:grid-cols-1',2:'xl:grid-cols-2',3:'xl:grid-cols-3',4:'xl:grid-cols-4',5:'xl:grid-cols-5',6:'xl:grid-cols-6' } as const;

function buildColsClasses(cols: GridCols) {
  return [
    COLS_BASE[cols.base ?? 1],
    cols.sm ? COLS_SM[cols.sm] : '',
    cols.md ? COLS_MD[cols.md] : '',
    cols.lg ? COLS_LG[cols.lg] : '',
    cols.xl ? COLS_XL[cols.xl] : '',
  ].join(' ');
}

const Grid = ({ items, cols }: { items: string[]; cols: GridCols }) => (
  <div className={`grid ${buildColsClasses(cols)} gap-3 md:gap-4`}>
    {items.map((src, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: i * 0.03 }}
        className="overflow-hidden rounded-lg bg-metallic aspect-[3/4] sm:aspect-square"
      >
        <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
      </motion.div>
    ))}
  </div>
);

/* =========
   Inline CTA
   ========= */
const InlineCTA = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="py-10 bg-graphite">
    <div className="container text-center">
      <h3 className="text-2xl mb-3">{title}</h3>
      <p className="text-gray-300 max-w-2xl mx-auto mb-5">{subtitle}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary"
        onClick={openChat}
      >
        Rozpocznij konsultacje
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

      {/* Najlepsze prace – 2 w rzędzie na desktopie */}
      <section className="py-14 bg-graphite">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-2"
          >
            Zobacz nasze prace
          </motion.h2>
          <p className="text-center text-gray-300 mb-8">
            Bezpłatna wizualizacja + wstępna wycena na czacie, bez zobowiązań
          </p>

          {/* 1 kolumna mobile, 2 od sm/md/lg */}
          <Grid items={BEST} cols={{ base: 2, sm: 2, md: 2, lg: 2 }} />
        </div>
      </section>

      {/* CTA po pierwszej galerii – gorąca strefa */}
      <InlineCTA
        title="Widzisz coś w swoim stylu?"
        subtitle="Daj nam 2–3 minuty — oszacujemy cenę i pokażemy dostępne terminy."
      />

      {/* Covery – 1 zdjęcie w wierszu */}
      <section className="py-14 bg-metallic">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-2"
          >
            Covery tatuażu
          </motion.h2>
          <p className="text-center text-gray-300 mb-8">
            Zmieniamy stare prace w nowe dzieła — zobacz przykłady coverów.
          </p>

          {/* zawsze 1 kolumna */}
          <Grid items={COVERS} cols={{ base: 1, sm: 1, md: 1, lg: 1 }} />
        </div>
      </section>

      {/* CTA po coverach */}
      <InlineCTA
        title="Masz pomysł na tatuaż?"
        subtitle="Pokaż nam swoją starą pracę lub inspiracje — w kilka minut podpowiemy, co możemy wyczarować."
      />

      {/* Teaser artystów */}
      <ArtistsTeaser
        artists={[
          {
            id: 'marzena-bonar',
            name: 'Marzena Bonar',
            specialty: 'Kolor, akwarela, covery, blizny',
            image: 'https://static.wixstatic.com/media/be828f_384a9c93395e4b8997fa962903b6cfd6~mv2.jpg',
          },
          {
            id: 'kamil-talar',
            name: 'Kamil Talar',
            specialty: 'Graficzne, kolor, sketch, dotwork',
            image: 'https://static.wixstatic.com/media/be828f_c5abab41d0964feeba241ec519b23580~mv2.jpg',
          },
          {
            id: 'gabriela-golonka',
            name: 'Gabriela Golonka',
            specialty: 'Linearne, kolor, cover-up, blizny',
            image: 'https://static.wixstatic.com/media/be828f_a0474707cb494a39b14fdffcfb8e24a5~mv2.jpg',
          },
        ]}
      />

      {/* Reszta sekcji dowodowych */}
      <Benefits />
      <Proof />
      <Process />
      <Testimonials />

      {/* Slider – zostaje niżej na stronie */}
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
