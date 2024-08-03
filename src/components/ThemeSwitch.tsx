import { useEffect, useState } from "react";
import Sun from "../assets/svg/sun.svg?react";
import Moon from "../assets/svg/moon.svg?react";
import System from "../assets/svg/system.svg?react";

const modes = [
  { text: "light", icon: Sun },
  { text: "dark", icon: Moon },
  { text: "system", icon: System },
];

interface Props {
  visibility?: string;
}

const ThemeSwitch = ({ visibility }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClick = () => setIsClicked(!isClicked);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

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
            {theme === "dark" && <Moon className="w-6 h-6 text-txt-clr" />}
            {theme === "light" && <Sun className="w-6 h-6 text-txt-clr" />}
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
