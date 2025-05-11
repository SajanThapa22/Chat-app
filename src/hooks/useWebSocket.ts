import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  type MessageCallback = (error: Error | null, data?: any) => void;

  // Heartbeat state
  const [lastPong, setLastPong] = useState<number | null>(null);

  const connect = useCallback(
    (retryCount = 0, maxRetries = 5) => {
      if (!isAuthenticated || !url || retryCount > maxRetries) return;

      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        setError(null);
        setLastPong(Date.now()); // Initialize last pong time
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
        setError("WebSocket connection error");
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
        setTimeout(() => {
          if (isAuthenticated) {
            connect(retryCount + 1, maxRetries); // Retry with backoff
          }
        }, 3000 * Math.pow(2, retryCount));
      };
      ws.send = () => {};

      setSocket(ws);

      return () => {
        ws.close();
      };
    },
    [url, isAuthenticated]
  );

  // Heartbeat logic
  useEffect(() => {
    if (!socket || !isConnected) return;

    const pingInterval = 30000; // Send ping every 30 seconds
    const timeout = 10000; // Wait 10 seconds for pong

    // Send ping periodically
    const pingTimer = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "ping" }));
      }
    }, pingInterval);

    // Check for pong response
    const checkPongTimer = setInterval(() => {
      if (lastPong && Date.now() - lastPong > pingInterval + timeout) {
        console.log("No pong received, closing connection");
        socket.close(); // Trigger reconnection via onclose
      }
    }, 5000);

    return () => {
      clearInterval(pingTimer);
      clearInterval(checkPongTimer);
    };
  }, [socket, isConnected, lastPong]);

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

  const receiveMessage = useCallback(
    (cb: MessageCallback): void => {
      if (!socket) return;
      socket.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
          cb(null, data);
        } catch (error) {
          cb(error as Error);
        }
      };
    },
    [socket]
  );

  return { socket, isConnected, error, sendMessage, receiveMessage };
};
