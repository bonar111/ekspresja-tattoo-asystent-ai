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
  },
  'marcin-kudosz': {
    name: 'Marcin Kudosz',
    specialty: 'Tatuaże kolorowe, realistyczne, covery',
    bio: 'Specjalizuję się w realistycznych tatuażach w czerni i kolorze, w których każdy szczegół ma znaczenie. Tworzę prace pełne głębi, intensywnych barw i precyzji, oddając emocje oraz charakter każdego projektu. Jeśli marzysz o tatuażu, który ożyje na skórze',
    image: 'https://static.wixstatic.com/media/be828f_59e2f9f789254b25b5cbc50ea9b77249~mv2.jpg',
    portfolio: [
      'https://static.wixstatic.com/media/be828f_0e1f58b17df54371bef1e50214b67b5f~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_4ffc27b7e9294546a393856162b166fa~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_dff898ab859d4416bd97805ad8acf58f~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_47907e8abfdc48d1adbc767feb386db7~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_69cabe86b3d94f92b0a85e47fa67e410~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_68afec229a494f8582ebc1aaf3d2de95~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_0756547eaf0249daa0deda6b9dc24185~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_110aaa512b97488299c88bd5fc670701~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_4da50fbce52a46228bb212bbc57349de~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_f20569b4e5974cc69395f3f385764780~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_89ec6f2b561149b186a24df3aeea7e1f~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_73a73597e49d4ae68715dd2649b2e7d6~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_3ce17fcf01084a9084eb3879cbf5bb55~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_fb9d6112faa1436f895aca23fdba3688~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_3dab427358184f9ea4cbd466cbaac186~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_4cd2881aad6746d588a2453d2ef70b9f~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_9f6c249789bd4cb6b99f3562b29a6a9f~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_f75b51aa74ad43b287eb47a503b4d2e4~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_6186cbf31b1c4b26a46c1fec2c99817e~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_4c4f703399984912b5a419da1ca531b2~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_eaf3f0b950314821b8ba5a0760b84797~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_fb30921ce83f4cf8b8773f474a9c6cc9~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_5b8ba99d5d2742aa9d88b4a0d1bc4dba~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_27c29e21a9fa4436afba5d71a2946b37~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_4d9fad33335d4ca8a443fd21d36ac468~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_beac4a9eae444894ab29b0a6a356fb7a~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_dc4760a104d041efad7c96bd3e8c6deb~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_9ad79eab39284f5c853bc180968749b2~mv2.jpg',
      'https://static.wixstatic.com/media/be828f_6e79cb29ab094bbf882b0a7cb0287541~mv2.jpg',
    ],
    testimonials: [
{ name: 'Dorota', text: 'Pierwsza wizyta w studiu i na pewno nie ostatnia! Bardzo sympatyczna atmosfera, luźno i profesjonalnie. Indywidualne podejście, pomoc w dopasowaniu wzoru oraz konkretne wskazówki pielęgnacyjne. Wszystko na plus. Wkrótce wracam 🤪', rating: 5 },
{ name: 'Aga', text: 'To był mój pierwszy tatuaż. Szukałam miejsca z dobrym podejściem do początkujących i trafiłam idealnie. Miła, spokojna obsługa, wszystko jasno wyjaśnione, moje obawy zostały rozwiane i dostałam odpowiedzi na każde pytanie. Już planuję kolejny tatuaż 😀 POLECAM!', rating: 5 },
]
  },
  'andrev': {
    name: 'Marcin Kudosz',
    specialty: 'Tatuaże kolorowe, realistyczne, covery',
    bio: 'Specjalizuję się w realistycznych tatuażach w czerni i kolorze, w których każdy szczegół ma znaczenie. Tworzę prace pełne głębi, intensywnych barw i precyzji, oddając emocje oraz charakter każdego projektu. Jeśli marzysz o tatuażu, który ożyje na skórze – zapraszam!',
    image: 'https://static.wixstatic.com/media/be828f_c0202e795bcd46a0af70478ab5ffad97~mv2.jpg',
    portfolio: [
      "https://static.wixstatic.com/media/be828f_eb4684fc03934dd3a4c07d5628a9c66f~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_92d9dd09e80545bfb97fe1accd0e352c~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_ec7ee11f5c8949bea2c90083db7903fc~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_626aa4bb77344a308178a949d8f2f887~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_6aace62710bd4cce90d4d8e121e1636e~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_48ff3e225ebb4dce8d8da93c7df6ee07~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_809501315d51422e946ac6a9c1a0b5d0~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_631a636778fa47ef9153cde259dbe0ac~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_534efd87297f48b6a10ae33def944b89~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_9d05f48bd0be4652b736ae0aed47edf5~mv2.jpg",
  "https://static.wixstatic.com/media/be828f_4f17154435e247b1bd8dcc1d64f6ca05~mv2.jpg",
    ],
    testimonials: [
{ name: 'Dorota', text: 'Pierwsza wizyta w studiu i na pewno nie ostatnia! Bardzo sympatyczna atmosfera, luźno i profesjonalnie. Indywidualne podejście, pomoc w dopasowaniu wzoru oraz konkretne wskazówki pielęgnacyjne. Wszystko na plus. Wkrótce wracam 🤪', rating: 5 },
{ name: 'Aga', text: 'To był mój pierwszy tatuaż. Szukałam miejsca z dobrym podejściem do początkujących i trafiłam idealnie. Miła, spokojna obsługa, wszystko jasno wyjaśnione, moje obawy zostały rozwiane i dostałam odpowiedzi na każde pytanie. Już planuję kolejny tatuaż 😀 POLECAM!', rating: 5 },
]
  },
  'jarek': {
    name: 'Jarek',
    specialty: 'Tatuaże kolorowe, realistyczne, covery',
    bio: 'Specjalizuję się w realistycznych tatuażach w czerni i kolorze, w których każdy szczegół ma znaczenie. Tworzę prace pełne głębi, intensywnych barw i precyzji, oddając emocje oraz charakter każdego projektu. Jeśli marzysz o tatuażu, który ożyje na skórze – zapraszam!',
    image: 'https://static.wixstatic.com/media/be828f_b523c8126ede42a58d2e8b26c02b1b37~mv2.jpg',
    portfolio: [
      "https://static.wixstatic.com/media/be828f_09060579b36c48c3bf130dd835829c0c~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_f4f62a020a984a84b1792fe048a30080~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_221002c8b3f5464abbc2767d11b05bb4~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_50590ee4a4dc4067a7618ceb6eeedbc9~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_eb6ae3237d7a4d0ebb41ceea9d1bc8eb~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_f0cbe9e9831945b6b0568353bad38087~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_8da7d99cacbb45b79622c4fe860eb9f6~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_646c2ddea03b474da3c28c4bc528e06c~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_01d1db6b8216445e8df30d956210f0d6~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_7f7e84ca71824ee9bc4a809c95277b93~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_52646b19e0114c7995cd748274cd28ec~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_14914a7227cd4ba3b2645cbe591f5d52~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_8211c840796d4e779f5e9f9e7ac20eb2~mv2.png",
      "https://static.wixstatic.com/media/be828f_fdcce40e9baa4265bf01b3e1fe2784b7~mv2.png",
      "https://static.wixstatic.com/media/be828f_9722a689f64340a1b873979a8e54fcda~mv2.png",
      "https://static.wixstatic.com/media/be828f_194b97f6d11d47b2b862a40c4b965116~mv2.jpg",
      "https://static.wixstatic.com/media/be828f_2e5ec45540014076a980e245217869cf~mv2.png",
      "https://static.wixstatic.com/media/be828f_d11bb9c0028745438e9b32cca40de8ff~mv2.png",
      "https://static.wixstatic.com/media/be828f_eca2de43c8b5437991a520d2dcfcdc07~mv2.png",
      "https://static.wixstatic.com/media/be828f_2ce7e878e1cd48ef83e860b7868d762f~mv2.png",
      "https://static.wixstatic.com/media/be828f_c142665f2ff94b6897b4c48ac1e2ae43~mv2.jpg",
    ],
    testimonials: [
{ name: 'Dorota', text: 'Pierwsza wizyta w studiu i na pewno nie ostatnia! Bardzo sympatyczna atmosfera, luźno i profesjonalnie. Indywidualne podejście, pomoc w dopasowaniu wzoru oraz konkretne wskazówki pielęgnacyjne. Wszystko na plus. Wkrótce wracam 🤪', rating: 5 },
{ name: 'Aga', text: 'To był mój pierwszy tatuaż. Szukałam miejsca z dobrym podejściem do początkujących i trafiłam idealnie. Miła, spokojna obsługa, wszystko jasno wyjaśnione, moje obawy zostały rozwiane i dostałam odpowiedzi na każde pytanie. Już planuję kolejny tatuaż 😀 POLECAM!', rating: 5 },
]
  },
};

const ArtistPortfolioPageRealizm: React.FC = () => {
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
        <Link to="/teamrealizm" className="btn btn-primary mt-4">Powrót do zespołu</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <Link to="/teamrealizm" className="inline-flex items-center link-hover mb-8">
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

export default ArtistPortfolioPageRealizm;