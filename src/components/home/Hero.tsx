import { motion } from "framer-motion";
import { openChat } from "../../lib/openChat";

const Hero = () => {
  const handleOpenChat = (e: React.MouseEvent<HTMLButtonElement>) =>
    openChat({ source: "hero_cta", ai_event: "AIStart" }, e);

  return (
    <section
      className="relative flex items-center justify-center pt-16 pb-6 sm:pt-24 sm:pb-10 overflow-hidden text-white"
      aria-labelledby="hero-heading"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(https://images.pexels.com/photos/7006167/pexels-photo-7006167.jpeg?auto=compress&cs=tinysrgb&w=1920)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-[28rem]"
        >
          <h1 id="hero-heading" className="mb-3 text-[28px] leading-tight font-extrabold sm:text-5xl">
            Delikatne, kolorowe kobiece tatuaże
          </h1>

          <p className="mb-5 text-base sm:text-xl">
            Zobacz nasze prace. Chcesz podobny styl?{" "}
            <strong>Napisz — wyślemy 2 propozycje i najbliższe terminy</strong>
          </p>

                <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOpenChat}
        className="w-full sm:w-auto inline-flex flex-col items-center justify-center text-center whitespace-normal rounded-2xl
                  px-5 py-3 text-base sm:text-lg font-semibold leading-[1.15] btn btn-primary shadow-lg gap-0"
        aria-label="Odbierz inspiracje i terminy w 2–5 minut"
      >
        <span className="leading-tight">Odbierz 2 inspiracje + terminy</span>
        <span className="block text-[11px] font-normal opacity-90 mt-0.5">
          w 2–5 min • bez zobowiązań
        </span>
      </motion.button>


          <div className="mt-3">
            <a href="#prace" className="inline-flex items-center gap-1 text-sm opacity-90 hover:opacity-100 underline underline-offset-2">
              Zobacz nasze prace <span aria-hidden>⌄</span>
            </a>
          </div>

          <p className="mt-3 text-xs opacity-90">
            <strong>5.0★</strong> • Kraków • Bez opłaty • Odpowiadamy w kilka minut
          </p>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
};

export default Hero;
