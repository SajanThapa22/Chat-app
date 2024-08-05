import { CiSearch } from "react-icons/ci";
import User from "../components/User";
import pp from "../assets/img/pp.png";
import { useAuth } from "../context/AuthContext";
import GetUsers from "../services/GetUsers";
import { useState } from "react";
import BoxUsersSearch from "../components/BoxUsersSearch";
import ThemeSwitch from "../components/ThemeSwitch";
import { FiLogOut } from "react-icons/fi";
import ChatPage from "./ChatPage";
import { Outlet } from "react-router-dom";

const ChatUI = () => {
  const { users } = GetUsers();
  const { logout, fetchNewAccess } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [searchVisibility, setSearchVisibility] = useState<boolean>();
  const [userId, setUserId] = useState<string>();

  return (
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
            placeholder="Search users"
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
              onclick={() => {
                setUserId(u.id);
              }}
              id={u.id}
              key={u.id}
              username={u.username}
              img={pp}
              message="click to send message"
              time="11:20 PM"
              style={u.id === userId ? "bg-selected" : ""}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatUI;
