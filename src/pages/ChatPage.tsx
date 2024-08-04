import { useEffect, useState } from "react";
import pp from "../assets/img/pp.png";

import User from "../components/User";
import { useParams } from "react-router-dom";
import getUser from "../services/getUser";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
}

const ChatPage = () => {
  const { id } = useParams();
  const { user } = getUser(id);

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
        <div className="rounded-full px-4 py-2 bg-primary max-w-fit text-white">
          {`hello i am ${user?.username}`}
        </div>
      </div>

      <div className="px-10 py-5 w-full">
        <form action="" className="w-full flex gap-4">
          <input
            type="text"
            className="focus:outline-none border border-gray-400 rounded-lg px-4 py-2 bg-transparent text-txtClr w-full"
            placeholder="Type a message.."
          />
          <button className="border-none bg-primary rounded-lg px-4 py-2 text-white">
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
