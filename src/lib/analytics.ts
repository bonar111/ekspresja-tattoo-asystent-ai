// src/lib/analytics.ts
export function track(event: string, params: Record<string, unknown> = {}) {
  // Gdyby pixel z jakiegoś powodu się nie załadował – nic się nie wysypie
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', event, params);
  }
}
