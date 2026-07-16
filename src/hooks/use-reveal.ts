import { useEffect, useRef, useState } from "react";

/**
 * Adds `.is-visible` to a `.reveal` element when it scrolls into view.
 * Returns a ref to attach to the target element.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: if IntersectionObserver is not available, show immediately
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
        ...options,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}
