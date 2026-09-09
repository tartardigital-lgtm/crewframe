import { comparisonRows } from "../../data/content";
import { IconCheck, IconX } from "../Icons";
import { useReveal } from "../../hooks/useReveal";
import "./Why.css";

export default function Why() {
  const hd = useReveal<HTMLDivElement>("right");
  const table = useReveal<HTMLDivElement>("up");

  return (
    <section id="why">
      <div className="container">
        <div ref={hd.ref} className={`${hd.className} why-hd`}>
          <div className="sec-badge">Why CrewFrame</div>
          <h2 className="sec-title">
            Built for trades, <span>not built for everyone</span>
          </h2>
          <p className="sec-desc" style={{ maxWidth: 640 }}>
            Most video editing agencies treat a roofing crew the same as a skincare brand. Here's
            what that difference looks like once the invoices start showing up.
          </p>
        </div>

        <div ref={table.ref} className={`${table.className} cmp-wrap frame`}>
          <span className="fr-c fr-tl" />
          <span className="fr-c fr-br" />
          <div className="cmp-scroll">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th className="cmp-blank" />
                  <th className="cmp-us">CrewFrame</th>
                  <th className="cmp-them">Typical video editing agency</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td className="cmp-us">
                      {row.icons ? (
                        <span className="cmp-yes">
                          <IconCheck width={14} height={14} strokeWidth={2.8} /> {row.us}
                        </span>
                      ) : (
                        row.us
                      )}
                    </td>
                    <td className="cmp-them">
                      {row.icons ? (
                        <span className="cmp-no">
                          <IconX width={14} height={14} /> {row.them}
                        </span>
                      ) : (
                        row.them
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
