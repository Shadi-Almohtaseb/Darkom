import { useEffect, useState } from "react";

const useThemeSettings = () => {
    const [currentMode, setCurrentMode] = useState<string>(
        localStorage.getItem("theme") || "Light"
    );

    const lightThemeColors = {
        background: "#ffffff",
        text: "#333333",
    };

    const darkThemeColors = {
        background: "#18181b",
        text: "#ffffff",
    };

    const toggleTheme = () => {
        const newTheme = currentMode === "Light" ? "Dark" : "Light";
        localStorage.setItem("theme", newTheme);
        window.dispatchEvent(new Event("themeChange"));
        setCurrentMode(newTheme);
    };

    useEffect(() => {
        const themeColors = currentMode === "Dark" ? darkThemeColors : lightThemeColors;

        // Apply theme colors to the document
        Object.entries(themeColors).forEach(([property, value]) => {
            document.documentElement.style.setProperty(`--${property}`, value);
        });

        document.documentElement.classList.toggle("dark", currentMode === "Dark");
    }, [currentMode]);

    return { currentMode, toggleTheme };
};

export { useThemeSettings };
