import { motion } from 'framer-motion';
import { MessageSquare, CalendarCheck, UserCheck } from 'lucide-react';

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
    <div className="mb-4 text-neon p-3 bg-graphite rounded-full">
      {icon}
    </div>
    <h3 className="text-xl mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const Benefits = () => (
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
          icon={<MessageSquare size={32} />}
          title="Odpowiada natychmiast"
          description="Asystent działa 24/7 i odpowiada klientowi, zanim konkurencja zdąży przeczytać wiadomość."
          delay={0.2}
        />
        <Benefit
          icon={<CalendarCheck size={32} />}
          title="Wycena i zapis w 1 minucie"
          description="Klient poznaje cenę i sam wybiera termin – bez Twojego udziału, bez pisania."
          delay={0.4}
        />
        <Benefit
          icon={<UserCheck size={32} />}
          title="Tylko konkretni klienci"
          description="Dostajesz osoby zdecydowane, z wybraną datą i gotowe zapłacić zadatek."
          delay={0.6}
        />
      </div>
    </div>
  </section>
);

export default Benefits;
