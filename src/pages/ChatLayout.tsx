import { useEffect, useState } from "react";
import ChatUI from "./chatUI";
import { Outlet } from "react-router-dom";

export interface Message {
  user: string;
  message: string;
  receiver: string | undefined;
}

const ChatLayout = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [window.innerWidth]);

  return (
    <>
      {width > 750 ? (
        <div className="grid grid-cols-[1fr,3fr]">
          <ChatUI />
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ChatLayout;

// initialMessages, handleSendMessage, user, id
