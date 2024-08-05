import React, { useEffect, useState } from "react";
import ChatUI from "./chatUI";
import { Outlet, useParams } from "react-router-dom";
import ChatPage from "./ChatPage";
import getUser from "../services/getUser";
import {
  sendMessage,
  initiateSocket,
  subscribeToChat,
  disconnectSocket,
} from "../services/useWebSocket";

export interface Message {
  user: string;
  message: string;
  receiver: string | undefined;
}

const ChatLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = getUser(id);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [userdata, setUserdata] = useState<Message>();

  const handleInputChange = (value: string) => {
    setInputMessage(value);
  };

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
    <div className="grid grid-cols-[1fr,3fr]">
      <ChatUI />
      <ChatPage
        initialMessages={initialMessages}
        handleSendMessage={handleSendMessage}
        user={user}
        id={id}
        onInputChange={handleInputChange}
        value={inputMessage}
      />
    </div>
  );
};

export default ChatLayout;

// initialMessages, handleSendMessage, user, id
