import { memo, useRef } from "react";
import { Float, Sphere, Box, Torus, Cone } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RotatingShapeProps } from "../types";

const RotatingShape = ({
  position,
  geometry,
  color,
  speed = 1,
  scale = 1,
}: RotatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const renderGeometry = () => {
    const commonProps = { ref: meshRef };

    switch (geometry) {
      case "box":
        return <Box args={[1 * scale, 1 * scale, 1 * scale]} {...commonProps} />;
      case "sphere":
        return <Sphere args={[0.6 * scale, 32, 32]} {...commonProps} />;
      case "torus":
        return (
          <Torus
            args={[0.6 * scale, 0.2 * scale, 16, 32]}
            {...commonProps}
          />
        );
      case "cone":
        return (
          <Cone args={[0.6 * scale, 1.2 * scale, 32]} {...commonProps} />
        );
      case "cylinder":
        return (
          <mesh ref={meshRef}>
            <cylinderGeometry args={[0.6 * scale, 0.6 * scale, 1.2 * scale, 32]} />
          </mesh>
        );
      default:
        return <Box args={[1 * scale, 1 * scale, 1 * scale]} {...commonProps} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        {renderGeometry()}
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

RotatingShape.displayName = "RotatingShape";

export default memo(RotatingShape);
