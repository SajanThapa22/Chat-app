import { useState } from "react";
import anonymous from "../assets/img/default_image.png";
import ProfilePictureUpdate from "./ProfilePictureUpdate";
import ThemeSelector from "./ThemeSelector";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

interface Props {
  img: string;
}

const UserSettings = ({ img }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [firstVisible, setFirstVisible] = useState<boolean>(true);
  const { logout } = useAuth();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const setFirstVisibleTrue = () => {
    setFirstVisible(true);
  };
  const setFirstVisibleFalse = () => {
    setFirstVisible(false);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="size-[40px] rounded-full overflow-hidden cursor-pointer"
      >
        <img
          src={img || anonymous}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="absolute top-0 left-1/2 translate-y-1/2 -translate-x-1/2">
        <div
          className={`relative  w-[300px] lg:w-[500px] xl:w-[600px] aspect-square size-[300px] bg-bgPop rounded-lg flex p-7 gap-7 ${
            isClicked ? "visible" : "hidden"
          }`}
        >
          <div>
            <div
              onClick={setFirstVisibleTrue}
              className={`cursor-pointer px-4 py-2 rounded-[8px] ${
                firstVisible && "bg-selected"
              }`}
            >
              Edit profile
            </div>
            <div
              onClick={setFirstVisibleFalse}
              className={`mt-2 cursor-pointer px-4 py-2 rounded-[8px] ${
                !firstVisible && "bg-selected"
              }`}
            >
              Change theme
            </div>
            <div onClick={logout} className="mt-2 cursor-pointer px-4 py-2">
              Log out
            </div>
          </div>

          <div className="h-full w-[1px] bg-selected"></div>

          <div>
            {firstVisible ? (
              <ProfilePictureUpdate
                onSuccess={() => setIsClicked(false)}
                img={img}
              />
            ) : (
              <ThemeSelector />
            )}
          </div>

          <div
            onClick={() => setIsClicked(false)}
            className="absolute right-4 top-4 cursor-pointer"
          >
            <IoClose className="text-gray-400 size-7" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
