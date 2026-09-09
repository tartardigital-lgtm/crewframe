import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container grid grid-cols-2 md:grid-cols-12 gap-10">
        <div className="col-span-2 md:col-span-5">
          <a className="cf-logo" href="#hero">
            <svg className="cf-mark" style={{ color: "#fff" }} viewBox="0 0 1000 980" fill="none" aria-hidden="true">
              <g fill="#f36a2d">
                <polygon points="195,0 688,0 688,135 242,135 134,243 134,743 0,743 0,189" />
                <polygon points="850,486 999,486 999,818 837,973 458,973 458,838 769,838 850,764 850,493" />
              </g>
              <g fill="currentColor">
                <polygon points="323,236 877,236 742,372 370,378 377,486 756,486 620,622 370,622 370,919 229,919 229,318 303,243" />
                <polygon points="789,0 999,0 999,210 918,210 918,81 789,81" />
                <polygon points="0,831 148,831 148,980 80,980 80,899 0,899" />
              </g>
            </svg>
            <span className="cf-word" style={{ color: "#fff" }}>
              CREW<span className="cf-word-accent">FRAME</span>
            </span>
          </a>
          <p className="ft-desc">
            Built from real work, framed for trust. CrewFrame turns job-site footage into content
            that grows home-service businesses.
          </p>
        </div>

        <div className="ft-col col-span-1 md:col-span-3">
          <h6 className="ft-heading">Company</h6>
          <ul className="ft-links">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#loop">Process</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#why">Compare</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
          </ul>
        </div>

        <div className="ft-col col-span-1 md:col-span-4">
          <h6 className="ft-heading">Contact</h6>
          <ul className="ft-links">
            <li>
              <a href="mailto:hello@crewframeagency.com">hello@crewframeagency.com</a>
            </li>
            <li>
              <a href="tel:+12145550148">(214) 555-0148</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-div" />

      <div className="container">
        <div className="ft-bottom">
          <div className="ft-copy">
            &copy; {new Date().getFullYear()} <span>CrewFrame</span>. All rights reserved.
          </div>
          <div className="ft-blinks">
            <span>Built from real work, framed for trust.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
