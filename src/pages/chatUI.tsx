import { CiSearch } from "react-icons/ci";
import User from "../components/User";
import anonymous from "../assets/img/default_image.png";
import { useAuth } from "../context/AuthContext";
import GetUsers from "../services/GetUsers";
import { useEffect, useState } from "react";
import BoxUsersSearch from "../components/BoxUsersSearch";
import { FiLogOut } from "react-icons/fi";
import UserSettings from "../components/UserSettings";
import getCurrentUser, { Users } from "../services/getCurrentUser";

const ChatUI = () => {
  const { users } = GetUsers();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchVisibility, setSearchVisibility] = useState<boolean>();
  const [currentUser, setCurrentUser] = useState<Users>();

  useEffect(() => {
    async function getUser() {
      const result = await getCurrentUser();
      setCurrentUser(result);
    }
    getUser();
  }, []);

  return (
    <div
      id="all-chats"
      className="bg-bgComp px-4 border-r border-r-gray-400 min-h-screen flex flex-col"
    >
      <div>
        <div className="flex justify-between py-3 text-txtClr items-center">
          <div className="text-[22px] font-medium">Chats</div>
          <div className="flex gap-5 items-center">
            <UserSettings img={currentUser?.profile.profile_pic || anonymous} />
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
            onBlur={(e) => {
              !e.target.value && setSearchVisibility(false);
            }}
          />
          <CiSearch className="size-6 text-txtClr" />
        </div>
      </div>

      {searchVisibility ? (
        <div
          id="user-chats"
          className="mt-6 flex flex-col gap-2 flex-1 overflow-y-scroll hide-scrollbar"
        >
          <BoxUsersSearch searchTerm={searchTerm} />
        </div>
      ) : (
        <div
          id="user-chats"
          className="mt-6 flex flex-col flex-1 gap-2 overflow-y-scroll hide-scrollbar"
        >
          {users?.map((u) => (
            <User
              id={u.id}
              key={u.id}
              username={u.username}
              img={u.profile.profile_pic || anonymous}
              message={"send a message"}
              time={`00:00`}
              status={u.user_status.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatUI;
