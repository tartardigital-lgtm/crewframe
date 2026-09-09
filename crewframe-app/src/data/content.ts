import type {
  LoopStep,
  ServiceItem,
  WorkItem,
  CrewMember,
  PricingPlan,
  Testimonial,
  FaqItem,
  ComparisonRow,
} from "../types/content";

import workRoofTearoff from "../assets/images/work-roof-tearoff.jpg";
import workDoorwayWrap from "../assets/images/work-doorway-wrap.jpg";
import workGarageReveal from "../assets/images/work-garage-reveal.jpg";
import workHvacSwap from "../assets/images/work-hvac-swap.jpg";
import workFourbedMove from "../assets/images/work-fourbed-move.jpg";
import workRoofReplacement from "../assets/images/work-roof-replacement.jpg";
import crewMarcus from "../assets/images/crew-marcus-hale.jpg";
import crewSara from "../assets/images/crew-sara-whitfield.jpg";
import crewDev from "../assets/images/crew-dev-okafor.jpg";
import crewNina from "../assets/images/crew-nina-brooks.jpg";
import testimonialBg from "../assets/images/testimonial-bg.jpg";
import avRay from "../assets/images/testimonial-ray-delgado.jpg";
import avTanya from "../assets/images/testimonial-tanya-brooks.jpg";
import avMike from "../assets/images/testimonial-mike-alvarez.jpg";
import avDana from "../assets/images/testimonial-dana-whitfield.jpg";

export { testimonialBg };

/** A generated dark-gradient placeholder used for the first reel card,
 *  matching the brand's "job-site frame" aesthetic (no stock photo shipped
 *  with the original template for this slot). */
export const safeCardPlaceholder =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 1138'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#1c2126'/><stop offset='1' stop-color='#0b0e11'/></linearGradient></defs><rect width='640' height='1138' fill='url(%23g)'/><circle cx='320' cy='569' r='64' fill='#f36a2d' opacity='0.92'/><polygon points='300,535 300,603 360,569' fill='#fff'/></svg>`
  );

export const aboutImagePlaceholder =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 720'><defs><linearGradient id='ad' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#2a1c14'/><stop offset='1' stop-color='#0b0e11'/></linearGradient></defs><rect width='640' height='720' fill='url(%23ad)'/><rect x='230' y='120' width='190' height='480' fill='none' stroke='#f36a2d' stroke-width='2' opacity='0.6'/><rect x='245' y='135' width='160' height='450' fill='none' stroke='#555' stroke-width='1.5' opacity='0.5'/><circle cx='340' cy='360' r='8' fill='#f36a2d'/></svg>`
  );

export const loopSteps: LoopStep[] = [
  {
    num: "01",
    title: "Send us the footage",
    desc: "Your crew films on their phones using our simple shot list, no equipment, no extra hands needed on site.",
    icon: "target",
  },
  {
    num: "02",
    title: "We edit & caption",
    desc: "Our editors cut raw clips into finished content, branded to your look and voice, not ours.",
    icon: "edit",
  },
  {
    num: "03",
    title: "We post & boost",
    desc: "Content goes out on a schedule built around your service area, with paid boosts where they'll drive the most calls.",
    icon: "rocket",
  },
  {
    num: "04",
    title: "You get the calls",
    desc: "We track what's working and report back monthly, so the plan keeps getting sharper instead of static.",
    icon: "phone",
  },
];

