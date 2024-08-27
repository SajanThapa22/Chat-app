import User from "../components/User";
import Spinner from "../components/Spinner";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { useChatHistory } from "../context/ChatHistoryContext";

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
      {currentUser?.id &&
        result.map((r) => {
          const messageContent =
            r.messages[0].user === currentUser?.id
              ? `you: ${r.messages[0].message}`
              : r.messages[0].message;

          const slicedMessage =
            messageContent.length > 20
              ? `${messageContent.slice(0, 20)}...`
              : messageContent;

          const sentDate = new Date(r.messages[0].sent_timestamp);
          let sentHours =
            sentDate.getHours() > 10
              ? sentDate.getHours()
              : `0${sentDate.getHours()}`;
          let sentMinutes =
            sentDate.getMinutes() > 10
              ? sentDate.getMinutes()
              : `0${sentDate.getMinutes()}`;

          function timeAgo(): string {
            const now = new Date();
            const sentDate = new Date(r.messages[0].sent_timestamp);
            const diff = now.getTime() - sentDate.getTime(); // Get the difference in milliseconds

            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const weeks = Math.floor(days / 7);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);

            if (hours < 24) return `${sentHours}:${sentMinutes}`;
            if (days < 7) return `${days} d ago`;
            if (weeks < 4) return `${weeks} w ago`;
            if (months < 12) return `${months} mo ago`;
            return `${years} y ago`;
          }

          return (
            <User
              id={r.user.id}
              key={r.user.id}
              username={r.user.username}
              img={r.user.profile.profile_pic}
              message={slicedMessage}
              time={timeAgo()}
              status={r.user.user_status.status}
            />
          );
        })}
    </>
  );
};

export default ChatHistoryList;
