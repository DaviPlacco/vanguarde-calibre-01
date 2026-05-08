'use client';

import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

// --- Normalize & Scale Helper ---
function NormalizedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { viewport } = useThree();

  // 1. Hands Animation Logic (60fps Sweep)
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name.toLowerCase().includes('second')) {
          child.rotation.z = -time * 1.5;
        }
      }
    });
  });

  // 2. Interaction Logic (Rose Island Style)
  useFrame((state, delta) => {
    if (!group.current) return;

    const offset = scroll.offset; // 0 to 1

    // Subtlety is key: Small rotation range
    // Y: -15deg to 15deg (approx -0.26rad to 0.26rad)
    // Z: slight 5deg tilt (approx 0.08rad)
    const targetRotY = THREE.MathUtils.mapLinear(offset, 0, 1, -0.26, 0.26);
    const targetRotZ = THREE.MathUtils.mapLinear(offset, 0, 1, 0, 0.08);
    
    easing.dampE(group.current.rotation, [0, targetRotY, targetRotZ], 0.4, delta);

    // Subtle Scale increase: 1.0 to 1.15
    const targetScale = THREE.MathUtils.mapLinear(offset, 0, 1, 1, 1.15);
    easing.damp3(group.current.scale, [targetScale, targetScale, targetScale], 0.4, delta);

    // Floating Inertia (Mouse follow subtle)
    const mouseX = (state.mouse.x * viewport.width) / 20;
    const mouseY = (state.mouse.y * viewport.height) / 20;
    easing.damp3(group.current.position, [mouseX, mouseY, 0], 0.8, delta);
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// --- Main Component ---
export default function WatchShowroom() {
  const modelUrl = '/vanguarde_watch.glb';

  return (
    <div className="w-full h-full relative pointer-events-none lg:pointer-events-auto">
      <Canvas 
        shadows 
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={30} />
          
          {/* Lighting: Minimalist & Sharp */}
          <Environment preset="city" environmentIntensity={0.2} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={2} 
            color="#fff" 
            castShadow 
          />
          <spotLight 
            position={[-5, 5, 5]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1} 
          />

          <ScrollControls pages={0} damping={0.1}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <NormalizedModel url={modelUrl} />
            </Float>
          </ScrollControls>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload for performance
useGLTF.preload('/vanguarde_watch.glb');
