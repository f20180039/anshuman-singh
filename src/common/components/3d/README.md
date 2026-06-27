# 3D Components Library

Reusable React Three Fiber components for creating interactive 3D scenes in your portfolio.

## Overview

This library provides a collection of optimized, reusable 3D components built with React Three Fiber and Three.js. All components are memoized for performance and follow project conventions.

## Quick Start

```typescript
import Canvas3DWrapper from '@/common/components/3d/Canvas3DWrapper';
import Scene3D from '@/common/components/3d/Scene3D';
import { TechSphere, RotatingShape } from '@/common/components/3d/shapes';
import { Particles, GridFloor } from '@/common/components/3d/effects';

function My3DPage() {
  return (
    <div style={{ height: '600px' }}>
      <Canvas3DWrapper>
        <Scene3D>
          <TechSphere />
          <RotatingShape position={[2, 0, 0]} geometry="box" color="#ff00ff" />
          <Particles count={300} />
          <GridFloor />
        </Scene3D>
      </Canvas3DWrapper>
    </div>
  );
}
```

## Components

### Canvas3DWrapper

High-level wrapper that combines Canvas, ErrorBoundary, and Suspense.

**Props:**
- `children` (ReactNode, required) - 3D scene content
- `camera` (object, optional) - Camera configuration
  - `position`: [x, y, z] coordinates (default: [0, 2, 8])
  - `fov`: Field of view (default: 60)
- `className` (string, optional) - CSS classes (default: "ans-w-full ans-h-full")
- `fallback` (ReactNode, optional) - Custom loading component

**Example:**
```typescript
<Canvas3DWrapper 
  camera={{ position: [5, 5, 5], fov: 75 }}
  className="ans-w-full ans-h-[800px]"
>
  {/* Your 3D content */}
</Canvas3DWrapper>
```

### Scene3D

Orchestrates lighting, environment, and camera controls.

**Props:**
- `children` (ReactNode, optional) - 3D objects to render
- `autoRotate` (boolean, default: true) - Enable auto-rotation
- `autoRotateSpeed` (number, default: 0.5) - Rotation speed
- `enableZoom` (boolean, default: true) - Enable zoom controls
- `enablePan` (boolean, default: true) - Enable pan controls
- `minDistance` (number, default: 3) - Minimum zoom distance
- `maxDistance` (number, default: 20) - Maximum zoom distance
- `environment` (string, default: "night") - Environment preset

**Example:**
```typescript
<Scene3D 
  autoRotate={false}
  enablePan={false}
  environment="sunset"
>
  {/* Your 3D objects */}
</Scene3D>
```

### TechSphere (Shape)

Central distorted sphere with metallic finish.

**Props:**
- `position` ([x, y, z], default: [0, 0, 0])
- `color` (string, default: "#00ffff")
- `distort` (number, default: 0.4) - Distortion amount
- `speed` (number, default: 2) - Animation speed

**Example:**
```typescript
<TechSphere 
  position={[0, 2, 0]}
  color="#ff00ff"
  distort={0.6}
/>
```

### RotatingShape (Shape)

Generic rotating geometric shape with floating animation.

**Props:**
- `position` ([x, y, z], required) - Position in 3D space
- `geometry` (string, required) - Shape type: "box", "sphere", "torus", "cone", "cylinder"
- `color` (string, required) - Hex color code
- `speed` (number, default: 1) - Rotation speed
- `scale` (number, default: 1) - Size multiplier

**Example:**
```typescript
<RotatingShape
  position={[3, 1, 0]}
  geometry="torus"
  color="#00ff00"
  speed={1.5}
  scale={1.2}
/>
```

### Particles (Effect)

Particle system for ambient atmosphere.

**Props:**
- `count` (number, default: 500) - Number of particles
- `color` (string, default: "#00ffff") - Particle color
- `size` (number, default: 0.02) - Particle size
- `opacity` (number, default: 0.6) - Transparency (0-1)
- `speed` (number, default: 0.05) - Rotation speed
- `radius` (number, default: 20) - Distribution radius

**Example:**
```typescript
<Particles 
  count={1000}
  color="#ffffff"
  size={0.03}
  opacity={0.8}
/>
```

### GridFloor (Effect)

Wireframe grid floor with cyberpunk aesthetic.

**Props:**
- `size` (number, default: 20) - Grid size
- `divisions` (number, default: 40) - Grid divisions
- `color` (string, default: "#00ffff") - Grid color
- `opacity` (number, default: 0.2) - Transparency (0-1)
- `height` (number, default: -3) - Y position

