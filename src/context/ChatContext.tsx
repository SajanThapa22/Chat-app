import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import {
  sendMessage,
  initiateSocket,
  subscribeToChat,
  disconnectSocket,
} from "../hooks/useWebSocket";
import { useParams } from "react-router-dom";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { useChatHistory } from "./ChatHistoryContext";

interface ChatProviderProps {
  children: ReactNode;
  id: string | undefined;
}

export interface Message {
  id: number;
  user: string;
  chat_history: string;
  message: string;
  media: null;
  reply_of: null;
  sent_timestamp: string;
  delivered_timestamp: null | string;
  seen_timestamp: null | string;
}

interface ChatContextType {
  initialMessages: Message[];
  setInitialMessages: React.Dispatch<React.SetStateAction<Message[]>>;
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
  receiverId: string;
  setReceiverId: React.Dispatch<React.SetStateAction<string>>;
  messageSeen: boolean;
  setMessageSeen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider = ({ children }: ChatProviderProps) => {
  const { id } = useParams<{ id: string }>(); // Use URL parameters to get the id
  const [receiverId, setReceiverId] = useState<string>("");
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [history, setHistory] = useState<string>("");
  const [url, setUrl] = useState<{ nextUrl: string; prevUrl: string }>({
    nextUrl: "",
    prevUrl: "",
  });
  const [messageSeen, setMessageSeen] = useState<boolean>(false);
  const { setResult } = useChatHistory();
  const { currentUser } = useGetCurrentUser();
  const userRef = useRef(currentUser);

  function handleSendMessage() {
    if (inputMessage && inputMessage.trim()) {
      const messageData = {
        type: "message",
        message: inputMessage,
        receiver_id: id,
        group_id: null,
      };

      sendMessage(messageData);

      setInputMessage("");
    }
  }

  useEffect(() => {
    userRef.current = currentUser;
    initiateSocket();
    subscribeToChat((err, data) => {
      if (err) {
        console.error("Error subscribing to chat:", err);
        return;
      }

      if (data.type === "chat_message") {
        const receivedMessage: Message = {
          chat_history: data.message.chat_history,
          delivered_timestamp: data.message.delivered_timestamp,
          id: data.message.id,
          media: data.message.media,
          message: data.message.message,
          reply_of: data.message.reply_of,
          seen_timestamp: data.message.seen_timestamp,
          sent_timestamp: data.message.sent_timestamp,
          user: data.message.user,
        };

        // console.log(data.message.user, currentUser?.id);
        if (data.message.user !== currentUser?.id) {
          const updatedMessageInfo = {
            type: "updated_message_info",
            updated_message_info_type: "delivered",
            receiver_id: data.message.user,
            message_id: data.message.id,
          };

          sendMessage(updatedMessageInfo);
        }

        const addMessage = (chatHistoryId: string, newMessage: Message) => {
          setResult((prevResults) => {
            // Update the messages for the specific chat history
            const updatedResults = prevResults.map((chat) => {
              if (chat.chat_history === chatHistoryId) {
                return {
                  ...chat,
                  messages: [newMessage, ...chat.messages],
                };
              }
              return chat;
            });
            // Remove the updated chat history from its current position
            const updatedChatHistory = updatedResults.find(
              (chat) => chat.chat_history === chatHistoryId
            );
            const filteredResults = updatedResults.filter(
              (chat) => chat.chat_history !== chatHistoryId
            );
            // Add the updated chat history to the beginning of the array
            if (updatedChatHistory) {
              filteredResults.unshift(updatedChatHistory);
            }

            return filteredResults;
          });
        };

        addMessage(data.message.chat_history, receivedMessage);

        setInitialMessages((prevMessages) => [
          ...prevMessages,
          receivedMessage,
        ]);
      }

      if (data.type === "chat_message_info") {
        setInitialMessages((prevResults) =>
          prevResults.map((msg) => {
            if (msg.chat_history === data.data.chat_history) {
              return {
                ...msg,
                delivered_timestamp: new Date()
                  .toISOString()
                  .replace("Z", "000Z"),
              };
            }
            return msg;
          })
        );
      }

      if (data.type === "user_status_update") {
        setResult((prevResults) =>
          prevResults.map((chat) => {
            if (chat.user.id === data.data.user) {
              return {
                ...chat,
                user: {
                  ...chat.user,
                  user_status: {
                    last_seen: data.data.last_seen,
                    status: data.data.status,
                  },
                },
              };
            }
            return chat;
          })
        );
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [currentUser]);

  return (
    <ChatContext.Provider
      value={{
        initialMessages,
        setInitialMessages,
        inputMessage,
        setInputMessage,
        url,
        setUrl,
        history,
        setHistory,
        handleSendMessage,
        receiverId,
        setReceiverId,
        messageSeen,
        setMessageSeen,
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
