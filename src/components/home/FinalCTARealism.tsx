// src/components/home/FinalCTARealism.tsx
import { motion } from 'framer-motion';
import { openChat } from '../../lib/openChat';

const FinalCTARealism = () => {
  return (
    <section className="section bg-metallic">
      <div className="container">
        <div className="relative bg-graphite rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'url(https://images.pexels.com/photos/1777834/pexels-photo-1777834.jpeg?auto=compress&cs=tinysrgb&w=1600)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div className="relative z-10 p-8 md:p-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              Chcesz realistyczny tatuaż?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl stack-tight max-w-2xl mx-auto"
            >
              Napisz na czacie: wyślemy <b>orientacyjną wycenę</b>, <b>2 kierunki projektu</b> i{' '}
              <b>najbliższe terminy</b>. Bez zobowiązań.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => openChat({ source: 'final_cta_realizm', style: 'realism' }, e)}
                className="w-full sm:w-auto inline-flex flex-col items-center justify-center text-center whitespace-normal rounded-2xl
               px-5 py-3 text-base sm:text-lg font-semibold leading-[1.15] btn btn-primary shadow-lg gap-0"
                aria-label="Odbierz inspiracje i terminy w 2–5 minut"
              >
                <span className="leading-tight">Odbierz 2 inspiracje + terminy</span>
                <span className="block text-[11px] font-normal opacity-90 mt-0.5">
                  w 2–5 min • bez zobowiązań
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTARealism;
