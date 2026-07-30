import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ConstellationFieldProps {
  count?: number;
  color?: string;
  /** Max distance between two points for a connecting line to be drawn. */
  linkDistance?: number;
  /** Drift speed of the whole field. */
  speed?: number;
  /** How strongly the field reacts to the pointer. */
  parallax?: number;
  spread?: number;
}

/**
 * A drifting constellation of points with lines connecting nearby neighbours —
 * a three.js take on the "network" background. Mouse-reactive parallax, and the
 * link geometry is recomputed each frame from live point positions.
 */
const ConstellationField = ({
  count = 90,
  color = "#67e8f9",
  linkDistance = 2.2,
  speed = 0.03,
  parallax = 0.4,
  spread = 14,
}: ConstellationFieldProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const threeColor = useMemo(() => new THREE.Color(color), [color]);

  // Initial positions + per-point velocity for gentle organic drift.
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.4;
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions, velocities };
  }, [count, spread]);

  // Pre-allocate a generous buffer for line vertices (pairs of endpoints).
  const linePositions = useMemo(
    () => new Float32Array(count * count * 3),
    [count]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Smoothly follow the normalised pointer for a subtle parallax tilt.
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;

    if (groupRef.current) {
      groupRef.current.rotation.y = pointer.current.x * parallax;
      groupRef.current.rotation.x = -pointer.current.y * parallax;
      groupRef.current.position.z = Math.sin(t * speed) * 0.5;
    }

    const pointsGeo = pointsRef.current?.geometry;
    if (!pointsGeo) return;
    const pos = pointsGeo.attributes.position.array as Float32Array;

    // Drift points and softly bounce them inside the spread bounds.
    for (let i = 0; i < count; i++) {
      for (let axis = 0; axis < 3; axis++) {
        const idx = i * 3 + axis;
        pos[idx] += velocities[idx] + Math.sin(t * speed + i) * 0.0005;
        const bound = axis === 2 ? spread * 0.2 : spread * 0.5;
        if (pos[idx] > bound || pos[idx] < -bound) velocities[idx] *= -1;
      }
    }
    pointsGeo.attributes.position.needsUpdate = true;

    // Recompute connecting lines between neighbours within linkDistance.
    const linesGeo = linesRef.current?.geometry;
    if (!linesGeo) return;
    const linkSq = linkDistance * linkDistance;
    let v = 0;
    for (let i = 0; i < count; i++) {
      const ix = pos[i * 3];
      const iy = pos[i * 3 + 1];
      const iz = pos[i * 3 + 2];
      for (let j = i + 1; j < count; j++) {
        const dx = ix - pos[j * 3];
        const dy = iy - pos[j * 3 + 1];
        const dz = iz - pos[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < linkSq) {
          linePositions[v++] = ix;
          linePositions[v++] = iy;
          linePositions[v++] = iz;
          linePositions[v++] = pos[j * 3];
          linePositions[v++] = pos[j * 3 + 1];
          linePositions[v++] = pos[j * 3 + 2];
        }
      }
    }
    const lineAttr = linesGeo.attributes.position as THREE.BufferAttribute;
    lineAttr.array.set(linePositions.subarray(0, v));
    lineAttr.needsUpdate = true;
    linesGeo.setDrawRange(0, v / 3);
  });

  // Scale the field to comfortably cover the viewport.
  const scale = Math.max(1, viewport.width / spread) * 1.1;

  return (
    <group ref={groupRef} scale={scale}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color={threeColor}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={threeColor}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

export default ConstellationField;
