'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  useGLTF, 
  Environment, 
  ScrollControls, 
  useScroll,
  Center,
  Float,
  Preload,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

// --- The Watch Model with Real-time Hands & Scroll Logic ---
function WatchModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Optimized material updates for high-end look
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          child.material.envMapIntensity = 1.5;
          // Apply brushed steel feel to metals
          if (child.name.toLowerCase().includes('case') || child.name.toLowerCase().includes('bezel')) {
            child.material.roughness = 0.25;
            child.material.metalness = 1;
          }
        }
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const offset = scroll.offset; // 0 to 1 scroll within section
    const time = state.clock.getElapsedTime();
    const now = new Date();

    // 1. Hands Logic
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Continuous Sweep for Seconds
        if (child.name.toLowerCase().includes('second')) {
          child.rotation.z = -time * 1.5;
        }
        // Real-time for Minutes/Hours
        if (child.name.toLowerCase().includes('minute')) {
          const minutes = now.getMinutes() + now.getSeconds() / 60;
          child.rotation.z = -((minutes / 60) * Math.PI * 2);
        }
        if (child.name.toLowerCase().includes('hour')) {
          const hours = (now.getHours() % 12) + now.getMinutes() / 60;
          child.rotation.z = -((hours / 12) * Math.PI * 2);
        }
      }
    });

    // 2. Scroll-Bound Mapping with Easing (Damping)
    // Rotation: -30 to +30 degrees (-0.5rad to 0.5rad for more visible effect, user asked 0.2)
    const targetRotY = THREE.MathUtils.mapLinear(offset, 0, 1, -0.2, 0.2);
    easing.dampE(group.current.rotation, [0, targetRotY, 0], 0.25, delta);

    // Zoom (Z-axis): Moving from 5 to 3.2 (we apply this to camera or group scale)
    const targetScale = THREE.MathUtils.mapLinear(offset, 0, 1, 1, 1.4);
    easing.damp3(group.current.scale, [targetScale, targetScale, targetScale], 0.25, delta);
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// --- Component Setup ---
export default function WatchInteraction() {
  const modelUrl = '/vanguarde_watch.glb';

  return (
    <div className="w-full h-[600px] relative">
      <Canvas 
        shadows 
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
          
          {/* Visual Refinement: Subtle City Lighting */}
          <Environment preset="city" environmentIntensity={0.4} />
          
          {/* Key Light for Dial Highlights */}
          <spotLight 
            position={[5, 5, 5]} 
            angle={0.15} 
            penumbra={1} 
            intensity={2} 
            color="#fff"
            castShadow 
          />

          <ScrollControls pages={1} damping={0.1}>
            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
              <Center top>
                <WatchModel url={modelUrl} />
              </Center>
            </Float>
          </ScrollControls>

          <Preload all />
        </Suspense>
      </Canvas>

      {/* Narrative Overlay (Inside the section) */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
         <p className="text-[10px] text-accent font-bold uppercase tracking-[0.4em] mb-2">Technical Calibre</p>
         <p className="text-xs text-gray-400 font-serif italic">Scroll to explore the architecture</p>
      </div>
    </div>
  );
}
