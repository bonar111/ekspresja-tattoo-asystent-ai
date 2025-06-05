import { motion } from 'framer-motion';
import { Award, ShieldCheck, Crop as Drop } from 'lucide-react';

const Proof = () => {
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
            <h2 className="mb-6">Więcej sesji, większe zarobki</h2>
            <p className="text-lg mb-8 text-gray-300">
              Nasz asystent AI zwiększa liczbę rezerwacji średnio o 30% i eliminuje ryzyko utraty klienta.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-neon p-2 rounded-full mr-4">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Wzrost rezerwacji</h3>
                  <p className="text-gray-300">
                    Aż do 30% więcej umówionych sesji dzięki natychmiastowej dwustronnej komunikacji.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neon p-2 rounded-full mr-4">
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Zero utraconych leadów</h3>
                  <p className="text-gray-300">
                    Klienci nie odchodzą – asystent odpowiada natychmiast, 24/7.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neon p-2 rounded-full mr-4">
                  <Drop size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Gotowi płacić klienci</h3>
                  <p className="text-gray-300">
                    Finalizuje rezerwację i zbiera wszystkie dane – Ty dostajesz klienta gotowego na sesję.
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
              src="https://static.wixstatic.com/media/be828f_7005c7665edc457a96a9101188c0f0f2~mv2.png"
              alt="Efekty Asystenta AI"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
