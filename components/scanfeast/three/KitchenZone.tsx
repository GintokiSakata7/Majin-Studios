"use client";

import {
  Html,
} from "@react-three/drei";

import AssetModel from "./AssetModel";
import KitchenStation from "./KitchenStation";
import CookingSteam from "./CookingSteam";
import ChefActor from "./ChefActor";

import {
  SCANFEAST_ASSETS,
} from "../scanfeast-assets";

import type {
  OrderPhase,
} from "../scanfeast-state";

export default function KitchenZone({
  phase,
}: {
  phase: OrderPhase;
}) {
  const cooking =
    phase === "cooking";

  return (
    <group
      position={[
        3.1,
        0,
        -1.8,
      ]}
    >
      {/* PROCEDURAL KITCHEN SHELL */}
      <mesh
        position={[
          0,
          2.1,
          -2.55,
        ]}
      >
        <boxGeometry
          args={[
            7.5,
            4.2,
            0.14,
          ]}
        />

        <meshStandardMaterial
          color="#161b23"
          roughness={0.82}
        />
      </mesh>

      <mesh
        position={[
          3.72,
          2.1,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.14,
            4.2,
            5.1,
          ]}
        />

        <meshStandardMaterial
          color="#1b212b"
          roughness={0.82}
        />
      </mesh>

      {/* COUNTER */}
      <mesh
        position={[
          0,
          0.78,
          1.2,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            6.8,
            0.9,
            1.4,
          ]}
        />

        <meshStandardMaterial
          color="#303742"
          roughness={0.48}
        />
      </mesh>

      {/* WORK SURFACE */}
      <mesh
        position={[
          0,
          1.25,
          1.2,
        ]}
      >
        <boxGeometry
          args={[
            6.8,
            0.06,
            1.4,
          ]}
        />

        <meshStandardMaterial
          color="#8d929a"
          roughness={0.32}
          metalness={0.22}
        />
      </mesh>

      <KitchenStation
        phase={phase}
      />

      <CookingSteam
        active={cooking}
      />

      {/* PREP AREA */}
      <group
        position={[
          -1.8,
          1.3,
          1.15,
        ]}
      >
        <AssetModel
          src={
            SCANFEAST_ASSETS
              .cuttingBoard
          }
          scale={0.65}
        />

        <AssetModel
          src={
            SCANFEAST_ASSETS
              .knife
          }
          position={[
            0.22,
            0.04,
            0.08,
          ]}
          scale={0.42}
        />

        <AssetModel
          src={
            SCANFEAST_ASSETS
              .tomato
          }
          position={[
            -0.08,
            0.08,
            -0.1,
          ]}
          scale={0.4}
        />

        <AssetModel
          src={
            SCANFEAST_ASSETS
              .onion
          }
          position={[
            0.2,
            0.08,
            -0.12,
          ]}
          scale={0.4}
        />

        <AssetModel
          src={
            SCANFEAST_ASSETS
              .lettuce
          }
          position={[
            0.05,
            0.08,
            0.18,
          ]}
          scale={0.4}
        />
      </group>

      <ChefActor
        active={cooking}
        position={[
          -1.7,
          0,
          0.25,
        ]}
        scale={0.95}
      />

      <ChefActor
        active={cooking}
        position={[
          0,
          0,
          0.25,
        ]}
        scale={0.9}
      />

      {/* KDS */}
      <group
        position={[
          2.15,
          2.1,
          -2.42,
        ]}
      >
        <mesh>
          <boxGeometry
            args={[
              2.4,
              1.45,
              0.08,
            ]}
          />

          <meshStandardMaterial
            color="#0a0d12"
            roughness={0.24}
            metalness={0.35}
          />
        </mesh>

        <Html
          transform
          center
          position={[
            0,
            0,
            0.08,
          ]}
          distanceFactor={5}
          style={{
            pointerEvents:
              "none",
          }}
        >
          <div className="sf-kds">
            <div className="sf-kds__header">
              <span>
                KITCHEN DISPLAY
              </span>

              <b>
                #{4029}
              </b>
            </div>

            <div className="sf-kds__status">
              <i
                className={
                  cooking
                    ? "live"
                    : ""
                }
              />

              {cooking
                ? "COOKING"
                : "QUEUE"}
            </div>

            <div className="sf-kds__items">
              <span>
                VEG SPRING ROLLS
              </span>

              <span>
                BONDA
              </span>

              <span>
                ALOO BONDA
              </span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
