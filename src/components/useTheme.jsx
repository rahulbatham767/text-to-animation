import { useState, useEffect } from "react";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  useEffect(() => {
    const root = window.document.getElementById("root");
    const changeTheme = () => {
      if (isDarkMode) {
        root.classList.add("bg-gradient-dark");
        root.classList.remove("bg-gradient-light");
      } else {
        root.classList.add("bg-gradient-light");
        root.classList.remove("bg-gradient-dark");
      }
    };
    changeTheme();
    window.addEventListener("storage", changeTheme);

    return () => window.removeEventListener("storage", changeTheme);
  }, [isDarkMode]);

  return { isDarkMode, toggleTheme };
};
