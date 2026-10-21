import { FaLock } from "react-icons/fa";

/** Shown for closed-source projects in place of a GitHub link. */
export default function PrivateCodeBadge() {
  return (
    <span className="ans-inline-flex ans-items-center ans-gap-1 ans-rounded-full ans-bg-th-muted ans-px-3 ans-py-1 ans-text-xs ans-font-inter-1 ans-text-th-muted-fg">
      <FaLock aria-hidden="true" />
      Private code
    </span>
  );
}
