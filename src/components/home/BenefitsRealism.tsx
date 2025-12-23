import { motion } from 'framer-motion';
import { Clock, Palette, ShieldCheck } from 'lucide-react';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Benefit = ({ icon, title, description, delay }: BenefitProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center p-6 bg-metallic rounded-lg"
  >
    <div className="mb-4 text-neon p-3 bg-graphite rounded-full">{icon}</div>
    <h3 className="text-xl mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const BenefitsRealism = () => (
  <section id="benefits" className="section bg-graphite">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center stack"
      >
        Realizm w Ekspresji — dlaczego warto?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Benefit
          icon={<Palette size={32} />}
          title="Realizm w kolorze, duże projekty"
          description="Skupiamy się na pracach, gdzie liczy się głębia, światło i detale — idealne pod rękaw, udo, plecy czy łydkę."
          delay={0.2}
        />
        <Benefit
          icon={<Clock size={32} />}
          title="Plan sesji i realne oczekiwania"
          description="Ustalamy kierunek, skalę i zakres. Duże realizmy robimy etapami — wiesz z góry, jak wygląda proces."
          delay={0.4}
        />
        <Benefit
          icon={<ShieldCheck size={32} />}
          title="Higiena i bezpieczeństwo"
          description="Pracujemy w standardzie studia: sterylność, jednorazowy sprzęt i pełne wsparcie w gojeniu."
          delay={0.6}
        />
      </div>
    </div>
  </section>
);

export default BenefitsRealism;
