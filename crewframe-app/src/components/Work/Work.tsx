import { useEffect, useMemo, useState } from "react";
import { workItems } from "../../data/content";
import type { WorkItem } from "../../types/content";
import { getWorkItems } from "../../lib/api";
import { IconLocation, IconEye, IconMobile, IconYoutube, IconPlay } from "../Icons";
import { useReveal } from "../../hooks/useReveal";
import Modal from "../Modal/Modal";
import "./Work.css";

const filters = [
  { id: "all", label: "All Work" },
  { id: "reel", label: "Reels & Shorts" },
  { id: "long", label: "Long-Form" },
  { id: "proof", label: "Customer Proof" },
];

function getYoutubeVideoId(videoUrl: string) {
  try {
    const url = new URL(videoUrl.trim());
    const hostname = url.hostname.replace(/^www\./, "");
    let videoId = url.searchParams.get("v");
    if (!videoId && hostname === "youtu.be") videoId = url.pathname.slice(1);
    if (!videoId && url.pathname.startsWith("/shorts/")) videoId = url.pathname.split("/")[2];
    if (!videoId && url.pathname.startsWith("/embed/")) videoId = url.pathname.split("/")[2];
    if (!videoId && url.pathname.startsWith("/live/")) videoId = url.pathname.split("/")[2];
    return videoId?.split(/[?&#]/)[0] ?? null;
  } catch {
    return null;
  }
}

function getYoutubeEmbedUrl(videoUrl: string) {
  const videoId = getYoutubeVideoId(videoUrl);
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0` : null;
}

function getYoutubeThumbnailUrl(videoUrl?: string) {
  const videoId = videoUrl ? getYoutubeVideoId(videoUrl) : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

function ReelCard({ item, onOpen }: { item: WorkItem; onOpen: () => void }) {
  const imageUrl = getYoutubeThumbnailUrl(item.videoUrl) ?? item.img;
  return (
    <article className="reel-card frame frame--hover" onClick={onOpen}>
      <span className="fr-c fr-tl" />
      <span className="fr-c fr-br" />
      <img src={imageUrl} alt={item.title} />
      <span className="reel-play">
        <IconPlay />
      </span>
      <span className="reel-scrim" />
      <div className="reel-top">
        <span className={`proof ${item.marker === "Customer Proof" ? "proof--blue" : item.marker === "Crew Cam" ? "proof--fill" : "proof--ink"}`}>
          {item.marker}
        </span>
        <span className="reel-dur">{item.dur}</span>
      </div>
      <div className="reel-body">
        <h4 className="reel-title">{item.title}</h4>
        <div className="reel-meta">
          <IconLocation />
          {item.loc} <span className="sep">·</span> {item.views.replace(" views", "")}
        </div>
      </div>
    </article>
  );
}

function LongCard({ item, onOpen }: { item: WorkItem; onOpen: () => void }) {
  const imageUrl = getYoutubeThumbnailUrl(item.videoUrl) ?? item.img;
  return (
    <article className="long-card" onClick={onOpen}>
      <div className="long-media frame frame--hover">
        <span className="fr-c fr-tl" />
        <span className="fr-c fr-br" />
        <img src={imageUrl} alt={item.title} />
        <span className="long-play">
          <IconPlay />
        </span>
        <span className="long-scrim" />
        <span className="long-top">
          <span className="proof proof--glass">{item.marker}</span>
        </span>
        <span className="long-dur">{item.dur}</span>
      </div>
      <div className="long-body">
        <span className="proof proof--out">Full Build</span>
        <h3 className="long-title">{item.title}</h3>
        <p className="long-desc">{item.desc.slice(0, 120)}…</p>
        <div className="long-foot">
          <span>
            <IconLocation />
            {item.loc}
          </span>
          <span className="sep">·</span>
          <span>
            <IconEye />
            {item.views}
          </span>
          <span className="sep">·</span>
          <span>Completed</span>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<WorkItem | null>(null);
  const [items, setItems] = useState<WorkItem[]>(workItems);
  const hd = useReveal<HTMLDivElement>("right");
  const tabsReveal = useReveal<HTMLDivElement>("left");
  const shortReveal = useReveal<HTMLDivElement>("up");
  const longReveal = useReveal<HTMLDivElement>("up");

  useEffect(() => {
    let cancelled = false;
    getWorkItems<WorkItem[]>()
      .then((remoteItems) => {
        if (!cancelled && remoteItems.length > 0) setItems(remoteItems);
      })
      .catch(() => {
        // Keep the bundled portfolio visible when the API is unavailable.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(
    () => items.filter((w) => filter === "all" || w.cat.includes(filter)),
    [filter, items]
  );
  const reels = visible.filter((w) => w.format === "reel");
  const longs = visible.filter((w) => w.format === "long");

  return (
    <section id="work">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div ref={hd.ref} className={hd.className}>
            <div className="sec-badge">The Work</div>
            <h2 className="sec-title">
              Real crews, real jobs, <span>real growth</span>
            </h2>
            <p className="sec-desc">
              No studio shoots, no scripts to memorize. We build a system around your actual jobs
              so content keeps showing up, whether you're thinking about it or not.
            </p>
          </div>
          <div ref={tabsReveal.ref} className={tabsReveal.className}>
            <div className="filter-tabs flex flex-wrap gap-2 lg:justify-end">
              {filters.map((f) => (
                <button
                  key={f.id}
                  className={`ftab ${filter === f.id ? "active" : ""}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {reels.length > 0 && (
          <div ref={shortReveal.ref} className={`${shortReveal.className} wk-group`}>
            <div className="wk-group-hd">
              <h3>Short-Form</h3>
              <span className="wk-format">
                <IconMobile /> 9:16 Vertical
              </span>
              <span className="line" />
              <span className="cnt">Reels · Shorts · TikTok</span>
            </div>
            <div className="reel-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {reels.map((item) => (
                <ReelCard key={item._id ?? item.id} item={item} onOpen={() => setActive(item)} />
              ))}
            </div>
          </div>
        )}

        {longs.length > 0 && (
          <div ref={longReveal.ref} className={`${longReveal.className} wk-group`}>
            <div className="wk-group-hd">
              <h3>Long-Form</h3>
              <span className="wk-format">
                <IconYoutube /> 16:9 YouTube
              </span>
              <span className="line" />
              <span className="cnt">Walkthroughs · Case Films</span>
            </div>
            <div className="long-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              {longs.map((item) => (
                <LongCard key={item._id ?? item.id} item={item} onOpen={() => setActive(item)} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title ?? ""}>
        {active && (
          <>
            {active.videoUrl && getYoutubeEmbedUrl(active.videoUrl) ? (
              <div className="wm-video frame">
                <iframe
                  src={getYoutubeEmbedUrl(active.videoUrl) ?? undefined}
                  title={active.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className={`wm-media frame ${active.format === "reel" ? "is-reel" : "is-long"}`}>
                <span className="fr-c fr-tl" />
                <span className="fr-c fr-br" />
                <img src={getYoutubeThumbnailUrl(active.videoUrl) ?? active.img} alt={active.title} />
                <span className="wm-play">
                  <IconPlay />
                </span>
              </div>
            )}
            <div className="d-flex-gap">
              <span className="proof proof--fill">{active.marker}</span>
              <span className="proof proof--out">{active.format === "reel" ? "Vertical · 9:16" : "Long-form · 16:9"}</span>
            </div>
            <div className="wm-details">
              <div className="wm-detail">
                <div className="wm-d-lbl">Job</div>
                <div className="wm-d-val">{active.job}</div>
              </div>
              <div className="wm-detail">
                <div className="wm-d-lbl">Location</div>
                <div className="wm-d-val">{active.loc}</div>
              </div>
              <div className="wm-detail">
                <div className="wm-d-lbl">Runtime</div>
                <div className="wm-d-val">{active.dur}</div>
              </div>
              <div className="wm-detail">
                <div className="wm-d-lbl">Views</div>
                <div className="wm-d-val">{active.views}</div>
              </div>
            </div>
            <div className="mod-h6">About this cut</div>
            <p className="mod-txt">{active.desc}</p>
            <div className="wm-result">
              <p>
                <strong>Outcome:</strong> {active.result}
              </p>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
