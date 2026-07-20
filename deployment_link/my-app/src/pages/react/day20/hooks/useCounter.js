import { useState } from "react";

/**
 * useCounter — custom hook with increment, decrement, reset
 * @param {number} initialValue
 * @param {number} step
 * @param {number|null} min
 * @param {number|null} max
 */
const useCounter = (initialValue = 0, step = 1, min = null, max = null) => {
  const [count, setCount] = useState(initialValue);

  const increment = () =>
    setCount((prev) => (max !== null ? Math.min(prev + step, max) : prev + step));

  const decrement = () =>
    setCount((prev) => (min !== null ? Math.max(prev - step, min) : prev - step));

  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

export default useCounter;
