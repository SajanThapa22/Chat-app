import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import BoxUsersSearch from "../components/BoxUsersSearch";
import UserSettings from "../components/UserSettings";
import ChatHistoryList from "./ChatHistoryList";
// import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { FaChevronLeft } from "react-icons/fa6";
import defaultProfilePicture from "../assets/img/default_image.png";
import { useTheme } from "../context/ThemeContext";

const ChatUI = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchVisibility, setSearchVisibility] = useState<boolean>();
  // const { currentUser } = useGetCurrentUser();
  const { isSideBarCollapsed } = useTheme();

  return (
    <div
      id="all-chats"
      className={`relative ${
        isSideBarCollapsed
          ? "opacity-0 scale-x-0 w-0 px-0"
          : "opacity-100 scale-x-100 w-1/4"
      } transition-transform origin-left duration-75 delay-100 bg-bgComp overflow-hidden px-4 border-r border-r-gray-400 h-screen max-h-screen flex flex-col`}
    >
      <div>
        <div className="flex justify-between py-3 text-txtClr items-center">
          <div className="text-[22px] font-medium">Chats</div>
          <div className="flex gap-5 items-center">
            <UserSettings img={defaultProfilePicture} />
          </div>
        </div>

        <div className="rounded-[8px] border border-gray-400 px-3 py-2 flex gap-2">
          <input
            value={searchTerm}
            type="text"
            placeholder="Search users"
            className="w-full focus:outline-none border-none bg-transparent text-txtClr"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onFocus={() => setSearchVisibility(true)}
            onBlur={(e) => {
              !e.target.value && setSearchVisibility(false);
            }}
          />
          <CiSearch className="size-6 text-txtClr" />
        </div>
      </div>

      <div className="h-full w-full overflow-y-auto hide-scrollbar relative">
        <div
          id="user-chats"
          className={`absolute bg-bgComp top-0 left-0 mt-6 flex gap-2 justify-center flex-1 w-full min-h-full ${
            searchVisibility ? "visible" : "hidden"
          }`}
        >
          <BoxUsersSearch searchTerm={searchTerm} />
        </div>

        <div
          id="user-chats"
          className={`mt-4 flex flex-col flex-1 gap-2 min-h-full z-20 ${
            searchVisibility ? "hidden" : "visible"
          } `}
        >
          <ChatHistoryList />
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
