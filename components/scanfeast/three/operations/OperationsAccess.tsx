"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

export default function OperationsAccess({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const group =
    useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    const p =
      progressRef.current;

    const reveal =
      THREE.MathUtils.smootherstep(
        THREE.MathUtils.clamp(
          (p - 0.58) /
            0.13,
          0,
          1,
        ),
        0,
        1,
      );

    const exit =
      THREE.MathUtils.smootherstep(
        THREE.MathUtils.clamp(
          (p - 0.82) /
            0.11,
          0,
          1,
        ),
        0,
        1,
      );

    group.current.visible =
      p > 0.56 &&
      p < 0.95;

    group.current.position.y =
      THREE.MathUtils.damp(
        group.current.position.y,
        THREE.MathUtils.lerp(
          -0.3,
          0,
          reveal,
        ) -
          exit * 0.5,
        7,
        delta,
      );

    group.current.rotation.z =
      THREE.MathUtils.damp(
        group.current.rotation.z,
        exit * 0.035,
        5,
        delta,
      );
  });

  return (
    <group
      ref={group}
    >
      {/* architectural console columns */}
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <group
          key={index}
          position={[
            -2.4 +
              index * 1.2,
            0,
            -1.35,
          ]}
        >
          <mesh
            castShadow
          >
            <boxGeometry
              args={[
                0.72,
                0.18,
                0.76,
              ]}
            />

            <meshStandardMaterial
              color="#30363d"
              roughness={0.52}
              metalness={0.32}
            />
          </mesh>

          <mesh
            position={[
              0,
              0.105,
              0,
            ]}
          >
            <boxGeometry
              args={[
                0.4,
                0.018,
                0.02,
              ]}
            />

            <meshBasicMaterial
              color="#ff6a00"
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* vertical data columns */}
      {[0, 1, 2].map(
        (index) => (
          <mesh
            key={`rail-${index}`}
            position={[
              -2.8 +
                index * 2.8,
              1.8,
              -2.02,
            ]}
          >
            <boxGeometry
              args={[
                0.045,
                3.0,
                0.045,
              ]}
            />

            <meshStandardMaterial
              color="#737b82"
              metalness={0.75}
              roughness={0.24}
            />
          </mesh>
        ),
      )}
    </group>
  );
}