"use client";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import * as THREE from "three";

export default function CookingSteam({
  active,
}: {
  active: boolean;
}) {
  const group =
    useRef<THREE.Group>(null);

  useFrame(
    ({ clock }) => {
      if (!group.current) {
        return;
      }

      const t =
        clock.getElapsedTime();

      group.current.children.forEach(
        (child, index) => {
          const offset =
            index * 1.7;

          child.position.y =
            1.0 +
            (
              (
                t * 0.28 +
                offset
              ) % 0.75
            );

          child.position.x =
            Math.sin(
              t * 0.55 +
                offset
            ) * 0.07;

          child.position.z =
            Math.cos(
              t * 0.4 +
                offset
            ) * 0.04;

          child.scale.setScalar(
            0.5 +
              Math.sin(
                t +
                  offset
              ) *
                0.07
          );
        }
      );
    }
  );

  return (
    <group
      ref={group}
      visible={active}
    >
      {[0, 1, 2].map(
        (index) => (
          <mesh key={index}>
            <sphereGeometry
              args={[
                0.05,
                8,
                8,
              ]}
            />

            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.035}
              depthWrite={false}
            />
          </mesh>
        )
      )}
    </group>
  );
}