import React, { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import pp from "../assets/img/pp.png";
import getUser from "../services/getUser";
import {
  disconnectSocket,
  initiateSocket,
  sendMessage,
  subscribeToChat,
} from "../services/useWebSocket";

interface Message {
  user: string;
  message: string;
  receiver: string | undefined;
}

// interface Chat {
//   user: string;
//   message: string;
//   receiver: string | undefined;
// }

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = getUser(id);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [userdata, setUserdata] = useState<Message>();

  const handleSendMessage = () => {
    if (inputMessage && inputMessage.trim()) {
      const messageData = {
        type: "message",
        message: inputMessage,
        receiver_id: id,
        group_id: null,
      };

      sendMessage(messageData);

      const selfMessage: Message = {
        user: "self",
        message: inputMessage,
        receiver: id,
      };

      setInitialMessages((prevMessages) => [...prevMessages, selfMessage]);
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

      setUserdata(data.message);

      console.log("Received data:", data); // Debugging statement

      // Assuming data contains user and message keys
      const receivedMessage: Message = {
        user: data.message.user,
        message: data.message.message,
        receiver: id,
      };

      console.log("Parsed message:", receivedMessage); // Debugging statement

      setInitialMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

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
            (msg.user === id ||
              (msg.user === "self" && msg.receiver === id)) && (
              <div
                key={index}
                style={{
                  wordBreak: "break-all",
                }}
                className={`rounded-[20px] px-4 py-2 text-wrap max-w-[60%] text-white  ${
                  msg.user === "self"
                    ? "bg-primary ml-auto"
                    : "bg-gray-500 mr-auto"
                }`}
              >
                {msg.user === "self" ? msg.message : msg.message}
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
