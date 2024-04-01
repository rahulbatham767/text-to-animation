import { useTheme } from "./useTheme"; // Import the hook

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  console.log(isDarkMode);

  return (
    <label className="toggle-container">
      <input
        type="checkbox"
        className="toggle-checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <span className="toggle-slider"></span>
      <span className="toggle-label">{isDarkMode ? "Dark" : "Light"}</span>
    </label>
  );
};

export default ThemeSwitch;
