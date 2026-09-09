import { useState } from "react";
import { services } from "../../data/content";
import type { ServiceItem } from "../../types/content";
import { IconArrowRight, IconTarget, IconVideo, IconShare, IconGrowth, IconCheck } from "../Icons";
import { useReveal } from "../../hooks/useReveal";
import Modal from "../Modal/Modal";
import "./Services.css";

const icons = {
  target: IconTarget,
  video: IconVideo,
  share: IconShare,
  growth: IconGrowth,
};

function ServiceCard({ item, delay, onOpen }: { item: ServiceItem; delay: number; onOpen: () => void }) {
  const { ref, className } = useReveal<HTMLDivElement>("up");
  const Icon = icons[item.icon];
  return (
    <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>
      <div className="svc-card" onClick={onOpen} role="button" tabIndex={0}>
        <span className="svc-arr">
          <IconArrowRight width={14} height={14} />
        </span>
        <div className="svc-num">{item.num}</div>
        <div className="svc-ico">
          <Icon width={22} height={22} />
        </div>
        <h4 className="svc-title">{item.title}</h4>
        <p className="svc-desc">{item.desc}</p>
        <div className="svc-tags">
          {item.tags.map((t) => (
            <span className="svc-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);
  const hd = useReveal<HTMLDivElement>("right");
  const hd2 = useReveal<HTMLDivElement>("left");
  const active = services.find((s) => s.id === openId);

  return (
    <section id="services">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div ref={hd.ref} className={hd.className}>
            <div className="sec-badge">What We Do</div>
            <h2 className="sec-title">
              Content, built from <span>the work you already do</span>
            </h2>
          </div>
          <div ref={hd2.ref} className={hd2.className}>
            <p className="sec-desc" style={{ maxWidth: "100%" }}>
              No studio shoots, no scripts to memorize. We build a system around your actual jobs
              so content keeps showing up, whether you're thinking about it or not.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} item={s} delay={(i % 2) * 80} onOpen={() => setOpenId(s.id)} />
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setOpenId(null)} title={active?.modal.title ?? ""}>
        {active && (
          <>
            <div className="mod-svc-ico">
              {(() => {
                const Icon = icons[active.icon];
                return <Icon width={26} height={26} strokeWidth={1.8} />;
              })()}
            </div>
            <p className="mod-txt">{active.modal.lead}</p>
            <div className="mod-h6">What's included</div>
            <div className="sub-svc-grid">
              {active.modal.included.map((f) => (
                <div className="sub-svc" key={f.title}>
                  <div className="sub-svc-n">
                    <IconCheck width={12} height={12} />
                    {f.title}
                  </div>
                  <div className="sub-svc-d">{f.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
