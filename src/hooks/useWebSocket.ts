// src/hooks/useWebSocket.ts
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

export const useWebSocket = (url: string, onMessage: (data: any) => void) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();

  const connect = useCallback(() => {
    if (!isAuthenticated || !url) return;

    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
      setError("WebSocket connection error");
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);

      // Try to reconnect after a delay
      setTimeout(() => {
        if (isAuthenticated) {
          connect();
        }
      }, 3000);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url, isAuthenticated, onMessage]);

  useEffect(() => {
    connect();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback(
    (data: any) => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
        return true;
      }
      return false;
    },
    [socket]
  );

  return { socket, isConnected, error, sendMessage };
};