export const services: ServiceItem[] = [
  {
    id: "svc1",
    num: "01 / STRATEGY",
    title: "Content Growth Strategy",
    desc: "A shot list and posting plan built around your service area, busy season, and the jobs you already have booked, so filming never feels like guesswork.",
    tags: ["Shot List", "Posting Plan", "Service Area"],
    icon: "target",
    modal: {
      title: "Content growth strategy",
      lead: "Before anything gets posted, we map out what your feed should look like: your service area, your busy season, and the jobs already on your calendar. A clear plan means filming never feels like guesswork for your crew.",
      included: [
        { title: "Shot list by job type", desc: "A simple checklist your crew can follow on any job, no camera team required." },
        { title: "Seasonal posting plan", desc: "Content mapped to your busy season so the right jobs get shown at the right time." },
        { title: "Service area targeting", desc: "Built around the neighborhoods and job types you actually want more of." },
        { title: "Monthly plan review", desc: "We revisit the plan as your bookings and busy season shift." },
      ],
    },
  },
  {
    id: "svc2",
    num: "02 / PRODUCTION",
    title: "Video Editing & Production",
    desc: "Raw job-site footage cut into scroll-stopping reels, before-and-afters, and ads: captioned, branded, and sized for every platform your customers scroll.",
    tags: ["Editing", "Captions", "Branding"],
    icon: "video",
    modal: {
      title: "Video editing & production",
      lead: "Raw job-site footage becomes scroll-stopping reels, before-and-afters, and ads: captioned, branded, and sized correctly for every platform your customers actually scroll.",
      included: [
        { title: "9:16 native edits", desc: "Cut for Reels, Shorts and TikTok, never a cropped horizontal video." },
        { title: "Before & after cuts", desc: "The transformation framed so the quality of the work does the talking." },
        { title: "Captions & branding", desc: "Consistent captions, colors and end frames so the brand compounds across posts." },
        { title: "Ad-ready versions", desc: "Cuts formatted and timed for paid placement, not just organic posting." },
      ],
    },
  },
  {
    id: "svc3",
    num: "03 / DISTRIBUTION",
    title: "Social Distribution",
    desc: "Scheduled, posted, and boosted across the platforms your customers actually use, so finished clips turn into calls instead of sitting in a folder.",
    tags: ["Scheduling", "Posting", "Boosting"],
    icon: "share",
    modal: {
      title: "Social distribution",
      lead: "Great content that never gets posted does not help anyone. We schedule, post, and boost across the platforms your customers actually use, so finished clips turn into calls instead of sitting in a folder.",
      included: [
        { title: "Publishing calendar", desc: "A set schedule across the platforms your customers actually use." },
        { title: "Platform-native posting", desc: "Correct formats and captions per channel, not one file everywhere." },
        { title: "Paid boosting", desc: "Your best-performing clips pushed further to the audience that matters." },
        { title: "Sales-team library", desc: "Your best clips organized so estimators can send them mid-conversation." },
      ],
    },
  },
  {
    id: "svc4",
    num: "04 / GROWTH",
    title: "Social Media Growth",
    desc: "Steady posting and clear monthly reporting on views and engagement, focused on growing your reach over time. We don't promise clients a specific booking rate, just consistent visibility for the work you're already doing.",
    tags: ["Growth", "Reach", "Consistency"],
    icon: "growth",
    modal: {
      title: "Social media growth",
      lead: "Steady, consistent posting across your social channels with clear monthly reporting on views and engagement. We are focused on growing your reach and visibility over time. We don't promise clients a specific booking rate, just steady growth for the work you're already doing.",
      included: [
        { title: "Monthly reporting", desc: "Views, saves, and engagement, tracked month over month." },
        { title: "Platform breakdown", desc: "See which channel is actually growing your audience." },
        { title: "Content adjustments", desc: "The plan shifts month to month based on what is actually working." },
        { title: "Plain-language summary", desc: "No jargon, just what happened and what we are doing about it." },
      ],
    },
  },
];

export const workItems: WorkItem[] = [
  {
    id: "w1",
    cat: ["reel"],
    format: "reel",
    img: safeCardPlaceholder,
    title: "400-lb safe, third floor",
    marker: "Crew Cam",
    dur: "0:41",
    loc: "Dallas, TX",
    views: "182K views",
    job: "Job #1482",
    desc: "Four movers, one stair-run, and a safe that most companies refuse to touch. Shot handheld from the stairwell so the customer sees exactly what the work takes, and why the quote reads the way it does.",
    result: "Highest-saving clip of the quarter: 182K views and 41 quote requests that mentioned the video by name.",
  },
  {
    id: "w2",
    cat: ["reel"],
    format: "reel",
    img: workRoofTearoff,
    title: "Roof tear-off in 90 seconds",
    marker: "Real Job",
    dur: "1:12",
    loc: "Fort Worth, TX",
    views: "96K views",
    job: "Job #1067",
    desc: "A full tear-off compressed into ninety seconds, with the crew's own audio explaining what they're checking for under the old decking. The decking shots are the ones homeowners rewatch.",
    result: "Became the client's pinned post, used by their sales team on every roof inspection follow-up.",
  },
  {
    id: "w3",
    cat: ["reel"],
    format: "reel",
    img: workDoorwayWrap,
    title: "Why we wrap every doorway",
    marker: "Crew Cam",
    dur: "0:28",
    loc: "Plano, TX",
    views: "240K views",
    job: "Job #1511",
    desc: "Twenty-eight seconds on a detail most customers never think about until it goes wrong. Small habits, filmed close, do more for trust than any claim about being careful.",
    result: "Best-performing clip on the account: 240K views and the line the sales team now uses on every estimate.",
  },
  {
    id: "w4",
    cat: ["reel", "proof"],
    format: "reel",
    img: workGarageReveal,
    title: "She sees the garage for the first time",
    marker: "Customer Proof",
    dur: "0:35",
    loc: "Dallas, TX",
    views: "71K views",
    job: "Job #1396",
    desc: "No script, no second take. The camera was already running when the customer walked in. This is the kind of footage you cannot manufacture. You can only be there for it.",
    result: "Used as the closing slide of every proposal the client sends. Close rate on proposals up 22%.",
  },
  {
    id: "w5",
    cat: ["reel"],
    format: "reel",
    img: workHvacSwap,
    title: "HVAC swap, start to finish",
    marker: "Real Job",
    dur: "0:58",
    loc: "Arlington, TX",
    views: "118K views",
    job: "Job #1339",
    desc: "One condenser, one afternoon, one continuous story. Cut so a homeowner can follow every step without knowing a single technical term.",
    result: "Drove 60+ saved posts from local homeowners in the first week, the client's highest-intent audience.",
  },
  {
    id: "w6",
    cat: ["long"],
    format: "long",
    img: workFourbedMove,
    title: "How we moved a four-bedroom in one day",
    marker: "Job #1482",
    dur: "14:22",
    loc: "Dallas, TX",
    views: "24K views",
    job: "Job #1482",
    desc: "A full-day move cut into a fourteen-minute walkthrough: the pre-walk, the pack order, the truck load plan, and the reset at the other end. The video a customer watches when they are deciding between three quotes.",
    result: "Ranks first locally for 'full service movers Dallas' video results. Twelve booked moves traced directly to it.",
  },
  {
    id: "w7",
    cat: ["long"],
    format: "long",
    img: workRoofReplacement,
    title: "Full roof replacement, every step explained",
    marker: "Job #1067",
    dur: "22:07",
    loc: "Fort Worth, TX",
    views: "41K views",
    job: "Job #1067",
    desc: "Twenty-two minutes covering decking inspection, underlayment, flashing, and the cleanup most homeowners never see. Filmed across three days and cut so each phase stands alone as a clip.",
    result: "Cut into nine short-form pieces afterwards. One shoot, one long-form film, a quarter of social content.",
  },
];

