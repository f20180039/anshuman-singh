import { Float, Center } from "@react-three/drei";
import Canvas3DWrapper from "../common/components/3d/Canvas3DWrapper";
import Scene3D from "../common/components/3d/Scene3D";
import { RotatingShape, TechSphere } from "../common/components/3d/shapes";
import { Particles, GridFloor } from "../common/components/3d/effects";

// Main Component
const Test3D = () => {
  return (
    <div className="ans-w-full ans-min-h-screen ans-bg-gradient-to-br ans-from-gray-900 ans-via-black ans-to-gray-900">
      {/* Header Section */}
      <div className="ans-relative ans-z-10 ans-p-8">
        <h1 className="ans-text-5xl ans-font-bold ans-text-center ans-bg-gradient-to-r ans-from-cyan-400 ans-via-purple-500 ans-to-pink-500 ans-bg-clip-text ans-text-transparent ans-mb-4">
          3D Interactive Tech Lab
        </h1>
        <p className="ans-text-center ans-text-gray-400 ans-text-lg ans-max-w-3xl ans-mx-auto">
          Explore modern 3D web technologies with React Three Fiber. Use your
          mouse to orbit, zoom, and interact with the scene.
        </p>

        {/* Feature Cards */}
        <div className="ans-grid ans-grid-cols-1 md:ans-grid-cols-3 ans-gap-6 ans-mt-8 ans-max-w-6xl ans-mx-auto">
          <div className="ans-bg-gray-800/50 ans-backdrop-blur-sm ans-p-6 ans-rounded-lg ans-border ans-border-cyan-500/30 ans-hover:border-cyan-500 ans-transition-all">
            <div className="ans-text-3xl ans-mb-3">🎨</div>
            <h3 className="ans-text-xl ans-font-bold ans-text-cyan-400 ans-mb-2">
              Modern Design
            </h3>
            <p className="ans-text-gray-400 ans-text-sm">
              Cutting-edge 3D graphics with metallic materials, distortion
              effects, and dynamic lighting
            </p>
          </div>

          <div className="ans-bg-gray-800/50 ans-backdrop-blur-sm ans-p-6 ans-rounded-lg ans-border ans-border-purple-500/30 ans-hover:border-purple-500 ans-transition-all">
            <div className="ans-text-3xl ans-mb-3">⚡</div>
            <h3 className="ans-text-xl ans-font-bold ans-text-purple-400 ans-mb-2">
              High Performance
            </h3>
            <p className="ans-text-gray-400 ans-text-sm">
              Optimized WebGL rendering with smooth 60fps animations and
              interactive controls
            </p>
          </div>

          <div className="ans-bg-gray-800/50 ans-backdrop-blur-sm ans-p-6 ans-rounded-lg ans-border ans-border-pink-500/30 ans-hover:border-pink-500 ans-transition-all">
            <div className="ans-text-3xl ans-mb-3">🔮</div>
            <h3 className="ans-text-xl ans-font-bold ans-text-pink-400 ans-mb-2">
              Interactive
            </h3>
            <p className="ans-text-gray-400 ans-text-sm">
              Fully interactive 3D scene with orbit controls, auto-rotation, and
              responsive design
            </p>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div
        className="ans-relative ans-h-[600px] ans-w-full ans-mt-8"
        style={{ height: "600px" }}
      >
        <Canvas3DWrapper camera={{ position: [0, 2, 8], fov: 60 }}>
          <Scene3D>
            {/* Central Tech Sphere */}
            <TechSphere />

            {/* Floating Geometric Shapes */}
            <RotatingShape
              position={[-4, 2, -2]}
              geometry="box"
              color="#ff00ff"
              speed={1.2}
            />
            <RotatingShape
              position={[4, -1, -2]}
              geometry="torus"
              color="#00ff00"
              speed={0.8}
            />
            <RotatingShape
              position={[-3, -2, 2]}
              geometry="cone"
              color="#ffff00"
              speed={1.5}
            />
            <RotatingShape
              position={[3, 1, 2]}
              geometry="sphere"
              color="#ff6600"
              speed={1}
            />

            {/* Particles */}
            <Particles />

            {/* Grid Floor */}
            <GridFloor />

            {/* 3D Text placeholder */}
            <Center position={[0, 3, 0]}>
              <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
                <mesh>
                  <boxGeometry args={[4, 0.8, 0.2]} />
                  <meshStandardMaterial
                    color="#00ffff"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#00ffff"
                    emissiveIntensity={0.5}
                  />
                </mesh>
              </Float>
            </Center>
          </Scene3D>
        </Canvas3DWrapper>
      </div>

      {/* Instructions */}
      <div className="ans-relative ans-z-10 ans-p-8 ans-text-center ans-space-y-4">
        <h2 className="ans-text-3xl ans-font-bold ans-text-white ans-mb-6">
          Controls
        </h2>
        <div className="ans-grid ans-grid-cols-1 md:ans-grid-cols-3 ans-gap-4 ans-max-w-4xl ans-mx-auto">
          <div className="ans-bg-gray-800/30 ans-p-4 ans-rounded-lg">
            <div className="ans-text-cyan-400 ans-font-bold ans-mb-2">
              🖱️ Left Click + Drag
            </div>
            <div className="ans-text-gray-400 ans-text-sm">
              Rotate the scene
            </div>
          </div>
          <div className="ans-bg-gray-800/30 ans-p-4 ans-rounded-lg">
            <div className="ans-text-purple-400 ans-font-bold ans-mb-2">
              🖱️ Right Click + Drag
            </div>
            <div className="ans-text-gray-400 ans-text-sm">Pan the camera</div>
          </div>
          <div className="ans-bg-gray-800/30 ans-p-4 ans-rounded-lg">
            <div className="ans-text-pink-400 ans-font-bold ans-mb-2">
              🖱️ Scroll Wheel
            </div>
            <div className="ans-text-gray-400 ans-text-sm">Zoom in/out</div>
          </div>
        </div>
      </div>

      {/* Tech Stack Info */}
      <div className="ans-relative ans-z-10 ans-p-8 ans-max-w-6xl ans-mx-auto">
        <div className="ans-bg-gradient-to-r ans-from-gray-800/50 ans-to-gray-900/50 ans-backdrop-blur ans-p-8 ans-rounded-2xl ans-border ans-border-gray-700">
          <h2 className="ans-text-2xl ans-font-bold ans-text-white ans-mb-6 ans-text-center">
            Technologies Used
          </h2>
          <div className="ans-flex ans-flex-wrap ans-justify-center ans-gap-4">
            {[
              "React Three Fiber",
              "Three.js",
              "React Three Drei",
              "WebGL",
              "TypeScript",
              "Tailwind CSS",
            ].map((tech) => (
              <span
                key={tech}
                className="ans-px-4 ans-py-2 ans-bg-gradient-to-r ans-from-cyan-500/20 ans-to-purple-500/20 ans-border ans-border-cyan-500/50 ans-rounded-full ans-text-cyan-400 ans-font-semibold ans-text-sm ans-hover:scale-110 ans-transition-transform ans-cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test3D;
