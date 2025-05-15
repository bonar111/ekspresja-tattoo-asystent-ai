import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-metallic">
      <div className="container">
        <div className="relative bg-graphite rounded-xl overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1777834/pexels-photo-1777834.jpeg?auto=compress&cs=tinysrgb&w=1600)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          <div className="relative z-10 p-8 md:p-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              Twój nowy tatuaż czeka!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              Umów się na bezpłatną konsultację, dopracuj szczegóły z naszym zespołem i stwórz projekt, który będzie dokładnie taki, jak chcesz. Zobacz, dlaczego klienci polecają nas dalej!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className="btn btn-primary text-lg"
                  onClick={() => {
                    if (window.voiceflow && window.voiceflow.chat) {
                      window.voiceflow.chat.open();
                    }
                  }}
                >
                  Rozpocznij rozmowę
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;