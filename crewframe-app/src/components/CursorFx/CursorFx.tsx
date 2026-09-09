import { useEffect, useRef } from "react";
import "./CursorFx.css";

/**
 * Custom cursor dot + trailing ring. Hidden on touch/coarse-pointer
 * devices via CSS (matches the original site's max-width:1024px rule).
 */
export default function CursorFx() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      raf = requestAnimationFrame(tick);
    };

    const grow = () => ringRef.current?.classList.add("big");
    const shrink = () => ringRef.current?.classList.remove("big");

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    const selector = "a,button,.svc-card,.reel-card,.long-card,.crew-card,.loop-card";
    document.addEventListener("mouseover", (e) => {
      if ((e.target as HTMLElement)?.closest?.(selector)) grow();
    });
    document.addEventListener("mouseout", (e) => {
      if ((e.target as HTMLElement)?.closest?.(selector)) shrink();
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="c-dot" ref={dotRef} />
      <div className="c-ring" ref={ringRef} />
    </>
  );
}
