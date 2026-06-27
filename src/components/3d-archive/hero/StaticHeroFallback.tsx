import { memo } from "react";

/**
 * Static CSS-only fallback for reduced motion preference
 * Maintains visual presence without 3D animations
 */
const StaticHeroFallback = memo(() => {
  return (
    <div className="ans-absolute ans-inset-0 ans-pointer-events-none ans-flex ans-items-center ans-justify-center">
      <div className="ans-relative">
        {/* Static gradient orb */}
        <div
          className="ans-w-64 ans-h-64 ans-rounded-full ans-opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(46, 144, 250, 0.4), rgba(97, 114, 243, 0.2), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Static accent ring */}
        <div
          className="ans-absolute ans-inset-0 ans-rounded-full ans-border-2 ans-border-th-accent/20"
          style={{
            width: "280px",
            height: "280px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
});

StaticHeroFallback.displayName = "StaticHeroFallback";

export default StaticHeroFallback;
