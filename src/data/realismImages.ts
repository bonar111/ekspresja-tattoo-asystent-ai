import type { HomePortfolioItem } from './images';

export const REALISM_MAIN: string[] = [
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
  'https://static.wixstatic.com/media/be828f_eb4684fc03934dd3a4c07d5628a9c66f~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_234a78583fbd4bb7b80425c28a7a1d08~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_ba9dad25865f4c5898e8d923183a7cae~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_35cfe41de490466cb9b7401dee593c08~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_87d393a4ed2c4527959dae028d6e291d~mv2.png',
  'https://static.wixstatic.com/media/be828f_8803c747709f423fa1774bd595a0b976~mv2.png',
  'https://static.wixstatic.com/media/be828f_8bc5dcd0900042aaa735fcef3c0b9163~mv2.png',
  'https://static.wixstatic.com/media/be828f_09060579b36c48c3bf130dd835829c0c~mv2.jpg',
  'https://static.wixstatic.com/media/be828f_2ce7e878e1cd48ef83e860b7868d762f~mv2.png',
  'https://static.wixstatic.com/media/be828f_1da7026da4a44205afe5225a9f3ae0d8~mv2.jpg'
];

export const REALISM_SECONDARY: string[] = [
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
];

// Slider (zamiast mieszanki stylów z home)
export const realismPortfolioItems: HomePortfolioItem[] = REALISM_MAIN.slice(0, 7).map((img, idx) => ({
  id: `realism-${idx}`,
  image: img,
  alt: 'Realistyczny tatuaż w kolorze',
}));
