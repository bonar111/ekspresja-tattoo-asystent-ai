import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { openChat } from '../../lib/openChat';

type Artist = { id: string; name: string; specialty: string; image: string };
interface Props { artists: Artist[]; title?: string }

const ArtistsTeaserRealizm = ({ artists, title = 'Kto tworzy takie prace?' }: Props) => {
  const handleChat = (id: string, e: React.MouseEvent) =>
    openChat({ source: 'artists_teaser', artistId: id }, e);

  return (
    <section className="section-tight bg-graphite">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} viewport={{ once: true }}
          className="text-center stack-tight"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artists.map((a, i) => (
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
                  <button
                    onClick={(e) => handleChat(a.id, e)}
                    className="btn btn-primary flex-1"
                  >
                    Bezpłatna Konsultacja
                  </button>
                  <Link to={`/artistrealizm/${a.id}`} className="btn btn-secondary">
                    Portfolio
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsTeaserRealizm;
