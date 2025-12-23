// src/pages/TeamPage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Artist {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bio: string;
}


const artists: Artist[] = [
    {
    id: 'marcin-kudosz',
    name: 'Marcin Kudosz',
    specialty: 'Kolorowy realizm, portrety, duże projekty',
    image: 'https://static.wixstatic.com/media/be828f_59e2f9f789254b25b5cbc50ea9b77249~mv2.jpg',
    bio: 'Specjalizuję się w realistycznych tatuażach w czerni i kolorze, w których każdy szczegół ma znaczenie. Tworzę prace pełne głębi, intensywnych barw i precyzji, oddając emocje oraz charakter każdego projektu. Jeśli marzysz o tatuażu, który ożyje na skórze'
  },
  {
    id: 'andrev',
    name: 'Andrev',
    specialty: 'Kolorowy realizm, covery, duże projekty',
    image: 'https://static.wixstatic.com/media/be828f_c0202e795bcd46a0af70478ab5ffad97~mv2.jpg',
    bio: 'Specjalizuję się w realistycznych tatuażach w czerni i kolorze, w których każdy szczegół ma znaczenie. Tworzę prace pełne głębi, intensywnych barw i precyzji, oddając emocje oraz charakter każdego projektu. Jeśli marzysz o tatuażu, który ożyje na skórze'
  },
  {
    id: 'jarek',
    name: 'Jarek',
    specialty: 'Kolorowy realizm, covery, duże projekty',
    image: 'https://static.wixstatic.com/media/be828f_b523c8126ede42a58d2e8b26c02b1b37~mv2.jpg',
    bio: 'Specjalizuję się w realistycznych tatuażach w czerni i kolorze, w których każdy szczegół ma znaczenie. Tworzę prace pełne głębi, intensywnych barw i precyzji, oddając emocje oraz charakter każdego projektu. Jeśli marzysz o tatuażu, który ożyje na skórze'
  }
];

const TeamPageRealizm: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Nasz Zespół | Ekspresja Tattoo Studio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4 text-4xl font-heading">Poznaj Nasz Zespół Realistów</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Nasz zespół to grupa utalentowanych artystów, którzy z pasją tworzą wyjątkowe tatuaże.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, idx) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredId(artist.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <Link to={`/artistrealizm/${artist.id}`}>
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-metallic">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    style={{
                      transform: hoveredId === artist.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-medium">{artist.name}</h3>
                    <p
                      className={`text-neon font-semibold transition-all duration-300 ${
                        hoveredId === artist.id ? 'mb-3' : 'mb-0'
                      }`}
                    >
                      {artist.specialty}
                    </p>
                    <p
                      className={`text-gray-300 text-sm transition-all duration-300 overflow-hidden ${
                        hoveredId === artist.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {artist.bio}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPageRealizm;
