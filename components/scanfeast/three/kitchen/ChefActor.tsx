"use client";

import {
  useAnimations,
  useGLTF,
} from "@react-three/drei";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useEffect,
  useRef,
} from "react";

import * as THREE from "three";

import type {
  ScanfeastProgressRef,
} from "../CameraDirector";

import ActorFallback from "../ActorFallback";

type Props = {
  active: boolean;
  progressRef: ScanfeastProgressRef;
  position?: [
    number,
    number,
    number,
  ];
  scale?: number;
};

export default function ChefActor({
  active,
  progressRef,
  position = [0, 0, 0],
  scale = 1,
}: Props) {
  const group =
    useRef<THREE.Group>(null);

  const {
    scene,
    animations,
  } = useGLTF(
    "/scanfeast/models/chef.glb",
  );

  const {
    actions,
  } = useAnimations(
    animations,
    group,
  );

  const hasCharacter =
    scene.children.length > 0 &&
    scene.userData?.scanfeastCharacter === true;

  useEffect(() => {
    if (!hasCharacter || !actions) {
      return;
    }

    const names =
      Object.keys(actions);

    const actionName =
      names.find((name) =>
        /cook|work/i.test(name),
      ) ??
      names.find((name) =>
        /idle|stand/i.test(name),
      ) ??
      names[0];

    if (!actionName) {
      return;
    }

    const action =
      actions[actionName];

    action?.reset()
      .fadeIn(0.3)
      .play();

    return () => {
      action?.fadeOut(0.2);
      action?.stop();
    };
  }, [
    actions,
    hasCharacter,
  ]);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    const p =
      progressRef.current;

    const reveal =
      THREE.MathUtils.smootherstep(
        THREE.MathUtils.clamp(
          (p - 0.33) / 0.11,
          0,
          1,
        ),
        0,
        1,
      );

    const exit =
      THREE.MathUtils.smootherstep(
        THREE.MathUtils.clamp(
          (p - 0.55) / 0.1,
          0,
          1,
        ),
        0,
        1,
      );

    const visibility =
      reveal *
      (1 - exit);

    group.current.position.x =
      THREE.MathUtils.damp(
        group.current.position.x,
        position[0],
        7,
        delta,
      );

    group.current.position.y =
      THREE.MathUtils.damp(
        group.current.position.y,
        position[1],
        7,
        delta,
      );

    group.current.position.z =
      THREE.MathUtils.damp(
        group.current.position.z,
        position[2],
        7,
        delta,
      );

    group.current.scale.setScalar(
      scale *
      THREE.MathUtils.lerp(
        0.86,
        1,
        visibility,
      ),
    );

    group.current.visible =
      active &&
      visibility > 0.01;

    group.current.rotation.y =
      THREE.MathUtils.damp(
        group.current.rotation.y,
        -0.15,
        5,
        delta,
      );
  });

  return (
    <group>
      {hasCharacter ? (
        <group
          ref={group}
          position={position}
        >
          <primitive
            object={scene}
          />
        </group>
      ) : (
        <group
          ref={group}
          position={position}
        >
          <ActorFallback
            active={active}
            color="#dfe3e6"
          />
        </group>
      )}
    </group>
  );
}

useGLTF.preload(
  "/scanfeast/models/chef.glb",
);