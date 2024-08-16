import React, { createContext, useContext } from "react";
import useChatHistoryList from "../hooks/useChatHistoryList";

interface Message {
  id: number;
  user: string;
  chat_history: string;
  message: string;
  media: null;
  reply_of: null;
  sent_timestamp: string;
  delivered_timestamp: null;
  seen_timestamp: null;
}
interface User {
  id: string;
  username: string;
  email: string;
  profile: {
    profile_pic: string;
  };
  user_status: {
    status: string;
    last_seen: string;
  };
}
interface Results {
  chat_history: string;
  user: User;
  messages: Message[];
}

// Define the context shape
interface ChatHistoryContextProps {
  result: Results[];
  setResult: React.Dispatch<React.SetStateAction<Results[]>>;
  addMessage: (chatHistoryId: string, newMessage: Message) => void;
  isLoading: boolean;
  error: string;
}

// Create the context
const ChatHistoryContext = createContext<ChatHistoryContextProps | undefined>(
  undefined
);

// Context provider component
export const ChatHistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const chatHistoryState = useChatHistoryList(); // Use your custom hook

  return (
    <ChatHistoryContext.Provider value={chatHistoryState}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

// Custom hook to use the context
export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error("useChatHistory must be used within a ChatHistoryProvider");
  }
  return context;
};
