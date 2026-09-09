import { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader() {
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGone(true), 1200);
    const t2 = setTimeout(() => setRemoved(true), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (removed) return null;

  return (
    <div id="loader" className={gone ? "gone" : ""}>
      <svg className="cf-mark ld-mark" viewBox="0 0 1000 980" fill="none" aria-hidden="true">
        <g fill="#f36a2d">
          <polygon points="195,0 688,0 688,135 242,135 134,243 134,743 0,743 0,189" />
          <polygon points="850,486 999,486 999,818 837,973 458,973 458,838 769,838 850,764 850,493" />
        </g>
        <g fill="currentColor">
          <polygon points="323,236 877,236 742,372 370,378 377,486 756,486 620,622 370,622 370,919 229,919 229,318 303,243" />
          <polygon points="789,0 999,0 999,210 918,210 918,81 789,81" />
          <polygon points="0,831 148,831 148,980 80,980 80,899 0,899" />
        </g>
      </svg>
      <div className="ld-logo">CREWFRAME</div>
      <div className="ld-bar">
        <div className="ld-fill" />
      </div>
      <div className="ld-tag">Built from real work</div>
    </div>
  );
}
