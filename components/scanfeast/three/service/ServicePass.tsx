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

import type {
  OrderPhase,
} from "../../scanfeast-state";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

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

export default function ServicePass({
  progressRef,
  phase,
}: {
  progressRef: ScanfeastProgressRef;
  phase: OrderPhase;
}) {
  const group =
    useRef<THREE.Group>(null);

  const status =
    useRef<THREE.Mesh>(null);

  const light =
    useRef<THREE.PointLight>(null);

  const ready = phase === "ready";

  useFrame(
    ({ clock }, delta) => {
      if (
        !group.current ||
        !status.current ||
        !light.current
      ) {
        return;
      }

      const p =
        progressRef.current;

      const reveal =
        range(
          p,
          0.49,
          0.57,
        );

      const exit =
        range(
          p,
          0.65,
          0.73,
        );

      group.current.visible =
        p >= 0.46 &&
        p <= 0.75;

      group.current.position.y =
        THREE.MathUtils.damp(
          group.current.position.y,
          THREE.MathUtils.lerp(
            -0.35,
            0,
            reveal,
          ) -
            exit * 0.35,
          7,
          delta,
        );

      group.current.scale.setScalar(
        THREE.MathUtils.damp(
          group.current.scale.x,
          THREE.MathUtils.lerp(
            0.9,
            1,
            reveal,
          ),
          7,
          delta,
        ),
      );

      const pulse =
        ready
          ? 1 +
            Math.sin(
              clock.getElapsedTime() *
                7,
            ) *
              0.13
          : 0.35;

      status.current.scale.setScalar(
        pulse,
      );

      const material =
        status.current.material as
          THREE.MeshBasicMaterial;

      material.color.set(
        ready
          ? "#8ce1ad"
          : "#ff6a00",
      );

      light.current.intensity =
        ready
          ? 1.1
          : 0.2;
    },
  );

  return (
    <group
      ref={group}
      position={[
        0,
        -0.35,
        0,
      ]}
    >
      <mesh castShadow>
        <boxGeometry
          args={[
            5.3,
            0.95,
            0.88,
          ]}
        />

        <meshStandardMaterial
          color="#272e35"
          roughness={0.48}
          metalness={0.22}
        />
      </mesh>

      <mesh
        position={[
          0,
          0.52,
          -0.02,
        ]}
      >
        <boxGeometry
          args={[
            4.85,
            0.065,
            0.72,
          ]}
        />

        <meshStandardMaterial
          color="#969ca1"
          roughness={0.27}
          metalness={0.5}
        />
      </mesh>

      <mesh
        ref={status}
        position={[
          0,
          1.08,
          -0.16,
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
          color="#ff6a00"
        />
      </mesh>

      <pointLight
        ref={light}
        position={[
          0,
          1.08,
          -0.16,
        ]}
        color="#ff6a00"
        intensity={0.2}
        distance={2.6}
        decay={2}
      />

      <Html
        transform
        center
        position={[
          0,
          1.38,
          -0.14,
        ]}
        distanceFactor={5.3}
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
            {ready
              ? "ORDER READY"
              : "HANDOFF"}
          </strong>

          <small>
            #4029 / LIVE
          </small>
        </div>
      </Html>
    </group>
  );
}