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
          className="text-center mb-16"
        >
          Dlaczego warto wybrać Ekspresję?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Benefit 
            icon={<Clock size={32} />}
            title="Szybka konsultacja online"
            description="Skontaktuj się z nami błyskawicznie – konsultacja dostępna przez całą dobę, 7 dni w tygodniu."
            delay={0.2}
          />
          <Benefit 
            icon={<Palette size={32} />}
            title="Darmowy projekt tatuażu"
            description="Przygotujemy bezpłatny projekt, który idealnie wpisze się w Twoje oczekiwania i osobisty styl."
            delay={0.4}
          />
          <Benefit 
            icon={<Fingerprint size={32} />}
            title="Wyjątkowy jak Ty"
            description="Każdy tatuaż to indywidualny projekt, który podkreśli Twój unikalny charakter."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default Benefits;
