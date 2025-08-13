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

// dane obrazów
import { BEST, COVERS, homePortfolioItems } from '../data/images';

// >>> korzystamy z jednego miejsca konfiguracji
import { GridPreset, bestGrid, coversGrid } from '../data/gridConfig';

/* ========= Lekki, wielokrotnego użytku Grid ========= */
const colsToClasses = (c: GridPreset['cols']) =>
  [
    c.base === 1 ? 'grid-cols-1' : c.base === 2 ? 'grid-cols-2' : c.base === 3 ? 'grid-cols-3' : 'grid-cols-4',
    c.sm ? (c.sm === 1 ? 'sm:grid-cols-1' : c.sm === 2 ? 'sm:grid-cols-2' : c.sm === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4') : '',
    c.md ? (c.md === 1 ? 'md:grid-cols-1' : c.md === 2 ? 'md:grid-cols-2' : c.md === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4') : '',
    c.lg ? (c.lg === 1 ? 'lg:grid-cols-1' : c.lg === 2 ? 'lg:grid-cols-2' : c.lg === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4') : '',
  ].join(' ');

const Grid = ({ items, preset }: { items: string[]; preset: GridPreset }) => {
  const fit = preset.fit ?? 'cover';
  const lockAspect = preset.lockAspect ?? true;
  const gap = preset.gapClasses ?? 'gap-3 md:gap-4';

  return (
    <div className={`grid ${colsToClasses(preset.cols)} ${gap}`}>
      {items.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.03 }}
          className={`overflow-hidden rounded-lg bg-metallic ${lockAspect ? 'aspect-[3/4] sm:aspect-square' : ''}`}
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            className={`w-full ${lockAspect ? 'h-full' : 'h-auto'} ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
          />
        </motion.div>
      ))}
    </div>
  );
};

/* ========= Inline CTA ========= */
const InlineCTA = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="py-10 bg-graphite">
    <div className="container text-center">
      <h3 className="text-2xl mb-3">{title}</h3>
      <p className="text-gray-300 max-w-2xl mx-auto mb-5">{subtitle}</p>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary" onClick={openChat}>
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

      {/* BEST – na mobile 2 kolumny (reszta wg bestGrid) */}
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

          <Grid items={BEST} preset={bestGrid} />
        </div>
      </section>

      <InlineCTA
        title="Widzisz coś w swoim stylu?"
        subtitle="Daj nam 2–3 minuty — oszacujemy cenę i pokażemy dostępne terminy."
      />

      {/* COVERS – 1 kolumna, bez cropu (contain + brak aspect) */}
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

          <Grid items={COVERS} preset={coversGrid} />
        </div>
      </section>

      <InlineCTA
        title="Masz pomysł na tatuaż?"
        subtitle="Pokaż nam swoją starą pracę lub inspiracje — w kilka minut podpowiemy, co możemy wyczarować."
      />

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
