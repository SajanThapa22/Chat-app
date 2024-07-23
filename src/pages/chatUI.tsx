import { useState } from "react";

const chatUI = () => {
  const [user, setuser] = useState();
  return (
    <div className="flex">
      <div id="all-chats"></div>

      <div id="chat-section"></div>
    </div>
  );
};

export default chatUI;
