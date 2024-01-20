import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

interface ThemeToggleProps {
  currentMode: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentMode,
  toggleTheme,
}) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-[#ffffff34]"
    >
      <DarkModeSwitch checked={currentMode === "Dark"} onChange={toggleTheme} />
    </button>
  );
};

export default ThemeToggle;
