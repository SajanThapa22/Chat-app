// Define a type for the callback function used in subscribeToChat
type MessageCallback = (error: Error | null, data?: any) => void;

// Global WebSocket variable to manage the connection
let socket: WebSocket | null = null;

// Function to initiate the WebSocket connection
export const initiateSocket = (): WebSocket => {
  const token = localStorage.getItem("access");
  const socketUrl = `wss://chat-app-xcsf.onrender.com/ws/chat/?token=${token}`;
  socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return socket;
};

// Function to disconnect the WebSocket
export const disconnectSocket = (): void => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

// Function to subscribe to incoming chat messages
export const subscribeToChat = (cb: MessageCallback): void => {
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
};

// Function to send a message through the WebSocket
export const sendMessage = (message: any): void => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error("WebSocket is not open. Unable to send message.");
  }
};
