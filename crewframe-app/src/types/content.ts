export interface LoopStep {
  num: string;
  title: string;
  desc: string;
  icon: "target" | "edit" | "rocket" | "phone";
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  icon: "target" | "video" | "share" | "growth";
  modal: {
    title: string;
    lead: string;
    included: { title: string; desc: string }[];
  };
}

export type WorkFormat = "reel" | "long";

export interface WorkItem {
  id?: string;
  _id?: string;
  order?: number;
  cat: string[]; // filter categories, e.g. ["reel"], ["reel", "proof"], ["long"]
  format: WorkFormat;
  img: string;
  videoUrl?: string;
  title: string;
  marker: string;
  dur: string;
  loc: string;
  views: string;
  job: string;
  desc: string;
  result: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  tag: string;
  img: string;
  social: ("linkedin" | "instagram" | "youtube")[];
  bio: string;
  focusLabel: string;
  skills: { label: string; pct: number }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  monthly: number | null; // null = "Custom"
  yearly: number | null;
  desc: string;
  featured?: boolean;
  popularLabel?: string;
  features: { label: string; included: boolean }[];
  cta: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company: string;
  avatar: string;
  stars: number; // supports .5
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface ComparisonRow {
  label: string;
  icons: boolean; // whether this row renders check/x icons or plain text
  us: string;
  them: string;
}
