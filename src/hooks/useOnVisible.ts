import { useEffect, useRef } from "react";

export const useOnVisible = (
  callback: () => void,
  options?: IntersectionObserverInit
): React.RefObject<HTMLDivElement | null> => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [callback, options]);

  return ref;
};
