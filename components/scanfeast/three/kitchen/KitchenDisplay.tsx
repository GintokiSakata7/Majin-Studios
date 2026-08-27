"use client";

import {
  Html,
} from "@react-three/drei";

import type {
  OrderPhase,
} from "../../scanfeast-state";

type Props = {
  phase: OrderPhase;

  position: [
    number,
    number,
    number,
  ];
};

export default function KitchenDisplay({
  phase,
  position,
}: Props) {
  const status =
    phase === "cooking"
      ? "COOKING"
      : phase === "ready"
        ? "READY"
        : phase === "accepted"
          ? "QUEUED"
          : "INCOMING";

  const detail =
    phase === "cooking"
      ? "ETA 08:42"
      : phase === "ready"
        ? "HANDOFF READY"
        : phase === "accepted"
          ? "QUEUE POSITION 01"
          : "NEW ORDER";

  return (
    <group
      position={position}
    >
      <mesh castShadow>
        <boxGeometry
          args={[
            2.45,
            1.5,
            0.1,
          ]}
        />

        <meshStandardMaterial
          color="#070b10"
          roughness={0.17}
          metalness={0.48}
        />
      </mesh>

      <mesh
        position={[
          0,
          0,
          0.055,
        ]}
      >
        <planeGeometry
          args={[
            2.2,
            1.24,
          ]}
        />

        <meshBasicMaterial
          color="#0b1117"
        />
      </mesh>

      <mesh
        position={[
          0,
          -0.47,
          0.07,
        ]}
      >
        <boxGeometry
          args={[
            1.9,
            0.012,
            0.015,
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

      <Html
        transform
        center
        position={[
          0,
          0,
          0.09,
        ]}
        distanceFactor={5.2}
        style={{
          pointerEvents:
            "none",
        }}
      >
        <div className="sf-kds-world">
          <span>
            KITCHEN DISPLAY SYSTEM
          </span>

          <strong>
            #4029
          </strong>

          <b>
            {status}
          </b>

          <small>
            {detail}
          </small>

          <small>
            FIFO · LIVE EVENT · SYNCED
          </small>
        </div>
      </Html>
    </group>
  );
}