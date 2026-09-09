import { useEffect, useState } from "react";
import { crew } from "../../data/content";
import type { CrewMember } from "../../types/content";
import { IconUser, IconLinkedin, IconInstagram, IconYoutube } from "../Icons";
import { useReveal } from "../../hooks/useReveal";
import Modal from "../Modal/Modal";
import "./Crew.css";

const socialIcon = { linkedin: IconLinkedin, instagram: IconInstagram, youtube: IconYoutube };

function CrewCard({ member, delay, onOpen }: { member: CrewMember; delay: number; onOpen: () => void }) {
  const { ref, className } = useReveal<HTMLDivElement>("up");
  return (
    <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>
      <div className="crew-card" onClick={onOpen}>
        <div className="crew-img-wrap">
          <span className="crew-tag">
            <span className="proof proof--glass">{member.tag}</span>
          </span>
          <img className="crew-img" src={member.img} alt={member.name} />
          <span className="crew-ov">
            <span className="crew-view">
              <IconUser />
            </span>
          </span>
        </div>
        <div className="crew-info">
          <h5 className="crew-name">{member.name}</h5>
          <div className="crew-role">{member.role}</div>
          <div className="crew-soc">
            {member.social.map((s) => {
              const Icon = socialIcon[s];
              return (
                <a href="#" key={s} onClick={(e) => e.stopPropagation()} aria-label={s}>
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Crew() {
  const [active, setActive] = useState<CrewMember | null>(null);
  const [barsOn, setBarsOn] = useState(false);
  const hd = useReveal<HTMLDivElement>("right");
  const hd2 = useReveal<HTMLDivElement>("left");

  useEffect(() => {
    if (active) {
      setBarsOn(false);
      const t = setTimeout(() => setBarsOn(true), 160);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <section id="crew">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div ref={hd.ref} className={hd.className}>
            <div className="sec-badge">Our Crew</div>
            <h2 className="sec-title">
              The people behind <span>every post</span>
            </h2>
          </div>
          <div ref={hd2.ref} className={`${hd2.className} flex lg:justify-end`}>
            <p className="sec-desc crew-hd-desc">
              Small team, field-first. We shoot the job ourselves or edit the raw footage you send
              us, then build a content plan around your busy season.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {crew.map((m, i) => (
            <CrewCard key={m.id} member={m} delay={i * 80} onOpen={() => setActive(m)} />
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.role ?? ""} size="md">
        {active && (
          <>
            <div className="crew-mod-hd">
              <img className="crew-mod-av" src={active.img} alt={active.name} />
              <div>
                <h4 className="crew-mod-name">{active.name}</h4>
                <div className="crew-mod-role">{active.role}</div>
                <div className="crew-mod-soc">
                  {active.social.map((s) => {
                    const Icon = socialIcon[s];
                    return (
                      <a href="#" key={s} aria-label={s}>
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="mod-txt">{active.bio}</p>
            <div className="mod-h6">{active.focusLabel}</div>
            {active.skills.map((s) => (
              <div className="sk-row" key={s.label}>
                <div className="sk-hd">
                  <span>{s.label}</span>
                  <span className="sk-pc">{s.pct}%</span>
                </div>
                <div className="prog-track">
                  <div className="prog-fill" style={{ width: barsOn ? `${s.pct}%` : "0%" }} />
                </div>
              </div>
            ))}
          </>
        )}
      </Modal>
    </section>
  );
}
