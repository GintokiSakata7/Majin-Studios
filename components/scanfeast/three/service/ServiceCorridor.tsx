"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

function range(
  value: number,
  start: number,
  end: number,
) {
  return THREE.MathUtils.smootherstep(
    THREE.MathUtils.clamp(
      (value - start) /
        Math.max(
          end - start,
          0.0001,
        ),
      0,
      1,
    ),
    0,
    1,
  );
}

export default function ServiceCorridor({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const group =
    useRef<THREE.Group>(null);

  const leftDoor =
    useRef<THREE.Group>(null);

  const rightDoor =
    useRef<THREE.Group>(null);

  const guide =
    useRef<THREE.Mesh>(null);

  useFrame(
    ({ clock }, delta) => {
      if (
        !group.current ||
        !leftDoor.current ||
        !rightDoor.current ||
        !guide.current
      ) {
        return;
      }

      const p =
        progressRef.current;

      const entrance =
        range(
          p,
          0.16,
          0.22,
        );

      const opening =
        range(
          p,
          0.20,
          0.31,
        );

      const exit =
        range(
          p,
          0.36,
          0.47,
        );

      group.current.visible =
        p > 0.135 &&
        p < 0.51;

      group.current.position.y =
        THREE.MathUtils.damp(
          group.current.position.y,
          THREE.MathUtils.lerp(
            -0.2,
            0,
            entrance,
          ),
        8,
        delta,
      );

      group.current.scale.setScalar(
        THREE.MathUtils.damp(
          group.current.scale.x,
          THREE.MathUtils.lerp(
            0.92,
            1,
            entrance,
          ),
          8,
          delta,
        ),
      );

      const doorTravel =
        THREE.MathUtils.lerp(
          0,
          0.78,
          opening,
        );

      leftDoor.current.position.x =
        THREE.MathUtils.damp(
          leftDoor.current.position.x,
          -doorTravel,
          9,
          delta,
        );

      rightDoor.current.position.x =
        THREE.MathUtils.damp(
          rightDoor.current.position.x,
          doorTravel,
          9,
          delta,
        );

      const guideMaterial =
        guide.current.material as
          THREE.MeshBasicMaterial;

      guideMaterial.opacity =
        0.10 +
        Math.sin(
          clock.getElapsedTime() *
            3,
        ) *
          0.025;

      /*
       * The corridor subtly recedes as the camera
       * completes the transition.
       */
      group.current.position.z =
        THREE.MathUtils.damp(
          group.current.position.z,
          -1.2 -
            exit * 1.2,
          6,
          delta,
        );
    },
  );

  return (
    <group
      ref={group}
      position={[
        -0.3,
        0,
        -1.2,
      ]}
    >
      {/* floor */}
      <mesh receiveShadow>
        <boxGeometry
          args={[
            3.2,
            0.16,
            7.2,
          ]}
        />

        <meshStandardMaterial
          color="#252c33"
          roughness={0.82}
          metalness={0.04}
        />
      </mesh>

      {/* left wall */}
      <mesh
        position={[
          -1.72,
          1.75,
          -1.8,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            0.10,
            3.5,
            7.2,
          ]}
        />

        <meshStandardMaterial
          color="#151b21"
          roughness={0.82}
        />
      </mesh>

      {/* right wall */}
      <mesh
        position={[
          1.72,
          1.75,
          -1.8,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            0.10,
            3.5,
            7.2,
          ]}
        />

        <meshStandardMaterial
          color="#151b21"
          roughness={0.82}
        />
      </mesh>

      {/* moving entry doors */}
      <group
        ref={leftDoor}
        position={[
          -0.62,
          1.65,
          1.8,
        ]}
      >
        <mesh castShadow>
          <boxGeometry
            args={[
              1.1,
              3.25,
              0.1,
            ]}
          />

          <meshPhysicalMaterial
            color="#1a2128"
            roughness={0.45}
            metalness={0.15}
            transmission={0.04}
          />
        </mesh>
      </group>

      <group
        ref={rightDoor}
        position={[
          0.62,
          1.65,
          1.8,
        ]}
      >
        <mesh castShadow>
          <boxGeometry
            args={[
              1.1,
              3.25,
              0.1,
            ]}
          />

          <meshPhysicalMaterial
            color="#1a2128"
            roughness={0.45}
            metalness={0.15}
            transmission={0.04}
          />
        </mesh>
      </group>

      {/* ceiling strip */}
      <mesh
        position={[
          0,
          3.35,
          -1.8,
        ]}
      >
        <boxGeometry
          args={[
            3.0,
            0.08,
            7.0,
          ]}
        />

        <meshStandardMaterial
          color="#11161c"
          roughness={0.86}
        />
      </mesh>

      {/* floor guide */}
      <mesh
        ref={guide}
        position={[
          0,
          0.015,
          -1.8,
        ]}
      >
        <boxGeometry
          args={[
            0.028,
            0.012,
            6.1,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.1}
        />
      </mesh>

      <pointLight
        position={[
          0,
          2.6,
          -2.0,
        ]}
        color="#ff6a00"
        intensity={0.25}
        distance={4.2}
      />
    </group>
  );
}