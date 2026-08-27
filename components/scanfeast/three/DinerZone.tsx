"use client";

import AssetModel from "./AssetModel";

import {
  SCANFEAST_ASSETS,
} from "../scanfeast-assets";

export default function DinerZone() {
  return (
    <group
      position={[
        -4.1,
        0,
        1.0,
      ]}
    >
      <group
        position={[
          -0.8,
          0,
          0,
        ]}
      >
        <AssetModel
          src={
            SCANFEAST_ASSETS.table
          }
          scale={0.92}
        />

        <AssetModel
          src={
            SCANFEAST_ASSETS.chair
          }
          position={[
            -1.15,
            0,
            0,
          ]}
          rotation={[
            0,
            Math.PI / 2,
            0,
          ]}
          scale={0.9}
        />

        <AssetModel
          src={
            SCANFEAST_ASSETS.chair
          }
          position={[
            1.15,
            0,
            0,
          ]}
          rotation={[
            0,
            -Math.PI / 2,
            0,
          ]}
          scale={0.9}
        />

        {/* QR marker */}
        <mesh
          position={[
            0,
            1.01,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.2,
              0.015,
              0.2,
            ]}
          />

          <meshBasicMaterial
            color="#ff6a00"
          />
        </mesh>
      </group>

      <group
        position={[
          2.0,
          0,
          -1.8,
        ]}
      >
        <AssetModel
          src={
            SCANFEAST_ASSETS.table
          }
          scale={0.9}
        />

        <AssetModel
          src={
            SCANFEAST_ASSETS.chair
          }
          position={[
            0,
            0,
            1.1,
          ]}
          rotation={[
            0,
            Math.PI,
            0,
          ]}
          scale={0.86}
        />
      </group>

      <group
        position={[
          1.9,
          0,
          2.0,
        ]}
      >
        <AssetModel
          src={
            SCANFEAST_ASSETS.table
          }
          scale={0.86}
        />
      </group>
    </group>
  );
}
