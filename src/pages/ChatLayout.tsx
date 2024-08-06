import ChatUI from "./chatUI";
import { Outlet } from "react-router-dom";

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
