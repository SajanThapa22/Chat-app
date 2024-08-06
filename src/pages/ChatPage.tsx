import { FormEvent, ChangeEvent, useEffect, useState } from "react";
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
import { useAuth } from "../context/AuthContext";
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
  const [inputMessage, setInputMessage] = useState<string>();
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<string>();
  const [currentUser, setCurrentUser] = useState<User>();

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
  }, [id]);

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

  useEffect(() => {
    const getTexts = async () => {
      const result = await getCurrentUser();
      const chats = await getChatHistory(result.id, id);
      console.log(chats);
      setCurrentUser(result);
      for (let i = 0; i < chats.length; i++) {
        setInitialMessages((prevMessages) => [...prevMessages, chats[i]]);
      }
      const historyName = generateChatHistoryName(result.id, id);
      setHistory(historyName);
      console.log(historyName);
    };
    getTexts();
  }, [id]);

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

      <div
        id="chats"
        className="flex-1 p-5 flex flex-col gap-3 max-h-screen overflow-y-scroll hide-scrollbar"
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
                    : "bg-gray-500 mr-auto"
                }`}
              >
                {msg.message}
                {/* {msg.chat_history} */}
              </div>
            )
        )}
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
