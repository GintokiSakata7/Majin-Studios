"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

import OperationsAccess from "./OperationsAccess";
import OperationsDisplays from "./OperationsDisplays";

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

export default function OperationsZone({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const group =
    useRef<THREE.Group>(null);

  const roomGlow =
    useRef<THREE.Mesh>(null);

  const rearLight =
    useRef<THREE.PointLight>(null);

  useFrame(
    ({ clock }, delta) => {
      if (!group.current || !roomGlow.current || !rearLight.current) {
        return;
      }

      const p =
        progressRef.current;

      group.current.visible = p > 0.58 && p < 0.96;

      const reveal =
        range(
          p,
          0.62,
          0.74,
        );

      const retreat =
        1 -
        range(
          p,
          0.85,
          0.92,
        );
        
      const visibility = reveal * retreat;
      
      const htmlOverlays = document.querySelectorAll('.sf-ops-html') as NodeListOf<HTMLElement>;
      htmlOverlays.forEach((el) => {
        el.style.opacity = visibility.toString();
        el.style.transition = "opacity 0.1s ease-out";
      });

      const targetY =
        THREE.MathUtils.lerp(
          -0.45,
          0,
          reveal,
        ) -
        (1 - retreat) * 1.1;

      group.current.position.y =
        THREE.MathUtils.damp(
          group.current.position.y,
          targetY,
          5.5,
          delta,
        );

      group.current.scale.setScalar(
        THREE.MathUtils.damp(
          group.current.scale.x,
          THREE.MathUtils.lerp(
            0.88,
            1,
            reveal,
          ),
          5.5,
          delta,
        ),
      );

      group.current.rotation.y =
        THREE.MathUtils.damp(
          group.current.rotation.y,
          (1 - retreat) * -0.035,
          4,
          delta,
        );

      group.current.visible =
        p > 0.58 &&
        p < 0.96;

      const t =
        clock.getElapsedTime();

      const glowPulse =
        0.55 +
        Math.sin(
          t * 2.4,
        ) *
          0.12;

      const glowMaterial =
        roomGlow.current
          .material as
          THREE.MeshBasicMaterial;

      glowMaterial.opacity =
        0.025 +
        (1 - retreat) *
          0.045;

      rearLight.current.intensity =
        0.45 +
        reveal *
          0.45 +
        (1 - retreat) *
          0.25 +
        glowPulse *
          0.08;
    },
  );

  return (
    <group
      ref={group}
      position={[
        1.0,
        -0.45,
        -20.35,
      ]}
    >
      <OperationsAccess
        progressRef={
          progressRef
        }
      />

      {/* Room floor */}
      <mesh receiveShadow>
        <boxGeometry
          args={[
            8.6,
            0.28,
            5.3,
          ]}
        />

        <meshStandardMaterial
          color="#22282e"
          roughness={0.84}
        />
      </mesh>

      {/* Rear wall */}
      <mesh
        position={[
          0,
          2.8,
          -2.25,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            8.15,
            4.6,
            0.12,
          ]}
        />

        <meshStandardMaterial
          color="#11161b"
          roughness={0.82}
        />
      </mesh>

      {/* Left side wall */}
      <mesh
        position={[
          -4.05,
          2.55,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            4.9,
            5.0,
          ]}
        />

        <meshStandardMaterial
          color="#171d23"
          roughness={0.84}
        />
      </mesh>

      {/* Right side wall */}
      <mesh
        position={[
          4.05,
          2.55,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            4.9,
            5.0,
          ]}
        />

        <meshStandardMaterial
          color="#171d23"
          roughness={0.84}
        />
      </mesh>

      {/* Operations desk */}
      <mesh
        position={[
          0,
          0.76,
          0.55,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            7.1,
            0.92,
            1.5,
          ]}
        />

        <meshStandardMaterial
          color="#14191f"
          roughness={0.38}
          metalness={0.28}
        />
      </mesh>

      {/* Desk top */}
      <mesh
        position={[
          0,
          1.24,
          0.55,
        ]}
      >
        <boxGeometry
          args={[
            6.92,
            0.06,
            1.38,
          ]}
        />

        <meshStandardMaterial
          color="#777e84"
          roughness={0.28}
          metalness={0.46}
        />
      </mesh>

      {/* Desk front light */}
      <mesh
        position={[
          0,
          0.48,
          -0.21,
        ]}
      >
        <boxGeometry
          args={[
            5.8,
            0.018,
            0.018,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Rear data wall */}
      <mesh
        position={[
          0,
          2.82,
          -2.16,
        ]}
      >
        <planeGeometry
          args={[
            7.5,
            2.7,
          ]}
        />

        <meshBasicMaterial
          color="#0a0f14"
        />
      </mesh>

      {/* Grid on rear wall */}
      {Array.from({
        length: 7,
      }).map((_, index) => (
        <mesh
          key={`v-${index}`}
          position={[
            -3.3 +
              index * 1.1,
            2.85,
            -2.08,
          ]}
        >
          <boxGeometry
            args={[
              0.01,
              2.25,
              0.01,
            ]}
          />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.025}
          />
        </mesh>
      ))}

      <OperationsDisplays />

      {/* Ambient system glow */}
      <mesh
        ref={roomGlow}
        position={[
          0,
          2.6,
          -2.03,
        ]}
      >
        <planeGeometry
          args={[
            7.4,
            2.65,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.025}
          depthWrite={false}
        />
      </mesh>

      <pointLight
        ref={rearLight}
        position={[
          0,
          2.8,
          -1.4,
        ]}
        color="#ff6a00"
        intensity={0.6}
        distance={8}
        decay={2}
      />

      <pointLight
        position={[
          -3.0,
          2.0,
          0.3,
        ]}
        color="#b8c8d2"
        intensity={0.75}
        distance={5}
        decay={2}
      />

      <Html
        position={[
          0,
          4.05,
          -2.0,
        ]}
        center
        style={{
          pointerEvents: "none",
        }}
      >
        <div className="sf-ops-world-title sf-ops-html">
          <span>
            06 / MANAGER OPERATIONS
          </span>

          <strong>
            LIVE RESTAURANT OVERVIEW
          </strong>

          <small>
            ORDERS · REVENUE · STATE
          </small>
        </div>
      </Html>
    </group>
  );
}