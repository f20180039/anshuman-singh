import { memo, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  color?: string;
  size?: number;
  speed?: number;
}

const ParticleField = memo(
  ({
    count = 150,
    radius = 15,
    color = "#2E90FA",
    size = 0.015,
    speed = 0.0002,
  }: ParticleFieldProps) => {
    const particlesRef = useRef<THREE.Points>(null);

    // Generate particle positions once
    const positions = useMemo(() => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Random spherical distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * (0.5 + Math.random() * 0.5);

        pos[i3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = r * Math.cos(phi);
      }
      return pos;
    }, [count, radius]);

    // Gentle rotation
    useFrame((state) => {
      if (particlesRef.current) {
        particlesRef.current.rotation.y = state.clock.elapsedTime * speed;
        particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1;
      }
    });

    return (
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          color={color}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    );
  }
);

ParticleField.displayName = "ParticleField";

export default ParticleField;
