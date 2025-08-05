// src/lib/openChat.ts
import { track } from './analytics';

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        open: () => void;
      };
    };
  }
}

/** Otwiera czat Voiceflow **i** loguje AIStart */
export function openChat() {
  if (window.voiceflow?.chat) {
    window.voiceflow.chat.open();
    track('AIStart');          // <-- zdarzenie 1
  }
}
