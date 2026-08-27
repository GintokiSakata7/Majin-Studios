"use client";

import {
  Suspense,
  useRef,
  useState,
} from "react";

import {
  ContactShadows,
  Environment,
} from "@react-three/drei";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE from "three";

import CameraDirector, {
  type ScanfeastProgressRef,
} from "./CameraDirector";

import DinerZone from "./DinerZone";

import KitchenZone from "./KitchenZone";

import OrderFlow from "./OrderFlow";

import OrderTray from "./OrderTray";

import ServerActor from "./ServerActor";

import SystemArchitecture from "./SystemArchitecture";

import type {
  OrderPhase,
} from "../scanfeast-state";

import {
  getOrderPhase,
} from "../scanfeast-state";

export default function ScanfeastScene({
  progressRef,
}: {
  progressRef:
    ScanfeastProgressRef;
}) {
  const [
    phase,
    setPhase,
  ] =
    useState<OrderPhase>(
      "idle"
    );

  const previous =
    useRef<OrderPhase>(
      "idle"
    );

  useFrame(() => {
    const next =
      getOrderPhase(
        progressRef.current
      );

    if (
      next !== previous.current
    ) {
      previous.current =
        next;

      setPhase(next);
    }
  });

  return (
    <>
      <color
        attach="background"
        args={["#0a0d12"]}
      />

      <fog
        attach="fog"
        args={[
          "#0a0d12",
          15,
          36,
        ]}
      />

      <ambientLight
        intensity={0.75}
      />

      <hemisphereLight
        intensity={1.2}
        color="#ffffff"
        groundColor="#171b22"
      />

      <directionalLight
        position={[
          -6,
          10,
          8,
        ]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={
          2048
        }
        shadow-mapSize-height={
          2048
        }
      />

      <directionalLight
        position={[
          7,
          4,
          -3,
        ]}
        intensity={0.55}
      />

      <pointLight
        position={[
          -3,
          4,
          4,
        ]}
        color="#ff7a1a"
        intensity={2.5}
        distance={11}
      />

      <Environment
        preset="studio"
        environmentIntensity={0.45}
      />

      <CameraDirector
        progressRef={
          progressRef
        }
      />

      <RestaurantBase />

      <Suspense fallback={null}>
        <DinerZone />
      </Suspense>

      <Suspense fallback={null}>
        <KitchenZone
          phase={phase}
        />
      </Suspense>

      <ServerActor
        active={
          phase === "ready"
        }
      />

      <OrderTray
        visible={
          phase === "ready"
        }
      />

      <OrderFlow
        progressRef={
          progressRef
        }
        phase={phase}
      />

      <SystemArchitecture
        progressRef={
          progressRef
        }
      />

      <ContactShadows
        position={[
          0,
          0,
          0,
        ]}
        scale={18}
        far={10}
        blur={2.4}
        opacity={0.24}
        frames={1}
      />
    </>
  );
}

function RestaurantBase() {
  return (
    <group>
      <mesh
        position={[
          0,
          -0.12,
          0,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            28,
            0.24,
            26,
          ]}
        />

        <meshStandardMaterial
          color="#141920"
          roughness={0.92}
        />
      </mesh>

      <mesh
        position={[
          0,
          2.3,
          -1.7,
        ]}
      >
        <boxGeometry
          args={[
            0.08,
            4.6,
            7,
          ]}
        />

        <meshStandardMaterial
          color="#1a2028"
          roughness={0.88}
        />
      </mesh>

      <mesh
        position={[
          -1.8,
          3.7,
          -1.7,
        ]}
      >
        <boxGeometry
          args={[
            3.4,
            0.018,
            0.018,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
        />
      </mesh>
    </group>
  );
}
