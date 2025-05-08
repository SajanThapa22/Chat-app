import { createContext, ReactNode, useState } from "react";
import { Message } from "react-hook-form";
import api from "../api/axios";
import { Results, Data } from "../types/chat";
import { useWebSocket } from "../hooks/useWebSocket";

export const ChatContext = createContext<{
  chatHistories: Results[];
  currentChat: Results | null;
  isLoading: boolean;
  fetchChatHistories: () => Promise<void>;
  selectChat: (chatId: string) => void;
  sendMessage: (message: string) => void;
}>();

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistories, setChatHistories] = useState<Results[]>([]);
  const [currentChat, setCurrentChat] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage: sendWebSocketMessage } = useWebSocket();

  const fetchChatHistories = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<Data>("/chat/history_list/");
      setChatHistories(response.data.results);
    } catch (error) {
      console.error("Failed to fetch chat histories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectChat = (chatId: string) => {
    const selected =
      chatHistories.find((chat) => chat.chat_history === chatId) || null;
    setCurrentChat(selected);
  };

  const sendMessage = (message: string) => {
    if (!currentChat) return;

    // Optimistically update UI
    const newMessage: Message = {
      id: Date.now(), // Temporary ID
      user: "me", // Current user ID (should come from auth context)
      chat_history: currentChat.chat_history,
      message,
      media: null,
      reply_of: null,
      sent_timestamp: new Date().toISOString(),
      delivered_timestamp: null,
      seen_timestamp: null,
    };

    // Update local state
    setCurrentChat((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...prev.messages, newMessage],
      };
    });

    // Send via WebSocket
    sendWebSocketMessage(message, currentChat.chat_history);
  };

  return (
    <ChatContext.Provider
      value={{
        chatHistories,
        currentChat,
        isLoading,
        fetchChatHistories,
        selectChat,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
