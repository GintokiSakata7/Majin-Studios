"use client";

import {
  Line,
} from "@react-three/drei";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import * as THREE from "three";

import type {
  OrderPhase,
} from "../scanfeast-state";

import type {
  ScanfeastProgressRef,
} from "./CameraDirector";

const POINTS = [
  [-4.2, 1.35, 1.1],
  [-3.0, 1.42, 0.75],
  [-1.2, 1.48, 0.1],
  [0.8, 1.5, -0.55],
  [2.2, 1.48, -1.0],
  [4.1, 1.5, -1.72],
] as const;

export default function OrderFlow({
  progressRef,
  phase,
}: {
  progressRef:
    ScanfeastProgressRef;

  phase: OrderPhase;
}) {
  const packet =
    useRef<THREE.Group>(null);

  const curve =
    useMemo(
      () =>
        new THREE.CatmullRomCurve3(
          POINTS.map(
            (point) =>
              new THREE.Vector3(
                ...point
              )
          )
        ),
      []
    );

  const active =
    phase === "placed" ||
    phase === "accepted" ||
    phase === "cooking";

  useFrame(() => {
    if (!packet.current) {
      return;
    }

    packet.current.visible =
      active;

    if (!active) {
      return;
    }

    const progress =
      THREE.MathUtils.clamp(
        (
          progressRef.current -
          0.14
        ) / 0.3,
        0,
        1
      );

    packet.current.position.copy(
      curve.getPointAt(
        progress
      )
    );
  });

  return (
    <>
      <Line
        points={curve
          .getPoints(64)
          .map(
            (point) => [
              point.x,
              point.y,
              point.z,
            ]
          )}
        color="#ff6a00"
        transparent
        opacity={0.22}
        lineWidth={1}
      />

      <group
        ref={packet}
        visible={false}
      >
        <mesh>
          <sphereGeometry
            args={[
              0.055,
              12,
              12,
            ]}
          />

          <meshBasicMaterial
            color="#ff6a00"
          />
        </mesh>

        <pointLight
          color="#ff6a00"
          intensity={0.8}
          distance={0.8}
        />
      </group>
    </>
  );
}