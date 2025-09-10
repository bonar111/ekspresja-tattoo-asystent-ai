// src/lib/openChat.ts
import { trackSync } from './analytics';

export const MESSENGER_URL =
  'https://m.me/ekspresja.tattoo?ref=from-www-wycena';

/** Klik CTA → wyślij AIStart (beacon), a potem przekieruj */
export async function openChat(
  extra?: Record<string, unknown>,
  ev?: React.MouseEvent | MouseEvent
) {
  ev?.preventDefault?.();

  await trackSync('AIStart', extra ?? {});

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = MESSENGER_URL;
  } else {
    window.open(MESSENGER_URL, '_blank', 'noopener,noreferrer');
  }
}
