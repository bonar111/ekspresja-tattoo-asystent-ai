import { motion } from 'framer-motion';
import { openChat } from '../../lib/openChat';

const InlineCTA = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="section-tight bg-graphite">
    <div className="container text-center">
      <h3 className="text-2xl stack-tight">{title}</h3>
      <p className="text-gray-300 max-w-2xl mx-auto stack-tight">{subtitle}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary"
        onClick={(e) => openChat({ source: 'inline_cta', title }, e)}
      >
        Wyślij wiadomość — 2 propozycje i terminy
      </motion.button>
    </div>
  </section>
);

export default InlineCTA;
