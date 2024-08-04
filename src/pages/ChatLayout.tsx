import React from "react";
import ChatUI from "./chatUI";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <div className="grid grid-cols-[1fr,3fr]">
      <ChatUI />
      <Outlet />
    </div>
  );
};

export default ChatLayout;
