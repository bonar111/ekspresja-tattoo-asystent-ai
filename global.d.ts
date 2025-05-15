export {};

declare global {
  interface Window {
    voiceflow?: {
      chat: {
        open: () => void;
      };
    };
  }
}
