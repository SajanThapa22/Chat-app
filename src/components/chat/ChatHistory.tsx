import { useContext } from "react";
import { useChatHistory } from "../../hooks/useChatHistory";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";
import User from "./User";

const ChatHistoryList = () => {
  const { chatHistory, error, isLoading } = useChatHistory();
  const { user } = useContext(AuthContext);

  function timeAgo(timestamp: string): string {
    const now = new Date();
    const pastDate = new Date(timestamp);

    const diff = now.getTime() - pastDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = now.getFullYear() - pastDate.getFullYear();

    // Same day: return time in "HH:MM" format
    if (days < 1 && now.getDate() === pastDate.getDate()) {
      return pastDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Previous day but within the same week: return the day of the week
    if (days < 7) {
      return pastDate.toLocaleDateString([], { weekday: "short" });
    }

    if (years === 0) {
      return pastDate.toLocaleDateString([], {
        day: "numeric",
        month: "short",
      });
    }

    return pastDate.toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (error) {
    return <div className="">{error}</div>;
  }
  if (isLoading)
    return <LoadingSpinner size="size-10 border-[6px] mx-auto my-auto" />;
  return (
    <>
      {user?.id &&
        chatHistory?.map((r) => {
          const messageContent =
            r.messages[0].user === user?.id
              ? `you: ${r.messages[0].message}`
              : r.messages[0].message;

          const slicedMessage =
            messageContent.length > 20
              ? `${messageContent.slice(0, 20)}...`
              : messageContent;

          return (
            <User
              id={r.user.id}
              key={r.user.id}
              username={r.user.username}
              img={r.user.profile.profile_pic}
              message={slicedMessage}
              time={timeAgo(r.messages[0].sent_timestamp)}
              status={r.user.user_status.status}
            />
          );
        })}
    </>
  );
};

export default ChatHistoryList;
