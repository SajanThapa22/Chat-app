import React, { createContext, useContext } from "react";
import useChatHistoryList, { Results } from "../hooks/useChatHistoryList";
import { Message } from "./ChatContext";

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
