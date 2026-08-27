"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import AssetModel from "../AssetModel";
import { SCANFEAST_ASSETS } from "../../scanfeast-assets";

import KitchenStation from "./KitchenStation";
import CookingSteam from "./CookingSteam";
import KitchenDisplay from "./KitchenDisplay";
import ChefActor from "./ChefActor";

import type {
  OrderPhase,
} from "../../scanfeast-state";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

type Props = {
  progressRef: ScanfeastProgressRef;
  phase: OrderPhase;
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

/* -------------------------------------------------------------------------- */
/* KITCHEN PROPS                                                              */
/* -------------------------------------------------------------------------- */

function KitchenCounterLine() {
  return (
    <group>
      {/* Main decorated counter */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.kitchenCounter
        }
        position={[
          -0.25,
          0,
          -0.25,
        ]}
        rotation={[
          0,
          0,
          0,
        ]}
        scale={0.9}
        castShadow
        receiveShadow
      />

      {/* Secondary counter */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.kitchenCounterB
        }
        position={[
          3.0,
          0,
          -0.25,
        ]}
        rotation={[
          0,
          0,
          0,
        ]}
        scale={0.9}
        castShadow
        receiveShadow
      />

      {/* Corner connection */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.kitchenCounterCorner
        }
        position={[
          3.05,
          0,
          -1.6,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
        scale={0.88}
        castShadow
        receiveShadow
      />
    </group>
  );
}

function KitchenBackLine() {
  return (
    <group>
      {/* Large prep table */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.kitchenTable
        }
        position={[
          -1.2,
          0,
          -2.0,
        ]}
        rotation={[
          0,
          0,
          0,
        ]}
        scale={0.82}
        castShadow
        receiveShadow
      />

      {/* Sink/prep table */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.kitchenSinkTable
        }
        position={[
          2.15,
          0,
          -2.05,
        ]}
        rotation={[
          0,
          0,
          0,
        ]}
        scale={0.82}
        castShadow
        receiveShadow
      />

      {/* Refrigerator */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.fridge
        }
        position={[
          3.25,
          0,
          -4.25,
        ]}
        rotation={[
          0,
          Math.PI,
          0,
        ]}
        scale={0.82}
        castShadow
        receiveShadow
      />

      {/* Rear shelf */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.shelf
        }
        position={[
          -2.2,
          0,
          -3.4,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
        scale={0.72}
        castShadow
        receiveShadow
      />

      {/* Dish rack */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.dishRack
        }
        position={[
          1.85,
          1.12,
          -3.2,
        ]}
        rotation={[
          0,
          Math.PI,
          0,
        ]}
        scale={0.55}
        castShadow
        receiveShadow
      />
    </group>
  );
}

function ExtractorAssembly() {
  return (
    <group
      position={[
        -0.1,
        2.35,
        -1.45,
      ]}
    >
      <AssetModel
        src={
          SCANFEAST_ASSETS.extractor
        }
        scale={0.92}
        castShadow
      />

      <mesh
        position={[
          0,
          0.78,
          -0.04,
        ]}
      >
        <boxGeometry
          args={[
            2.9,
            0.05,
            0.05,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* FOOD / PREP                                                                */
/* -------------------------------------------------------------------------- */

function PrepObjects() {
  return (
    <group
      position={[
        -1.15,
        1.05,
        -0.35,
      ]}
    >
      {/* Cutting board */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.cuttingBoard
        }
        scale={0.5}
      />

      {/* Knife */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.knife
        }
        position={[
          0.32,
          0.06,
          0.04,
        ]}
        rotation={[
          0,
          0,
          -0.14,
        ]}
        scale={0.32}
      />

      {/* Ingredients */}
      <AssetModel
        src={
          SCANFEAST_ASSETS.tomato
        }
        position={[
          -0.16,
          0.07,
          -0.12,
        ]}
        scale={0.24}
      />

      <AssetModel
        src={
          SCANFEAST_ASSETS.onion
        }
        position={[
          0.12,
          0.07,
          -0.12,
        ]}
        scale={0.24}
      />

      <AssetModel
        src={
          SCANFEAST_ASSETS.lettuce
        }
        position={[
          0.0,
          0.08,
          0.15,
        ]}
        scale={0.25}
      />

      <AssetModel
        src={
          SCANFEAST_ASSETS.bun
        }
        position={[
          -0.42,
          0.1,
          0.13,
        ]}
        scale={0.24}
      />
    </group>
  );
}

function StorageObjects() {
  return (
    <group
      position={[
        -2.85,
        0,
        -2.95,
      ]}
    >
      <AssetModel
        src={
          SCANFEAST_ASSETS.crateBuns
        }
        position={[
          0,
          0.35,
          0,
        ]}
        scale={0.45}
      />

      <AssetModel
        src={
          SCANFEAST_ASSETS.crateTomatoes
        }
        position={[
          0.58,
          0.35,
          0,
        ]}
        scale={0.45}
      />

      <AssetModel
        src={
          SCANFEAST_ASSETS.crateLettuce
        }
        position={[
          0,
          0.35,
          0.62,
        ]}
        scale={0.45}
      />

      <AssetModel
        src={
          SCANFEAST_ASSETS.crateOnions
        }
        position={[
          0.58,
          0.35,
          0.62,
        ]}
        scale={0.45}
      />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* KITCHEN LIGHTING                                                           */
/* -------------------------------------------------------------------------- */

function KitchenLighting({
  phase,
}: {
  phase: OrderPhase;
}) {
  const cooking =
    phase === "cooking";

  return (
    <>
      {/* overhead cool fill */}
      <rectAreaLight
        position={[
          0,
          4.4,
          -2.0,
        ]}
        width={7}
        height={3}
        intensity={3.0}
        color="#d7e0e5"
      />

      {/* stove practical */}
      <pointLight
        position={[
          0,
          1.5,
          -1.25,
        ]}
        intensity={
          cooking ? 2.5 : 0.65
        }
        distance={4}
        decay={2}
        color="#ff9759"
      />

      {/* rear cool light */}
      <pointLight
        position={[
          2.8,
          2.7,
          -4.1,
        ]}
        intensity={1.15}
        distance={5}
        decay={2}
        color="#b8cad4"
      />

      {/* subtle orange floor bounce */}
      <pointLight
        position={[
          -1.8,
          0.45,
          -0.9,
        ]}
        intensity={
          cooking ? 0.38 : 0.12
        }
        distance={3}
        decay={2}
        color="#ff6a00"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* KITCHEN SHELL                                                              */
/* -------------------------------------------------------------------------- */

function KitchenShell() {
  return (
    <group>
      {/* floor */}
      <mesh
        position={[
          0,
          -0.05,
          -1.45,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            7.2,
            0.14,
            7.0,
          ]}
        />

        <meshStandardMaterial
          color="#272d33"
          roughness={0.88}
          metalness={0.02}
        />
      </mesh>

      {/* rear structural wall */}
      <mesh
        position={[
          0,
          2.65,
          -4.65,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            7.3,
            5.3,
            0.12,
          ]}
        />

        <meshStandardMaterial
          color="#171c22"
          roughness={0.86}
        />
      </mesh>

      {/* left structural wall */}
      <mesh
        position={[
          -3.65,
          2.45,
          -1.5,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            0.12,
            4.9,
            6.8,
          ]}
        />

        <meshStandardMaterial
          color="#1a2026"
          roughness={0.84}
        />
      </mesh>

      {/* ceiling beam */}
      <mesh
        position={[
          0,
          4.95,
          -2.25,
        ]}
      >
        <boxGeometry
          args={[
            7.3,
            0.12,
            4.8,
          ]}
        />

        <meshStandardMaterial
          color="#10151b"
          roughness={0.92}
        />
      </mesh>

      {/* recessed orange guide */}
      <mesh
        position={[
          0,
          0.04,
          -0.6,
        ]}
      >
        <boxGeometry
          args={[
            0.025,
            0.012,
            5.7,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN KITCHEN                                                               */
/* -------------------------------------------------------------------------- */

export default function KitchenSet({
  progressRef,
  phase,
}: Props) {
  const group =
    useRef<THREE.Group>(null);

  useFrame(
    (_, delta) => {
      if (!group.current) {
        return;
      }

      const p =
        progressRef.current;
        
      group.current.visible = p > 0.18 && p < 0.74;

      /*
       * Kitchen begins entering the experience
       * during transmission and is fully established
       * before the camera reaches the KDS.
       */
      const reveal =
        range(
          p,
          0.265,
          0.40,
        );

      /*
       * Retreat begins only after the main kitchen
       * storytelling has completed.
       */
      const exit =
        range(
          p,
          0.56,
          0.69,
        );

      const targetY =
        THREE.MathUtils.lerp(
          -0.25,
          0,
          reveal,
        ) -
        exit * 0.35;

      const targetScale =
        THREE.MathUtils.lerp(
          0.95,
          1,
          reveal,
        );

      /*
       * Do NOT move the whole restaurant wildly.
       * Only use a tiny entrance offset so the environment
       * remains spatially believable.
       */
      group.current.position.y =
        THREE.MathUtils.damp(
          group.current.position.y,
          targetY,
          6,
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
          -exit * 0.018,
          5,
          delta,
        );

      group.current.visible =
        p > 0.22 &&
        p < 0.74;
    },
  );

  return (
    <group
      ref={group}
      position={[
        3.25,
        -0.25,
        -16.8,
      ]}
    >
      <KitchenLighting
        phase={phase}
      />

      <KitchenShell />

      <KitchenCounterLine />

      <KitchenBackLine />

      <ExtractorAssembly />

      <KitchenStation
        phase={phase}
      />

      <PrepObjects />

      <StorageObjects />

      <CookingSteam
        active={
          phase === "cooking"
        }
      />

      <ChefActor
        progressRef={progressRef}
        active={
          phase === "cooking"
        }
        position={[
          -1.35,
          0,
          -0.15,
        ]}
        scale={0.92}
      />

      <KitchenDisplay
        phase={phase}
        position={[
          1.8,
          2.35,
          -3.95,
        ]}
      />

      {/* Kitchen status strip */}
      <mesh
        position={[
          1.8,
          1.2,
          -3.9,
        ]}
      >
        <boxGeometry
          args={[
            2.7,
            0.018,
            0.025,
          ]}
        />

        <meshBasicMaterial
          color={
            phase === "ready"
              ? "#8ce1ad"
              : "#ff6a00"
          }
          transparent
          opacity={0.48}
        />
      </mesh>
    </group>
  );
}