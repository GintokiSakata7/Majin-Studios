"use client";

import {
  Html,
} from "@react-three/drei";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import * as THREE from "three";

import AssetModel from "./AssetModel";

export default function OrderTray({
  visible,
}: {
  visible: boolean;
}) {
  const group =
    useRef<THREE.Group>(null);

  useFrame(
    ({ clock }) => {
      if (!group.current) {
        return;
      }

      group.current.visible =
        visible;

      if (!visible) {
        return;
      }

      const t =
        clock.getElapsedTime();

      group.current.position.y =
        1.42 +
        Math.sin(t * 0.9) *
          0.025;

      group.current.rotation.y =
        Math.sin(t * 0.35) *
        0.025;
    }
  );

  return (
    <group
      ref={group}
      position={[
        1.8,
        1.42,
        -1.5,
      ]}
      visible={visible}
    >
      <AssetModel
        src="/scanfeast/models/plate.glb"
        scale={0.55}
      />

      <mesh
        position={[
          0,
          0.12,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            0.15,
            16,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#d9913f"
          roughness={0.85}
        />
      </mesh>

      <Html
        transform
        center
        position={[
          0,
          0.4,
          0,
        ]}
        distanceFactor={5}
        style={{
          pointerEvents:
            "none",
        }}
      >
        <div
          style={{
            fontFamily:
              "Inter, system-ui, sans-serif",
            fontSize: "9px",
            fontWeight: 800,
            letterSpacing:
              "0.12em",
            color:
              "#172033",
            whiteSpace:
              "nowrap",
          }}
        >
          ORDER 4029 · READY
        </div>
      </Html>
    </group>
  );
}
