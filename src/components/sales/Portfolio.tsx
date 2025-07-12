// src/components/sales/Portfolio.tsx
import { motion } from 'framer-motion';
import React from 'react';

const Portfolio: React.FC = () => (
  <section className="py-20 bg-metallic">
    <div className="container">
      {/* Nagłówek */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="mb-4">Zobacz, jak działa Asystent AI</h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          Zobacz, jak asystent prowadzi rozmowę z klientem, wycenia projekt i rezerwuje termin — wszystko bez Twojego udziału.
        </p>
      </motion.div>

      {/* Tutaj sam embed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg bg-black relative"
        style={{ padding: '75% 0 0 0', position: 'relative' }}
      >
        <iframe
          src="https://player.vimeo.com/video/1100809585?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          title="demoAsystenAiV1"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </motion.div>
    </div>
  </section>
);

export default Portfolio;
