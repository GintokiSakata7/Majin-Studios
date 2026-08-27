"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

export default function SystemTransform({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const group =
    useRef<THREE.Group>(null);

  const ringOuter =
    useRef<THREE.Mesh>(null);

  const ringMiddle =
    useRef<THREE.Mesh>(null);

  const ringInner =
    useRef<THREE.Mesh>(null);

  const core =
    useRef<THREE.Mesh>(null);

  const beam =
    useRef<THREE.Mesh>(null);

  useFrame(
    ({ clock }, delta) => {
      if (
        !group.current ||
        !ringOuter.current ||
        !ringMiddle.current ||
        !ringInner.current ||
        !core.current ||
        !beam.current
      ) {
        return;
      }

      const p =
        progressRef.current;

      const reveal =
        THREE.MathUtils.smootherstep(
          THREE.MathUtils.clamp(
            (p - 0.84) /
              0.11,
            0,
            1,
          ),
          0,
          1,
        );

      const t =
        clock.getElapsedTime();

      group.current.visible =
        p > 0.80 &&
        p < 0.995;

      group.current.position.y =
        THREE.MathUtils.damp(
          group.current.position.y,
          THREE.MathUtils.lerp(
            -0.9,
            0,
            reveal,
          ),
          7,
          delta,
        );

      group.current.scale.setScalar(
        THREE.MathUtils.damp(
          group.current.scale.x,
          THREE.MathUtils.lerp(
            0.35,
            1,
            reveal,
          ),
          6,
          delta,
        ),
      );

      /*
       * Three levels of the core rotate
       * independently.
       */
      ringOuter.current.rotation.x =
        t * 0.19;

      ringOuter.current.rotation.z =
        t * 0.11;

      ringMiddle.current.rotation.y =
        -t * 0.29;

      ringMiddle.current.rotation.z =
        t * 0.13;

      ringInner.current.rotation.x =
        -t * 0.42;

      ringInner.current.rotation.y =
        t * 0.22;

      const corePulse =
        1 +
        Math.sin(t * 3.2) *
          0.055;

      core.current.scale.setScalar(
        corePulse,
      );

      beam.current.scale.y =
        THREE.MathUtils.lerp(
          0.25,
          1,
          reveal,
        );

      const outerMaterial =
        ringOuter.current
          .material as
          THREE.MeshBasicMaterial;

      const middleMaterial =
        ringMiddle.current
          .material as
          THREE.MeshBasicMaterial;

      const innerMaterial =
        ringInner.current
          .material as
          THREE.MeshBasicMaterial;

      outerMaterial.opacity =
        0.26 * reveal;

      middleMaterial.opacity =
        0.13 * reveal;

      innerMaterial.opacity =
        0.34 * reveal;
    },
  );

  return (
    <group
      ref={group}
      position={[
        2.0,
        2.25,
        -20.55,
      ]}
      visible={false}
    >
      {/* vertical information beam */}
      <mesh
        ref={beam}
        position={[
          0,
          1.8,
          -0.04,
        ]}
        scale={[
          1,
          0.25,
          1,
        ]}
      >
        <cylinderGeometry
          args={[
            0.012,
            0.035,
            3.6,
            12,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* outer orbit */}
      <mesh
        ref={ringOuter}
        rotation={[
          0.42,
          0.38,
          0,
        ]}
      >
        <torusGeometry
          args={[
            1.32,
            0.012,
            10,
            72,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.26}
          depthWrite={false}
        />
      </mesh>

      {/* middle orbit */}
      <mesh
        ref={ringMiddle}
        rotation={[
          -0.4,
          0.25,
          0.35,
        ]}
      >
        <torusGeometry
          args={[
            0.95,
            0.009,
            10,
            72,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.13}
          depthWrite={false}
        />
      </mesh>

      {/* inner orbit */}
      <mesh
        ref={ringInner}
        rotation={[
          0.7,
          -0.2,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.62,
            0.015,
            10,
            64,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.34}
          depthWrite={false}
        />
      </mesh>

      {/* core */}
      <mesh ref={core}>
        <icosahedronGeometry
          args={[
            0.25,
            2,
          ]}
        />

        <meshStandardMaterial
          color="#10161c"
          emissive="#ff6a00"
          emissiveIntensity={0.8}
          metalness={0.72}
          roughness={0.22}
        />
      </mesh>

      <pointLight
        color="#ff6a00"
        intensity={1.4}
        distance={4.2}
        decay={2}
      />
    </group>
  );
}
