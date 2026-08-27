"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CookingSteam({
  active,
}: {
  active: boolean;
}) {
  const group =
    useRef<THREE.Group>(null);

  useFrame(
    ({ clock }, delta) => {
      if (!group.current) {
        return;
      }

      const t =
        clock.getElapsedTime();

      group.current.visible =
        active;

      group.current.children.forEach(
        (child, index) => {
          const phase =
            index * 1.8;

          const cycle =
            (
              t * 0.25 +
              phase
            ) % 0.95;

          const fade =
            Math.sin(
              (cycle /
                0.95) *
                Math.PI,
            );

          child.position.y =
            1.0 +
            cycle * 0.9;

          child.position.x =
            Math.sin(
              t * 0.7 +
                phase,
            ) *
            0.075;

          child.position.z =
            Math.cos(
              t * 0.42 +
                phase,
            ) *
            0.04;

          const targetScale =
            active
              ? 0.35 +
                fade * 0.28
              : 0;

          child.scale.setScalar(
            THREE.MathUtils.damp(
              child.scale.x,
              targetScale,
              7,
              delta,
            ),
          );

          const material =
            child.material as
              THREE.MeshBasicMaterial;

          material.opacity =
            0.045 *
            fade;
        },
      );
    },
  );

  return (
    <group
      ref={group}
      visible={active}
    >
      {[0, 1, 2, 3].map(
        (index) => (
          <mesh
            key={index}
          >
            <sphereGeometry
              args={[
                0.05,
                10,
                10,
              ]}
            />

            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.04}
              depthWrite={false}
            />
          </mesh>
        ),
      )}
    </group>
  );
}