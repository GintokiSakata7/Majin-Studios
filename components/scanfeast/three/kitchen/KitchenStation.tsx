"use client";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import * as THREE from "three";

import AssetModel from "../AssetModel";

import {
  SCANFEAST_ASSETS,
} from "../../scanfeast-assets";

import type {
  OrderPhase,
} from "../../scanfeast-state";

export default function KitchenStation({
  phase,
}: {
  phase: OrderPhase;
}) {
  const flame =
    useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!flame.current) {
      return;
    }

    const cooking =
      phase === "cooking";

    const t =
      clock.getElapsedTime();

    const targetScale =
      cooking ? 1 : 0;

    const pulse =
      1 +
      Math.sin(t * 9.5) *
      0.12;

    flame.current.scale.x =
      THREE.MathUtils.damp(
        flame.current.scale.x,
        targetScale *
        0.92 *
        pulse,
        8,
        delta,
      );

    flame.current.scale.y =
      THREE.MathUtils.damp(
        flame.current.scale.y,
        targetScale *
        1.05 *
        (1 +
          Math.sin(
            t * 12,
          ) *
          0.13),
        8,
        delta,
      );

    flame.current.scale.z =
      THREE.MathUtils.damp(
        flame.current.scale.z,
        targetScale *
        0.92 *
        pulse,
        8,
        delta,
      );

    flame.current.visible =
      flame.current.scale.y >
      0.02;
  });

  const cooking =
    phase === "cooking";

  const cooked =
    phase === "ready";

  return (
    <group>
      <AssetModel
        src={
          SCANFEAST_ASSETS.stove
        }
        position={[
          0,
          0,
          -0.65,
        ]}
        scale={0.82}
        castShadow
        receiveShadow
      />

      <AssetModel
        src={
          SCANFEAST_ASSETS.pan
        }
        position={[
          0.1,
          0.95,
          -0.63,
        ]}
        scale={0.66}
      />

      {(cooking || cooked) && (
        <AssetModel
          src={
            cooked
              ? SCANFEAST_ASSETS
                .burgerCooked
              : SCANFEAST_ASSETS
                .burgerRaw
          }
          position={[
            0.1,
            0.99,
            -0.63,
          ]}
          scale={0.56}
        />
      )}

      <mesh
        ref={flame}
        position={[
          0.1,
          0.98,
          -0.63,
        ]}
        scale={[0, 0, 0]}
      >
        <sphereGeometry
          args={[
            0.07,
            12,
            12,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.58}
        />
      </mesh>

      <pointLight
        position={[
          0.1,
          1.2,
          -0.63,
        ]}
        color="#ff7a1a"
        intensity={
          cooking ? 1.8 : 0
        }
        distance={2}
      />
    </group>
  );
}