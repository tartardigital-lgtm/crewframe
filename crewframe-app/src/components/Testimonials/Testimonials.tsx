import { useEffect, useMemo, useState } from "react";
import { testimonials, testimonialBg } from "../../data/content";
import { IconStar, IconStarHalf } from "../Icons";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";
import "./Testimonials.css";

function Stars({ count }: { count: number }) {
  const full = Math.floor(count);
  const half = count % 1 !== 0;
  return (
    <div className="tst-stars">
      {Array.from({ length: full }).map((_, i) => (
        <IconStar key={i} />
      ))}
      {half && <IconStarHalf />}
    </div>
  );
}

export default function Testimonials() {
  const isLg = useMediaQuery("(min-width: 1200px)");
  const isMd = useMediaQuery("(min-width: 768px)");
  const perView = isLg ? 3 : isMd ? 2 : 1;
  const pages = Math.max(1, Math.ceil(testimonials.length / perView));
  const [page, setPage] = useState(0);
  const hd = useReveal<HTMLDivElement>("right");
  const hd2 = useReveal<HTMLDivElement>("left");
  const track = useReveal<HTMLDivElement>("up");

  useEffect(() => {
    if (page >= pages) setPage(0);
  }, [pages, page]);

  useEffect(() => {
    const t = setInterval(() => setPage((p) => (p + 1) % pages), 5200);
    return () => clearInterval(t);
  }, [pages]);

  const visible = useMemo(() => {
    const start = page * perView;
    const slice = testimonials.slice(start, start + perView);
    // wrap around so the last page always shows a full row
    while (slice.length < perView) slice.push(testimonials[slice.length % testimonials.length]);
    return slice;
  }, [page, perView]);

  return (
    <section id="proof">
      <div className="tst-bg" style={{ backgroundImage: `url(${testimonialBg})` }} />
      <div className="tst-ov" />
      <div className="container tst-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div ref={hd.ref} className={hd.className}>
            <div className="sec-badge">Customer Proof</div>
            <h2 className="sec-title tst-title">
              What owners say <span>after 90 days</span>
            </h2>
          </div>
          <div ref={hd2.ref} className={`${hd2.className} flex lg:justify-end`}>
            <p className="sec-desc tst-desc">
              The only review that matters in this business is whether the phone rings more than
              it did before.
            </p>
          </div>
        </div>

        <div ref={track.ref} className={track.className}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visible.map((t, i) => (
              <div className="tst-card frame" key={`${t.id}-${i}`}>
                <span className="fr-c fr-tl" />
                <Stars count={t.stars} />
                <p className="tst-txt">{t.quote}</p>
                <div className="tst-auth">
                  <img className="tst-av" src={t.avatar} alt={t.name} />
                  <div>
                    <div className="tst-name">{t.name}</div>
                    <div className="tst-co">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tst-pagination">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                className={`tst-dot ${i === page ? "active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
