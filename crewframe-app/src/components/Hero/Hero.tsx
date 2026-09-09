import { heroStats } from "../../data/content";
import { IconArrowRight, IconPlay } from "../Icons";
import "./Hero.css";
import HeroStat from "./HeroStat";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-orbs" aria-hidden="true">
        <span className="hero-orb hero-orb-a" />
        <span className="hero-orb hero-orb-b" />
        <span className="hero-orb hero-orb-c" />
      </div>
      <div className="hero-scan" aria-hidden="true" />
      <div className="hero-glow" />
      <div className="hero-grain" />
      <div className="hero-frame">
        <span />
        <span />
      </div>

      <div className="container hero-content text-center">
        <div className="hero-tag">
          <span className="hero-dot" />
          Content &amp; video partner for home-service brands
        </div>
        <h1 className="hero-title">
          <span className="ln">Show the work.</span>
          <span className="ln">Earn the trust.</span>
          <span className="ln">
            Win the <span className="hl">job</span>.
          </span>
        </h1>
        <p className="hero-desc">
          Your crews already do work worth showing. We film it, frame it, and turn every finished
          job into proof that wins the next customer.
        </p>
        <div className="hero-btns flex flex-wrap justify-center gap-4">
          <a href="#contact" className="btn-hp">
            Book a Crew <IconArrowRight width={14} height={14} />
          </a>
          <a
            href="https://www.youtube.com/watch?v=RXv_uIN6e-Y"
            target="_blank"
            rel="noreferrer"
            className="btn-hs"
          >
            <span className="play-circle">
              <IconPlay />
            </span>
            <span>Watch the Reel</span>
          </a>
        </div>

        <div className="hero-stats flex flex-wrap justify-center">
          {heroStats.map((s) => (
            <HeroStat key={s.label} count={s.count} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
