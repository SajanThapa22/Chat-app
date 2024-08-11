import { useTheme } from "../context/ThemeContext";

const themes = ["light", "dark", "system"];

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const handleTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <form className="flex flex-col gap-y-4 text-white">
      {themes.map((t, index) => (
        <div key={index} onClick={() => handleTheme(t)} className="flex gap-4">
          <input
            name="theme"
            type="radio"
            id="light"
            value="light"
            checked={theme === t}
          />
          <label className="capitalize text-txtClr cursor-pointer" htmlFor={t}>
            {t}
          </label>
        </div>
      ))}
    </form>
  );
};

export default ThemeSelector;
