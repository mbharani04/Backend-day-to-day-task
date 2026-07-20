import { useState, useEffect } from "react";

/**
 * useFetch — custom hook to fetch data from a URL
 * Returns { data, loading, error, refetch }
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [url, trigger]);

  const refetch = () => setTrigger((t) => t + 1);

  return { data, loading, error, refetch };
};

export default useFetch;
