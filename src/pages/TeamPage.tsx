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
    id: 'marzena-bonar',
    name: 'Marzena Bonar',
    specialty: 'Kolorowe tatuaże akwarelowe, covery, tatuaże na bliznach',
    image: 'https://static.wixstatic.com/media/be828f_384a9c93395e4b8997fa962903b6cfd6~mv2.jpg/v1/fill/w_950,h_943,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/be828f_384a9c93395e4b8997fa962903b6cfd6~mv2.jpg',
    bio: 'Specjalistka od kolorowych tatuaży akwarelowych, coverów i tatuaży na bliznach. Tworzy wyjątkowe wzory, pomagając klientom wyrazić siebie na nowo.'
  },
  {
    id: 'kamil-talar',
    name: 'Kamil Talar',
    specialty: 'Tatuaże graficzne, kolorowe, sketch, dotwork',
    image: 'https://static.wixstatic.com/media/be828f_c5abab41d0964feeba241ec519b23580~mv2.jpg/v1/fill/w_952,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/be828f_c5abab41d0964feeba241ec519b23580~mv2.jpg',
    bio: 'Specjalizuje się w tatuażach graficznych, kolorowych, sketch oraz dotwork. Jego prace łączą dynamiczny styl szkicu z precyzyjnym cieniowaniem kropek, tworząc unikalne wzory pełne detali i intensywnych kolorów.'
  },
  {
    id: 'gabriela-golonka',
    name: 'Gabriela Golonka',
    specialty: 'Tatuaże linearne, kolorowe, cover-up, tatuaże na bliznach',
    image: 'https://static.wixstatic.com/media/be828f_a0474707cb494a39b14fdffcfb8e24a5~mv2.jpg/v1/fill/w_952,h_804,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/be828f_a0474707cb494a39b14fdffcfb8e24a5~mv2.jpg',
    bio: 'Specjalizuje się w tatuażach linearnych, kolorowych, cover-up oraz tatuażach na bliznach. Jej precyzyjne i delikatne prace łączą eleganckie linie z żywymi kolorami, tworząc unikalne wzory dostosowane do indywidualnych potrzeb klienta.'
  },
  {
    id: 'olena',
    name: 'Olena',
    specialty: 'Subtelne i kobiece tatuaże',
    image: 'https://static.wixstatic.com/media/be828f_bba99e895c8e493580e7cf11e0b1f26f~mv2.jpg/v1/fill/w_950,h_891,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/be828f_bba99e895c8e493580e7cf11e0b1f26f~mv2.jpg',
    bio: 'Utalentowana tatuażystka, która specjalizuje się w tworzeniu subtelnych i kobiecych tatuaży. Jej prace są pełne lekkości i artystycznego wyrazu, oddając piękno w najczystszej formie.'
  }
];

const TeamPage: React.FC = () => {
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
          <h1 className="mb-4 text-4xl font-heading">Poznaj Nasz Zespół</h1>
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
              <Link to={`/artist/${artist.id}`}>
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

export default TeamPage;
