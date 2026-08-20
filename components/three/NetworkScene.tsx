'use client';

import React, {
  useMemo,
  useRef,
} from 'react';

import {
  useFrame,
} from '@react-three/fiber';

import {
  Line,
} from '@react-three/drei';

import * as THREE from 'three';

import {
  useGlobalState,
} from '../../store/useGlobalState';

interface NetworkSceneProps {
  active: boolean;
}

const ACCENTS: Record<string, string> = {
  MONOCHROME: '#4A5562',
  LIME: '#B8FF3D',
  CYAN: '#00E5FF',
  AMBER: '#FFB347',
  VIOLET: '#B46CFF',
};

export function NetworkScene({
  active,
}: NetworkSceneProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const { activeAccent } =
    useGlobalState();

  const accent =
    ACCENTS[activeAccent] ??
    ACCENTS.MONOCHROME;

  const nodes = useMemo(
    () => [
      new THREE.Vector3(-6, 2.6, -2.4),
      new THREE.Vector3(-3.4, 0.8, -1),
      new THREE.Vector3(-1.4, 3.1, -3),
      new THREE.Vector3(0.5, 0.5, -1.8),
      new THREE.Vector3(2.9, 2.4, -2.8),
      new THREE.Vector3(4.7, -0.5, -1.4),
      new THREE.Vector3(1.3, -2.3, -2),
      new THREE.Vector3(-2.7, -2.1, -2.6),
      new THREE.Vector3(-5.1, -0.7, -3.4),
      new THREE.Vector3(5.7, 2.6, -3.7),
      new THREE.Vector3(6.4, -2.2, -3.5),
    ],
    []
  );

  /*
   * Explicit edges rather than random proximity.
   * This keeps the composition intentional.
   */
  const edges = useMemo(
    () => [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 7],
      [1, 8],
      [2, 3],
      [2, 4],
      [3, 4],
      [3, 6],
      [3, 7],
      [4, 5],
      [4, 9],
      [5, 6],
      [5, 10],
      [6, 7],
      [7, 8],
      [8, 0],
    ],
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const current =
      groupRef.current.userData
        .visibility ?? 0;

    const target =
      active ? 1 : 0;

    const visibility =
      THREE.MathUtils.damp(
        current,
        target,
        3.2,
        delta
      );

    groupRef.current.userData
      .visibility = visibility;

    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(
        0.55,
        1,
        visibility
      )
    );

    groupRef.current.visible =
      visibility > 0.002;

    if (!groupRef.current.visible) {
      return;
    }

    const time =
      state.clock.getElapsedTime();

    groupRef.current.rotation.y =
      time * 0.018;

    groupRef.current.rotation.z =
      Math.sin(time * 0.2) *
      0.008;
  });

  return (
    <group ref={groupRef}>
      {edges.map(
        ([a, b], index) => (
          <Line
            key={`network-edge-${index}`}
            points={[
              nodes[a],
              nodes[b],
            ]}
            color={
              index % 5 === 0
                ? accent
                : '#252A31'
            }
            lineWidth={
              index % 5 === 0
                ? 0.9
                : 0.55
            }
            transparent
            opacity={
              index % 5 === 0
                ? 0.52
                : 0.28
            }
          />
        )
      )}

      {nodes.map(
        (position, index) => (
          <group
            key={`network-node-${index}`}
            position={position}
          >
            <mesh>
              <boxGeometry
                args={[
                  index % 4 === 0
                    ? 0.12
                    : 0.075,
                  index % 4 === 0
                    ? 0.12
                    : 0.075,
                  index % 4 === 0
                    ? 0.12
                    : 0.075,
                ]}
              />

              <meshBasicMaterial
                color={
                  index % 4 === 0
                    ? accent
                    : '#4A5562'
                }
                transparent
                opacity={
                  index % 4 === 0
                    ? 0.85
                    : 0.65
                }
              />
            </mesh>

            {index % 4 === 0 && (
              <Line
                points={[
                  new THREE.Vector3(
                    -0.2,
                    0,
                    0
                  ),
                  new THREE.Vector3(
                    0.2,
                    0,
                    0
                  ),
                ]}
                color={accent}
                lineWidth={0.5}
                transparent
                opacity={0.45}
              />
            )}
          </group>
        )
      )}
    </group>
  );
}
