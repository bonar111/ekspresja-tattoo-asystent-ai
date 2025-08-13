// src/components/home/ArtistsTeaser.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { track } from '../../lib/analytics';

type Artist = { id: string; name: string; specialty: string; image: string };

interface Props { artists: Artist[] }

const ArtistsTeaser = ({ artists }: Props) => {
  const handleChat = (id: string) => {
    track('AIStart', { source: 'artists_teaser', artistId: id });
    window.voiceflow?.chat?.open();
  };

  return (
    <section className="py-12 bg-graphite">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} viewport={{ once: true }}
          className="text-center mb-8"
        >
          Kto tworzy takie prace?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {artists.slice(0, 3).map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
              className="bg-metallic rounded-xl overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={a.image} alt={a.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-gray-300 mb-4">{a.specialty}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleChat(a.id)} className="btn btn-primary flex-1">
                    Bezpłatna Konsultacja
                  </button>
                  <Link to={`/artist/${a.id}`} className="btn btn-secondary">
                    Portfolio
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/team" className="btn btn-secondary">Zobacz wszystkich</Link>
        </div>
      </div>
    </section>
  );
};

export default ArtistsTeaser;
