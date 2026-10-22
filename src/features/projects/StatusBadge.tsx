import type { Project, StatusKind } from "../../data/projects";

/**
 * Colour per status kind, from the theme tokens so every theme keeps the
 * contrast it already guarantees for success / warning / accent text.
 */
const KIND_CLASSES: Record<StatusKind, string> = {
  live: "ans-bg-th-success/15 ans-text-th-success",
  "in-progress": "ans-bg-th-warning/15 ans-text-th-warning",
  build: "ans-bg-th-accent-subtle ans-text-th-accent",
};

export default function StatusBadge({
  status,
}: {
  status: NonNullable<Project["status"]>;
}) {
  return (
    <span
      className={`ans-inline-flex ans-items-center ans-rounded-full ans-px-3 ans-py-1 ans-text-xs ans-font-inter-1 ${KIND_CLASSES[status.kind]}`}
    >
      {status.label}
    </span>
  );
}
