'use client';

import React, { useMemo, useRef } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

import { useFrame } from '@react-three/fiber';
import { useGlobalState } from '../../store/useGlobalState';

interface ConnectionLinesProps {
  active?: boolean;
  opacity?: number;
}

interface ConnectionNode {
  id: string;
  position: THREE.Vector3;
  label: string;
}

const COLORS: Record<string, string> = {
  MONOCHROME: '#343B45',
  LIME: '#B8FF3D',
  CYAN: '#00E5FF',
  AMBER: '#FFB347',
  VIOLET: '#B46CFF',
};

export function ConnectionLines({
  active = true,
  opacity = 1,
}: ConnectionLinesProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { activeAccent } = useGlobalState();

  const accent =
    COLORS[activeAccent] ?? COLORS.MONOCHROME;

  const nodes = useMemo<ConnectionNode[]>(
    () => [
      {
        id: 'ai',
        label: 'AI',
        position: new THREE.Vector3(
          -1.8,
          2.8,
          -1.8
        ),
      },
      {
        id: 'agents',
        label: 'AGENTS',
        position: new THREE.Vector3(
          5.7,
          2.2,
          -3.3
        ),
      },
      {
        id: 'products',
        label: 'PRODUCTS',
        position: new THREE.Vector3(
          0.1,
          -3.0,
          -1.3
        ),
      },
      {
        id: 'software',
        label: 'SOFTWARE',
        position: new THREE.Vector3(
          6.0,
          -2.3,
          -2.8
        ),
      },
      {
        id: 'external',
        label: 'EXTERNAL',
        position: new THREE.Vector3(
          -2.8,
          0.1,
          -4.8
        ),
      },
    ],
    []
  );

  const corePosition = useMemo(
    () =>
      new THREE.Vector3(
        2.6,
        0,
        0
      ),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const target = active ? 1 : 0;

    const current =
      groupRef.current.userData.opacity ?? 0;

    const next = THREE.MathUtils.damp(
      current,
      target,
      3.2,
      delta
    );

    groupRef.current.userData.opacity =
      next;

    groupRef.current.visible = next > 0.002;

    if (!groupRef.current.visible) {
      return;
    }

    /*
     * Extremely subtle breathing of the network.
     */
    const time =
      state.clock.getElapsedTime();

    groupRef.current.position.y =
      Math.sin(time * 0.35) *
      0.025 *
      next;
  });

  return (
    <group ref={groupRef}>
      {/* Core → satellite connections */}
      {nodes.map((node) => (
        <React.Fragment key={`connection-${node.id}`}>
          <Line
            points={[
              corePosition,
              node.position,
            ]}
            color={
              node.id === 'agents'
                ? accent
                : '#252A31'
            }
            lineWidth={
              node.id === 'agents'
                ? 1.2
                : 0.7
            }
            transparent
            opacity={
              (node.id === 'agents'
                ? 0.5
                : 0.3) *
              opacity
            }
          />

          <mesh
            position={node.position}
          >
            <boxGeometry
              args={[
                0.065,
                0.065,
                0.065,
              ]}
            />

            <meshBasicMaterial
              color={
                node.id === 'agents'
                  ? accent
                  : '#4A5562'
              }
              transparent
              opacity={
                (node.id === 'agents'
                  ? 0.9
                  : 0.7) *
                opacity
              }
            />
          </mesh>
        </React.Fragment>
      ))}

      {/* Cross network */}
      <Line
        points={[
          nodes[0].position,
          nodes[2].position,
        ]}
        color="#252A31"
        lineWidth={0.65}
        transparent
        opacity={0.28 * opacity}
      />

      <Line
        points={[
          nodes[1].position,
          nodes[3].position,
        ]}
        color="#252A31"
        lineWidth={0.65}
        transparent
        opacity={0.28 * opacity}
      />

      <Line
        points={[
          nodes[0].position,
          nodes[4].position,
          nodes[2].position,
        ]}
        color="#252A31"
        lineWidth={0.65}
        transparent
        opacity={0.22 * opacity}
      />
    </group>
  );
}
