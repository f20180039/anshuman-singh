import { FaImage } from "react-icons/fa";

/**
 * Stands in for a project screenshot that does not exist yet. Labelled as an
 * image (not an `<img>`), so tests and assistive tech can tell "no image yet"
 * from a broken one. Shared by the Projects grid card and the Home featured
 * card; the caller sets the slot's height.
 */
export default function ImagePlaceholder({
  className = "ans-h-48",
}: {
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label="No screenshot available"
      className={`ans-flex ans-w-full ans-items-center ans-justify-center ans-rounded ans-bg-th-muted ${className}`}
    >
      <FaImage
        aria-hidden="true"
        className="ans-text-10 ans-text-th-muted-fg"
      />
    </div>
  );
}
