import { useCounter } from "../../hooks/useCounter";

interface Props {
  count: number;
  suffix: string;
  label: string;
}

export default function HeroStat({ count, suffix, label }: Props) {
  const { ref, value } = useCounter(count);
  return (
    <div className="hstat">
      <div className="hstat-num">
        <span ref={ref}>{value.toLocaleString()}</span>
        <span>{suffix}</span>
      </div>
      <div className="hstat-lbl">{label}</div>
    </div>
  );
}
