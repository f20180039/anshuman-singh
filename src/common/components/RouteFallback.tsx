/**
 * Suspense fallback for lazily-loaded routes.
 *
 * A skeleton rather than a spinner or a "LOADING..." string: it reserves
 * roughly the space the real page will occupy, so the layout does not jump when
 * the chunk arrives, and a slow connection sees structure instead of a blank.
 */
const Bar = ({ className }: { className: string }) => (
  <div className={`ans-rounded ans-bg-th-muted ${className}`} />
);

export default function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="ans-mx-auto ans-w-full ans-max-w-4xl ans-animate-pulse ans-px-4 ans-py-12"
    >
      <span className="ans-sr-only">Loading page…</span>

      <Bar className="ans-h-8 ans-w-2/3 sm:ans-w-1/2" />
      <Bar className="ans-mt-3 ans-h-4 ans-w-1/3" />

      <div className="ans-mt-10 ans-flex ans-flex-col ans-gap-3">
        <Bar className="ans-h-4 ans-w-full" />
        <Bar className="ans-h-4 ans-w-11/12" />
        <Bar className="ans-h-4 ans-w-4/5" />
      </div>

      <div className="ans-mt-10 ans-grid ans-grid-cols-1 ans-gap-4 sm:ans-grid-cols-2 lg:ans-grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="ans-flex ans-flex-col ans-gap-3 ans-rounded-lg ans-bg-th-surface ans-p-5"
          >
            <Bar className="ans-h-28 ans-w-full" />
            <Bar className="ans-h-4 ans-w-3/4" />
            <Bar className="ans-h-3 ans-w-full" />
            <Bar className="ans-h-3 ans-w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
