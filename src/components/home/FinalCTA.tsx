import { motion } from 'framer-motion';
import { openChat } from '../../lib/openChat';

const FinalCTA = () => {
  return (
    <section className="section bg-metallic">
      <div className="container">
        <div className="relative bg-graphite rounded-xl overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1777834/pexels-photo-1777834.jpeg?auto=compress&cs=tinysrgb&w=1600)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          <div className="relative z-10 p-8 md:p-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              Zrób pierwszy krok do swojego tatuażu
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl stack-tight max-w-2xl mx-auto"
            >
              Szybka konsultacja online na czacie pokaże Ci wstępną wycenę, przykładowe projekty oraz dostępne terminy. Wszystko w kilka minut – bez żadnych zobowiązań
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className="btn btn-primary text-lg"
                  onClick={(e) => openChat({ source: 'final_cta' }, e)}
                >
                  Rozpocznij konsultację
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
