"use client";

import {
  Line,
} from "@react-three/drei";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import * as THREE from "three";

import type {
  ScanfeastProgressRef,
} from "./CameraDirector";

export default function CinematicTransition({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const group =
    useRef<THREE.Group>(null);

  const grid =
    useMemo(() => {
      const lines: [
        [
          number,
          number,
          number,
        ],
        [
          number,
          number,
          number,
        ],
      ][] = [];

      for (
        let x = -7;
        x <= 7;
        x += 1
      ) {
        lines.push([
          [x, -1, 0],
          [x, 7, 0],
        ]);
      }

      for (
        let y = -1;
        y <= 7;
        y += 1
      ) {
        lines.push([
          [-7, y, 0],
          [7, y, 0],
        ]);
      }

      return lines;
    }, []);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    const p =
      progressRef.current;

    const reveal =
      THREE.MathUtils.smootherstep(
        THREE.MathUtils.clamp(
          (p - 0.73) /
            0.18,
          0,
          1,
        ),
        0,
        1,
      );

    const exit =
      1 -
      THREE.MathUtils.smootherstep(
        THREE.MathUtils.clamp(
          (p - 0.91) /
            0.09,
          0,
          1,
        ),
        0,
        1,
      );

    const visibility =
      reveal * exit;

    group.current.visible =
      visibility >
      0.005;

    group.current.position.y =
      THREE.MathUtils.lerp(
        -0.8,
        0,
        visibility,
      );

    group.current.scale.setScalar(
      THREE.MathUtils.lerp(
        0.92,
        1,
        visibility,
      ),
    );

    group.current.rotation.z =
      THREE.MathUtils.damp(
        group.current.rotation.z,
        reveal * 0.018,
        3,
        delta,
      );
  });

  return (
    <group
      ref={group}
      position={[
        0,
        0,
        -12.8,
      ]}
      visible={false}
    >
      <mesh
        position={[
          0,
          3,
          -0.4,
        ]}
      >
        <planeGeometry
          args={[
            18,
            10,
          ]}
        />

        <meshBasicMaterial
          color="#080b10"
          transparent
          opacity={0.22}
        />
      </mesh>

      <group
        position={[
          0,
          -1,
          -0.2,
        ]}
      >
        {grid.map(
          (
            points,
            index,
          ) => (
            <Line
              key={index}
              points={points}
              color="#ff6a00"
              transparent
              opacity={0.022}
              lineWidth={0.5}
            />
          ),
        )}
      </group>

      <Line
        points={[
          [-6.5, 0, 0],
          [6.5, 0, 0],
        ]}
        color="#ff6a00"
        transparent
        opacity={0.10}
        lineWidth={0.7}
      />
    </group>
  );
}