'use client';

import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Canvas,
  useThree,
  useFrame,
} from '@react-three/fiber';

import gsap from 'gsap';

import {
  ScrollTrigger,
} from 'gsap/dist/ScrollTrigger';

import * as THREE from 'three';

import {
  useGlobalState,
} from '../../store/useGlobalState';

import {
  SceneEnvironment,
} from './SceneEnvironment';

import {
  MouseParallax,
} from './MouseParallax';

import {
  CoreScene,
} from './CoreScene';

import {
  ConnectionLines,
} from './ConnectionLines';

import {
  NetworkScene,
} from './NetworkScene';

import {
  AgentScene,
} from './AgentScene';

import {
  TechLabels3D,
} from './TechLabels3D';

interface UniverseCameraProps {
  progressRef: React.MutableRefObject<number>;
}

function UniverseCamera({
  progressRef,
}: UniverseCameraProps) {
  const { camera } =
    useThree();

  const { whyStage, currentScene } = useGlobalState();

  const target =
    useRef({
      x: 0,
      y: 0,
      z: 15,
      rx: 0,
      ry: 0,
      rz: 0,
    });

  useFrame(
    (_, delta) => {
      const progress =
        progressRef.current;

      const p =
        THREE.MathUtils.clamp(
          progress,
          0,
          1
        );

      // Base path
      let tx = THREE.MathUtils.lerp(-1.5, 1.2, p);
      let ty = THREE.MathUtils.lerp(0.3, -0.35, p);
      let tz = THREE.MathUtils.lerp(15, 10.5, p);
      let trx = THREE.MathUtils.lerp(0, -0.06, p);
      let try_ = THREE.MathUtils.lerp(0.08, -0.12, p);

      // Adjustments for WHY_MAJIN stage
      if (currentScene === 'WHY_MAJIN') {
        if (whyStage === 'systems') {
          tz = 12.0; 
        } else if (whyStage === 'production') {
          tz = 10.5; 
          tx += 0.5;
        } else if (whyStage === 'workflows') {
          tx -= 1.0; 
          tz = 10.5;
        } else if (whyStage === 'studio') {
          tz = 9.0; 
          tx += 1.0;
          ty += 0.5;
        }
      }

      target.current.x = tx;
      target.current.y = ty;
      target.current.z = tz;
      target.current.rx = trx;
      target.current.ry = try_;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x, 2.6, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, target.current.y, 2.6, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, target.current.z, 2.6, delta);
      camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, target.current.rx, 2.6, delta);
      camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, target.current.ry, 2.6, delta);
    }
  );

  return null;
}

function UniverseController() {
  const progressRef =
    useRef(0);

  const {
    currentScene,
    setScrollProgress,
  } = useGlobalState();

  useEffect(() => {
    if (
      typeof window === 'undefined'
    ) {
      return;
    }

    gsap.registerPlugin(
      ScrollTrigger
    );

    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    /*
     * Keep progress available even in reduced motion,
     * but don't create cinematic interpolation.
     */
    const trigger =
      ScrollTrigger.create({
        trigger: document.body,

        start: 'top top',

        end: 'bottom bottom',

        scrub: reducedMotion
          ? false
          : 1,

        onUpdate: (self) => {
          progressRef.current =
            self.progress;

          setScrollProgress(
            self.progress
          );
        },
      });

    return () => {
      trigger.kill();
    };
  }, [
    setScrollProgress,
  ]);

  /*
   * Store scene progress on the parent through a stable
   * object exposed below.
   */
  return (
    <>
      <UniverseCamera
        progressRef={
          progressRef
        }
      />

      <MouseParallax
        intensity={0.16}
        damping={4}
      >
        <CoreScene
          active={
            currentScene ===
              'CORE' ||
            currentScene ===
              'CONTACT'
          }
          intensity={
            currentScene ===
            'CORE'
              ? 1
              : 0.42
          }
        />

        <ConnectionLines
          active={
            currentScene !==
            'CONTACT'
          }
        />

        <NetworkScene
          active={
            currentScene === 'CAPABILITIES' ||
            currentScene === 'WHY_MAJIN'
          }
        />

        <AgentScene
          active={
            currentScene ===
            'AGENTS'
          }
        />

        <TechLabels3D />
      </MouseParallax>
    </>
  );
}

export function UniverseScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      id="canvas-container"
      data-cursor="3d"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {mounted && (
        <Canvas
          eventSource={document.body}
          eventPrefix="client"
          camera={{
            position: [0, 0, 15],
            fov: 44,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.75]}
          frameloop="always"
        >
          <Suspense fallback={null}>
            <SceneEnvironment />
            <UniverseController />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