export const crew: CrewMember[] = [
  {
    id: "crewM1",
    name: "Marcus Hale",
    role: "Field Director",
    tag: "Field",
    img: crewMarcus,
    social: ["linkedin", "instagram"],
    bio: "Nine years shooting documentary before he ever filmed a jobsite. Marcus runs every shoot day and has a rule the whole company works by: if the crew has to wait on us, we're doing it wrong.",
    focusLabel: "On site",
    skills: [
      { label: "Run-and-gun coverage", pct: 97 },
      { label: "Crew rapport", pct: 95 },
      { label: "Natural-sound capture", pct: 90 },
    ],
  },
  {
    id: "crewM2",
    name: "Sara Whitfield",
    role: "Content Lead",
    tag: "Strategy",
    img: crewSara,
    social: ["linkedin", "youtube"],
    bio: "Sara decides what a shoot is actually for before anyone picks up a camera. She came from home-services marketing in-house, which means she has sat on the other side of this conversation and knows which reports owners actually read.",
    focusLabel: "Focus",
    skills: [
      { label: "Content strategy", pct: 96 },
      { label: "Hook writing", pct: 93 },
      { label: "Performance analysis", pct: 89 },
    ],
  },
  {
    id: "crewM3",
    name: "Dev Okafor",
    role: "Lead Editor",
    tag: "Post",
    img: crewDev,
    social: ["youtube", "instagram"],
    bio: "Dev turns a shoot day into a month of content. His edits follow one rule from our guidelines: motion should feel mechanical, precise and purposeful, never bouncy, never playful. Ordinary service work does not need overediting.",
    focusLabel: "Post",
    skills: [
      { label: "Short-form pacing", pct: 98 },
      { label: "Long-form structure", pct: 92 },
      { label: "Motion & graphics", pct: 88 },
    ],
  },
  {
    id: "crewM4",
    name: "Nina Brooks",
    role: "Client Partner",
    tag: "Accounts",
    img: crewNina,
    social: ["linkedin", "instagram"],
    bio: "Nina keeps shoot days on the calendar and answers the phone when something moves. She spent six years dispatching for a moving company, so a schedule that changes at 6 a.m. does not rattle her.",
    focusLabel: "Day to day",
    skills: [
      { label: "Scheduling & logistics", pct: 97 },
      { label: "Client communication", pct: 94 },
      { label: "Reporting", pct: 90 },
    ],
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Reel",
    monthly: 799,
    yearly: 639,
    desc: "For single-crew businesses posting content for the first time.",
    features: [
      { label: "Content strategy & shot list", included: true },
      { label: "8 edited clips / month", included: true },
      { label: "2 platforms, scheduled posting", included: true },
      { label: "Monthly performance report", included: true },
      { label: "Paid social boosting", included: false },
      { label: "Dedicated content producer", included: false },
      { label: "Multi-location support", included: false },
    ],
    cta: "Get started",
  },
  {
    id: "growth",
    name: "Growth Crew",
    monthly: 1899,
    yearly: 1519,
    desc: "For crews ready to make content a steady lead source.",
    featured: true,
    popularLabel: "Most Booked",
    features: [
      { label: "Everything in Starter Reel", included: true },
      { label: "20 edited clips / month", included: true },
      { label: "4 platforms + paid boosting", included: true },
      { label: "Dedicated content producer", included: true },
      { label: "Weekly performance check-ins", included: true },
      { label: "Multi-location support", included: false },
    ],
    cta: "Get started",
  },
  {
    id: "multi",
    name: "Multi-Crew",
    monthly: null,
    yearly: null,
    desc: "For multi-location or franchise home service companies.",
    features: [
      { label: "Everything in Growth Crew", included: true },
      { label: "Unlimited crews & locations", included: true },
      { label: "Location-level reporting", included: true },
      { label: "Priority turnaround", included: true },
    ],
    cta: "Talk to us",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "We stopped explaining what makes us different and started showing it. Booked jobs were up before we changed anything else about the business.",
    name: "Ray Delgado",
    company: "Owner · Delgado Moving Co.",
    avatar: avRay,
    stars: 5,
  },
  {
    id: "t2",
    quote:
      "Customers show up to the estimate already trusting us. They have watched our crews work before we ever knock on the door.",
    name: "Tanya Brooks",
    company: "Cofounder · Summit Roofing",
    avatar: avTanya,
    stars: 5,
  },
  {
    id: "t3",
    quote:
      "The before-and-after system runs itself now. My leads film it on their phones and CrewFrame turns it into content every single week.",
    name: "Mike Alvarez",
    company: "Owner · Alvarez Heating & Air",
    avatar: avMike,
    stars: 5,
  },
  {
    id: "t4",
    quote:
      "We look like the biggest company in our market. We are eleven people and three trucks. That gap is the whole product.",
    name: "Dana Whitfield",
    company: "GM · Northline Junk Removal",
    avatar: avDana,
    stars: 4.5,
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "fq1",
    q: "Nobody on our crew wants to be on camera. Does that matter?",
    a: "Not at all. Most of our strongest work is hands, tools, and finished results, no interviews at all. If a crew member is comfortable explaining what they are doing, we will use it. If not, the work speaks without them.",
  },
  {
    id: "fq2",
    q: "How much footage do we actually need to send?",
    a: "Less than most crews expect. A few minutes of phone footage per job, arrival, the work in progress, and the finished result, is usually enough for us to cut several clips. We will send a simple shot list so your crew knows exactly what to grab.",
  },
  {
    id: "fq3",
    q: "Do you work with trades outside roofing, HVAC, and plumbing?",
    a: "Yes. Alongside roofing, HVAC and plumbing, we work with junk removal, moving, landscaping, electrical, painting, cleaning, restoration, remodeling, pest control, pool and garage-door companies.",
  },
  {
    id: "fq4",
    q: "How soon do we see results?",
    a: "First edited clips are typically back within 3 to 5 business days. Views, saves and comments move within a couple of weeks of posting. Booked calls traced back to content usually show up somewhere between 60 and 90 days, once there is enough published for a customer to find you twice.",
  },
  {
    id: "fq5",
    q: "What's the contract length?",
    a: "Month-to-month on every plan. No annual lock-in, no setup fees. If it's not working for you, you can cancel or switch plans at any time.",
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Built specifically for home service trades",
    icons: true,
    us: "Yes",
    them: "Generalist, works across industries",
  },
  {
    label: "Job-site shot lists provided",
    icons: true,
    us: "Yes",
    them: "Rarely included",
  },
  {
    label: "Filmed on a crew member's phone, no shoot day",
    icons: true,
    us: "Yes",
    them: "Often requires a camera crew",
  },
  {
    label: "Typical turnaround",
    icons: false,
    us: "3–5 business days",
    them: "2–3 weeks",
  },
  {
    label: "Formatted per platform (Reels, Shorts, TikTok)",
    icons: true,
    us: "Included",
    them: "Often billed as an add-on",
  },
  {
    label: "Contract terms",
    icons: false,
    us: "Month-to-month",
    them: "Often 6–12 month lock-in",
  },
  {
    label: "Content plan built around your busy season",
    icons: true,
    us: "Yes",
    them: "One generic calendar for every client",
  },
];

export const heroStats = [
  { count: 1240, suffix: "+", label: "Jobs Filmed" },
  { count: 380, suffix: "+", label: "Videos Delivered" },
  { count: 14, suffix: "", label: "Service Verticals" },
  { count: 48, suffix: "hr", label: "Avg. Turnaround" },
];

export const tradeOptions = [
  "Moving & Storage",
  "Roofing",
  "Junk Removal",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Painting",
  "Cleaning",
  "Restoration",
  "Remodeling",
  "Pest Control",
  "Pool Service",
  "Garage Doors",
  "Something else",
];
