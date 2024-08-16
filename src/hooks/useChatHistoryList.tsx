import { useEffect, useState } from "react";
import api from "../services/api";

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
interface Data {
  count: number;
  next: null;
  previous: null;
  results: Results[];
}

const useChatHistoryList = () => {
  const [result, setResult] = useState<Results[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const addMessage = (chatHistoryId: string, newMessage: Message) => {
    setResult((prevResults) =>
      prevResults.map((chat) => {
        if (chat.chat_history === chatHistoryId) {
          // Prepend the new message to the existing messages
          return {
            ...chat,
            messages: [newMessage, ...chat.messages],
          };
        }
        return chat;
      })
    );
  };

  useEffect(() => {
    setIsloading(true);
    const accessToken = localStorage.getItem("access");

    const getChatHistoryList = async () => {
      try {
        const response = await api.get<Data>("/chat/history_list/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setIsloading(false);
          setResult(response.data.results);
        }
        if (response.status === 404) {
          setIsloading(false);
          setError("no users found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getChatHistoryList();
  }, []);

  return { result, setResult, error, isLoading, addMessage };
};

export default useChatHistoryList;
