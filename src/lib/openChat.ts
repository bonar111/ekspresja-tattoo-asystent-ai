// src/lib/openChat.ts
import { track } from './analytics';

export const MESSENGER_URL =
  'https://m.me/ekspresja.tattoo?ref=from-www-wycena';

/**
 * Otwiera rozmowę w Messengerze (ManyChat) i loguje AIStart.
 * Możesz przekazać dodatkowe parametry do Pixela przez `extra`.
 */
export function openChat(extra?: Record<string, unknown>) {
  // 1) AIStart = klik w przycisk startu konsultacji
  track('AIStart', extra ?? {});

  // 2) Otwórz Messengera
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    // Na mobile najlepiej pełny redirect (apka / przeglądarka)
    window.location.href = MESSENGER_URL;
  } else {
    // Na desktopie w nowej karcie
    window.open(MESSENGER_URL, '_blank', 'noopener,noreferrer');
  }
}
