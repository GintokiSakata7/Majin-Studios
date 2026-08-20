'use client';

import React, {
  useEffect,
  useRef,
} from 'react';

import {
  useFrame,
} from '@react-three/fiber';

import * as THREE from 'three';

interface MouseParallaxProps {
  children: React.ReactNode;
  intensity?: number;
  damping?: number;
}

export function MouseParallax({
  children,
  intensity = 0.2,
  damping = 4,
}: MouseParallaxProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const reducedMotion =
    useRef(false);

  useEffect(() => {
    const media =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      );

    const update = () => {
      reducedMotion.current =
        media.matches;
    };

    update();

    media.addEventListener(
      'change',
      update
    );

    return () => {
      media.removeEventListener(
        'change',
        update
      );
    };
  }, []);

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      reducedMotion.current
    ) {
      return;
    }

    const targetX =
      state.pointer.y *
      intensity *
      0.22;

    const targetY =
      state.pointer.x *
      intensity *
      0.22;

    groupRef.current.rotation.x =
      THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetX,
        damping,
        delta
      );

    groupRef.current.rotation.y =
      THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetY,
        damping,
        delta
      );
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}
