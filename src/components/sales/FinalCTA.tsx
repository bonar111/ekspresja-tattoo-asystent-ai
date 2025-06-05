// src/components/sales/FinalCTA.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FinalCTA = () => (
  <section className="py-20 bg-metallic">
    <div className="container">
      <div className="relative bg-graphite rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1777834/pexels-photo-1777834.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
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
            Gotowy na więcej rezerwacji?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Sprawdź, który pakiet najlepiej pasuje do Twojego studia i zostaw
            kontakt – oddzwonimy do Ciebie w 24 h.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="#offer" className="btn btn-primary text-lg">
              Zobacz pakiety
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCTA;
