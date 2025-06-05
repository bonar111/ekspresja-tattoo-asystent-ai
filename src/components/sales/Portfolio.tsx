import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';

const SlickSlider: any = Slider;

const portfolioItems = [
  { id: 1, image: 'https://static.wixstatic.com/media/be828f_dd4a18a1eafb428f876ab2f892e1f0d3~mv2.webp', alt: 'Tatuaż geometryczny na ramieniu' },
  { id: 2, image: 'https://static.wixstatic.com/media/be828f_d6cb15e58ada4c87ae7906a6f101dddd~mv2.webp', alt: 'Czarno-szary tatuaż' },
  { id: 3, image: 'https://static.wixstatic.com/media/be828f_dccf47927184428cbbbfa09c86f6b0db~mv2.jpg', alt: 'Kolorowy tatuaż kwiatowy' },
  { id: 4, image: 'https://static.wixstatic.com/media/be828f_9ad2010ed23c420789ab886478820e69~mv2.jpg', alt: 'Tatuaż w stylu japońskim' },
  { id: 5, image: 'https://static.wixstatic.com/media/be828f_fd3867fd036041588977945fa46be167~mv2.jpg', alt: 'Minimalistyczny projekt tatuażu' },
  { id: 6, image: 'https://static.wixstatic.com/media/be828f_86a1beeb64bd4514a1be8bb6ad69ac7e~mv2.jpg', alt: 'Portretowy tatuaż' },
  { id: 7, image: 'https://static.wixstatic.com/media/be828f_ef3206d942a942b3819f1f29babf3743~mv2.jpg', alt: 'Portretowy tatuaż' }
];

const Portfolio: React.FC = () => {
  const sliderRef = useRef<any>(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="py-20 bg-metallic">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Zobacz przykłady efektów</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Zobacz, jak AI Asystent automatyzuje proces, zamieniając rozmowy w rezerwacje.
          </p>
        </motion.div>

        <div className="relative">
          <SlickSlider ref={sliderRef} {...settings} className="portfolio-slider">
            {portfolioItems.map(item => (
              <div key={item.id} className="px-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-lg bg-graphite aspect-square"
                  whileHover={{ scale: 1.03 }}
                >
                  <img src={item.image} alt={item.alt} loading="lazy" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            ))}
          </SlickSlider>

          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 z-10 bg-graphite/80 backdrop-blur-sm p-2 rounded-full text-white hover:bg-neon transition-colors duration-300"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 z-10 bg-graphite/80 backdrop-blur-sm p-2 rounded-full text-white hover:bg-neon transition-colors duration-300"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-center mt-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/team" className="btn btn-secondary">
              Zobacz całą galerię
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
