import React, { useEffect, useRef } from "react";

export function useInterval(callback: any, delay: any) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    /* eslint-disable */
    // @ts-ignore-next-line
    const interval = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(interval);
  }, [delay]);
}
