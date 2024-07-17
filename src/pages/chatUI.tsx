import { useState } from "react";

const chatUI = () => {
  const [user, setuser] = useState();
  return (
    <div className="flex">
      <div>users</div>
      <div>chat</div>
    </div>
  );
};

export default chatUI;
