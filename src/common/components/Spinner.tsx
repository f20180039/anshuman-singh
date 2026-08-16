/**
 * Inline loading indicator. Decorative by default — the surrounding control is
 * expected to carry the accessible state (aria-busy, or a visible label change),
 * so screen readers hear one announcement rather than two.
 */
export default function Spinner({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-hidden={label ? undefined : true}
      className={`ans-inline-block ans-animate-spin ans-rounded-full ans-border-2 ans-border-current ans-border-r-transparent ${className || "ans-h-4 ans-w-4"}`}
    >
      {label && <span className="ans-sr-only">{label}</span>}
    </span>
  );
}
