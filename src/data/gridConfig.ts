// src/data/gridConfig.ts

export type GridPreset = {
  cols: { base: 1 | 2 | 3 | 4; sm?: 1 | 2 | 3 | 4; md?: 1 | 2 | 3 | 4; lg?: 1 | 2 | 3 | 4 };
  /** 'cover' – może przyciąć; 'contain' – całe zdjęcie, bez cropu */
  fit?: 'cover' | 'contain';
  /** true – wymusza proporcje (kafelki równe); false – naturalna wysokość obrazu */
  lockAspect?: boolean;
  /** opcjonalnie możliwość podmiany odstępów między kafelkami */
  gapClasses?: string;
};

/** BEST – na mobile 2 kolumny, wyżej gęściej; crop OK, równe kafelki */
export const bestGrid: GridPreset = {
  cols: { base: 2, sm: 2, md: 3, lg: 4 },
  fit: 'cover',
  lockAspect: true,
  gapClasses: 'gap-3 md:gap-4',
};

/** COVERS – 1 kolumna wszędzie, BEZ przycinania, naturalna wysokość */
export const coversGrid: GridPreset = {
  cols: { base: 1, sm: 1, md: 1, lg: 1 },
  fit: 'contain',
  lockAspect: false,
  gapClasses: 'gap-4',
};
