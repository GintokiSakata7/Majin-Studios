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

type Props = {
  active: boolean;
};

export default function ServerActor({
  active,
}: Props) {
  const group =
    useRef<THREE.Group>(null);

  const { scene, animations } =
    useGLTF(
      "/scanfeast/models/server.glb"
    );

  const { actions } =
    useAnimations(
      animations,
      group
    );

  useEffect(() => {
    if (!actions) {
      return;
    }

    const names =
      Object.keys(actions);

    const idle =
      names.find(
        (name) =>
          /idle|stand/i.test(name)
      );

    const walk =
      names.find(
        (name) =>
          /walk|move/i.test(name)
      );

    if (
      active &&
      walk
    ) {
      idle &&
        actions[idle]
          ?.fadeOut(
            0.2
          );

      actions[walk]
        ?.reset()
        .fadeIn(0.25)
        .play();
    } else if (
      idle
    ) {
      walk &&
        actions[walk]
          ?.fadeOut(
            0.2
          );

      actions[idle]
        ?.reset()
        .fadeIn(0.25)
        .play();
    }
  }, [
    active,
    actions,
  ]);

  useFrame(
    (_, delta) => {
      if (!group.current) {
        return;
      }

      const target =
        active
          ? 1.5
          : 4.6;

      group.current.position.x =
        THREE.MathUtils.damp(
          group.current.position.x,
          target,
          3.4,
          delta
        );

      if (active) {
        group.current.rotation.y =
          Math.PI;
      }
    }
  );

  return (
    <group
      ref={group}
      position={[
        4.6,
        0,
        -1.7,
      ]}
      scale={0.95}
    >
      <primitive
        object={scene}
      />
    </group>
  );
}

useGLTF.preload(
  "/scanfeast/models/server.glb"
);