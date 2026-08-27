"use client";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import * as THREE from "three";

import AssetModel from "./AssetModel";

import {
  SCANFEAST_ASSETS,
} from "../scanfeast-assets";

import type {
  OrderPhase,
} from "../scanfeast-state";

export default function KitchenStation({
  phase,
}: {
  phase: OrderPhase;
}) {
  const flame =
    useRef<THREE.Mesh>(null);

  const cooking =
    phase === "cooking";

  const cooked =
    phase === "ready";

  useFrame(
    ({ clock }) => {
      if (!flame.current) {
        return;
      }

      const t =
        clock.getElapsedTime();

      const pulse =
        1 +
        Math.sin(t * 10) *
          0.07;

      flame.current.scale.set(
        pulse,
        0.75 +
          Math.sin(t * 12) *
            0.08,
        pulse
      );
    }
  );

  return (
    <group>
      <AssetModel
        src={
          SCANFEAST_ASSETS.stove
        }
        position={[
          0,
          0,
          -0.55,
        ]}
        scale={0.82}
      />

      <AssetModel
        src={
          SCANFEAST_ASSETS.pan
        }
        position={[
          0.12,
          0.92,
          -0.52,
        ]}
        scale={0.7}
      />

      {(cooking ||
        cooked) && (
        <AssetModel
          src={
            cooked
              ? SCANFEAST_ASSETS
                  .burgerCooked
              : SCANFEAST_ASSETS
                  .burgerRaw
          }
          position={[
            0.12,
            0.97,
            -0.52,
          ]}
          scale={0.58}
        />
      )}

      <mesh
        ref={flame}
        position={[
          0.12,
          0.98,
          -0.52,
        ]}
        visible={cooking}
      >
        <sphereGeometry
          args={[
            0.07,
            10,
            10,
          ]}
        />

        <meshBasicMaterial
          color="#ff7118"
          transparent
          opacity={0.62}
        />
      </mesh>

      <pointLight
        position={[
          0.12,
          1.15,
          -0.52,
        ]}
        color="#ff7118"
        intensity={
          cooking ? 1.4 : 0
        }
        distance={2}
      />
    </group>
  );
}