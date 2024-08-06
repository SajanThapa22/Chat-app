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
  return (
    <div className="grid grid-cols-[1fr,3fr]">
      <ChatUI />
      <Outlet />
    </div>
  );
};

export default ChatLayout;

// initialMessages, handleSendMessage, user, id
