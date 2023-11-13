import { useRef } from 'react';

function useDebouncedCallback(callback, delay) {
  const timer = useRef();

  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export default useDebouncedCallback;
