import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
   OrbitControls,
   AdaptiveDpr,
   AdaptiveEvents,
   BakeShadows,
   Preload,
   useProgress,
   Html,
} from '@react-three/drei';
import * as THREE from 'three';

// Declare global type for the renderer
declare global {
   interface Window {
      __THREEJS_RENDERER__?: THREE.WebGLRenderer;
   }
}

// Loading indicator component with progress
const ModelLoader = () => {
   const { progress } = useProgress();
   return (
      <Html center>
         <div className="flex flex-col items-center justify-center">
            <div className="text-lg font-medium text-gray-700">
               Loading Model... {progress.toFixed(0)}%
            </div>
            <div className="w-32 h-1 bg-gray-200 rounded-full mt-2">
               <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
               />
            </div>
         </div>
      </Html>
   );
};

interface DynamicCanvasProps {
   children: React.ReactNode;
}

const DynamicCanvas: React.FC<DynamicCanvasProps> = ({ children }) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsVisible(entry.isIntersecting);
         },
         {
            root: null,
            rootMargin: '100px',
            threshold: 0.1,
         }
      );

      const element = document.getElementById('canvas-container');
      if (element) {
         observer.observe(element);
      }

      return () => {
         if (element) {
            observer.unobserve(element);
         }
      };
   }, []);

   // Memory cleanup
   useEffect(() => {
      return () => {
         if (typeof window !== 'undefined' && window.__THREEJS_RENDERER__) {
            window.__THREEJS_RENDERER__.dispose();
            THREE.Cache.clear();
            delete window.__THREEJS_RENDERER__;
         }
      };
   }, []);

   return (
      <div
         id="canvas-container"
         className="h-[360px] w-full rounded-[8px] bg-primary-50"
      >
         {isVisible && (
            <Canvas
               frameloop="demand"
               shadows
               camera={{
                  position: [0, 0, 10],
                  fov: 45,
                  near: 0.1,
                  far: 200,
               }}
               gl={{
                  antialias: true,
                  alpha: false,
                  stencil: false,
                  depth: true,
                  powerPreference: 'high-performance',
                  logarithmicDepthBuffer: true,
               }}
               onCreated={({ gl }) => {
                  if (typeof window !== 'undefined') {
                     window.__THREEJS_RENDERER__ = gl;
                  }
               }}
               dpr={[1, 1.5]}
               performance={{ min: 0.5 }}
            >
               <color attach="background" args={['#F5F5F1']} />

               <AdaptiveDpr pixelated />
               <AdaptiveEvents />
               <BakeShadows />

               <directionalLight
                  intensity={5}
                  position={[5, 10, 5]}
                  shadow-mapSize-width={512}
                  shadow-mapSize-height={512}
                  shadow-camera-far={20}
                  shadow-camera-near={0.1}
                  castShadow
               />
               <ambientLight intensity={5} />

               <Suspense fallback={<ModelLoader />}>
                  {children}
                  <Preload all />
               </Suspense>

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
         )}
      </div>
   );
};

export default DynamicCanvas;
