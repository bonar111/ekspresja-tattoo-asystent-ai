// src/hooks/useSiteView.ts
import { useEffect, useRef } from 'react';
import { track } from '../lib/analytics';

/** Wyślij AISiteView tylko raz – przy pierwszym renderze SPA */
export function useSiteView() {
  const sent = useRef(false);

  useEffect(() => {
    if (!sent.current) {
      track('AISiteView');
      sent.current = true;
    }
  }, []);
}
