import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in view so the navbar can
 * highlight the matching link (replaces the jQuery scroll-spy).
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const handler = () => {
      const st = window.scrollY;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (st >= top - 140) {
          setActive(id);
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);

  return active;
}
