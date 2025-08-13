// Proste źródło danych obrazów do Home

export const BEST: string[] = [
  'https://static.wixstatic.com/media/be828f_6a5cc124459044b2b66a665ae3558d80~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_51796d4a097847198f6814ffbeb4444e~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_e6d9c76703b443a19119b94c60e4a615~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_15a202fa39c74487a6ccf27f6fdca669~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_9bc1f8431e984cdeabaa3586659b7409~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_9af9de820ea34ea9970455d866d8df70~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_f128de930382411b9db9b85df235be99~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_e33a5d13473d439eb7b870e0aca38182~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_1919781d36af4e23851a747d8eab2ba1~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_0398826ba328441d975230f5298c28ac~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_bad0b956531a4981837f3f3fabac522e~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_169db3abad19402a80d8268660bbce44~mv2.jpg',
];

export const COVERS: string[] = [
  'https://static.wixstatic.com/media/be828f_c8f9eeff4f6e48af93149ad4ea05adc4~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_8cd3f6c2bea141228deaf5cd44030dcd~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_eb39a7f4e54547169f1f8d42afbf06d5~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_1557a30042744b928b1791ca2db0e0cb~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_07d892d073d24a159167647f27477b83~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_3df7a69835d241f9b3570146f46a7421~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_0f9326eef629471c9822dcb52ac5dc41~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_fa68fcb271bc4e569e6cb74f45c2c179~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_e4166a9d6e4244f3a2855cd6c26b3de1~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_9b1bab1b568a41e083c97e62ba9d3622~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_754e43094a084ebdb8363bb3c0945852~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_1557a30042744b928b1791ca2db0e0cb~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_41fa95d9d38f47129ce99891a501ed21~mv2.jpg',
];

export interface HomePortfolioItem {
  id: number | string;
  image: string;
  alt: string;
}

export const homePortfolioItems: HomePortfolioItem[] = [
  { id: 1, image: 'https://static.wixstatic.com/media/be828f_dd4a18a1eafb428f876ab2f892e1f0d3~mv2.webp', alt: 'Tatuaż geometryczny na ramieniu' },
  { id: 2, image: 'https://static.wixstatic.com/media/be828f_d6cb15e58ada4c87ae7906a6f101dddd~mv2.webp', alt: 'Czarno-szary tatuaż' },
  { id: 3, image: 'https://static.wixstatic.com/media/be828f_dccf47927184428cbbbfa09c86f6b0db~mv2.jpg', alt: 'Kolorowy tatuaż kwiatowy' },
  { id: 4, image: 'https://static.wixstatic.com/media/be828f_9ad2010ed23c420789ab886478820e69~mv2.jpg', alt: 'Tatuaż w stylu japońskim' },
  { id: 5, image: 'https://static.wixstatic.com/media/be828f_fd3867fd036041588977945fa46be167~mv2.jpg', alt: 'Minimalistyczny projekt tatuażu' },
  { id: 6, image: 'https://static.wixstatic.com/media/be828f_86a1beeb64bd4514a1be8bb6ad69ac7e~mv2.jpg', alt: 'Portretowy tatuaż' },
  { id: 7, image: 'https://static.wixstatic.com/media/be828f_ef3206d942a942b3819f1f29babf3743~mv2.jpg', alt: 'Portretowy tatuaż' },
];
