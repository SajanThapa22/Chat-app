import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import {
  sendMessage,
  initiateSocket,
  subscribeToChat,
  disconnectSocket,
} from "../services/useWebSocket";
import { useParams } from "react-router-dom";

interface ChatProviderProps {
  children: ReactNode;
  id: string | undefined;
}

interface Message {
  chat_history: string;
  deliverd_timestamp: null;
  id: number;
  media: null;
  message: string;
  reply_of: null;
  seen_timestamp: null;
  sent_timestamp: string;
  user: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  profile: {
    profile_pic: string;
    bio: string;
  };
  user_status: {
    status: string;
    last_seen: string;
  };
}

interface ChatContextType {
  initialMessages: Message[];
  setInitialMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  url: {
    nextUrl: string;
    prevUrl: string;
  };
  setUrl: React.Dispatch<
    React.SetStateAction<{
      nextUrl: string;
      prevUrl: string;
    }>
  >;
  history: string;
  setHistory: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider = ({ children }: ChatProviderProps) => {
  const { id } = useParams<{ id: string }>(); // Use URL parameters to get the id
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>();
  const [history, setHistory] = useState<string>("");
  const [url, setUrl] = useState<{ nextUrl: string; prevUrl: string }>({
    nextUrl: "",
    prevUrl: "",
  });

  const handleSendMessage = () => {
    if (inputMessage && inputMessage.trim()) {
      const messageData = {
        type: "message",
        message: inputMessage,
        receiver_id: id, // Use id here
        group_id: null,
      };

      sendMessage(messageData);

      setInputMessage("");
    }
  };

  useEffect(() => {
    initiateSocket();
    subscribeToChat((err, data) => {
      if (err) {
        console.error("Error subscribing to chat:", err);
        return;
      }

      const receivedMessage: Message = {
        chat_history: data.message.chat_history,
        deliverd_timestamp: data.message.deliverd_timestamp,
        id: data.message.id,
        media: data.message.media,
        message: data.message.message,
        reply_of: data.message.reply_of,
        seen_timestamp: data.message.seen_timestamp,
        sent_timestamp: data.message.sent_timestamp,
        user: data.message.user,
      };

      setInitialMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        initialMessages,
        setInitialMessages,
        currentUser,
        setCurrentUser,
        inputMessage,
        setInputMessage,
        url,
        setUrl,
        history,
        setHistory,
        handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
