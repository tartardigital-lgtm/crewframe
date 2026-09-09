import { useEffect, useState } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import { IconArrowRight } from "../Icons";
import "./Navbar.css";

const links = [
  { href: "hero", label: "Home" },
  { href: "services", label: "Services" },
  { href: "work", label: "Portfolio" },
  { href: "crew", label: "Our Crew" },
  { href: "pricing", label: "Pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links.map((l) => l.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 74, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="container navbar-inner flex items-center justify-between gap-4">
        <a className="cf-logo" href="#hero" onClick={scrollTo("hero")}>
          <svg className="cf-mark" viewBox="0 0 1000 980" fill="none" aria-hidden="true">
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
          <span className="cf-word">
            CREW<span className="cf-word-accent">FRAME</span>
          </span>
        </a>

        <button
          className={`navbar-toggler ${open ? "open" : ""}`}
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="tog-wrap">
            <span className="tog-line" />
            <span className="tog-line" />
            <span className="tog-line" />
          </span>
        </button>

        <div className={`nav-menu ${open ? "nav-menu-open" : ""}`}>
          <ul className="navbar-nav">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  className={`nav-link ${active === l.href ? "active" : ""}`}
                  href={`#${l.href}`}
                  onClick={scrollTo(l.href)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a href="#contact" className="nav-link nav-cta" onClick={scrollTo("contact")}>
          Contact <IconArrowRight width={14} height={14} />
        </a>
      </div>
    </nav>
  );
}
