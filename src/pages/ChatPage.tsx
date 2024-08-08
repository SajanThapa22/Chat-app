import { FormEvent, useEffect, useState } from "react";
import pp from "../assets/img/pp.png";
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
  const [oldMessage, setOldMessage] = useState<Message[]>([]);
  const [history, setHistory] = useState<string>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [page, setPage] = useState<number>(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

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
    setPage(1);
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
      setNextUrl(chatsData.next);
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
    }
  };

  useEffect(() => {
    async function getInitialMessages() {
      const result = await getCurrentUser();
      setCurrentUser(result);
      const historyName = generateChatHistoryName(result.id, id);
      setHistory(historyName);
      const initialurl = `http://127.0.0.1:8000/chat/history/${historyName}`;
      getTexts(initialurl);
    }

    getInitialMessages();
  }, [id]);

  const handleLoadMore = async () => {
    if (nextUrl) {
      getTexts(nextUrl);
    }
  };

  return (
    <div
      id="chat-section"
      className="flex flex-col bg-bgComp max-h-dvh max-w-full"
    >
      <div className="px-3 py-2 border-b border-b-[#e6e6e6]">
        <div className="flex gap-4 px-2 py-2 items-center">
          <div className="rounded-full aspect-square overflow-hidden size-10">
            <img src={pp} className="size-full" alt="User Avatar" />
          </div>
          <div className="w-full text-txtClr">
            <div className="text-[18px]">{user?.username}</div>
          </div>
        </div>
      </div>

      <div id="chats" className="flex-1 h-full overflow-y-auto hide-scrollbar">
        {nextUrl && (
          <div
            onClick={handleLoadMore}
            className="text-center text-txtClr mt-3 text-[18px] cursor-pointer"
          >
            load more messages...
          </div>
        )}
        <div
          id="chatsdivs"
          className="w-full min-h-full justify-end flex flex-col gap-3 bottom-0 px-10 py-5"
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
                  {/* {msg.chat_history} */}
                </div>
              )
          )}
        </div>
      </div>

      <div className="px-10 py-5 w-full">
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="w-full flex gap-4"
        >
          <input
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
            type="text"
            className="focus:outline-none border border-gray-300 rounded-lg px-4 py-2 bg-transparent text-txtClr w-full"
            placeholder="Type a message.."
          />
          <button
            type="submit"
            className="border-none bg-primary rounded-lg px-4 py-2 text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
