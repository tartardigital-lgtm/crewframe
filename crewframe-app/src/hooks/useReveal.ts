import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right";

/**
 * Lightweight replacement for the AOS library.
 * Attach the returned `ref` to any element and it will fade/slide into
 * view the first time it crosses the viewport threshold.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  direction: Direction = "up"
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -70px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const className = `reveal reveal-${direction}${visible ? " is-visible" : ""}`;

  return { ref, className };
}
