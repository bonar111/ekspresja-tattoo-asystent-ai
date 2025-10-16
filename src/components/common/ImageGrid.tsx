import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { track } from '../../lib/analytics';
import { openChat } from '../../lib/openChat';
import type { GridPreset } from '../../data/gridConfig';

const colsToClasses = (c: GridPreset['cols']) =>
  [
    c.base === 1 ? 'grid-cols-1' : c.base === 2 ? 'grid-cols-2' : c.base === 3 ? 'grid-cols-3' : 'grid-cols-4',
    c.sm ? (c.sm === 1 ? 'sm:grid-cols-1' : c.sm === 2 ? 'sm:grid-cols-2' : c.sm === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4') : '',
    c.md ? (c.md === 1 ? 'md:grid-cols-1' : c.md === 2 ? 'md:grid-cols-2' : c.md === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4') : '',
    c.lg ? (c.lg === 1 ? 'lg:grid-cols-1' : c.lg === 2 ? 'lg:grid-cols-2' : c.lg === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4') : '',
  ].join(' ');

function useCurrentCols(preset: GridPreset['cols']) {
  const [w, setW] = useState<number>(() => (typeof window !== 'undefined' ? window.innerWidth : 0));
  useEffect(() => {
    const onR = () => setW(window.innerWidth);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  return useMemo(() => {
    if (w >= 1024 && preset.lg) return preset.lg;
    if (w >= 768 && preset.md) return preset.md!;
    if (w >= 640 && preset.sm) return preset.sm!;
    return preset.base;
  }, [w, preset]);
}

function getHeaderHeight() {
  const varVal = getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '72px';
  return parseInt(varVal, 10) || 72;
}

type Props = {
  items: string[];
  preset: GridPreset;
  maxRows?: number;
  collapsible?: boolean;
  sectionId: string;
};

const ImageGrid = ({ items, preset, maxRows = 5, collapsible = true, sectionId }: Props) => {
  const fit = preset.fit ?? 'cover';
  const lockAspect = preset.lockAspect ?? true;
  const gap = preset.gapClasses ?? 'gap-3 md:gap-4';
  const cols = useCurrentCols(preset.cols);
  const initialCount = maxRows * cols;

  const [expanded, setExpanded] = useState(false);
  const gridWrapRef = useRef<HTMLDivElement>(null);

  const hasMore = collapsible && items.length > initialCount;
  const visibleItems =
    expanded || !collapsible ? items : items.slice(0, Math.min(initialCount, items.length));

  const scrollToLastVisibleRow = () => {
    if (!hasMore) return;
    const lastIdx = Math.min(initialCount, items.length) - 1;
    const container = gridWrapRef.current;
    const tile = container?.querySelector<HTMLElement>(
      `[data-grid="${sectionId}"] [data-idx="${lastIdx}"]`
    );
    if (tile) {
      const header = getHeaderHeight();
      const rect = tile.getBoundingClientRect();
      const y = rect.top + window.pageYOffset + rect.height - header - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        const header = getHeaderHeight();
        const y = target.getBoundingClientRect().top + window.pageYOffset - header - 8;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const toggle = () => {
    if (expanded) {
      setExpanded(false);
      requestAnimationFrame(() => requestAnimationFrame(scrollToLastVisibleRow));
    } else {
      setExpanded(true);
    }
  };

  return (
    <>
      <div ref={gridWrapRef}>
        <div className={`grid ${colsToClasses(preset.cols)} ${gap}`} data-grid={sectionId}>
          {visibleItems.map((src, i) => (
            <motion.button
              key={`${src}-${i}`}
              type="button"
              data-idx={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % (cols * 2)) * 0.03 }}
              className={`overflow-hidden rounded-lg bg-metallic ${lockAspect ? 'aspect-[3/4] sm:aspect-square' : ''}`}
              onClick={(e) => {
                track('Grid_Image_Click', { index: i, section: sectionId });
                openChat({ source: 'grid_image', index: i, section: sectionId }, e);
              }}
              aria-label="Napisz do nas — przygotujemy podobny projekt"
            >
              <img
                src={src}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`w-full ${lockAspect ? 'h-full' : 'h-auto'} ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {hasMore && (
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={toggle} aria-expanded={expanded} aria-controls={sectionId}>
            {expanded ? 'Zwiń' : 'Zobacz więcej'}
          </button>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
