import { useState } from "react";

const chatUI = () => {
  const [user, setuser] = useState();
  return (
    <div className="flex">
      <div id="all-chats">
        <div>
          <div>Chats</div>

          <div className="rounded-[10px] border border-gray-400 px-4 py-2">
            <input
              type="text"
              className="w-full focus:outline-none border-none"
            />
          </div>
        </div>

        <div id="user-chats"></div>
      </div>

      <div id="chat-section"></div>
    </div>
  );
};

export default chatUI;
