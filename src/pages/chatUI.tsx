import { CiSearch } from "react-icons/ci";
const ChatUI = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr,3fr]">
      <div id="all-chats" className="bg-bgComp px-4">
        <div>
          <div>Chats</div>

          <div className="rounded-[8px] border border-gray-400 px-2 py-1 flex gap-2">
            <input
              type="text"
              className="w-full focus:outline-none border-none text-border-gray-400"
            />
            <CiSearch className="size-6" />
          </div>
        </div>

        <div id="user-chats"></div>
      </div>

      <div id="chat-section">i am sajan</div>
    </div>
  );
};

export default ChatUI;
