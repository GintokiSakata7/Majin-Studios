'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

import { useGlobalState } from '../../store/useGlobalState';

interface CoreSceneProps {
  active?: boolean;
  intensity?: number;
}

const CORE_COLORS: Record<string, string> = {
  MONOCHROME: '#F1F3F5',
  LIME: '#B8FF3D',
  CYAN: '#00E5FF',
  AMBER: '#FFB347',
  VIOLET: '#B46CFF',
};

export function CoreScene({
  active = true,
  intensity = 1,
}: CoreSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  const { activeAccent } = useGlobalState();

  const accent =
    CORE_COLORS[activeAccent] ?? CORE_COLORS.MONOCHROME;

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !innerRef.current ||
      !outerRef.current ||
      !ringRef.current
    ) {
      return;
    }

    const time = state.clock.getElapsedTime();

    /*
     * Smooth active/inactive state.
     */
    const target = active ? intensity : 0;

    const current =
      groupRef.current.userData.currentIntensity ?? 0;

    const next = THREE.MathUtils.damp(
      current,
      target,
      3.5,
      delta
    );

    groupRef.current.userData.currentIntensity = next;

    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(0.72, 1, next)
    );

    groupRef.current.visible = next > 0.002;

    if (!groupRef.current.visible) {
      return;
    }

    /*
     * Core rotation.
     */
    innerRef.current.rotation.y += delta * 0.16;
    innerRef.current.rotation.x += delta * 0.055;

    outerRef.current.rotation.y -= delta * 0.07;
    outerRef.current.rotation.z += delta * 0.025;

    ringRef.current.rotation.z += delta * 0.035;

    /*
     * Breathing.
     */
    const breathe =
      1 +
      Math.sin(time * 1.8) *
        0.025 *
        next;

    innerRef.current.scale.setScalar(
      breathe
    );

    /*
     * Very subtle vertical movement.
     */
    groupRef.current.position.y =
      Math.sin(time * 0.55) * 0.08 * next;
  });

  return (
    <group
      ref={groupRef}
      position={[2.6, 0, 0]}
    >
      {/* Inner core */}
      <group ref={innerRef}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />

          <meshBasicMaterial
            color="#050607"
            transparent
            opacity={0.92}
          />

          <Edges
            threshold={12}
            color={accent}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Inner micro-geometry */}
        <mesh rotation={[0.2, 0.4, 0]}>
          <icosahedronGeometry args={[0.78, 0]} />

          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.035}
            wireframe
          />
        </mesh>
      </group>

      {/* Outer technical shell */}
      <group ref={outerRef}>
        <mesh>
          <icosahedronGeometry args={[2.2, 0]} />

          <meshBasicMaterial
            color="#050607"
            transparent
            opacity={0.25}
          />

          <Edges
            threshold={10}
            color="#46505C"
            transparent
            opacity={0.5}
          />
        </mesh>

        <mesh rotation={[0.4, 0.1, 0.7]}>
          <octahedronGeometry args={[2.7, 0]} />

          <meshBasicMaterial
            color="#050607"
            transparent
            opacity={0.12}
            wireframe
          />
        </mesh>
      </group>

      {/* Technical orbit ring */}
      <group ref={ringRef}>
        <mesh
          rotation={[
            Math.PI / 2.3,
            0.25,
            0,
          ]}
        >
          <torusGeometry
            args={[
              2.9,
              0.008,
              6,
              96,
            ]}
          />

          <meshBasicMaterial
            color="#343B45"
            transparent
            opacity={0.48}
          />
        </mesh>

        <mesh
          rotation={[
            0.45,
            Math.PI / 2,
            0.15,
          ]}
        >
          <torusGeometry
            args={[
              3.25,
              0.006,
              6,
              96,
            ]}
          />

          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>
    </group>
  );
}
