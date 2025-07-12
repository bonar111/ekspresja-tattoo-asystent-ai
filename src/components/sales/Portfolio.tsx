import { motion } from 'framer-motion';

const Portfolio: React.FC = () => (
  <section className="py-12 bg-metallic">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="mb-4">Zobacz, jak działa Asystent AI</h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          Zobacz, jak asystent prowadzi rozmowę z klientem, wycenia projekt i rezerwuje termin — wszystko bez Twojego udziału.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto w-full md:max-w-4xl rounded-xl overflow-hidden shadow-lg aspect-video"
      >
        <iframe
          src="https://player.vimeo.com/video/1100809585?badge=0&autopause=0&player_id=0&app_id=58479"
          title="demoAsystenAiV1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </motion.div>
    </div>
  </section>
);

export default Portfolio;
