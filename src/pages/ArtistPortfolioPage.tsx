import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { openChat } from '../lib/openChat';

interface ArtistData {
  name: string;
  specialty: string;
  bio: string;
  image: string;
  portfolio: string[];
  testimonials: {
    name: string;
    text: string;
    rating: number;
  }[];
}

const artistsData: Record<string, ArtistData> = {
  'marzena-bonar': {
    name: 'Marzena Bonar',
    specialty: 'Kolorowe tatuaże akwarelowe, covery, tatuaże na bliznach',
    bio: 'Specjalistka od kolorowych tatuaży akwarelowych, coverów i tatuaży na bliznach. Tworzy wyjątkowe wzory, pomagając klientom wyrazić siebie na nowo.',
    image: 'https://static.wixstatic.com/media/be828f_384a9c93395e4b8997fa962903b6cfd6~mv2.jpg',
    portfolio: [
      'https://static.wixstatic.com/media/be828f_98ca7fedc1ab4a3fbe750d18b29c3184~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_d3e6d192c2b54e8da1f807174aff9a0f~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_cb250cd4d9dc40eea8a5ca629df9e9b7~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_508c4cbc4a9946ee85622080d223be74~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_8ad69d3f8b5c442b83466c21f6a5305e~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_e6aca95d33ef4f439fcc9a9a8224ef1c~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_7a263597d4a0429ca03f29170cf04286~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_6cb4f64d4ee94ed5b6b4586334cee70f~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_7026ac97abdb4fecb1e226a37d1569c5~mv2.jpeg',
      'https://static.wixstatic.com/media/be828f_3ce5870f668b4735958c36fdc2ead8e5~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_4e1354c6348248d896ff04a1ece0cf12~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_6d8941b5f4f4446880cbba2ea9f1de28~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_1df1b91054e14df197528cbed0d0a437~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_15e5effe8af248ef972f94d397d183c3~mv2.jpeg',
      'https://static.wixstatic.com/media/be828f_da4fdb9815f344d7abb6a3e894e47755~mv2.jpg'
    ],
    testimonials: [
      { name: 'Weronika J.', text: 'Jestem bardzo zadowolona z mojego pierwszego tatuażu, który wykonywała Marzena. Jest to dokładnie to, o co mi chodziło', rating: 5 },
      { name: 'Katarzyna Banasik', text: 'Bardzo dziękuję Marzenie za mój coverek. Nie był łatwy, bo ciemny, ale zrobiła wszystko,.co się dało, żebym mogła się nim wreszcie cieszyć. Fiołki wokół to majstersztyk. Jeśli chcecie kolorowy tatuaż lub cover to tylko do Marzeny z Ekspresji - prawdziwa artystka ', rating: 5 }
    ],
  },
  'kamil-talar': {
    name: 'Kamil Talar',
    specialty: 'Tatuaże graficzne, kolorowe, sketch, dotwork',
    bio: 'Specjalizuje się w tatuażach graficznych, kolorowych, sketch oraz dotwork. Jego prace łączą dynamiczny styl szkicu z precyzyjnym cieniowaniem kropek.',
    image: 'https://static.wixstatic.com/media/be828f_c5abab41d0964feeba241ec519b23580~mv2.jpg',
    portfolio: [
      'https://static.wixstatic.com/media/be828f_eb29fe598f854aae8bd78afd851b3c95~mv2.png',
      'https://static.wixstatic.com/media/be828f_11905881bacc47e090e9f5a0bf433fa0~mv2.png',
      'https://static.wixstatic.com/media/be828f_5f2ec11c82224ae7949a175be1261b43~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_a1e091d51043416aa79b7f0c6dd80625~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_3574468b15804dc1967d952bf5b5c2b1~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_c8416f484ee743f1a18002c212446bce~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_67de546568f841ac824497d1ae94e283~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_9cd31aa798d64e47ac1249d3ac2ccfa6~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_80c442e1dbc945c983263df38e21416e~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_cde4d2241c03466fb3c65ec9b648b70c~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_d4d29ef36dcc4807b01bc97f59900c30~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_786da2866f9a4f308cf1640f64dc5423~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_c2e83905ae2b4792ad8597b295d90d06~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_04413f88daec46c3a99ad8750b3e3110~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_4451511a8ade4b30b977e0b48dd5f7f2~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_458f7f84445047bc88f88aa684ec702f~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_278f1ff8a7fa49a0be0588cd3e187291~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_70dc8677cd484b75a0e4bd809d492c77~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_bff6ada8ba7d4d3dbf80f12be2ae6438~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_5054edc62de14f8d96355496fb28a4f0~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_17494b5cf8df4e8c86cbe67f7c59f435~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_1e068b29f15649e2894c27b0cb956308~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_ec1e8efa5ff14e8a8d86f8be7e01c9e3~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_3d8bd47cf8b04bcc9df673315f52b5b8~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_9702929f75ee4090b7a1b08646e9a8fa~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_9804217670b8490ea63e57f2549b0d5a~mv2.jpg'
    ],
    testimonials: [
      { name: 'Doris', text: 'Pierwsza wizyta w studio i na pewno nie ostatnia! Kamil - Profesjonalista przez duże P! Reszta załogi sympatyczna i pogadana. Atmosfera totalnie luźna. Polecam bardzo, bardzo. Podejście indywidualne do każdego klienta, dopasowanie wzoru, porady, wszystko na plus. Niebawem znów się zobaczymy 🤪', rating: 5 },
      { name: 'Magda Z.', text: 'To był mój pierwszy tatuaż, więc szukałam kogoś wyjątkowego. miałam szczęście i trafiłam do Ekspresjia tam do Kamila...I lepiej trafić nie mogłam! Miła atmosfera, pełna profeska, indywidualne podejście I (co dla mnie najwazniejsze) Kamil bardzo serio podszedł do mojego lęku i obaw, zaopiekował się nimi, wszystko mi wyjaśnił, odpowiedział na wszystkie pytania i sprawił...że już planuję kolejny tatoo 😀 POLECAM!!!', rating: 5 },
    ],
  },
  'gabriela-golonka': {
    name: 'Gabriela Golonka',
    specialty: 'Tatuaże linearne, kolorowe, cover-up, tatuaże na bliznach',
    bio: 'Jej precyzyjne i delikatne prace łączą eleganckie linie z żywymi kolorami, tworząc unikalne wzory dostosowane do indywidualnych potrzeb.',
    image: 'https://static.wixstatic.com/media/be828f_a0474707cb494a39b14fdffcfb8e24a5~mv2.jpg',
    portfolio: [
      'https://static.wixstatic.com/media/be828f_0769656d92554314974326ad3f7ded00~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_83d0f5df849a4f41af2bc7278eef6ba6~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_84dc779bcf7a46ffa938d07236a217a0~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_a53a430c3f974852a8b60d4abb56136a~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_e541f50f7b3b491cbc8c1ca21c8c299e~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_9ad2010ed23c420789ab886478820e69~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_cc24bf43f3bb4c229608066902048bfd~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_86a1beeb64bd4514a1be8bb6ad69ac7e~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_fd3867fd036041588977945fa46be167~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_a74f2a89da584719b3db121a875effe1~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_ae8ce19331e244319cbb78307930ad77~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_50fcd3ec02f043a2a6450e36ce644de7~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_734f3e9c33764ac7b8fe600cac1bb231~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_76ae1204f65b4718b67226036322884c~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_f3420e1a22584b1caff0374098d9cf4d~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_f2721fa3c48e455ca49c3f56361c041f~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_985ccfe821a4483e9886adb7d61bbcc7~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_19887486647547c0af7c70eba58cbb0d~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_f635c457e0494d799f647a540a26477f~mv2.jpg'
    ],
    testimonials: [
      { name: 'Marta Świerczek', text: 'Robiłam wczoraj tatuaż u Gabrysi i serdecznie polecam. Dziewczyna pomysłowa.  Z przedstawionych zdjęć  stworzyła tatuaż  specjalnie dla mnie. Bardzo sympatyczna atmosfera i fachowe podejście do tematu. Profesjonalnie zrobiony tatuaż  z wszystkimi drobnymi szczegółami. Jeżeli  kto się zastanawia nad dziarką  to Gabrysia będzie  strzałem  w dziesiątkę  😁', rating: 5 },
      { name: 'Justyna Robak', text: 'Robiłam wczoraj swój 1 tatuaż u Gabrysi i bardzo polecam. Młoda,kreatywna dziewczyna,bardzo delikatna. Tatuaż pięknie zrobiony! Jestem bardzo zadowolona!', rating: 5 },
    ],
  },
  olena: {
    name: 'Olena',
    specialty: 'Subtelne i kobiece tatuaże',
    bio: 'Jej prace są pełne lekkości i artystycznego wyrazu, oddając piękno w najczystszej formie.',
    image: 'https://static.wixstatic.com/media/be828f_bba99e895c8e493580e7cf11e0b1f26f~mv2.jpg',
    portfolio: [
      'https://static.wixstatic.com/media/be828f_3c84436f9d544c7faf3260bc2adea9d3~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_bb3aeeac12d645669bf3b0b6f26670d3~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_70f5ca4805804c3f8cbf6b574364d17e~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_7f71953bc29e4dcdb7e4348938f938f7~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_8135eb61dc364cc593b6fe29ecaa835e~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_3f7e76896b7742c6bcee15fa83a2fab2~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_d85808e03b2a49a5b831c0986ec01183~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_6c9fb255fbc3459cb52b2d402005116e~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_6f25c1cef50e4857b7c3f3144292871a~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_db0450f2a5f1487583b82092c6428ce0~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_a6810eb98a2a47b5a432815670739736~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_bcd230b0d55644af9d35d9c018e24219~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_f00f37a7324b4d608a434bf50f53ad29~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_146dcf9495fc4c3ca855f2016a12ac84~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_5445ac074cfd4aa79fa64f8c44e030a2~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_cf8e1f047f6b482998decd43c5375dee~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_c051a35f2ce34f7ca93e81cc952027b1~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_f8073ade99ac45c3bd63323f128ccdff~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_2c7133366af549e7ab8b21a8e88a2be7~mv2.png'
    ],
    testimonials: [
      { name: 'Ewa Ozga', text: 'Witam,to mój drugi tatuaż. Rok temu byłam pierwszy raz. Studio na wielka 5. Olena na 6. Pozdrawiam. Ewka', rating: 5 },
      { name: 'Angelika Mikołajczyk', text: 'Olena to niesamowita tatuatorka – pełna talentu, precyzji i pasji! Świetnie rozumie wizję klienta i tworzy prawdziwe dzieła sztuki. Studio tatuażu Ekspresja również robi ogromne wrażenie – jest profesjonalne, przyjazne i pełne pasji. Gorąco polecam zarówno Olenę, jak i to wyjątkowe miejsce!', rating: 5 },
    ],
  }
};

const ArtistPortfolioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id && artistsData[id]) {
      setArtist(artistsData[id]);
      document.title = `${artistsData[id].name} — ${artistsData[id].specialty}`;
    }
  }, [id]);

  if (!artist) {
    return (
      <div className="container py-32 text-center">
        <h2>Artysta nie znaleziony</h2>
        <Link to="/team" className="btn btn-primary mt-4">Powrót do zespołu</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <Link to="/team" className="inline-flex items-center link-hover mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Powrót do zespołu
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={artist.image}
                alt={artist.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <h1 className="mb-2 text-3xl font-heading">{artist.name}</h1>
            <p className="text-neon text-lg mb-4">{artist.specialty}</p>
            <p className="text-gray-300 mb-6">{artist.bio}</p>

            <div className="space-y-6 mb-8">
              {artist.testimonials.map((t, i) => (
                <div key={i} className="bg-metallic p-6 rounded-lg">
                  <div className="flex space-x-1 mb-2">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#B900FF">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="italic text-gray-300 mb-3">"{t.text}"</p>
                  <p className="font-medium">{t.name}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className="btn btn-secondary inline-flex items-center"
                  onClick={(e) => openChat({ source: 'artist_page', artist: artist.name }, e)}
                >
                  <MessageCircle size={20} className="mr-2" />
                  Chat o projekcie
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <h2 className="text-center mb-10 text-2xl">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artist.portfolio.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="aspect-square overflow-hidden rounded-lg bg-metallic"
            >
              <img src={src} alt={`${artist.name} work`} loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPortfolioPage;