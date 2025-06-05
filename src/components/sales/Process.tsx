import { motion } from 'framer-motion';
import { MessageSquare, Palette, Clock, Heart } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <MessageSquare size={32} />,
    title: '🎯 Twoja wizja',
    description: 'Opisz swój pomysł – asystent AI od razu odpowiada na każde pytanie.'
  },
  {
    id: 2,
    icon: <Palette size={32} />,
    title: '🛠️ Projekt i wycena',
    description: 'AI natychmiast wycenia projekt i przedstawia dostępne terminy.'
  },
  {
    id: 3,
    icon: <Clock size={32} />,
    title: '⏳ Rezerwacja',
    description: 'Automatyczne umówienie sesji, zapisane w Twoim kalendarzu.'
  },
  {
    id: 4,
    icon: <Heart size={32} />,
    title: '❤️ Gotowi klienci',
    description: 'Otrzymujesz potwierdzenie od klienta i wszystkie niezbędne dane.'
  }
];

const Process = () => {
  return (
    <section className="py-20 bg-metallic">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Jak to działa?</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Cztery proste kroki od zapytania do potwierdzonej sesji.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-neon/30 -translate-x-1/2 z-0"></div>

          <div className="space-y-12 md:space-y-0 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:justify-start' : 'md:flex-row-reverse md:justify-start'
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`w-full md:w-5/12 bg-graphite p-6 rounded-lg relative ${
                    index % 2 === 0 ? 'md:text-right md:mr-8' : 'md:text-left md:ml-8'
                  }`}
                >
                  <h3 className="text-xl mb-2 flex items-center md:justify-start gap-2">
                    <span className="inline-block md:hidden text-neon mr-2">{step.icon}</span>
                    <span>{step.title}</span>
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-neon text-white p-3 rounded-full my-4 md:my-0 md:mx-0 z-20"
                >
                  {step.icon}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
