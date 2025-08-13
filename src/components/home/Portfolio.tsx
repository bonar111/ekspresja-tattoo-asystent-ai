import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Slider, { Settings } from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';

export interface PortfolioItem { id: string | number; image: string; alt: string; }

interface PortfolioProps {
  portfolioItems: PortfolioItem[];
  title?: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  slidesToShow?: number;
}

const Portfolio: React.FC<PortfolioProps> = ({
  portfolioItems,
  title = 'Zobacz nasze prace',
  description = 'Oto próbka naszych tatuaży — od delikatnych linii i minimalistycznych form, po wyraziste wzory i złożone projekty tworzone na zamówienie.',
  viewAllHref = '/team',
  viewAllLabel = 'Zobacz całą galerię',
  slidesToShow = 3,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = { dots: false, infinite: true, speed: 500, slidesToShow, slidesToScroll: 1, autoplay: false, arrows: false,
    responsive: [{ breakpoint: 1024, settings: { slidesToShow: Math.min(2, slidesToShow) } }, { breakpoint: 640, settings: { slidesToShow: 1 } }],
  };

  return (
    <section className="section bg-metallic">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center stack"
        >
          <h2 className="mb-4">{title}</h2>
          <p className="max-w-2xl mx-auto text-gray-300">{description}</p>
        </motion.div>

        <div className="relative">
          {/* slider bez zmian */}
          <Slider ref={sliderRef} {...settings} className="portfolio-slider">
            {portfolioItems.map((item) => (
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
          </Slider>

          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 z-10 bg-graphite/80 backdrop-blur-sm p-2 rounded-full text-white hover:bg-neon transition-colors duration-300"
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Poprzedni"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 z-10 bg-graphite/80 backdrop-blur-sm p-2 rounded-full text-white hover:bg-neon transition-colors duration-300"
            onClick={() => sliderRef.current?.slickNext()}
            aria-label="Następny"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-center mt-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to={viewAllHref} className="btn btn-secondary">
              {viewAllLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
