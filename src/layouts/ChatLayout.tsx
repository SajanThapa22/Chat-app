import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ChatSideBar from "../components/chat/ChatSideBar";

export interface Message {
  user: string;
  message: string;
  receiver: string | undefined;
}

const ChatLayout = () => {
  return (
    <div className="grid grid-cols-[1fr,3fr] bg-bgComp">
      <ChatSideBar />
      <Outlet />
    </div>
  );
};

export default ChatLayout;
