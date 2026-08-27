"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import AssetModel from "../AssetModel";
import { SCANFEAST_ASSETS } from "../../scanfeast-assets";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

type TableProps = {
  position: [
    number,
    number,
    number,
  ];

  rotation?: [
    number,
    number,
    number,
  ];

  active?: boolean;
};

function ease(
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

function Table({
  position,
  rotation = [0, 0, 0],
  active = false,
}: TableProps) {
  const group =
    useRef<THREE.Group>(null);

  useFrame(
    ({ clock }) => {
      if (!group.current) {
        return;
      }

      const pulse =
        active
          ? 1 +
            Math.sin(
              clock.getElapsedTime() * 1.6,
            ) *
              0.006
          : 1;

      group.current.scale.setScalar(
        pulse,
      );
    },
  );

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
    >
      <AssetModel
        src={SCANFEAST_ASSETS.table}
        scale={0.76}
        castShadow
        receiveShadow
      />

      <AssetModel
        src={SCANFEAST_ASSETS.chair}
        position={[
          -1.12,
          0,
          0,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
        scale={0.8}
        castShadow
      />

      <AssetModel
        src={SCANFEAST_ASSETS.chairAlt}
        position={[
          1.12,
          0,
          0,
        ]}
        rotation={[
          0,
          -Math.PI / 2,
          0,
        ]}
        scale={0.8}
        castShadow
      />

      {/* second pair */}
      <AssetModel
        src={SCANFEAST_ASSETS.chairStool}
        position={[
          0,
          0,
          0.95,
        ]}
        rotation={[
          0,
          Math.PI,
          0,
        ]}
        scale={0.62}
        castShadow
      />

      <AssetModel
        src={SCANFEAST_ASSETS.chairStool}
        position={[
          0,
          0,
          -0.95,
        ]}
        scale={0.62}
        castShadow
      />
    </group>
  );
}

function RestaurantShell() {
  return (
    <group>
      {/* left structural wall */}
      <AssetModel
        src={SCANFEAST_ASSETS.wall}
        position={[
          -8.0,
          0,
          2.2,
        ]}
        rotation={[
          0,
          0,
          0,
        ]}
        scale={1}
        castShadow
        receiveShadow
      />

      {/* rear wall */}
      <AssetModel
        src={SCANFEAST_ASSETS.wall}
        position={[
          -3.2,
          0,
          -2.25,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
        scale={1}
        castShadow
        receiveShadow
      />

      {/* main entry / transition */}
      <AssetModel
        src={SCANFEAST_ASSETS.doorway}
        position={[
          -0.2,
          0,
          2.18,
        ]}
        rotation={[
          0,
          Math.PI,
          0,
        ]}
        scale={1}
        castShadow
        receiveShadow
      />

      {/* order/service opening */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.orderWindow
        }
        position={[
          -0.4,
          0,
          -2.18,
        ]}
        rotation={[
          0,
          0,
          0,
        ]}
        scale={0.95}
        castShadow
        receiveShadow
      />

      {/* window */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.window
        }
        position={[
          -6.35,
          2.1,
          0.1,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
        scale={0.9}
      />

      {/* door panel */}
      <AssetModel
        src={SCANFEAST_ASSETS.door}
        position={[
          3.65,
          0,
          2.0,
        ]}
        rotation={[
          0,
          -Math.PI / 2,
          0,
        ]}
        scale={0.95}
        castShadow
      />
    </group>
  );
}

function CeilingPendant({
  position,
}: {
  position: [
    number,
    number,
    number,
  ];
}) {
  return (
    <group
      position={position}
    >
      <mesh>
        <cylinderGeometry
          args={[
            0.018,
            0.018,
            0.82,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#555c63"
          metalness={0.72}
          roughness={0.28}
        />
      </mesh>

      <mesh
        position={[
          0,
          -0.49,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            0.13,
            18,
            18,
          ]}
        />

        <meshStandardMaterial
          color="#ded3c7"
          emissive="#b56530"
          emissiveIntensity={0.2}
          roughness={0.42}
        />
      </mesh>

      <pointLight
        position={[
          0,
          -0.5,
          0,
        ]}
        intensity={0.42}
        distance={3.8}
        decay={2}
        color="#ffd0a8"
      />
    </group>
  );
}

function TableAccent({
  position,
}: {
  position: [
    number,
    number,
    number,
  ];
}) {
  return (
    <group
      position={position}
    >
      <AssetModel
        src={SCANFEAST_ASSETS.plate}
        scale={0.22}
      />

      <AssetModel
        src={SCANFEAST_ASSETS.bowl}
        position={[
          0.12,
          0.03,
          0.08,
        ]}
        scale={0.17}
      />
    </group>
  );
}

export default function DinerSet({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const group =
    useRef<THREE.Group>(null);

  useFrame(
    (_, delta) => {
      if (!group.current) {
        return;
      }

      const p =
        progressRef.current;

      /*
       * Opening reveal.
       */
      const enter =
        ease(
          p,
          0,
          0.065,
        );

      /*
       * Once the camera starts leaving
       * the diner, the restaurant remains
       * physically present but recedes.
       */
      const exit =
        ease(
          p,
          0.20,
          0.43,
        );

      const targetX =
        THREE.MathUtils.lerp(
          -4.2,
          -4.85,
          exit,
        );

      const targetY =
        THREE.MathUtils.lerp(
          -0.28,
          -1.0,
          exit,
        );

      const targetZ =
        THREE.MathUtils.lerp(
          2.2,
          2.65,
          exit,
        );

      const targetScale =
        THREE.MathUtils.lerp(
          0.98,
          0.88,
          exit,
        );

      group.current.position.x =
        THREE.MathUtils.damp(
          group.current.position.x,
          targetX,
          7,
          delta,
        );

      group.current.position.y =
        THREE.MathUtils.damp(
          group.current.position.y,
          targetY +
            THREE.MathUtils.lerp(
              -0.22,
              0,
              enter,
            ),
          7,
          delta,
        );

      group.current.position.z =
        THREE.MathUtils.damp(
          group.current.position.z,
          targetZ,
          7,
          delta,
        );

      group.current.scale.setScalar(
        THREE.MathUtils.damp(
          group.current.scale.x,
          targetScale,
          6,
          delta,
        ),
      );

      group.current.rotation.y =
        THREE.MathUtils.damp(
          group.current.rotation.y,
          -0.025 * exit,
          5,
          delta,
        );

      /*
       * Keep it mounted. This makes the camera
       * pass feel spatial rather than a scene swap.
       */
      group.current.visible =
        p < 0.48;
    },
  );

  return (
    <group
      ref={group}
      position={[
        -4.2,
        -0.28,
        2.2,
      ]}
    >
      {/* floor */}
      <mesh
        receiveShadow
        position={[
          0,
          -0.02,
          0,
        ]}
      >
        <boxGeometry
          args={[
            10.6,
            0.18,
            9.4,
          ]}
        />

        <meshStandardMaterial
          color="#252a30"
          roughness={0.9}
        />
      </mesh>

      <RestaurantShell />

      {/* hero table */}
      <Table
        position={[
          0,
          0,
          0.35,
        ]}
        active
      />

      <TableAccent
        position={[
          -0.1,
          0.8,
          0.15,
        ]}
      />

      {/* background seating */}
      <Table
        position={[
          3.15,
          0,
          1.85,
        ]}
      />

      <Table
        position={[
          3.2,
          0,
          -1.35,
        ]}
        rotation={[
          0,
          Math.PI * 0.12,
          0,
        ]}
      />

      <Table
        position={[
          -2.5,
          0,
          -1.55,
        ]}
        rotation={[
          0,
          -Math.PI * 0.1,
          0,
        ]}
      />

      {/* lighting rhythm */}
      <CeilingPendant
        position={[
          -0.15,
          3.8,
          0.35,
        ]}
      />

      <CeilingPendant
        position={[
          3.15,
          3.8,
          1.85,
        ]}
      />

      <CeilingPendant
        position={[
          3.2,
          3.8,
          -1.35,
        ]}
      />

      {/* architectural floor guide */}
      <mesh
        position={[
          -2.8,
          0.04,
          -0.1,
        ]}
      >
        <boxGeometry
          args={[
            0.018,
            0.012,
            6.7,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.24}
        />
      </mesh>

      {/* subtle table scan marker */}
      <mesh
        position={[
          0,
          0.84,
          0.35,
        ]}
      >
        <ringGeometry
          args={[
            0.19,
            0.21,
            32,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>

      <pointLight
        position={[
          -2.2,
          2.8,
          1.0,
        ]}
        color="#ffd5b4"
        intensity={0.8}
        distance={5.5}
        decay={2}
      />
    </group>
  );
}