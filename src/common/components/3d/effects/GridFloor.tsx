import { memo } from "react";
import type { GridFloorProps } from "../types";

const GridFloor = ({
  size = 20,
  divisions = 40,
  color = "#00ffff",
  opacity = 0.2,
  height = -3,
}: GridFloorProps) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, height, 0]}>
      <planeGeometry args={[size, size, divisions, divisions]} />
      <meshBasicMaterial color={color} wireframe opacity={opacity} transparent />
    </mesh>
  );
};

GridFloor.displayName = "GridFloor";

export default memo(GridFloor);
