import { useState } from "react";
import pp from "../assets/img/pp.png";

const UserSettings = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="relative">
      <div className="size-8 rounded-full overflow-hidden">
        <img src={pp} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="absolute bottom-0 translate-y-full rounded-lg"></div>
    </div>
  );
};

export default UserSettings;
