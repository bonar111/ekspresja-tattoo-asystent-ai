// src/lib/analytics.ts
const PIXEL_ID = '1827552020965522';

/** Standardowy track (zostawiamy) */
export function track(event: string, params: Record<string, unknown> = {}) {
  try { window.fbq?.('trackCustom', event, params); } catch {}
}

/**
 * Wysyła event do Meta „synchronicznie”:
 * - fbq (jeśli jest)
 * - sendBeacon POST do /tr (jeśli przeglądarka wspiera)
 * - fallback: obrazek GET z onload/onerror
 */
export function trackSync(event: string, params: Record<string, unknown> = {}) {
  // 1) fbq – nie blokuje, ale nie ma callbacku
  try { window.fbq?.('trackCustom', event, params); } catch {}

  // 2) Złóż payload do /tr
  const qs = new URLSearchParams();
  qs.set('id', PIXEL_ID);
  qs.set('ev', event);
  qs.set('dl', location.href);
  qs.set('rl', document.referrer || '');
  qs.set('if', 'false');
  qs.set('ts', String(Date.now()));
  // opcjonalna wersja biblioteki (nie wymagana, ale bywa w payloadzie)
  qs.set('v', '2.9.90');
  // custom data jako cd[...]
  Object.entries(params).forEach(([k, v]) => {
    qs.set(`cd[${k}]`, String(v));
  });

  const url = 'https://www.facebook.com/tr';

  // 3) Preferuj sendBeacon (działa „bez czekania” i niezależnie od unload)
  if (navigator.sendBeacon) {
    const body = new Blob([qs.toString()], { type: 'application/x-www-form-urlencoded' });
    navigator.sendBeacon(url, body); // zwraca boolean, ale nie trzeba czekać
    return Promise.resolve();
  }

  // 4) Fallback: obrazek – resolve po onload/onerror (bez sztucznego timeoutu)
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer-when-downgrade';
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = `${url}?${qs.toString()}`;
  });
}
