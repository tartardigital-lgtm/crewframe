export interface Admin {
  _id: string;
  email: string;
  name: string;
}

export type LeadStatus = "new" | "contacted" | "won" | "archived";

export interface Lead {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  trade?: string;
  message?: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface WorkItem {
  _id: string;
  cat: string[];
  format: "reel" | "long";
  img: string;
  title: string;
  marker: string;
  dur: string;
  loc: string;
  views: string;
  job: string;
  desc: string;
  result: string;
  order: number;
}

export interface CrewSkill {
  label: string;
  pct: number;
}

export interface CrewMember {
  _id: string;
  name: string;
  role: string;
  tag: string;
  img: string;
  social: string[];
  bio: string;
  focusLabel: string;
  skills: CrewSkill[];
  order: number;
}

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  _id: string;
  name: string;
  monthly: number | null;
  yearly: number | null;
  desc: string;
  featured?: boolean;
  popularLabel?: string;
  features: PricingFeature[];
  cta: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  company: string;
  avatar: string;
  stars: number;
  order: number;
}

export interface FaqItem {
  _id: string;
  q: string;
  a: string;
  order: number;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  workItems: number;
  crewMembers: number;
  testimonials: number;
  recentLeads: Lead[];
}
