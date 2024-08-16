import { useState } from "react";
import anonymous from "../assets/img/default_image.png";
import ProfilePictureUpdate from "./ProfilePictureUpdate";
import ThemeSelector from "./ThemeSelector";
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
        onClick={() => setIsClicked(false)}
        className={`w-screen h-screen z-[9000] ${
          isClicked ? "visible" : "hidden"
        } absolute left-0 top-0`}
      ></div>
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

      <div
        className={`absolute z-[9999] top-0 left-1/2 translate-y-1/2 -translate-x-1/2 w-[350px] lg:w-[500px] xl:w-[600px] aspect-square size-[300px] bg-bgPop z-100 opacity-100 rounded-lg flex py-5 px-3 gap-7 ${
          isClicked ? "visible" : "hidden"
        }`}
      >
        <div>
          <div
            onClick={setFirstVisibleTrue}
            className={`cursor-pointer px-2 py-2 rounded-[8px] ${
              firstVisible && "bg-selected"
            }`}
          >
            Edit profile
          </div>
          <div
            onClick={setFirstVisibleFalse}
            className={`mt-2 cursor-pointer px-2 py-2 rounded-[8px] ${
              !firstVisible && "bg-selected"
            }`}
          >
            Change theme
          </div>
          <div onClick={logout} className="mt-2 cursor-pointer px-2 py-2">
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
      </div>
    </div>
  );
};

export default UserSettings;
