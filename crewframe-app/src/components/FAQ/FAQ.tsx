import { useState } from "react";
import { faqItems } from "../../data/content";
import { IconArrowRight, IconChevron, IconFile } from "../Icons";
import { useReveal } from "../../hooks/useReveal";
import "./FAQ.css";

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(faqItems[0]?.id ?? null);
  const hd = useReveal<HTMLDivElement>("right");
  const acc = useReveal<HTMLDivElement>("left");

  return (
    <section id="faq">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div ref={hd.ref} className={`${hd.className} lg:col-span-5`}>
          <div className="sec-badge">Questions</div>
          <h2 className="sec-title">
            Before you send us <span>your first clip</span>
          </h2>
          <a href="#contact" className="btn-p faq-cta">
            Ask us something else <IconArrowRight width={14} height={14} />
          </a>
        </div>

        <div ref={acc.ref} className={`${acc.className} lg:col-span-7`}>
          <div className="faq-acc">
            {faqItems.map((item) => {
              const isOpen = open === item.id;
              return (
                <div className="faq-item" key={item.id}>
                  <button
                    className={`faq-btn ${isOpen ? "" : "collapsed"}`}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                  >
                    <span className="faq-q">
                      <IconFile className="faq-ic" width={18} height={18} strokeWidth={2.2} />
                      {item.q}
                    </span>
                    <IconChevron className="faq-caret" width={16} height={16} />
                  </button>
                  <div className="faq-body" style={{ maxHeight: isOpen ? "480px" : "0" }}>
                    <div className="faq-body-inner">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
