import { CiSearch } from "react-icons/ci";
import User from "../components/User";
import pp from "../assets/img/pp.png";
const ChatUI = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr,3fr]">
      <div
        id="all-chats"
        className="bg-bgComp px-2 border-r border-r-[#d1d1d1] min-h-screen"
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

        <div id="user-chats" className="mt-6 grid gap-2">
          <User
            userName="Salina Giri"
            message="hello baby how..."
            img={pp}
            time="11:29 PM"
            style="rounded-[8px] hover:bg-[#d1d1d1]"
          />
          <User
            userName="Salina Giri"
            message="hello janu baby how..."
            img={pp}
            time="11:29 PM"
          />
        </div>
      </div>

      <div id="chat-section" className="flex flex-col">
        <div className="px-3 py-2 border-b border-b-[#e6e6e6]">
          <User img={pp} userName="Salina Giri" />
        </div>

        <div id="chats" className="flex-1 p-5 flex flex-col  gap-3">
          <div className="rounded-full px-4 py-2 bg-primary max-w-fit text-white">
            hello baby
          </div>
          <div className="rounded-full px-4 py-2 bg-primary max-w-fit text-white">
            hello sajan baby
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
