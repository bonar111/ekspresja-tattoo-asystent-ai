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
    text: 'Asystent ogarnia wszystko za mnie – terminy, wyceny, odpowiada klientom. Ja tylko tatuuję. Mega wygoda.',
    rating: 5,
    service: 'Tatuażystka, Studio Kolor'
  },
  {
    id: 2,
    name: 'Katarzyna B.',
    text: 'Od kiedy mam tego bota, nie siedzę już godzinami w wiadomościach. Klient sam się zapisuje, dostaje wycenę, a ja mam spokój.',
    rating: 5,
    service: 'Tatuażystka, InkArt'
  },
  {
    id: 3,
    name: 'Magda Z.',
    text: 'Myślałam, że to będzie kolejny bajer, ale serio działa. Klienci są ogarnięci, kalendarz się sam zapełnia. Sztos.',
    rating: 5,
    service: 'Właścicielka, Tattoo Space'
  },
  {
    id: 4,
    name: 'Kamil T.',
    text: 'Nie ogarniam Instagrama, nie lubię pisać, a teraz wszystko załatwia za mnie AI. Klient dostaje info i się zapisuje bez mojego udziału.',
    rating: 5,
    service: 'Tatuażysta, Kraków'
  },
  {
    id: 5,
    name: 'Olena R.',
    text: 'Asystent sam pokazuje wolne terminy, zadaje pytania i wysyła wycenę. Ja tylko sprawdzam kalendarz. Totalne ułatwienie.',
    rating: 5,
    service: 'Tatuażystka, Wrocław'
  },
  {
    id: 6,
    name: 'Michał D.',
    text: 'Wcześniej odpisywałem na wiadomości po nocach. Teraz wszystko leci automatycznie, a ja mam czas dla siebie.',
    rating: 5,
    service: 'Tatuażysta, Warszawa'
  },
  {
    id: 7,
    name: 'Asia L.',
    text: 'U mnie w studiu asystent ogarnia klientów wszystkich artystów. Nie ma już chaosu ani pomyłek z terminami.',
    rating: 5,
    service: 'Managerka, Studio w Gdańsku'
  },
  {
    id: 8,
    name: 'Bartek M.',
    text: 'Najlepsze jest to, że asystent nie ma wolnego. Działa 24/7 i nigdy nie marudzi. Klientom się to serio podoba.',
    rating: 5,
    service: 'Tatuażysta, Katowice'
  }
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
        .testimonial-slider .slick-list { margin: 0 -8px; }
        .testimonial-slider .slick-slide > div { display: flex; justify-content: center; }
        .testimonial-slider .slick-dots { bottom: -20px; display: flex !important; justify-content: center; margin: 0; padding: 0; }
        .testimonial-slider .slick-dots li { margin: 0 6px; }
        .testimonial-slider .slick-dots li button:before { font-size: 10px; color: #555; }
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
            <Slider ref={sliderRef} {...settings} className="testimonial-slider">
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
