import { CiSearch } from "react-icons/ci";
import User from "../components/User";
import pp from "../assets/img/pp.png";
import { useAuth } from "../context/AuthContext";
import GetUsers from "../services/GetUsers";
import { useState } from "react";
import BoxUsersSearch from "../components/BoxUsersSearch";
import ThemeSwitch from "../components/ThemeSwitch";
import { FiLogOut } from "react-icons/fi";

const ChatUI = () => {
  const { users } = GetUsers();
  const { logout, fetchNewAccess } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [searchVisibility, setSearchVisibility] = useState<boolean>();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr,3fr]">
      <div
        id="all-chats"
        className="bg-bgComp px-4 border-r border-r-[#d1d1d1] min-h-screen"
      >
        <div>
          <div className="flex justify-between py-3 text-txtClr items-center">
            <div className="text-[22px] font-medium">Chats</div>
            <div className="flex gap-5">
              <ThemeSwitch />
              <div onClick={logout} className="cursor-pointer">
                <FiLogOut className="text-txtClr size-6" />
              </div>
            </div>
          </div>

          <div className="rounded-[8px] border border-gray-400 px-2 py-1 flex gap-2">
            <input
              type="text"
              className="w-full focus:outline-none border-none bg-transparent text-txtClr"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onFocus={() => setSearchVisibility(true)}
              onBlur={() => {
                setSearchVisibility(false);
              }}
            />
            <CiSearch className="size-6 text-txtClr" />
          </div>
        </div>

        {searchVisibility ? (
          <div id="user-chats" className="mt-6 grid gap-2">
            <BoxUsersSearch searchTerm={searchTerm} />
          </div>
        ) : (
          <div id="user-chats" className="mt-6 grid gap-2">
            {users?.map((u) => (
              <User
                key={u.id}
                userName={u.username}
                img={pp}
                message="click to send message"
                time="11:20 PM"
              />
            ))}
          </div>
        )}
      </div>

      <div id="chat-section" className="flex flex-col bg-bgComp">
        <div className="px-3 py-2 border-b border-b-[#e6e6e6]">
          <User img={pp} userName="Dipshan Chakka" />
        </div>

        <div id="chats" className="flex-1 p-5 flex flex-col  gap-3">
          <div className="rounded-full px-4 py-2 bg-primary max-w-fit text-white">
            hello brother
          </div>
          <div className="rounded-full px-4 py-2 bg-primary max-w-fit text-white">
            hello nigga
          </div>
          <div className="rounded-full px-4 py-2 bg-primary max-w-fit text-white">
            hello sajan how are you man?
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
