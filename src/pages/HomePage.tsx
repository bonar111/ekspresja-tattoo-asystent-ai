// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Benefits from '../components/home/Benefits';
import Portfolio, { PortfolioItem } from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import Proof from '../components/home/Proof';
import Process from '../components/home/Process';
import FinalCTA from '../components/home/FinalCTA';
import { openChat } from '../lib/openChat';

const bestWorks: PortfolioItem[] = [
    { id: 'best-3',  image: 'https://static.wixstatic.com/media/be828f_15a202fa39c74487a6ccf27f6fdca669~mv2.jpg', alt: 'Najlepsze tatuaże — praca 3' },
  { id: 'best-1',  image: 'https://static.wixstatic.com/media/be828f_de7f8790908a4804beeaa0f54df61287~mv2.jpg', alt: 'Najlepsze tatuaże — praca 1' },
  { id: 'best-2',  image: 'https://static.wixstatic.com/media/be828f_6a5cc124459044b2b66a665ae3558d80~mv2.jpg', alt: 'Najlepsze tatuaże — praca 2' },
  { id: 'best-4',  image: 'https://static.wixstatic.com/media/be828f_9bc1f8431e984cdeabaa3586659b7409~mv2.jpg', alt: 'Najlepsze tatuaże — praca 4' },
  { id: 'best-5',  image: 'https://static.wixstatic.com/media/be828f_51796d4a097847198f6814ffbeb4444e~mv2.jpg', alt: 'Najlepsze tatuaże — praca 5' },
  { id: 'best-6',  image: 'https://static.wixstatic.com/media/be828f_e6d9c76703b443a19119b94c60e4a615~mv2.jpg', alt: 'Najlepsze tatuaże — praca 6' },
  { id: 'best-7',  image: 'https://static.wixstatic.com/media/be828f_9af9de820ea34ea9970455d866d8df70~mv2.jpg', alt: 'Najlepsze tatuaże — praca 7' },
  { id: 'best-8',  image: 'https://static.wixstatic.com/media/be828f_f128de930382411b9db9b85df235be99~mv2.jpg', alt: 'Najlepsze tatuaże — praca 8' },
  { id: 'best-9',  image: 'https://static.wixstatic.com/media/be828f_e33a5d13473d439eb7b870e0aca38182~mv2.jpg', alt: 'Najlepsze tatuaże — praca 9' },
  { id: 'best-10', image: 'https://static.wixstatic.com/media/be828f_754e43094a084ebdb8363bb3c0945852~mv2.jpg', alt: 'Najlepsze tatuaże — praca 10' },
  { id: 'best-11', image: 'https://static.wixstatic.com/media/be828f_1919781d36af4e23851a747d8eab2ba1~mv2.jpg', alt: 'Najlepsze tatuaże — praca 11' },
  { id: 'best-12', image: 'https://static.wixstatic.com/media/be828f_0398826ba328441d975230f5298c28ac~mv2.jpg', alt: 'Najlepsze tatuaże — praca 12' },
];

const coverUps: PortfolioItem[] = [
  { id: 'cover-1',  image: 'https://static.wixstatic.com/media/be828f_c8f9eeff4f6e48af93149ad4ea05adc4~mv2.jpg', alt: 'Cover tatuażu — przykład 1' },
  { id: 'cover-2',  image: 'https://static.wixstatic.com/media/be828f_8cd3f6c2bea141228deaf5cd44030dcd~mv2.jpg', alt: 'Cover tatuażu — przykład 2' },
  { id: 'cover-3',  image: 'https://static.wixstatic.com/media/be828f_a8df7dc0569e4b09adaa364468a29eac~mv2.jpg', alt: 'Cover tatuażu — przykład 3' },
  { id: 'cover-4',  image: 'https://static.wixstatic.com/media/be828f_eb39a7f4e54547169f1f8d42afbf06d5~mv2.jpg', alt: 'Cover tatuażu — przykład 4' },
  { id: 'cover-5',  image: 'https://static.wixstatic.com/media/be828f_1557a30042744b928b1791ca2db0e0cb~mv2.jpg', alt: 'Cover tatuażu — przykład 5' },
  { id: 'cover-6',  image: 'https://static.wixstatic.com/media/be828f_07d892d073d24a159167647f27477b83~mv2.jpg', alt: 'Cover tatuażu — przykład 6' },
  { id: 'cover-7',  image: 'https://static.wixstatic.com/media/be828f_3df7a69835d241f9b3570146f46a7421~mv2.jpg', alt: 'Cover tatuażu — przykład 7' },
  { id: 'cover-8',  image: 'https://static.wixstatic.com/media/be828f_0f9326eef629471c9822dcb52ac5dc41~mv2.jpg', alt: 'Cover tatuażu — przykład 8' },
  { id: 'cover-9',  image: 'https://static.wixstatic.com/media/be828f_fa68fcb271bc4e569e6cb74f45c2c179~mv2.jpg', alt: 'Cover tatuażu — przykład 9' },
  { id: 'cover-10', image: 'https://static.wixstatic.com/media/be828f_e4166a9d6e4244f3a2855cd6c26b3de1~mv2.jpg', alt: 'Cover tatuażu — przykład 10' },
  { id: 'cover-11', image: 'https://static.wixstatic.com/media/be828f_9b1bab1b568a41e083c97e62ba9d3622~mv2.jpg', alt: 'Cover tatuażu — przykład 11' },
];

