import { CiSearch } from "react-icons/ci";
const ChatUI = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr,3fr]">
      <div
        id="all-chats"
        className="bg-bgComp px-4 border-r border-r-[#d1d1d1] min-h-screen"
      >
        <div>
          <div>Chats</div>

          <div className="rounded-[8px] border border-gray-400 px-2 py-1 flex gap-2">
            <input
              type="text"
              className="w-full focus:outline-none border-none "
            />
            <CiSearch className="size-6 text-gray-500" />
          </div>
        </div>

        <div id="user-chats"></div>
      </div>

      <div id="chat-section" className="px-5">
        i am sajan
      </div>
    </div>
  );
};

export default ChatUI;
