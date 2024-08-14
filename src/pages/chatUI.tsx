import { CiSearch } from "react-icons/ci";
import anonymous from "../assets/img/default_image.png";
import { useEffect, useState } from "react";
import BoxUsersSearch from "../components/BoxUsersSearch";
import UserSettings from "../components/UserSettings";
import getCurrentUser, { Users } from "../services/getCurrentUser";
import ChatHistoryList from "./ChatHistoryList";

const ChatUI = () => {
  // const { users } = GetUsers();
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
      className="bg-bgComp px-4 border-r border-r-gray-400 max-h-screen flex flex-col"
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

      <div className="h-full overflow-y-auto hide-scrollbar">
        {searchVisibility ? (
          <div
            id="user-chats"
            className="mt-6 flex flex-col gap-2 flex-1 min-h-full"
          >
            <BoxUsersSearch searchTerm={searchTerm} />
          </div>
        ) : (
          <div
            id="user-chats"
            className="mt-2 flex flex-col flex-1 gap-2 min-h-full"
          >
            {/* {users?.map((u) => (
              <User
                id={u.id}
                key={u.id}
                username={u.username}
                img={u.profile.profile_pic || anonymous}
                message={"send a message"}
                time={`00:00`}
                status={u.user_status.status}
              />
            ))} */}
            <ChatHistoryList />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUI;
