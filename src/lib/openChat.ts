// src/lib/openChat.ts
import { trackSync } from './analytics';

const MESSENGER_BASE = 'https://m.me/ekspresja.tattoo?ref=';
const DEFAULT_REF = 'from-www-wycena';

// z bieżącego URL pobiera tylko parametry zaczynające się od "utm"
function buildMessengerUrlWithUtm(baseRef = DEFAULT_REF): string {
  try {
    const search = new URLSearchParams(window.location.search);
    const utmEntries = Array.from(search.entries()).filter(([k]) =>
      k.toLowerCase().startsWith('utm')
    );
    const utm = new URLSearchParams(utmEntries).toString();
    const ref = utm ? `${baseRef}|${utm}` : baseRef;
    return `${MESSENGER_BASE}${encodeURIComponent(ref)}`;
  } catch {
    return `${MESSENGER_BASE}${encodeURIComponent(baseRef)}`;
  }
}

// zostawiamy eksport ze stałym URL-em dla miejsc, które go używają "na sztywno"
export const MESSENGER_URL = buildMessengerUrlWithUtm(DEFAULT_REF);

/** Klik CTA → wyślij AIStart (beacon), a potem przekieruj */
export async function openChat(
  extra?: Record<string, unknown>,
  ev?: React.MouseEvent | MouseEvent
) {
  ev?.preventDefault?.();

  await trackSync('AIStart', extra ?? {});

  const finalUrl = buildMessengerUrlWithUtm(DEFAULT_REF);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = finalUrl;
  } else {
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  }
}
