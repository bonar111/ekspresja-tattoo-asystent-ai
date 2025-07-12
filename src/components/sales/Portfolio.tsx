import { motion } from 'framer-motion';

const Portfolio: React.FC = () => (
  <section className="py-20 bg-metallic">
    <div className="container">
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

      {/* ===== PIONOWY EMBED Z VIMEO ===== */}
      <div
        className="relative mx-auto max-w-sm rounded-xl overflow-hidden shadow-lg"
        style={{ paddingTop: '177.78%' }} // (16/9)*100%
      >
        <iframe
          src="https://player.vimeo.com/video/1100809585?badge=0&autopause=0&player_id=0&app_id=58479"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          title="demoAsystenAiV1"
        />
      </div>
    </div>
  </section>
);

export default Portfolio;
