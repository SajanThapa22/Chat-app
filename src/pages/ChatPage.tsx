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
  const [user, setUser] = useState<User>();
  const url = `http://127.0.0.1:8000/chat/user/${id}`;

  useEffect(() => {
    const access = localStorage.getItem("access");

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  return (
    <div id="chat-section" className="flex flex-col bg-bgComp min-h-dvh">
      <div className="px-3 py-2 border-b border-b-[#e6e6e6]">
        <User id={"123ersr3"} img={pp} username={user?.username} />
      </div>

      <div id="chats" className="flex-1 p-5 flex flex-col  gap-3">
        <div className="rounded-full px-4 py-2 bg-primary max-w-fit text-white">
          {`hello i am ${user?.username}`}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
