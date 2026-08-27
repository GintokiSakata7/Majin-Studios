"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

type Props = {
  progressRef: ScanfeastProgressRef;
  from: THREE.Vector3;
  to: THREE.Vector3;

  start: number;
  end: number;

  speed?: number;
  delay?: number;
  size?: number;
};

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

export default function EventPulse({
  progressRef,
  from,
  to,
  start,
  end,
  speed = 0.25,
  delay = 0,
  size = 1,
}: Props) {
  const group =
    useRef<THREE.Group>(null);

  const core =
    useRef<THREE.Mesh>(null);

  const halo =
    useRef<THREE.Mesh>(null);

  const light =
    useRef<THREE.PointLight>(null);

  const position =
    useRef(
      new THREE.Vector3(),
    );

  useFrame(
    ({ clock }, delta) => {
      if (
        !group.current ||
        !core.current ||
        !halo.current ||
        !light.current
      ) {
        return;
      }

      const p =
        progressRef.current;

      const enter =
        range(
          p,
          start - 0.025,
          start + 0.02,
        );

      const leave =
        1 -
        range(
          p,
          end - 0.02,
          end + 0.025,
        );

      const visibility =
        enter * leave;

      group.current.visible =
        visibility >
        0.005;

      if (
        visibility <=
        0.005
      ) {
        return;
      }

      const t =
        clock.getElapsedTime();

      const travel =
        (
          t * speed +
          delay
        ) % 1;

      position.current.lerpVectors(
        from,
        to,
        travel,
      );

      group.current.position.lerp(
        position.current,
        1 -
          Math.exp(
            -13 * delta,
          ),
      );

      const pulse =
        1 +
        Math.sin(
          t * 9,
        ) *
          0.12;

      core.current.scale.setScalar(
        pulse * size,
      );

      halo.current.scale.setScalar(
        (1.8 +
          Math.sin(
            t * 4.2,
          ) *
            0.25) *
          size,
      );

      const coreMaterial =
        core.current.material as
          THREE.MeshBasicMaterial;

      const haloMaterial =
        halo.current.material as
          THREE.MeshBasicMaterial;

      coreMaterial.opacity =
        0.9 * visibility;

      haloMaterial.opacity =
        0.065 * visibility;

      light.current.intensity =
        0.65 *
        visibility;
    },
  );

  return (
    <group
      ref={group}
      position={from.toArray()}
      visible={false}
    >
      <mesh ref={core}>
        <sphereGeometry
          args={[
            0.065,
            16,
            16,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={halo}>
        <sphereGeometry
          args={[
            0.14,
            16,
            16,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.065}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      <pointLight
        ref={light}
        color="#ff6a00"
        intensity={0}
        distance={1.5}
        decay={2}
      />
    </group>
  );
}