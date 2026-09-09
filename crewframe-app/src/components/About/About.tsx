import { aboutImagePlaceholder } from "../../data/content";
import { IconArrowRight } from "../Icons";
import { useReveal } from "../../hooks/useReveal";
import "./About.css";

export default function About() {
  const media = useReveal<HTMLDivElement>("right");
  const copy = useReveal<HTMLDivElement>("left");

  return (
    <section id="about">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div ref={media.ref} className={`${media.className} lg:col-span-5 order-1`}>
          <div className="about-media frame">
            <span className="fr-c fr-tl" />
            <span className="fr-c fr-br" />
            <img className="about-img" src={aboutImagePlaceholder} alt="Job site door, before CrewFrame content" />
            <div className="about-badge">
              <div className="about-badge-n">
                48<sup>hr</sup>
              </div>
              <div className="about-badge-l">Turnaround, job to published post</div>
            </div>
          </div>
        </div>
        <div ref={copy.ref} className={`${copy.className} lg:col-span-7 order-2`}>
          <div className="sec-badge">Who We Are</div>
          <h2 className="sec-title">
            We're not a creative agency. We're a <span>content partner</span>.
          </h2>
          <div className="about-cnt">
            <p className="about-desc">
              Home-service businesses often do excellent work but present themselves poorly online.
              A weaker competitor can look more professional simply by marketing better. CrewFrame
              closes that gap. Good work deserves to look trustworthy online.
            </p>
            <p className="about-desc">
              We sit between production, trust building, and customer acquisition. Not a video
              editor. Not a social manager. A partner who understands how service businesses
              actually build momentum: one job, one proof point, one referral at a time.
            </p>
            <div className="pullquote">
              <p>Your work already proves what you can do. We help more customers see it.</p>
              <small>Brand Promise</small>
            </div>
            <a href="#work" className="btn-p">
              See the work <IconArrowRight width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
