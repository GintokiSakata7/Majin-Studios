"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type MonitorProps = {
  position: [number, number, number];
  title: string;
  value: string;
  detail: string;
  index: number;
  accent?: "orange" | "green";
};

function Monitor({
  position,
  title,
  value,
  detail,
  index,
  accent = "orange",
}: MonitorProps) {
  const group =
    useRef<THREE.Group>(null);

  const status =
    useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current || !status.current) {
      return;
    }

    const t = clock.getElapsedTime();

    group.current.position.y =
      THREE.MathUtils.damp(
        group.current.position.y,
        position[1] +
          Math.sin(
            t * 0.7 + index * 0.6,
          ) *
            0.012,
        4,
        delta,
      );

    const pulse =
      1 +
      Math.sin(
        t * 2.8 + index,
      ) *
        0.08;

    status.current.scale.y =
      pulse;
  });

  const accentColor =
    accent === "green"
      ? "#8ce1ad"
      : "#ff6a00";

  return (
    <group
      ref={group}
      position={position}
    >
      {/* Monitor housing */}
      <mesh castShadow>
        <boxGeometry
          args={[
            2.08,
            1.38,
            0.10,
          ]}
        />

        <meshStandardMaterial
          color="#090d12"
          roughness={0.18}
          metalness={0.52}
        />
      </mesh>

      {/* Screen */}
      <mesh
        position={[
          0,
          0,
          0.061,
        ]}
      >
        <planeGeometry
          args={[
            1.82,
            1.10,
          ]}
        />

        <meshBasicMaterial
          color="#0d141a"
        />
      </mesh>

      {/* Graph bars */}
      {[0, 1, 2, 3, 4, 5].map(
        (bar) => (
          <mesh
            key={bar}
            position={[
              -0.62 +
                bar * 0.24,
              -0.16 +
                (bar % 3) *
                  0.09,
              0.072,
            ]}
          >
            <boxGeometry
              args={[
                0.10,
                0.18 +
                  (bar % 3) *
                    0.08,
                0.008,
              ]}
            />

            <meshBasicMaterial
              color={accentColor}
              transparent
              opacity={
                0.28 +
                (bar % 3) *
                  0.08
              }
            />
          </mesh>
        ),
      )}

      {/* Active indicator */}
      <mesh
        ref={status}
        position={[
          0,
          -0.47,
          0.075,
        ]}
      >
        <boxGeometry
          args={[
            1.62,
            0.014,
            0.014,
          ]}
        />

        <meshBasicMaterial
          color={accentColor}
        />
      </mesh>

      <Html
        transform
        center
        rotation={[0, Math.PI, 0]}
        position={[
          0,
          0,
          0.09,
        ]}
        distanceFactor={5.3}
        style={{
          pointerEvents: "none",
          userSelect: "none"
        }}
      >
        <div className="sf-ops-monitor sf-ops-html">
          <span>{title}</span>

          <strong>{value}</strong>

          <small>{detail}</small>
        </div>
      </Html>
    </group>
  );
}

export default function OperationsDisplays() {
  return (
    <group>
      <Monitor
        position={[
          -2.35,
          2.12,
          -1.25,
        ]}
        title="ORDERS"
        value="24"
        detail="LIVE QUEUE"
        index={0}
      />

      <Monitor
        position={[
          0,
          2.12,
          -1.25,
        ]}
        title="REVENUE"
        value="₹12.4K"
        detail="TODAY"
        index={1}
      />

      <Monitor
        position={[
          2.35,
          2.12,
          -1.25,
        ]}
        title="SYSTEM"
        value="LIVE"
        detail="SOCKET.IO"
        index={2}
        accent="green"
      />
    </group>
  );
}