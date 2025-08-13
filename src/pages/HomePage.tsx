import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { openChat } from '../lib/openChat';

import Hero from '../components/home/Hero';
import Benefits from '../components/home/Benefits';
import Portfolio, { PortfolioItem } from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import Proof from '../components/home/Proof';
import Process from '../components/home/Process';
import FinalCTA from '../components/home/FinalCTA';
import ArtistsTeaser from '../components/home/ArtistsTeaser';

/** slider – zostaje, ale niżej na stronie */
const homePortfolioItems: PortfolioItem[] = [
  { id: 1, image: 'https://static.wixstatic.com/media/be828f_dd4a18a1eafb428f876ab2f892e1f0d3~mv2.webp', alt: 'Tatuaż geometryczny na ramieniu' },
  { id: 2, image: 'https://static.wixstatic.com/media/be828f_d6cb15e58ada4c87ae7906a6f101dddd~mv2.webp', alt: 'Czarno-szary tatuaż' },
  { id: 3, image: 'https://static.wixstatic.com/media/be828f_dccf47927184428cbbbfa09c86f6b0db~mv2.jpg', alt: 'Kolorowy tatuaż kwiatowy' },
  { id: 4, image: 'https://static.wixstatic.com/media/be828f_9ad2010ed23c420789ab886478820e69~mv2.jpg', alt: 'Tatuaż w stylu japońskim' },
  { id: 5, image: 'https://static.wixstatic.com/media/be828f_fd3867fd036041588977945fa46be167~mv2.jpg', alt: 'Minimalistyczny projekt tatuażu' },
  { id: 6, image: 'https://static.wixstatic.com/media/be828f_86a1beeb64bd4514a1be8bb6ad69ac7e~mv2.jpg', alt: 'Portretowy tatuaż' },
  { id: 7, image: 'https://static.wixstatic.com/media/be828f_ef3206d942a942b3819f1f29babf3743~mv2.jpg', alt: 'Portretowy tatuaż' },
];

/** Najlepsze prace */
const BEST = [



  'https://static.wixstatic.com/media/be828f_6a5cc124459044b2b66a665ae3558d80~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_51796d4a097847198f6814ffbeb4444e~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_e6d9c76703b443a19119b94c60e4a615~mv2.jpg',
    'https://static.wixstatic.com/media/be828f_15a202fa39c74487a6ccf27f6fdca669~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_9bc1f8431e984cdeabaa3586659b7409~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_9af9de820ea34ea9970455d866d8df70~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_f128de930382411b9db9b85df235be99~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_e33a5d13473d439eb7b870e0aca38182~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_1919781d36af4e23851a747d8eab2ba1~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_0398826ba328441d975230f5298c28ac~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_bad0b956531a4981837f3f3fabac522e~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_169db3abad19402a80d8268660bbce44~mv2.jpg'
];

/** Covery */
const COVERS = [
  'https://static.wixstatic.com/media/be828f_c8f9eeff4f6e48af93149ad4ea05adc4~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_8cd3f6c2bea141228deaf5cd44030dcd~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_a8df7dc0569e4b09adaa364468a29eac~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_eb39a7f4e54547169f1f8d42afbf06d5~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_1557a30042744b928b1791ca2db0e0cb~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_07d892d073d24a159167647f27477b83~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_3df7a69835d241f9b3570146f46a7421~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_0f9326eef629471c9822dcb52ac5dc41~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_fa68fcb271bc4e569e6cb74f45c2c179~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_e4166a9d6e4244f3a2855cd6c26b3de1~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_9b1bab1b568a41e083c97e62ba9d3622~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_754e43094a084ebdb8363bb3c0945852~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_1557a30042744b928b1791ca2db0e0cb~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_41fa95d9d38f47129ce99891a501ed21~mv2.jpg'
];

const Grid = ({ items }: { items: string[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
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

const InlineCTA = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
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

      {/* Najlepsze prace – kompaktowe odstępy */}
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
          <Grid items={BEST} />
        </div>
      </section>

      {/* CTA po pierwszej galerii – miejsce o wysokim CTR */}
      <InlineCTA
        title="Widzisz coś w swoim stylu?"
        subtitle="Daj nam 2–3 minuty — oszacujemy cenę i pokażemy dostępne terminy."
      />

      {/* Covery tatuażu – kompaktowe odstępy */}
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
          <Grid items={COVERS} />
        </div>
      </section>

      {/* CTA po coverach – drugie „gorące” miejsce */}
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

      {/* Reszta strony */}
      <Benefits />
      <Proof />
      <Process />
      <Testimonials />

      {/* Slider z poprzednich prac – przeniesiony niżej, z mniejszymi odstępami wewnątrz komponentu */}
      <Portfolio
        portfolioItems={homePortfolioItems}
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
