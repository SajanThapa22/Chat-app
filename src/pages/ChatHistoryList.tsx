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

  function timeAgo(timestamp: string): string {
    const now = new Date();
    const pastDate = new Date(timestamp);

    const diff = now.getTime() - pastDate.getTime(); // Difference in milliseconds

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

    // More than a week but within the same year: return "DD MMM" format
    if (years === 0) {
      return pastDate.toLocaleDateString([], {
        day: "numeric",
        month: "short",
      });
    }

    // More than a year: return "DD MMM YYYY" format
    return pastDate.toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

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

          // const sentDate = new Date(r.messages[0].sent_timestamp);
          // let sentHours =
          //   sentDate.getHours() > 10
          //     ? sentDate.getHours()
          //     : `0${sentDate.getHours()}`;
          // let sentMinutes =
          //   sentDate.getMinutes() > 10
          //     ? sentDate.getMinutes()
          //     : `0${sentDate.getMinutes()}`;

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
