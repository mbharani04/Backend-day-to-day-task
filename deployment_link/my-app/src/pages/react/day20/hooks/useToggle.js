import { useState } from "react";

/**
 * useToggle — custom hook to toggle between two values (default: false/true)
 * @param {boolean} initialValue
 */
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  const setOn = () => setValue(true);
  const setOff = () => setValue(false);
  return { value, toggle, setOn, setOff };
};

export default useToggle;