// DOTYCHCZASOWE mini-portfolio — zostaje, ale niżej na stronie
const homePortfolioItems: PortfolioItem[] = [
  { id: 1, image: 'https://static.wixstatic.com/media/be828f_dd4a18a1eafb428f876ab2f892e1f0d3~mv2.webp', alt: 'Tatuaż geometryczny na ramieniu' },
  { id: 2, image: 'https://static.wixstatic.com/media/be828f_d6cb15e58ada4c87ae7906a6f101dddd~mv2.webp', alt: 'Czarno-szary tatuaż' },
  { id: 3, image: 'https://static.wixstatic.com/media/be828f_dccf47927184428cbbbfa09c86f6b0db~mv2.jpg', alt: 'Kolorowy tatuaż kwiatowy' },
  { id: 4, image: 'https://static.wixstatic.com/media/be828f_9ad2010ed23c420789ab886478820e69~mv2.jpg', alt: 'Tatuaż w stylu japońskim' },
  { id: 5, image: 'https://static.wixstatic.com/media/be828f_fd3867fd036041588977945fa46be167~mv2.jpg', alt: 'Minimalistyczny projekt tatuażu' },
  { id: 6, image: 'https://static.wixstatic.com/media/be828f_86a1beeb64bd4514a1be8bb6ad69ac7e~mv2.jpg', alt: 'Portretowy tatuaż' },
  { id: 7, image: 'https://static.wixstatic.com/media/be828f_ef3206d942a942b3819f1f29babf3743~mv2.jpg', alt: 'Portretowy tatuaż' },
];

// Mały komponent CTA do wstawiania między sekcjami
const InlineCTA: React.FC<{ title?: string; subtitle?: string }> = ({
  title = 'Masz pomysł na tatuaż?',
  subtitle = 'Daj nam 2–3 minuty — oszacujemy cenę i pokażemy dostępne terminy.'
}) => (
  <section className="py-12 bg-graphite">
    <div className="container text-center">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-2xl mb-3"
      >
        {title}
      </motion.h3>
      <p className="text-gray-300 mb-6">{subtitle}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary"
        onClick={openChat}
        aria-label="Rozpocznij konsultacje"
      >
        Rozpocznij konsultacje
      </motion.button>
    </div>
  </section>
);

const HomePage: React.FC = () => {
  const [showFloatCTA, setShowFloatCTA] = useState(false);

  useEffect(() => {
    document.title = 'Ekspresja Tattoo Studio | Professional Tattoos with Heart and Art';
  }, []);

  // Pływające CTA (desktop) po przewinięciu — wysokie prawdopodobieństwo kliknięcia
  useEffect(() => {
    const onScroll = () => setShowFloatCTA(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Hero />

      {/* 1) HIGH-INTENT galeria na górze: Najlepsze prace */}
      <Portfolio
        portfolioItems={bestWorks}
        title="Najlepsze prace"
        description="Zobacz styl i jakość, które klienci kochają najbardziej."
        viewAllHref="/team"
        viewAllLabel="Zobacz artystów"
        slidesToShow={4}
      />

      {/* CTA po pierwszym kontakcie z pracami */}
      <InlineCTA title="Widzisz coś w swoim stylu?" />

      {/* 2) HIGH-INTENT: Covery tatuażu */}
      <Portfolio
        portfolioItems={coverUps}
        title="Covery tatuażu"
        description="Zmieniamy stare prace w nowe dzieła — sprawdź metamorfozy."
        viewAllHref="/team"
        viewAllLabel="Zobacz artystów"
        slidesToShow={4}
      />

      {/* CTA po coverach — użytkownik jest już „rozgrzany” */}
      <InlineCTA subtitle="Pokaż nam swoją starą pracę — podpowiemy, co możemy z niej wyczarować." />

      {/* Reszta strony */}
      <Benefits />

      {/* DOTYCHCZASOWE mini-portfolio — przeniesione niżej */}
      <Portfolio
        portfolioItems={homePortfolioItems}
        title="Jeszcze więcej inspiracji"
        description="Kilka dodatkowych realizacji — jeśli chcesz, wyślemy podobne pod Twój styl."
        viewAllHref="/team"
        viewAllLabel="Zobacz artystów"
        slidesToShow={3}
      />

      <Testimonials />
      <Proof />
      <Process />
      <FinalCTA />

      {/* Pływające CTA — desktop, po scrollu */}
      {showFloatCTA && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={openChat}
          className="hidden md:flex fixed right-5 bottom-6 z-[60] btn btn-primary shadow-lg"
          aria-label="Rozpocznij konsultacje"
        >
          Rozpocznij konsultacje
        </motion.button>
      )}
    </>
  );
};

export default HomePage;
