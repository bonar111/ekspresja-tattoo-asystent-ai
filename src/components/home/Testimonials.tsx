import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Slider, { Settings } from 'react-slick';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import 'slick-carousel/slick/slick.css';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Weronika J.',
    text: 'Jestem bardzo zadowolona z mojego pierwszego tatuażu, który wykonywała Marzena. Jest to dokładnie to, o co mi chodziło',
    rating: 5,
    service: ''
  },
  {
    id: 2,
    name: 'Wiki Grzesło',
    text: 'Wykonywałam drugi tatuaż w tym studio, tym razem u Gabrysi i z całego serca polecam 🤍 Oprócz przepięknego projektu który stworzyła z moich inspiracji, mogłam liczyć na bardzo komfortowa atmosferę, dużo empatii oraz wyjątkowo profesjonalne podejście zarówno przed jak i po wykonaniu przepięknej pracy. Jeżeli zastanawiacie się gdzie wybrać się na swój pierwszy bądź kolejny tatuaż to serdecznie polecam Gabrysie do póki są wolne terminy!! ❤️🤍❤️',
    rating: 5,
    service: ''
  },
  {
    id: 3,
    name: 'Daria Kucharska',
    text: 'W Ekspresji robiłam swój pierwszy tatuaż i na pewno nie ostatni 😊 Kameralne miejsce, sympatyczna atmosfera. Polecam Helenę, wykonuje fantastyczne, kobiece tatuaże. Idealnie dopasowała kolory do mojej skóry i do mnie 😊 Profesjonalne podejście i perfekcyjne wykonanie. Jeszcze raz dziękuję i polecam',
    rating: 5,
    service: ''
  }
  // ... możesz dodać więcej
];

const Testimonials: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <>
      <style>{`
        /* Usuń odstępy nad i pod sliderem */
        .testimonial-slider .slick-list {
          margin: 0 -8px;
        }
        /* Wyśrodkuj pojedynczy slajd */
        .testimonial-slider .slick-slide > div {
          display: flex;
          justify-content: center;
        }
        /* Przenieś kropki bliżej zawartości */
        .testimonial-slider .slick-dots {
          bottom: -20px;
          display: flex !important;
          justify-content: center;
          margin: 0;
          padding: 0;
        }
        .testimonial-slider .slick-dots li {
          margin: 0 6px;
        }
        .testimonial-slider .slick-dots li button:before {
          font-size: 10px;
          color: #555;
        }
      `}</style>

      <section className="pt-12 pb-8 bg-graphite">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center text-3xl mb-8 text-white"
          >
            Opinie naszych klientów
          </motion.h2>

          <div className="relative max-w-3xl mx-auto">
            <Slider
              ref={sliderRef}
              {...settings}
              className="testimonial-slider"
            >
              {testimonials.map(t => (
                <div key={t.id} className="px-2">
                  <div className="bg-metallic rounded-lg p-8 mx-auto max-w-lg relative">
                    <Quote size={40} className="absolute top-4 right-4 text-neon opacity-20" />
                    <div className="flex space-x-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={18} className="text-neon fill-neon" />
                      ))}
                    </div>
                    <p className="text-lg mb-6 text-white">"{t.text}"</p>
                    <div className="mt-4">
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-gray-400">{t.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-graphite/80 p-2 rounded-full text-white hover:bg-neon transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-graphite/80 p-2 rounded-full text-white hover:bg-neon transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
