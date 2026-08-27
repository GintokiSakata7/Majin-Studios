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

  position?: [
    number,
    number,
    number
  ];

  scale?: number;
};

export default function ChefActor({
  active,
  position = [
    0,
    0,
    0,
  ],
  scale = 1,
}: Props) {
  const group =
    useRef<THREE.Group>(null);

  const { scene, animations } =
    useGLTF(
      "/scanfeast/models/chef.glb"
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

    const work =
      names.find(
        (name) =>
          /cook|work|idle|stand/i.test(
            name
          )
      );

    if (work) {
      actions[work]
        ?.reset()
        .fadeIn(0.25)
        .play();
    }
  }, [actions]);

  useFrame(
    ({ clock }) => {
      if (!group.current) {
        return;
      }

      if (active) {
        group.current.rotation.y =
          Math.sin(
            clock.getElapsedTime() *
              0.5
          ) *
          0.035;
      }
    }
  );

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
    >
      <primitive
        object={scene}
      />
    </group>
  );
}

useGLTF.preload(
  "/scanfeast/models/chef.glb"
);
