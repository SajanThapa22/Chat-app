import { useState } from "react";

const chatUI = () => {
  const [user, setuser] = useState();
  return <div>{user}</div>;
};

export default chatUI;
