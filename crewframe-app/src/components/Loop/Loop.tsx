import { loopSteps } from "../../data/content";
import { IconTarget2, IconEdit, IconRocket, IconPhone } from "../Icons";
import { useReveal } from "../../hooks/useReveal";
import "./Loop.css";

const icons = {
  target: IconTarget2,
  edit: IconEdit,
  rocket: IconRocket,
  phone: IconPhone,
};

function LoopCard({ step, delay }: { step: (typeof loopSteps)[number]; delay: number }) {
  const { ref, className } = useReveal<HTMLDivElement>("up");
  const Icon = icons[step.icon];
  return (
    <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>
      <div className="loop-card">
        <div className="loop-step">
          <span className="loop-num">{step.num}</span>
          <span className="loop-ico">
            <Icon width={20} height={20} />
          </span>
        </div>
        <h4 className="loop-title">{step.title}</h4>
        <p className="loop-desc">{step.desc}</p>
      </div>
    </div>
  );
}

export default function Loop() {
  const hd = useReveal<HTMLDivElement>("right");
  const hd2 = useReveal<HTMLDivElement>("left");

  return (
    <section id="loop">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div ref={hd.ref} className={hd.className}>
            <div className="sec-badge">How It Works</div>
            <h2 className="sec-title">
              From job site to your feed, in <span>four steps</span>
            </h2>
          </div>
          <div ref={hd2.ref} className={hd2.className}>
            <p className="sec-desc" style={{ maxWidth: "100%" }}>
              You keep running jobs. We handle everything between the footage on a crew member's
              phone and a finished post.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loopSteps.map((step, i) => (
            <LoopCard key={step.num} step={step} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
