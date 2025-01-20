import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    botpressWebChat: {
      sendMessage: (message: string) => void;
      onMessage: (callback: (event: any) => void) => void;
    };
  }
}

export const useBotpress = (onMessageReceived: (message: string) => void) => {
  useEffect(() => {
    if (window.botpressWebChat) {
      window.botpressWebChat.onMessage((message) => {
        if (message.text) {
          onMessageReceived(message.text);
        }
      });
    }
  }, [onMessageReceived]);

  const sendMessage = useCallback((text: string) => {
    if (window.botpressWebChat) {
      window.botpressWebChat.sendMessage(text);
    }
  }, []);

  return { sendMessage };
};