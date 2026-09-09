import { useState } from "react";
import { pricingPlans } from "../../data/content";
import { IconCheck, IconDot } from "../Icons";
import { useReveal } from "../../hooks/useReveal";
import "./Pricing.css";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const hd = useReveal<HTMLDivElement>("up");

  return (
    <section id="pricing">
      <div className="container">
        <div ref={hd.ref} className={`${hd.className} pr-hd`}>
          <div className="sec-badge pr-badge">Pricing</div>
          <h2 className="sec-title">
            Simple plans, built <span>for one or many crews</span>
          </h2>
          <p className="sec-desc pr-hd-desc">
            Every plan includes a 14-day content audit before you commit to anything.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`pr-lbl ${!yearly ? "on" : ""}`}>Monthly</span>
          <button
            className={`pr-sw ${yearly ? "on" : ""}`}
            aria-label="Toggle billing period"
            onClick={() => setYearly((y) => !y)}
          >
            <span className="pr-knob" />
          </button>
          <span className={`pr-lbl ${yearly ? "on" : ""}`}>
            Yearly <span className="save-b">Save 20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center">
          {pricingPlans.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <div className={`pr-card ${plan.featured ? "feat" : ""}`} key={plan.id}>
                {plan.popularLabel && <div className="pr-popular">{plan.popularLabel}</div>}
                <div className="pr-name">{plan.name}</div>
                <div className="pr-price-wrap">
                  {price === null ? (
                    <span className="pr-amt pr-amt-custom">Custom</span>
                  ) : (
                    <>
                      <span className="pr-cur">$</span>
                      <span className="pr-amt">{price.toLocaleString()}</span>
                      <span className="pr-per">{yearly ? "/mo" : "/month"}</span>
                    </>
                  )}
                </div>
                {price !== null && (
                  <div className="pr-billed">{yearly ? "billed yearly" : "billed monthly"}</div>
                )}
                <p className="pr-desc">{plan.desc}</p>
                <div className="pr-hr" />
                <ul className="pr-feats">
                  {plan.features.map((f) => (
                    <li key={f.label} className={f.included ? "" : "no"}>
                      {f.included ? <IconCheck width={13} height={13} strokeWidth={2.8} /> : <IconDot width={13} height={13} />}
                      {f.label}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn-pr">
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p className="pr-foot-note">No setup fees. Cancel or switch plans any time.</p>
      </div>
    </section>
  );
}
