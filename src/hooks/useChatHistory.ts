import {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { useNavigate } from "react-router-dom";
import { ChatAPI } from "../api/chat";
import { Data, Message, Results } from "../types/chat";

interface UseChatHistoryReturn {
  chatHistory: Results[] | null;
  setChatHistory: Dispatch<SetStateAction<Results[] | null>>;
  isLoading: boolean;
  error: string | null;
  selectChat: (chatId: string) => void;
  // loadMoreChats: () => Promise<void>;
  refreshChats: () => Promise<void>;
  addMessage: (chatId: string, newMessage: Message) => void;
}

export const useChatHistory = (): UseChatHistoryReturn => {
  const [chatHistory, setChatHistory] = useState<Results[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const addMessage = (chatId: string, newMessage: Message) => {
    setChatHistory((prevResults) => {
      if (!prevResults) return [];

      return prevResults.map((chat) => {
        if (chat.chat_history === chatId) {
          return {
            ...chat,
            messages: [newMessage, ...chat.messages],
          };
        }
        return chat;
      });
    });
  };

  const fetchChatHistory = useCallback(
    async (url: string = "/chat/history_list/") => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ChatAPI.getChatHistories();
        setChatHistory(data.results);
      } catch (err) {
        setError("Failed to load chat history. Please try again.");
        console.error("Error fetching chat history:", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  // const loadMoreChats = useCallback(async () => {
  //   if (chatHistory?.next && !isLoading) {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await ChatAPI.getChatHistories(); // Adjust if endpoint supports pagination
  //       setChatHistory((prev) => {
  //         if (!prev) return response;
  //         return {
  //           ...response,
  //           results: [...prev.results, ...response.results],
  //         };
  //       });
  //     } catch (err) {
  //       setError("Failed to load more chats. Please try again.");
  //       console.error("Error loading more chats:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // }, [chatHistory?.next, isLoading]);

  const refreshChats = useCallback(async () => {
    await fetchChatHistory();
  }, [fetchChatHistory]);

  const selectChat = useCallback(
    (chatId: string) => {
      navigate(`/chat/${chatId}`);
    },
    [navigate]
  );

  return {
    chatHistory,
    setChatHistory,
    isLoading,
    error,
    selectChat,
    // loadMoreChats,
    refreshChats,
    addMessage,
  };
};
