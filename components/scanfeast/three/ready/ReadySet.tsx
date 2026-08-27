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

import OrderTray from "./OrderTray";
import ServerActor from "../ServerActor";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

import type {
  OrderPhase,
} from "../../scanfeast-state";

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
        0.00001,
      ),
      0,
      1,
    ),
    0,
    1,
  );
}

export default function ReadySet({
  progressRef,
  phase,
}: {
  progressRef: ScanfeastProgressRef;
  phase: OrderPhase;
}) {
  const group =
    useRef<THREE.Group>(null);

  const statusLight =
    useRef<THREE.Mesh>(null);

  useFrame(
    ({ clock }, delta) => {
      if (
        !group.current ||
        !statusLight.current
      ) {
        return;
      }

      const p =
        progressRef.current;

      const reveal =
        range(
          p,
          0.51,
          0.60,
        );

      const exit =
        range(
          p,
          0.66,
          0.74,
        );

      const targetX =
        THREE.MathUtils.lerp(
          0.9,
          0,
          reveal,
        ) -
        exit * 1.4;

      const targetY =
        THREE.MathUtils.lerp(
          -0.45,
          0,
          reveal,
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
          targetY,
          7,
          delta,
        );

      group.current.scale.setScalar(
        THREE.MathUtils.damp(
          group.current.scale.x,
          THREE.MathUtils.lerp(
            0.8,
            1,
            reveal,
          ),
          7,
          delta,
        ),
      );

      group.current.visible =
        p > 0.48 &&
        p < 0.76;

      const ready =
        phase === "ready";

      const pulse =
        ready
          ? 1 +
          Math.sin(
            clock.getElapsedTime() *
            7,
          ) *
          0.12
          : 0.4;

      statusLight.current.scale.setScalar(
        pulse,
      );
    },
  );

  return (
    <group
      ref={group}
      position={[
        0.9,
        -0.45,
        -6,
      ]}
    >
      <mesh
        position={[
          3,
          1.05,
          -5.35,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            4.15,
            1.05,
            0.9,
          ]}
        />

        <meshStandardMaterial
          color="#30373e"
          roughness={0.44}
          metalness={0.24}
        />
      </mesh>

      <mesh
        position={[
          3,
          1.58,
          -5.35,
        ]}
      >
        <boxGeometry
          args={[
            4,
            0.07,
            0.78,
          ]}
        />

        <meshStandardMaterial
          color="#a0a5aa"
          roughness={0.28}
          metalness={0.48}
        />
      </mesh>

      <mesh
        ref={statusLight}
        position={[
          3,
          2,
          -5.48,
        ]}
      >
        <sphereGeometry
          args={[
            0.075,
            18,
            18,
          ]}
        />

        <meshBasicMaterial
          color={
            phase === "ready"
              ? "#8ce1ad"
              : "#ff6a00"
          }
        />
      </mesh>

      <OrderTray
        progressRef={progressRef}
        active={phase === "ready"}
      />

      <ServerActor
        progressRef={
          progressRef
        }
        active={
          phase === "ready"
        }
      />

      <Html
        position={[
          3,
          2.35,
          -5.35,
        ]}
        center
        style={{
          pointerEvents:
            "none",
        }}
      >
        <div className="sf-ready-world-label">
          <span>
            SERVICE PASS
          </span>

          <strong>
            {phase === "ready"
              ? "ORDER READY"
              : "AWAITING HANDOFF"}
          </strong>

          <small>
            #4029 · LIVE STATE
          </small>
        </div>
      </Html>
    </group>
  );
}