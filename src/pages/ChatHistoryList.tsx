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
          let sentHours = sentDate.getHours();
          let sentMinutes = sentDate.getMinutes();

          // const deliveredDate =
          //   r.messages[0].delivered_timestamp &&
          //   new Date(r.messages[0].delivered_timestamp);
          //   let deliveredHours = sentDate.getHours();
          // let deliveredMinutes = sentDate.getMinutes();

          const formattedSentTime = `${sentHours}:${sentMinutes}`;

          return (
            <User
              id={r.user.id}
              key={r.user.id}
              username={r.user.username}
              img={r.user.profile.profile_pic}
              message={slicedMessage}
              time={formattedSentTime}
              status={r.user.user_status.status}
              delivered={
                r.messages[0].delivered_timestamp
                  ? r.messages[0].delivered_timestamp
                  : ""
              }
            />
          );
        })}
    </>
  );
};

export default ChatHistoryList;
