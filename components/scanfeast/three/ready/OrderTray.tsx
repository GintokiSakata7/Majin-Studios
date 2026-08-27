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

type Props = {
  active: boolean;
  progressRef: ScanfeastProgressRef;
  position?: [number, number, number];
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

  const activeAction =
    useRef<
      THREE.AnimationAction | null
    >(null);

  useEffect(() => {
    if (!actions) {
      return;
    }

    const names =
      Object.keys(actions);

    const workName =
      names.find((name) =>
        /cook|work/i.test(name),
      ) ??
      names.find((name) =>
        /idle|stand/i.test(name),
      ) ??
      names[0];

    if (!workName) {
      return;
    }

    const action =
      actions[workName];

    if (!action) {
      return;
    }

    action.reset();
    action.setLoop(
      THREE.LoopRepeat,
      Infinity,
    );
    action.fadeIn(0.35);
    action.play();

    activeAction.current =
      action;

    return () => {
      action.fadeOut(0.2);
      action.stop();
    };
  }, [actions]);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    const p = progressRef.current;

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

    const retreat =
      THREE.MathUtils.smootherstep(
        THREE.MathUtils.clamp(
          (p - 0.55) / 0.11,
          0,
          1,
        ),
        0,
        1,
      );

    const actorVisibility =
      reveal * (1 - retreat);

    const targetX =
      position[0] +
      THREE.MathUtils.lerp(
        0.65,
        0,
        reveal,
      ) +
      retreat * 1.2;

    const targetY =
      position[1] +
      THREE.MathUtils.lerp(
        -0.35,
        0,
        reveal,
      ) -
      retreat * 0.2;

    const targetZ =
      position[2] -
      retreat * 0.45;

    group.current.position.x =
      THREE.MathUtils.damp(
        group.current.position.x,
        targetX,
        7,
        delta,
      );

    group.current.position.y =
      THREE.MathUtils.damp(
        group.current.position.y,
        targetY,
        7,
        delta,
      );

    group.current.position.z =
      THREE.MathUtils.damp(
        group.current.position.z,
        targetZ,
        7,
        delta,
      );

    const breathing =
      1 +
      Math.sin(
        performance.now() * 0.0012,
      ) *
      0.006;

    const finalScale =
      scale *
      THREE.MathUtils.lerp(
        0.92,
        1,
        actorVisibility,
      ) *
      breathing;

    group.current.scale.set(
      finalScale,
      finalScale,
      finalScale,
    );

    const lookTarget =
      THREE.MathUtils.lerp(
        -0.25,
        0.18,
        reveal,
      ) -
      retreat * 0.3;

    group.current.rotation.y =
      THREE.MathUtils.damp(
        group.current.rotation.y,
        lookTarget,
        6,
        delta,
      );

    group.current.visible =
      active &&
      actorVisibility >
      0.015;

    if (activeAction.current) {
      activeAction.current.timeScale =
        THREE.MathUtils.lerp(
          0.35,
          1,
          actorVisibility,
        );
    }
  });

  return (
    <group
      ref={group}
      position={position}
    >
      <primitive
        object={scene}
      />
    </group>
  );
}

useGLTF.preload(
  "/scanfeast/models/chef.glb",
);