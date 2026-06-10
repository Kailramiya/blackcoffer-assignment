import { useEffect, useRef, useState } from "react";
import { getInsightStats } from "../api/client";

const DEBOUNCE_MS = 300;

export function useDashboardData(queryParams) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const controller = new AbortController();

      getInsightStats(queryParams)
        .then((result) => {
          setData(result);
          setError(null);
        })
        .catch((err) => {
          if (err.name !== "CanceledError") setError(err);
        })
        .finally(() => setLoading(false));

      timeoutRef.current = controller;
    }, DEBOUNCE_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryParams)]);

  return { data, loading, error };
}
