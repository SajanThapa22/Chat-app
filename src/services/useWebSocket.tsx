import { useEffect, useRef, useState } from "react";

interface UseWebSocketProps {
  url: string;
  onMessage: (message: MessageEvent) => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
}

export const useWebSocket = ({
  url,
  onMessage,
  onOpen,
  onClose,
  onError,
}: UseWebSocketProps) => {
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onopen = (event: Event) => {
      setIsConnected(true);
      if (onOpen) {
        onOpen(event);
      }
    };

    socket.current.onmessage = (event: MessageEvent) => {
      onMessage(event);
    };

    socket.current.onclose = (event: CloseEvent) => {
      setIsConnected(false);
      if (onClose) {
        onClose(event);
      }
    };

    socket.current.onerror = (event: Event) => {
      if (onError) {
        onError(event);
      }
    };

    // Cleanup when the component unmounts
    return () => {
      socket.current?.close();
    };
  }, [url, onMessage, onOpen, onClose, onError]);

  const sendMessage = (message: string) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(message);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  return { isConnected, sendMessage };
};
