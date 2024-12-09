import React, { ReactNode, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
   OrbitControls,
   AdaptiveDpr,
   AdaptiveEvents,
   BakeShadows,
} from '@react-three/drei';

interface SummitShareCanvasProps {
   children: ReactNode;
   shadows?: boolean;
}

const SummitShareCanvas: React.FC<SummitShareCanvasProps> = ({
   children,
   shadows = true,
}) => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      // Simulate a loading state for 4.5 seconds
      const timer = setTimeout(() => {
         setIsLoading(false);
      }, 4500);

      return () => clearTimeout(timer); // Clean up the timer when the component unmounts
   }, []);

   if (isLoading) {
      // Render a loading placeholder
      return (
         <div className="h-[360px] w-full flex items-center justify-center bg-primary-50 rounded-[8px]">
            <p className="text-2xl font-bold text-gray-700 animate-pulse">
               Loading...
            </p>
         </div>
      );
   }

   return (
      <div className="bg-primary-50 from-orange-600 to-orange-400 h-[360px] w-full rounded-[8px]">
         <Canvas
            frameloop="demand"
            shadows={shadows}
            camera={{
               position: [0, 0, 10],
               fov: 45,
               near: 0.1,
               far: 1000,
            }}
            gl={{
               preserveDrawingBuffer: true,
               antialias: true,
               alpha: false,
               stencil: false,
               depth: true,
               powerPreference: 'high-performance',
            }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
         >
            <color attach="background" args={['#F5F5F1']} />

            {/* Scene-wide optimizations */}
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            {shadows && <BakeShadows />}

            {/* Lights */}
            <directionalLight
               intensity={5}
               position={[5, 10, 5]}
               shadow-mapSize-width={1024}
               shadow-mapSize-height={1024}
               shadow-camera-far={20}
               shadow-camera-near={0.1}
            />
            <ambientLight intensity={5} />

            {/* Scene content */}
            {children}

            {/* Controls */}
            <OrbitControls
               enableZoom={true}
               enablePan={false}
               minDistance={7}
               maxDistance={20}
               target={[0, 0, 0]}
               enableDamping={true}
               dampingFactor={0.05}
               rotateSpeed={0.5}
               zoomSpeed={0.5}
            />
         </Canvas>
      </div>
   );
};

export default SummitShareCanvas;
