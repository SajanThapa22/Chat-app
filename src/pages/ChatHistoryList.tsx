import { useEffect, useState } from "react";
import api from "../services/api";
import User from "../components/User";
import Spinner from "../components/Spinner";
import getCurrentUser from "../services/getCurrentUser";
interface Message {
  id: string;
  user: string;
  chat_history: string;
  message: string;
  media: null;
  reply_of: null;
  sent_timestamp: string;
  deliverd_timestamp: null;
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

const ChatHistoryList = () => {
  const [result, setResult] = useState<Results[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const getMe = async () => {
      const result = await getCurrentUser();
      setCurrentUser(result);
    };
    getMe();
  }, []);

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
  if (error) {
    return <div className="">{error}</div>;
  }
  if (isLoading) return <Spinner size="size-10 border-[6px] mx-auto my-auto" />;
  return (
    <>
      {result.map((r) => {
        const messageContent =
          r.messages[0].user === currentUser?.id
            ? `you: ${r.messages[0].message}`
            : r.messages[0].message;

        const slicedMessage =
          messageContent.length > 25
            ? `${messageContent.slice(0, 25)}...`
            : messageContent;

        const date = new Date(r.messages[0].sent_timestamp);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");

        const formattedTime = `${hours}:${minutes}`;

        return (
          <User
            id={r.user.id}
            key={r.user.id}
            username={r.user.username}
            img={r.user.profile.profile_pic}
            message={slicedMessage}
            time={formattedTime}
            status={r.user.user_status.status}
          />
        );
      })}
    </>
  );
};

export default ChatHistoryList;
