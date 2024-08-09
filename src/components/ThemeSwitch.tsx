import { useEffect, useState } from "react";
import { PiSun } from "react-icons/pi";
import { IoMoonOutline } from "react-icons/io5";
import System from "../assets/svg/system.svg?react";
import { useTheme } from "../context/ThemeContext";

const modes = [
  { text: "light", icon: PiSun },
  { text: "dark", icon: IoMoonOutline },
  { text: "system", icon: System },
];

interface Props {
  visibility?: string;
}

const ThemeSwitch = ({ visibility }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClick = () => setIsClicked(!isClicked);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div
        onClick={handleClick}
        className={`z-50 fixed left-0 top-0 bg-transparent w-screen h-dvh ${
          isClicked ? "visible" : "hidden"
        }`}
      ></div>
      <div className={`${visibility}`}>
        <div onClick={handleClick} className="relative z-[100]">
          <div>
            {theme === "dark" && (
              <IoMoonOutline className="w-6 h-6 text-txt-clr" />
            )}
            {theme === "light" && <PiSun className="w-6 h-6 text-txt-clr" />}
            {theme === "system" && <System className="w-6 h-6 text-txt-clr" />}
          </div>

          <ul
            className={`absolute bottom-0 bg-bg-dd overflow-hidden z-[100] rounded-xl right-1/2 translate-x-1/2 translate-y-36 text-nowrap text-sm ${
              isClicked ? "h-fit" : "h-0 overflow-hidden"
            }`}
          >
            {modes.map((m) => (
              <li
                key={m.text}
                onClick={() => {
                  setTheme(m.text);
                }}
                className={`flex items-center gap-3 cursor-pointer pl-5 pr-8 py-2 w-full hover:bg-slate-200`}
              >
                <m.icon
                  className={`w-6 h-6 ${
                    m.text === theme ? "text-blue-400" : "text-txtClr"
                  }`}
                />
                <p
                  className={`font-medium text-xl ${
                    m.text === theme ? "text-blue-400" : "text-txtClr"
                  }`}
                >
                  {m.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ThemeSwitch;
