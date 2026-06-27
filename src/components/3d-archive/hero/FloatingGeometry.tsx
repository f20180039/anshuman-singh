import { memo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseParallax } from "../shared/hooks";

interface FloatingGeometryProps {
  mouseParallaxEnabled?: boolean;
  autoRotateSpeed?: number;
}

const FloatingGeometry = memo(
  ({
    mouseParallaxEnabled = true,
    autoRotateSpeed = 0.2,
  }: FloatingGeometryProps) => {
    const outerRef = useRef<THREE.Group>(null);
    const innerCoreRef = useRef<THREE.Mesh>(null);
    const wireframeRef = useRef<THREE.Mesh>(null);

    const mouseRotation = useMouseParallax(0.15, mouseParallaxEnabled);
    const [morphProgress, setMorphProgress] = useState(0);

    // Animation loop
    useFrame((state) => {
      if (!outerRef.current || !innerCoreRef.current || !wireframeRef.current)
        return;

      const t = state.clock.elapsedTime;

      // Auto-rotation
      outerRef.current.rotation.y += autoRotateSpeed * 0.01;
      outerRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;

      // Inner core counter-rotation (more dynamic)
      innerCoreRef.current.rotation.x = t * 0.3;
      innerCoreRef.current.rotation.y = t * 0.5;

      // Wireframe subtle pulse
      const scale = 1 + Math.sin(t * 0.5) * 0.05;
      wireframeRef.current.scale.set(scale, scale, scale);

      // Smooth morphing between states
      const newProgress = (Math.sin(t * 0.2) + 1) * 0.5;
      setMorphProgress(newProgress);

      // Apply mouse parallax to outer group
      if (mouseParallaxEnabled) {
        outerRef.current.rotation.x += (mouseRotation.x - outerRef.current.rotation.x) * 0.05;
        outerRef.current.rotation.y += (mouseRotation.y - outerRef.current.rotation.y) * 0.05;
      }
    });

    return (
      <group ref={outerRef}>
        {/* Outer wireframe icosahedron */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial
            color="#2E90FA"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Middle glassmorphic layer */}
        <mesh>
          <icosahedronGeometry args={[1.8, 2]} />
          <meshStandardMaterial
            color="#84CAFF"
            transparent
            opacity={0.15}
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </mesh>

        {/* Inner rotating core */}
        <mesh ref={innerCoreRef} scale={0.8 + morphProgress * 0.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#2E90FA"
            emissive="#2E90FA"
            emissiveIntensity={0.5 + morphProgress * 0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Accent rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#6172F3" transparent opacity={0.6} />
        </mesh>

        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.7, 0.015, 16, 100]} />
          <meshBasicMaterial color="#84CAFF" transparent opacity={0.4} />
        </mesh>

        {/* Ambient point light from center */}
        <pointLight
          position={[0, 0, 0]}
          intensity={1.5}
          color="#2E90FA"
          distance={10}
        />
      </group>
    );
  }
);

FloatingGeometry.displayName = "FloatingGeometry";

export default FloatingGeometry;
