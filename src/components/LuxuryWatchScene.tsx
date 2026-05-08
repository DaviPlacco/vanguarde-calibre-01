'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  useGLTF, 
  Environment, 
  ContactShadows, 
  PerspectiveCamera, 
  ScrollControls, 
  useScroll,
  Bounds,
  Stage,
  Float,
  Preload,
} from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

// --- The Luxury Model Component ---
function WatchModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Initial State Setup (10:10 position for hands if possible)
  useFrame((state, delta) => {
    if (!group.current) return;

    const offset = scroll.offset; // Current scroll progress (0 to 1)

    // 1. Subtle Rotation Constraint (-0.3 to 0.3 rad)
    const targetRotY = THREE.MathUtils.mapLinear(offset, 0, 1, -0.3, 0.3);
    easing.dampE(group.current.rotation, [0, targetRotY, 0], 0.4, delta);

    // 2. Subtle Pulsating Scale (1 to 1.05)
    const targetScale = THREE.MathUtils.mapLinear(offset, 0, 1, 1, 1.05);
    easing.damp3(group.current.scale, [targetScale, targetScale, targetScale], 0.4, delta);

    // 3. Parallax Lateral Displacement (Max 10% of width)
    const targetPosX = THREE.MathUtils.mapLinear(offset, 0, 1, -0.5, 0.5);
    easing.damp3(group.current.position, [targetPosX, 0, 0], 0.4, delta);
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// --- Main Scene Component ---
export default function LuxuryWatchScene() {
  const modelUrl = '/vanguarde_watch.glb';

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas 
        shadows 
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
          
          {/* Subtle Studio Lighting via Environment */}
          <Environment preset="city" environmentIntensity={0.3} />
          
          <ScrollControls pages={0} damping={0.1}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
              {/* Bounds & Stage ensure perfect auto-centering and scaling */}
              <Bounds observe margin={1.2}>
                <Stage 
                  intensity={0.5} 
                  environment="city" 
                  adjustCamera={false} 
                >
                  <WatchModel url={modelUrl} />
                </Stage>
              </Bounds>
            </Float>

            {/* High-End Contact Shadows */}
            <ContactShadows 
              position={[0, -1.2, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={4.5} 
            />
          </ScrollControls>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the asset to avoid loading flashes
useGLTF.preload('/vanguarde_watch.glb');
