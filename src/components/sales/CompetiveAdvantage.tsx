import { motion } from 'framer-motion';
import { Award, ShieldCheck, Crop as Drop } from 'lucide-react';

const CompetiveAdvantage = () => {
  return (
    <section className="py-20 bg-graphite">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Bądź krok przed konkurencją</h2>
            <p className="text-lg mb-8 text-gray-300">
              Zyskaj przewagę, której inni nie mają. Dzięki asystentowi AI klienci wybiorą właśnie Ciebie.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-neon p-2 rounded-full mr-4">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Błyskawiczna reakcja = więcej klientów</h3>
                  <p className="text-gray-300">
                    Klienci wybierają studio, które odpowiada natychmiast. Twój asystent robi to automatycznie, przez całą dobę. Konkurencja nawet nie zdąży się odezwać.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-neon p-2 rounded-full mr-4">
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Nigdy więcej utraconych klientów</h3>
                  <p className="text-gray-300">
                    Twój asystent nie śpi, nie odpoczywa – 24/7 rezerwuje terminy i podaje wyceny. Klienci przestaną szukać alternatyw.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-neon p-2 rounded-full mr-4">
                  <Drop size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Profesjonalny wizerunek</h3>
                  <p className="text-gray-300">
                    Pokazujesz klientom, że Twoje studio działa jak dobrze naoliwiona maszyna. To Ty jesteś liderem – inni zostają w tyle.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden max-w-sm mx-auto"
          >
            <img
              src="https://static.wixstatic.com/media/be828f_cd1e071fe7d7406d88e45c8cefd30d60~mv2.png"
              alt="Efekty Asystenta AI"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompetiveAdvantage;
