import { motion } from 'framer-motion';
import { openChat } from '../../lib/openChat';

const Hero = () => {
  return (
    <section
      className="relative flex items-center justify-center pt-24 pb-8 overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://images.pexels.com/photos/7006167/pexels-photo-7006167.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="mb-4 text-4xl sm:text-5xl font-bold leading-tight">
            Kolorowe, kobiece tatuaże
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Opowiedz nam o swoim pomyśle – Wycenimy Twój tautuaż w 2-3 minuty
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary text-lg"
            onClick={openChat}
          >
            Rozpocznij konsultacje
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;