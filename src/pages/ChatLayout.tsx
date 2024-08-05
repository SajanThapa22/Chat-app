import React from "react";
import ChatUI from "./chatUI";
import { Outlet } from "react-router-dom";
import ChatPage from "./ChatPage";

const ChatLayout = () => {
  return (
    <div className="grid grid-cols-[1fr,3fr]">
      <ChatUI />
      <ChatPage />
    </div>
  );
};

export default ChatLayout;
