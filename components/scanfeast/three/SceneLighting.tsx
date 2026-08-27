"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import type {
  ScanfeastProgressRef,
} from "./CameraDirector";

export default function SceneLighting({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const { scene } = useThree();

  const restaurantKey =
    useRef<THREE.SpotLight>(null);

  const kitchenKey =
    useRef<THREE.PointLight>(null);

  const systemKey =
    useRef<THREE.PointLight>(null);

  const fill =
    useRef<THREE.DirectionalLight>(null);



  useFrame((_, delta) => {
    const p = THREE.MathUtils.clamp(
      progressRef.current,
      0,
      1,
    );

    const dinerWeight =
      1 -
      THREE.MathUtils.smoothstep(
        p,
        0.18,
        0.42,
      );

    const kitchenWeight =
      THREE.MathUtils.smoothstep(
        p,
        0.26,
        0.48,
      ) *
      (1 -
        THREE.MathUtils.smoothstep(
          p,
          0.58,
          0.70,
        ));

    const operationsWeight =
      THREE.MathUtils.smoothstep(
        p,
        0.62,
        0.82,
      );

    const systemWeight =
      THREE.MathUtils.smoothstep(
        p,
        0.82,
        0.98,
      );

    const smooth = 1 -
      Math.exp(-5.5 * delta);

    if (restaurantKey.current) {
      const target =
        9 +
        dinerWeight * 13 +
        kitchenWeight * 4;

      restaurantKey.current.intensity =
        THREE.MathUtils.lerp(
          restaurantKey.current.intensity,
          target,
          smooth,
        );
    }

    if (kitchenKey.current) {
      const target =
        kitchenWeight * 4.2;

      kitchenKey.current.intensity =
        THREE.MathUtils.lerp(
          kitchenKey.current.intensity,
          target,
          smooth,
        );
    }

    if (systemKey.current) {
      const target =
        operationsWeight * 1.2 +
        systemWeight * 2.6;

      systemKey.current.intensity =
        THREE.MathUtils.lerp(
          systemKey.current.intensity,
          target,
          smooth,
        );
    }

    if (fill.current) {
      const target =
        0.75 +
        dinerWeight * 0.35 +
        systemWeight * 0.2;

      fill.current.intensity =
        THREE.MathUtils.lerp(
          fill.current.intensity,
          target,
          smooth,
        );
    }
  });

  return (
    <>
      <color
        attach="background"
        args={["#070a0d"]}
      />

      <ambientLight
        intensity={0.42}
      />

      <hemisphereLight
        intensity={0.72}
        color="#f7f7f4"
        groundColor="#11151b"
      />

      <directionalLight
        ref={fill}
        position={[-6, 10, 8]}
        intensity={1.0}
        color="#e9edf2"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={35}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />

      <spotLight
        ref={restaurantKey}
        position={[-4.5, 6.8, 5.2]}
        intensity={18}
        angle={0.65}
        penumbra={0.9}
        distance={22}
        decay={2}
        color="#ffd6b2"
        castShadow
      />

      <pointLight
        ref={kitchenKey}
        position={[3.1, 2.7, -2.2]}
        intensity={0}
        distance={8}
        decay={2}
        color="#ff9b5e"
      />

      <pointLight
        ref={systemKey}
        position={[0, 4.0, -10.3]}
        intensity={0}
        distance={11}
        decay={2}
        color="#ff6a00"
      />
    </>
  );
}