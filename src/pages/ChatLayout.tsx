import { useEffect, useState } from "react";
import ChatUI from "./chatUI";
import { Outlet, useParams } from "react-router-dom";
import { ChatProvider } from "../context/ChatContext";

export interface Message {
  user: string;
  message: string;
  receiver: string | undefined;
}

const ChatLayout = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { id } = useParams<{ id: string | undefined }>();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ChatProvider id={id}>
      <>
        {width > 750 ? (
          <div className="grid grid-cols-[1fr,3fr] bg-bgComp">
            <ChatUI />
            <Outlet />
          </div>
        ) : (
          <Outlet />
        )}
      </>
    </ChatProvider>
  );
};

export default ChatLayout;
