import  { useState, useEffect } from "react";
export function usePromise(promise) {
    // custom hook
    const [data, setData] =  useState(null);
    const [error, setError] =  useState(null);
  
  
    useEffect(
      function () {
        setData(null);
        setError(null);
        let cancelled = false;
        if (promise)
          promise.then((dt) => {

              if (!cancelled)
                setData(dt.items);

            }).catch((er) => {
              if (!cancelled)
              setError(er);
            });
        return function () {
          cancelled = true;
        };
      },
      [promise]
    );
    return [data, error];
  }
  