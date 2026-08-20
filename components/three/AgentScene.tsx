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

interface AgentSceneProps {
  active: boolean;
}

type AgentNode = {
  id: string;
  label: string;
  position: THREE.Vector3;
};

const ACCENTS: Record<string, string> = {
  MONOCHROME: '#F1F3F5',
  LIME: '#B8FF3D',
  CYAN: '#00E5FF',
  AMBER: '#FFB347',
  VIOLET: '#B46CFF',
};

export function AgentScene({
  active,
}: AgentSceneProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const packetRef =
    useRef<THREE.Mesh>(null);

  const progressRef =
    useRef(0);

  const { activeAccent } =
    useGlobalState();

  const accent =
    ACCENTS[activeAccent] ??
    ACCENTS.CYAN;

  const nodes = useMemo<AgentNode[]>(
    () => [
      {
        id: 'planner',
        label: 'PLANNER',
        position:
          new THREE.Vector3(
            -4,
            1.7,
            0
          ),
      },
      {
        id: 'search',
        label: 'SEARCH',
        position:
          new THREE.Vector3(
            -1.4,
            0.7,
            -1.7
          ),
      },
      {
        id: 'code',
        label: 'CODE',
        position:
          new THREE.Vector3(
            1.6,
            0.7,
            -1.7
          ),
      },
      {
        id: 'execute',
        label: 'EXECUTE',
        position:
          new THREE.Vector3(
            4.3,
            -1.0,
            0
          ),
      },
    ],
    []
  );

  const path = useMemo(
    () =>
      nodes.map(
        (node) => node.position
      ),
    [nodes]
  );

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !packetRef.current
    ) {
      return;
    }

    const current =
      groupRef.current.userData
        .visibility ?? 0;

    const target = active ? 1 : 0;

    const visibility =
      THREE.MathUtils.damp(
        current,
        target,
        4,
        delta
      );

    groupRef.current.userData
      .visibility = visibility;

    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(
        0.65,
        1,
        visibility
      )
    );

    groupRef.current.visible =
      visibility > 0.002;

    if (!groupRef.current.visible) {
      return;
    }

    /*
     * Continuous execution packet.
     */
    progressRef.current =
      (progressRef.current +
        delta * 0.24) %
      1;

    const totalSegments =
      path.length - 1;

    const scaled =
      progressRef.current *
      totalSegments;

    const segment =
      Math.min(
        Math.floor(scaled),
        totalSegments - 1
      );

    const localProgress =
      scaled - segment;

    packetRef.current.position
      .lerpVectors(
        path[segment],
        path[segment + 1],
        localProgress
      );

    /*
     * Packet breathing.
     */
    const pulse =
      1 +
      Math.sin(
        state.clock.getElapsedTime() *
        8
      ) *
        0.14;

    packetRef.current.scale.setScalar(
      pulse
    );
  });

  return (
    <group ref={groupRef}>
      {/* Main execution path */}
      <Line
        points={path}
        color="#303843"
        lineWidth={1.15}
        transparent
        opacity={0.75}
      />

      {/* Active path accents */}
      {nodes.slice(0, -1).map(
        (node, index) => (
          <Line
            key={`active-${node.id}`}
            points={[
              node.position,
              nodes[index + 1].position,
            ]}
            color={accent}
            lineWidth={0.65}
            transparent
            opacity={0.2}
          />
        )
      )}

      {/* Nodes */}
      {nodes.map((node, index) => {
        const isExecution =
          index === nodes.length - 1;

        return (
          <group
            key={node.id}
            position={node.position}
          >
            <mesh>
              <octahedronGeometry
                args={[0.3, 0]}
              />

              <meshBasicMaterial
                color="#070809"
                wireframe
              />
            </mesh>

            <mesh scale={0.4}>
              <octahedronGeometry
                args={[0.3, 0]}
              />

              <meshBasicMaterial
                color={
                  isExecution
                    ? accent
                    : '#6A7480'
                }
                transparent
                opacity={
                  isExecution
                    ? 0.9
                    : 0.4
                }
              />
            </mesh>

            {/* Vertical technical stem */}
            <Line
              points={[
                new THREE.Vector3(
                  0,
                  0,
                  0
                ),
                new THREE.Vector3(
                  0,
                  index % 2 === 0
                    ? 0.65
                    : -0.65,
                  0
                ),
              ]}
              color="#303843"
              lineWidth={0.55}
              transparent
              opacity={0.7}
            />
          </group>
        );
      })}

      {/* Data packet */}
      <mesh ref={packetRef}>
        <sphereGeometry
          args={[
            0.12,
            12,
            12,
          ]}
        />

        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.95}
        />
      </mesh>
    </group>
  );
}
