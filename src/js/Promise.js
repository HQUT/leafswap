import React from "react";
import { useState, useEffect } from "react";
export function usePromise(promise) {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);
    let cancelled = false;
    
    if (promise) {
      promise
        .then((dt) => {
          if (!cancelled) setData(dt.items);
        })
        .catch((er) => {
          if (!cancelled) setError(er);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [promise]);

  return [data, error];
}

export function promiseNoData(promise, data, error) {
  if (!promise && !error) {
    return null;
  } else if (promise && !data && !error) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
  } else if (promise && !data && error) {
    return <span>Error</span>;
  }
}
