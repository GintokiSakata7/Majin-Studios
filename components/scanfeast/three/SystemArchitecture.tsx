"use client";

import {
  Line,
} from "@react-three/drei";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import * as THREE from "three";

import type {
  ScanfeastProgressRef,
} from "./CameraDirector";

const nodes = [
  {
    label: "CUSTOMER",
    position:
      new THREE.Vector3(
        -4,
        2.4,
        -10
      ),
  },

  {
    label: "KDS",
    position:
      new THREE.Vector3(
        0,
        4,
        -10
      ),
  },

  {
    label: "MANAGER",
    position:
      new THREE.Vector3(
        4,
        2.4,
        -10
      ),
  },
];

const core =
  new THREE.Vector3(
    0,
    2.45,
    -10.4
  );

export default function SystemArchitecture({
  progressRef,
}: {
  progressRef:
    ScanfeastProgressRef;
}) {
  const group =
    useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) {
      return;
    }

    const progress =
      progressRef.current;

    const reveal =
      THREE.MathUtils.smoothstep(
        progress,
        0.82,
        0.96
      );

    group.current.visible =
      progress >= 0.78;

    group.current.scale.setScalar(
      0.75 +
        reveal * 0.25
    );
  });

  return (
    <group ref={group}>
      <mesh
        position={core}
      >
        <boxGeometry
          args={[
            2.1,
            1.1,
            0.5,
          ]}
        />

        <meshStandardMaterial
          color="#0f141c"
          roughness={0.28}
          metalness={0.45}
        />
      </mesh>

      {nodes.map(
        (node) => (
          <group
            key={node.label}
          >
            <mesh
              position={
                node.position
              }
            >
              <sphereGeometry
                args={[
                  0.065,
                  12,
                  12,
                ]}
              />

              <meshBasicMaterial
                color="#ff6a00"
              />
            </mesh>

            <Line
              points={[
                [
                  node.position
                    .x,
                  node.position
                    .y,
                  node.position
                    .z,
                ],
                [
                  core.x,
                  core.y,
                  core.z,
                ],
              ]}
              color="#ff6a00"
              transparent
              opacity={0.24}
              lineWidth={1}
            />
          </group>
        )
      )}

      <Line
        points={[
          [
            -4,
            2.4,
            -10,
          ],
          [
            4,
            2.4,
            -10,
          ],
        ]}
        color="#ffffff"
        transparent
        opacity={0.08}
        lineWidth={1}
      />
    </group>
  );
}
