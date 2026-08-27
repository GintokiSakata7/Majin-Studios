"use client";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import * as THREE from "three";

export type ScanfeastProgressRef =
  React.MutableRefObject<number>;

type Shot = {
  start: number;

  position: [
    number,
    number,
    number
  ];

  lookAt: [
    number,
    number,
    number
  ];

  fov: number;
};

const SHOTS: readonly Shot[] = [
  {
    start: 0,

    position: [
      -10.5,
      5.6,
      12.5,
    ],

    lookAt: [
      -2.2,
      1.15,
      0.8,
    ],

    fov: 48,
  },

  {
    start: 0.10,

    position: [
      -6.2,
      3.1,
      7.6,
    ],

    lookAt: [
      -4.0,
      1.15,
      0.6,
    ],

    fov: 45,
  },

  {
    start: 0.24,

    position: [
      -2.2,
      2.8,
      5.2,
    ],

    lookAt: [
      -0.2,
      1.15,
      -0.45,
    ],

    fov: 43,
  },

  {
    start: 0.36,

    position: [
      4.4,
      3.0,
      4.6,
    ],

    lookAt: [
      2.5,
      1.25,
      -0.9,
    ],

    fov: 43,
  },

  {
    start: 0.58,

    position: [
      5.0,
      3.2,
      1.3,
    ],

    lookAt: [
      3.2,
      1.3,
      -1.1,
    ],

    fov: 44,
  },

  {
    start: 0.68,

    position: [
      1.5,
      3.8,
      -5.2,
    ],

    lookAt: [
      -1.5,
      1.8,
      -6.6,
    ],

    fov: 46,
  },

  {
    start: 0.85,

    position: [
      0,
      4.5,
      -12.5,
    ],

    lookAt: [
      0,
      2.0,
      -9.8,
    ],

    fov: 48,
  },
];

export default function CameraDirector({
  progressRef,
}: {
  progressRef:
    ScanfeastProgressRef;
}) {
  const {
    camera,
  } = useThree();

  const targetPosition =
    useRef(
      new THREE.Vector3()
    );

  const targetLook =
    useRef(
      new THREE.Vector3()
    );

  const currentLook =
    useRef(
      new THREE.Vector3()
    );

  useFrame(
    (_, delta) => {
      const progress =
        THREE.MathUtils.clamp(
          progressRef.current,
          0,
          1
        );

      let from =
        SHOTS[0];

      let to =
        SHOTS[
          SHOTS.length - 1
        ];

      for (
        let i = 0;
        i < SHOTS.length - 1;
        i++
      ) {
        if (
          progress >=
            SHOTS[i].start &&
          progress <=
            SHOTS[i + 1].start
        ) {
          from = SHOTS[i];
          to = SHOTS[i + 1];
          break;
        }
      }

      const range =
        Math.max(
          to.start -
            from.start,
          0.0001
        );

      const local =
        THREE.MathUtils.clamp(
          (
            progress -
            from.start
          ) /
            range,
          0,
          1
        );

      const eased =
        THREE.MathUtils.smootherstep(
          local,
          0,
          1
        );

      targetPosition.current.set(
        THREE.MathUtils.lerp(
          from.position[0],
          to.position[0],
          eased
        ),
        THREE.MathUtils.lerp(
          from.position[1],
          to.position[1],
          eased
        ),
        THREE.MathUtils.lerp(
          from.position[2],
          to.position[2],
          eased
        )
      );

      targetLook.current.set(
        THREE.MathUtils.lerp(
          from.lookAt[0],
          to.lookAt[0],
          eased
        ),
        THREE.MathUtils.lerp(
          from.lookAt[1],
          to.lookAt[1],
          eased
        ),
        THREE.MathUtils.lerp(
          from.lookAt[2],
          to.lookAt[2],
          eased
        )
      );

      const move =
        1 -
        Math.exp(
          -6 * delta
        );

      const look =
        1 -
        Math.exp(
          -8 * delta
        );

      camera.position.lerp(
        targetPosition.current,
        move
      );

      currentLook.current.lerp(
        targetLook.current,
        look
      );

      camera.lookAt(
        currentLook.current
      );

      camera.fov =
        THREE.MathUtils.lerp(
          camera.fov,
          THREE.MathUtils.lerp(
            from.fov,
            to.fov,
            eased
          ),
          move
        );

      camera.updateProjectionMatrix();
    }
  );

  return null;
}