**Example:**
```typescript
<GridFloor 
  size={30}
  divisions={60}
  color="#ff00ff"
  opacity={0.3}
/>
```

### Loading3D

Loading fallback component for Suspense.

**Props:**
- `message` (string, default: "Loading 3D Scene...")
- `subMessage` (string, default: "Initializing WebGL Renderer")

**Example:**
```typescript
<Suspense fallback={<Loading3D message="Loading..." />}>
  <Scene3D />
</Suspense>
```

### ErrorBoundary3D

Error boundary for catching WebGL failures.

**Props:**
- `children` (ReactNode, required)
- `fallback` (ReactNode, optional) - Custom error UI

**Example:**
```typescript
<ErrorBoundary3D fallback={<div>Custom Error Message</div>}>
  <Canvas>
    {/* 3D content */}
  </Canvas>
</ErrorBoundary3D>
```

## Performance Tips

1. **Memoization**: All components are already memoized with React.memo
2. **Particle Count**: Keep particles under 1000 for best performance
3. **Canvas Settings**: dpr is capped at [1, 2] for performance
4. **Geometry Complexity**: Use lower polygon counts for mobile
5. **Material Optimization**: Metalness and roughness are balanced for performance

## Common Patterns

### Minimal Scene
```typescript
<Canvas3DWrapper>
  <Scene3D>
    <TechSphere />
    <GridFloor />
  </Scene3D>
</Canvas3DWrapper>
```

### Full Featured Scene
```typescript
<Canvas3DWrapper camera={{ position: [0, 3, 10], fov: 60 }}>
  <Scene3D autoRotate autoRotateSpeed={0.3}>
    {/* Center piece */}
    <TechSphere color="#00ffff" distort={0.5} />
    
    {/* Floating shapes */}
    <RotatingShape position={[-4, 2, 0]} geometry="box" color="#ff00ff" />
    <RotatingShape position={[4, 2, 0]} geometry="sphere" color="#00ff00" />
    <RotatingShape position={[0, -2, 3]} geometry="torus" color="#ffff00" />
    
    {/* Effects */}
    <Particles count={500} color="#00ffff" />
    <GridFloor size={25} divisions={50} />
  </Scene3D>
</Canvas3DWrapper>
```

### Custom Lighting Scene
```typescript
<Canvas3DWrapper>
  <Scene3D environment="sunset" autoRotate={false}>
    {/* Custom content */}
  </Scene3D>
</Canvas3DWrapper>
```

## TypeScript Support

All components are fully typed. Import types from:

```typescript
import type {
  Canvas3DWrapperProps,
  Scene3DProps,
  RotatingShapeProps,
  TechSphereProps,
  ParticlesProps,
  GridFloorProps,
  Loading3DProps,
} from '@/common/components/3d/types';
```

## Browser Compatibility

- Chrome 90+ (Recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

Requires WebGL 2.0 support. ErrorBoundary3D will catch and display errors for unsupported browsers.

## File Structure

```
src/common/components/3d/
├── Canvas3DWrapper.tsx       # Main Canvas wrapper
├── Scene3D.tsx               # Scene orchestrator
├── ErrorBoundary3D.tsx       # Error handling
├── Loading3D.tsx             # Loading state
├── shapes/
│   ├── RotatingShape.tsx
│   ├── TechSphere.tsx
│   └── index.ts
├── effects/
│   ├── Particles.tsx
│   ├── GridFloor.tsx
│   └── index.ts
├── types.ts                  # TypeScript definitions
├── index.ts                  # Main exports
└── README.md                 # This file
```

## Troubleshooting

### Canvas doesn't render
- Ensure parent div has explicit height
- Check browser console for WebGL errors
- Verify ErrorBoundary3D isn't showing error state

### Poor performance
- Reduce particle count
- Lower geometry divisions on GridFloor
- Disable auto-rotation if not needed
- Check browser hardware acceleration is enabled

### TypeScript errors
- Run `npx tsc --noEmit` to check for type errors
- Ensure all required props are provided
- Check import paths use @ alias correctly

## Contributing

When adding new components:
1. Follow memoization pattern with React.memo
2. Add TypeScript types to types.ts
3. Export from appropriate index.ts
4. Add displayName for debugging
5. Document props and usage here

## Example: Creating a New Shape

```typescript
// shapes/CustomShape.tsx
import { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CustomShapeProps {
  position: [number, number, number];
  color: string;
}

const CustomShape = ({ position, color }: CustomShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

CustomShape.displayName = 'CustomShape';

export default memo(CustomShape);
```

## License

Part of the portfolio project. Reuse freely.
