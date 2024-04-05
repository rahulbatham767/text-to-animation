import { Toogle } from "../app/features/AnimationSlice";

import { useSelector, useDispatch } from "react-redux";
const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const darkmode = useSelector((state) => state.TextAnimation.darkmode);
  const handleToggle = () => {
    dispatch(Toogle()); // Dispatch the action creator
  };

  return (
    <label className="toggle-container">
      <input
        type="checkbox"
        className="toggle-checkbox"
        checked={darkmode}
        onChange={handleToggle}
      />
      <span className="toggle-slider"></span>
      <span className="toggle-label">{darkmode ? "Dark" : "Light"}</span>
    </label>
  );
};

export default ThemeSwitch;
