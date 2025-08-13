import { motion } from 'framer-motion';
import { Award, ShieldCheck, Crop as Drop } from 'lucide-react';

const Proof = () => {
  return (
    <section className="section bg-graphite">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="stack">Bezpieczeństwo i higiena na pierwszym miejscu</h2>
            <p className="text-lg stack text-gray-300">
              W Ekspresji Twoje zdrowie i komfort są dla nas priorytetem. Pracujemy zgodnie z najwyższymi standardami sanitarnymi, 
              używając wyłącznie sterylnego, jednorazowego sprzętu i tuszy najwyższej jakości.
            </p>
            {/* ...reszta bez zmian */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden max-w-sm mx-auto"
          >
            <img
              src="https://static.wixstatic.com/media/be828f_7005c7665edc457a96a9101188c0f0f2~mv2.png/v1/fill/w_560,h_840,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/be828f_7005c7665edc457a96a9101188c0f0f2~mv2.png"
              alt="Nasz proces bezpieczeństwa"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
