// src/api/websocket.ts

export class ChatWebSocket {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private token: string;
  private messageHandler: (data: any) => void;

  constructor(token: string, messageHandler: (data: any) => void) {
    this.token = token;
    this.messageHandler = messageHandler;
  }

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/?token=${this.token}`
    );

    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onerror = this.handleError.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    this.reconnectAttempts = 0;
  }

  sendMessage(chatId: string, message: string) {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return false;
    }

    this.socket.send(
      JSON.stringify({
        type: "chat_message",
        chat_history: chatId,
        message,
      })
    );

    return true;
  }

  private handleOpen() {
    console.log("WebSocket connection established");
    this.reconnectAttempts = 0;

    // Start heartbeat to keep connection alive
    this.startHeartbeat();
  }

  private handleClose(event: CloseEvent) {
    console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
    this.attemptReconnect();
  }

  private handleError(error: Event) {
    console.error("WebSocket error:", error);
  }

  private handleMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);
      this.messageHandler(data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    console.log(`Attempting to reconnect in ${delay}ms`);

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  private startHeartbeat() {
    setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: "heartbeat" }));
      }
    }, 30000);
  }
}
