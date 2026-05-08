'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  useGLTF, 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  PerspectiveCamera, 
  ScrollControls, 
  useScroll,
  Center,
  Stage,
  Float,
  BakeShadows,
  Preload,
  Loader
} from '@react-three/drei';
import * as THREE from 'three';

// --- Debug Model Component (GLTF Loader) ---
function WatchModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Mechanical Sweep Animation for hands (Assumes named meshes: 'Second_Hand', etc.)
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const offset = scroll.offset;

    // Scroll-bound Interpolation: Dolly Zoom & Rotation
    if (group.current) {
      // Rotate 360 over scroll
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, offset * Math.PI * 2, 0.1);
      // Dolly Zoom effect via scale
      const zoomScale = THREE.MathUtils.lerp(1, 2.2, offset);
      group.current.scale.set(zoomScale, zoomScale, zoomScale);
    }

    // Attempt to find and rotate hands if they exist in the GLB
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name.includes('Second')) child.rotation.z = -time * 1.5;
        if (child.name.includes('Minute')) child.rotation.z = -time * 0.1;
        if (child.name.includes('Hour')) child.rotation.z = -time * 0.01;
      }
    });
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// --- Scene Setup ---
export default function WatchCanvas() {
  // --- IMPORTANT: Ensure vanguarde_watch.glb exists in /public/ ---
  const modelUrl = '/vanguarde_watch.glb';

  return (
    <div className="w-full h-full min-h-[600px] relative bg-[#0A0A0A]">
      <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 5], fov: 35 }}>
        <Suspense fallback={null}>
          {/* Environment & Lighting */}
          <Environment preset="city" />
          
          {/* ScrollControls for the interpolation logic */}
          <ScrollControls pages={0} damping={0.1}>
            
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <Stage intensity={1} environment="city" adjustCamera={false}>
                <Center top>
                  <WatchModel url={modelUrl} />
                </Center>
              </Stage>
            </Float>

            {/* Debug Helpers: OrbitControls & Grid */}
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
            <gridHelper args={[10, 10, 0x444444, 0x222222]} position={[0, -2, 0]} />
            <axesHelper args={[5]} />

          </ScrollControls>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
          <BakeShadows />
          <Preload all />
        </Suspense>
      </Canvas>
      
      {/* Visual Loader Overlay */}
      <Loader 
        containerStyles={{ background: 'transparent' }}
        innerStyles={{ background: '#b89a67' }}
        barStyles={{ background: '#b89a67' }}
        dataInterpolation={(p) => `Calibrating Precision ${p.toFixed(0)}%`}
      />
    </div>
  );
}

// Preload the model to avoid jank during navigation
useGLTF.preload('/vanguarde_watch.glb');
