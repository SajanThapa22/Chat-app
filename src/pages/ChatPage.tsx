import pp from "../assets/img/pp.png";

import { useParams } from "react-router-dom";
import getUser from "../services/getUser";
import { FormEvent, useEffect, useState } from "react";
import {
  disconnectSocket,
  initiateSocket,
  sendMessage,
  subscribeToChat,
} from "../services/useWebSocket";

interface Message {
  user: string;
  message: string;
}

const ChatPage = () => {
  const { id } = useParams();
  const { user } = getUser(id);
  const [inputMessage, setInputMessage] = useState<string>();
  const [initialMessage, setInitialMessage] = useState<string[]>([]);
  const [userdata, setUserData] = useState<Message>();

  const handleSendMessage = () => {
    const messageData = {
      type: "message",
      message: inputMessage,
      receiver_id: id,
      group_id: null,
    };
    if (inputMessage && inputMessage.trim()) {
      sendMessage(messageData);

      setInitialMessage([...initialMessage, inputMessage]);
      console.log(userdata?.user, user?.username);
      setInputMessage("");
    }
  };

  useEffect(() => {
    initiateSocket();
    console.log(id);

    subscribeToChat((err, data) => {
      if (err) {
        console.error("Error subscribing to chat:", err);
        return;
      }
      if (userdata?.user === user?.username) {
        setUserData(data.message);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div id="chat-section" className="flex flex-col bg-bgComp min-h-dvh">
      <div className="px-3 py-2 border-b border-b-[#e6e6e6]">
        <div className={`flex gap-4 px-2 py-2 items-center`}>
          <div className="rounded-full aspect-square overflow-hidden size-10">
            <img src={pp} className="size-full" />
          </div>
          <div className="w-full text-txtClr">
            <div className="text-[18px]">{user?.username}</div>
          </div>
        </div>
      </div>

      <div id="chats" className="flex-1 p-5 flex flex-col  gap-3">
        {userdata?.user === user?.username && (
          <div className="rounded-[20px] px-4 py-2 bg-gray-400 max-w-fit text-white">
            {userdata?.message}
          </div>
        )}

        {initialMessage?.map((msg, index) => (
          <div
            key={index}
            className="rounded-[20px] px-4 py-2 bg-primary max-w-fit text-white ml-auto"
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="px-10 py-5 w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="w-full flex gap-4"
        >
          <input
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            value={inputMessage}
            type="text"
            className="focus:outline-none border border-gray-400 rounded-lg px-4 py-2 bg-transparent text-txtClr w-full"
            placeholder="Type a message.."
          />
          <button
            type="submit"
            className="border-none bg-primary rounded-lg px-4 py-2 text-white"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
