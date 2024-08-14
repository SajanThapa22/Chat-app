import { useEffect, useState } from "react";
import api from "../services/api";
import User from "../components/User";

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

  useEffect(() => {
    const accessToken = localStorage.getItem("access");

    const getChatHistoryList = async () => {
      try {
        const response = await api.get<Data>("/chat/history_list/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          console.log(response.data.results[0].user.username);
          setResult(response.data.results);
        }
        if (response.status === 404) {
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
  return (
    <div className="bg-bgComp w-full">
      {result.map((r, index) => (
        <User
          key={index}
          img={r.user.profile.profile_pic}
          username={r.user.username}
          message={
            r.messages[0].message.length < 20
              ? r.messages[0].message
              : `${r.messages[0].message.slice(0, 20)}...`
          }
          id={r.user.id}
          status={r.user.user_status.status}
        />
      ))}
    </div>
  );
};

export default ChatHistoryList;
