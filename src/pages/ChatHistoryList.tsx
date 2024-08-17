import User from "../components/User";
import Spinner from "../components/Spinner";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { useChatHistory } from "../context/ChatHistoryContext";
import useChatHistoryList from "../hooks/useChatHistoryList";

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

const ChatHistoryList = () => {
  const { result, error, isLoading } = useChatHistory();
  const { currentUser } = useGetCurrentUser();

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
          messageContent.length > 20
            ? `${messageContent.slice(0, 20)}...`
            : messageContent;

        const date = new Date(r.messages[0].sent_timestamp);
        let hours = date.getHours();
        let minutes = date.getMinutes();

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
