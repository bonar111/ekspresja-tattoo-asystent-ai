import { motion } from 'framer-motion';
import { Clock, Palette, Fingerprint } from 'lucide-react';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Benefit = ({ icon, title, description, delay }: BenefitProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-6 bg-metallic rounded-lg"
    >
      <div className="mb-4 text-neon p-3 bg-graphite rounded-full">
        {icon}
      </div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-graphite">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 text-3xl font-heading"
        >
          Przewaga Dzięki Technologii AI
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Benefit 
            icon={<Clock size={32} />}
            title="Rozmawia 24/7"
            description="Klienci nigdy nie czekają – asystent odpowiada błyskawicznie przez całą dobę."
            delay={0.2}
          />
          <Benefit 
            icon={<Palette size={32} />}
            title="Wycena i rezerwacja"
            description="Automatyczna wycena i rezerwacja terminów – bez Twojego udziału."
            delay={0.4}
          />
          <Benefit 
            icon={<Fingerprint size={32} />}
            title="Gotowi klienci"
            description="Otrzymujesz tylko zdecydowanych klientów, gotowych na sesję."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default Benefits;
