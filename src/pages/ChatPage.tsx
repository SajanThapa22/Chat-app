import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import Navigator from "../components/Navigator";
import anonymous from "../assets/img/default_image.png";
import { useChat } from "../context/ChatContext";
import getUser from "../hooks/getUser";
import getChatHistory from "../hooks/getChatHistory";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { useChatHistory } from "../context/ChatHistoryContext";

const ChatPage = () => {
  const { currentUser, error } = useGetCurrentUser();
  const { id } = useParams<{ id: string }>();
  const { user } = getUser(id);
  const { result } = useChatHistory();
  const [filteredStatus, setFilteredStatus] = useState<string>();
  const {
    setInitialMessages,
    initialMessages,
    inputMessage,
    setInputMessage,
    url,
    setUrl,
    history,
    setHistory,
    handleSendMessage,
  } = useChat();

  const getTexts = async (url: string) => {
    const chats = await getChatHistory(url);
    const chatsData = chats.data;
    if (chats.status === 200) {
      setUrl((prev) => ({ ...prev, nextUrl: chats.data.next }));
      setUrl((prev) => ({ ...prev, prevUrl: chats.data.previous }));
      if (!chatsData.previous) {
        setInitialMessages([]);
        for (let i = chatsData.results.length - 1; i >= 0; i--) {
          setInitialMessages((prevMessages) => [
            ...prevMessages,
            chatsData.results[i],
          ]);
        }
      } else {
        for (let i = 0; i < chatsData.results.length; i++) {
          setInitialMessages((prev) => [chatsData.results[i], ...prev]);
        }
      }
    } else {
      setUrl((prev) => ({ ...prev, nextUrl: "", prevUrl: "" }));
    }
  };

  const generateChatHistoryName = (
    senderUserId: string | undefined,
    receiverUserId: string | undefined
  ) => {
    if (!senderUserId || !receiverUserId) {
      // Handle the case where one or both IDs are undefined
      console.error("Both sender and receiver IDs must be defined");
      return ""; // or handle it in a way that suits your application
    }

    const minId = senderUserId < receiverUserId ? senderUserId : receiverUserId;
    const maxId = senderUserId > receiverUserId ? senderUserId : receiverUserId;
    return `${minId}_${maxId}`;
  };

  useEffect(() => {
    async function getInitialMessages() {
      if (currentUser && id) {
        const historyName = generateChatHistoryName(currentUser.id, id);
        setHistory(historyName);
        const initialurl = `https://chat-app-xcsf.onrender.com/chat/history/${historyName}`;
        await getTexts(initialurl);
      }
    }
    getInitialMessages();
  }, [currentUser, id]);

  useEffect(() => {
    if (history) {
      const visibleResult = result.find((res) => res.chat_history === history);
      setFilteredStatus(visibleResult?.user.user_status.status);
    }
  }, [history, result]);

  const handleLoadMore = async () => {
    if (url.nextUrl) {
      getTexts(url.nextUrl);
    }
  };
  if (error) {
    return <div>Error: {error}</div>; // Display any error messages
  }

  return (
    <div id="chat-section" className="flex flex-col bg-bgComp h-dvh max-w-full">
      <div className="px-3 lg:px-8 py-2 lg:py-4 border-b border-b-gray-400">
        <div className="flex gap-4 items-center ml-3">
          <Navigator />
          <div className="rounded-full aspect-square size-12 relative">
            <img
              src={user?.profile.profile_pic || anonymous}
              className="size-full object-cover rounded-full"
            />
            {filteredStatus === "online" && (
              <div className="size-3 bg-[#00FF00] rounded-full absolute bottom-0 right-0"></div>
            )}
          </div>
          <div className="flex flex-col text-txtClr">
            <div className="text-[18px]">{user?.username}</div>
            {filteredStatus === "online" && (
              <>
                <div className="text-[14px]">Active now</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div id="chats" className="flex-1 h-full overflow-y-auto hide-scrollbar">
        {url.nextUrl && initialMessages && (
          <div
            onClick={handleLoadMore}
            className="text-center text-txtClr mt-3 text-[18px] cursor-pointer"
          >
            load more messages...
          </div>
        )}
        <div
          id="chatsdivs"
          className="w-full min-h-full justify-end flex flex-col gap-3 bottom-0 px-4 lg:px-8 py-5"
        >
          {initialMessages.map(
            (msg, index) =>
              msg.chat_history === history && (
                <div
                  key={index}
                  style={{
                    wordBreak: "break-all",
                  }}
                  className={`rounded-[20px] px-4 py-2 text-wrap max-w-[60%] text-white  ${
                    msg.user === currentUser?.id
                      ? "bg-primary ml-auto"
                      : "bg-gray-400 mr-auto"
                  }`}
                >
                  {msg.message}
                </div>
              )
          )}
        </div>
      </div>

      <div className="px-4 lg:px-8 py-5 w-full">
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="w-full flex items-center gap-4"
        >
          <input
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
            type="text"
            className="focus:outline-none border border-gray-400 rounded-lg px-4 py-2 bg-transparent text-txtClr w-full"
            placeholder="Type a message.."
          />
          <button
            type="submit"
            className="border-none size-8 bg-transparent outline-none rounded-lg text-white"
          >
            <PiPaperPlaneRightFill className="text-primary size-8" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
