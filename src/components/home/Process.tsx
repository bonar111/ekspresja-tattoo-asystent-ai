import { motion } from 'framer-motion';
import { MessageSquare, Palette, Clock, Heart } from 'lucide-react';

const steps = [ /* bez zmian */ ];

const Process = () => {
  return (
    <section className="section bg-metallic">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center stack"
        >
          <h2 className="mb-4">Jak przebiega nasz proces?</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Od pierwszej rozmowy do pięknego efektu – prowadzimy Cię krok po kroku, aż Twój wymarzony tatuaż stanie się rzeczywistością.
          </p>
        </motion.div>

        {/* reszta bez zmian */}
      </div>
    </section>
  );
};

export default Process;
