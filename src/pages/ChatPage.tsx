import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import getUser from "../services/getUser";
import {
  sendMessage,
  initiateSocket,
  subscribeToChat,
  disconnectSocket,
} from "../services/useWebSocket";
import getChatHistory from "../services/getChatHistory";
import getCurrentUser from "../services/getCurrentUser";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import Navigator from "../components/Navigator";
import User from "../components/User";

interface Message {
  chat_history: string;
  deliverd_timestamp: null;
  id: number;
  media: null;
  message: string;
  reply_of: null;
  seen_timestamp: null;
  sent_timestamp: string;
  user: string;
}
interface User {
  id: string;
  username: string;
  email: string;
}

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = getUser(id);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<string>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [url, setUrl] = useState<{ nextUrl: string; prevUrl: string }>({
    nextUrl: "",
    prevUrl: "",
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (inputMessage && inputMessage.trim()) {
      const messageData = {
        type: "message",
        message: inputMessage,
        receiver_id: id,
        group_id: null,
      };

      sendMessage(messageData);

      setInputMessage("");
    }
  };

  useEffect(() => {
    initiateSocket();
    subscribeToChat((err, data) => {
      if (err) {
        console.error("Error subscribing to chat:", err);
        return;
      }

      const receivedMessage: Message = {
        chat_history: data.message.chat_history,
        deliverd_timestamp: data.message.deliverd_timestamp,
        id: data.message.id,
        media: data.message.media,
        message: data.message.message,
        reply_of: data.message.reply_of,
        seen_timestamp: data.message.seen_timestamp,
        sent_timestamp: data.message.sent_timestamp,
        user: data.message.user,
      };

      setInitialMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const generateChatHistoryName = (
    senderUserId: string | undefined,
    receiverUserId: string | undefined
  ) => {
    const minId =
      senderUserId && receiverUserId && senderUserId < receiverUserId
        ? senderUserId
        : receiverUserId;
    const maxId =
      senderUserId && receiverUserId && senderUserId > receiverUserId
        ? senderUserId
        : receiverUserId;
    return `${minId}_${maxId}`;
  };

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

  useEffect(() => {
    async function getInitialMessages() {
      const result = await getCurrentUser();
      setCurrentUser(result);
      const historyName = generateChatHistoryName(result.id, id);
      setHistory(historyName);
      const initialurl = `https://chat-app-xcsf.onrender.com/chat/history/${historyName}`;
      getTexts(initialurl);
    }

    getInitialMessages();
  }, [id]);

  const handleLoadMore = async () => {
    if (url.nextUrl) {
      getTexts(url.nextUrl);
    }
  };

  return (
    <div id="chat-section" className="flex flex-col bg-bgComp h-dvh max-w-full">
      <div className="px-3 lg:px-8 py-4 border-b border-b-gray-400">
        <div className="flex gap-4 items-center ml-3">
          <Navigator />
          <div className="rounded-full aspect-square overflow-hidden size-10">
            <img src={user?.profile.profile_pic} className="size-full" />
          </div>
          <div className="text-[18px] text-txtClr">{user?.username}</div>
          {user?.user_status.status === "online" && (
            <div className="size-3 bg-[#00FF00] rounded-full"></div>
          )}
        </div>
      </div>

      <div
        id="chats"
        ref={containerRef}
        className="flex-1 h-full overflow-y-auto hide-scrollbar"
      >
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
            if (containerRef.current) {
              containerRef.current.scrollTop =
                containerRef.current.scrollHeight;
            }
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
