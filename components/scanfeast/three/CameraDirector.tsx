"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export type ScanfeastProgressRef = {
  current: number;
};

type Shot = {
  start: number;
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
};

const SHOTS: readonly Shot[] = [
  /*
   * 01 — ESTABLISH
   */
  {
    start: 0,
    position: new THREE.Vector3(
      -7.4,
      3.55,
      10.4,
    ),
    lookAt: new THREE.Vector3(
      -4.2,
      1.15,
      2.1,
    ),
    fov: 48,
  },

  /*
   * 02 — TABLE APPROACH
   */
  {
    start: 0.075,
    position: new THREE.Vector3(
      -5.4,
      2.55,
      7.25,
    ),
    lookAt: new THREE.Vector3(
      -3.8,
      1.08,
      2.35,
    ),
    fov: 43,
  },

  /*
   * 03 — ORDER FOCUS
   */
  {
    start: 0.145,
    position: new THREE.Vector3(
      -3.55,
      1.85,
      5.15,
    ),
    lookAt: new THREE.Vector3(
      -4.05,
      1.08,
      2.3,
    ),
    fov: 40,
  },

  /*
   * 04 — LEAVE THE TABLE
   */
  {
    start: 0.215,
    position: new THREE.Vector3(
      -1.55,
      1.62,
      3.0,
    ),
    lookAt: new THREE.Vector3(
      -0.2,
      1.32,
      -0.4,
    ),
    fov: 41,
  },

  /*
   * 05 — ENTER SERVICE
   */
  {
    start: 0.29,
    position: new THREE.Vector3(
      0.2,
      1.78,
      0.7,
    ),
    lookAt: new THREE.Vector3(
      1.15,
      1.3,
      -2.6,
    ),
    fov: 40,
  },

  /*
   * 06 — KITCHEN ENTRY
   */
  {
    start: 0.37,
    position: new THREE.Vector3(
      4.75,
      1.72,
      -12.0,
    ),
    lookAt: new THREE.Vector3(
      3.25,
      1.35,
      -14.0,
    ),
    fov: 41,
  },

  /*
   * 07 — KDS
   */
  {
    start: 0.445,
    position: new THREE.Vector3(
      5.55,
      1.62,
      -13.35,
    ),
    lookAt: new THREE.Vector3(
      3.85,
      1.85,
      -13.95,
    ),
    fov: 38,
  },

  /*
   * 08 — COOKING
   */
  {
    start: 0.51,
    position: new THREE.Vector3(
      4.15,
      1.48,
      -13.95,
    ),
    lookAt: new THREE.Vector3(
      1.1,
      1.15,
      -11.2,
    ),
    fov: 39,
  },

  /*
   * 09 — READY
   */
  {
    start: 0.595,
    position: new THREE.Vector3(
      5.0,
      1.62,
      -14.65,
    ),
    lookAt: new THREE.Vector3(
      5.1,
      1.35,
      -15.35,
    ),
    fov: 39,
  },

  /*
   * 10 — OPERATIONS
   */
  {
    start: 0.695,
    position: new THREE.Vector3(
      2.55,
      3.1,
      -17.35,
    ),
    lookAt: new THREE.Vector3(
      1.8,
      1.95,
      -20.5,
    ),
    fov: 43,
  },

  /*
   * 11 — OPERATIONS WIDE
   */
  {
    start: 0.77,
    position: new THREE.Vector3(
      3.2,
      3.25,
      -15.5,
    ),
    lookAt: new THREE.Vector3(
      1.8,
      2.15,
      -20.5,
    ),
    fov: 46,
  },

  /*
   * 12 — SYSTEM SHIFT
   */
  {
    start: 0.86,
    position: new THREE.Vector3(
      3.4,
      4.4,
      -16.0,
    ),
    lookAt: new THREE.Vector3(
      2.0,
      2.3,
      -20.5,
    ),
    fov: 47,
  },

  /*
   * 13 — SYSTEM
   */
  {
    start: 0.95,
    position: new THREE.Vector3(
      2.0,
      4.15,
      -28.4,
    ),
    lookAt: new THREE.Vector3(
      2.0,
      1.5,
      -20.5,
    ),
    fov: 45,
  },

  {
    start: 1,
    position: new THREE.Vector3(
      2.0,
      4.15,
      -28.45,
    ),
    lookAt: new THREE.Vector3(
      2.0,
      1.5,
      -20.5,
    ),
    fov: 45,
  },
];

function findSegment(
  progress: number,
) {
  for (
    let index = 0;
    index < SHOTS.length - 1;
    index += 1
  ) {
    const from = SHOTS[index];
    const to = SHOTS[index + 1];

    if (
      progress >= from.start &&
      progress <= to.start
    ) {
      return {
        from,
        to,
        index,
      };
    }
  }

  return {
    from:
      SHOTS[
        SHOTS.length - 2
      ],
    to:
      SHOTS[
        SHOTS.length - 1
      ],
    index:
      SHOTS.length - 2,
  };
}

export default function CameraDirector({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const initialized =
    useRef(false);

  const scrollProgress =
    useRef(0);

  const targetPosition =
    useRef(
      new THREE.Vector3(),
    );

  const targetLookAt =
    useRef(
      new THREE.Vector3(),
    );

  const currentLookAt =
    useRef(
      new THREE.Vector3(),
    );

  const previousPosition =
    useRef(
      new THREE.Vector3(),
    );

  useFrame((state, delta) => {
    const raw =
      THREE.MathUtils.clamp(
        progressRef.current,
        0,
        1,
      );

    /*
     * More responsive than the previous 6.5 damping.
     */
    scrollProgress.current =
      THREE.MathUtils.damp(
        scrollProgress.current,
        raw,
        8.5,
        delta,
      );

    const p =
      scrollProgress.current;

    const {
      from,
      to,
      index,
    } =
      findSegment(p);

    const segmentLength =
      Math.max(
        to.start -
          from.start,
        0.0001,
      );

    const local =
      THREE.MathUtils.clamp(
        (p - from.start) /
          segmentLength,
        0,
        1,
      );

    const eased =
      THREE.MathUtils.smootherstep(
        local,
        0,
        1,
      );

    targetPosition.current.lerpVectors(
      from.position,
      to.position,
      eased,
    );

    targetLookAt.current.lerpVectors(
      from.lookAt,
      to.lookAt,
      eased,
    );

    /*
     * Small parallax makes the camera feel physical.
     */
    const parallax =
      Math.sin(
        local * Math.PI,
      );

    targetPosition.current.x +=
      Math.sin(
        p * Math.PI * 2 +
          index * 0.7,
      ) *
      0.055 *
      parallax;

    targetPosition.current.y +=
      Math.sin(
        p * Math.PI,
      ) *
      0.028;

    if (!initialized.current) {
      state.camera.position.copy(
        targetPosition.current,
      );

      currentLookAt.current.copy(
        targetLookAt.current,
      );

      previousPosition.current.copy(
        targetPosition.current,
      );

      initialized.current =
        true;
    }

    const positionAlpha =
      1 -
      Math.exp(
        -10.0 * delta,
      );

    const lookAlpha =
      1 -
      Math.exp(
        -11.5 * delta,
      );

    state.camera.position.lerp(
      targetPosition.current,
      positionAlpha,
    );

    currentLookAt.current.lerp(
      targetLookAt.current,
      lookAlpha,
    );

    state.camera.lookAt(
      currentLookAt.current,
    );

    const movement =
      state.camera.position.distanceTo(
        previousPosition.current,
      );

    /*
     * Subtle FOV push during actual camera travel.
     */
    const travelPush =
      THREE.MathUtils.clamp(
        movement * 10,
        0,
        1,
      );

    const targetFov =
      THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(
          from.fov,
          to.fov,
          eased,
        ),
        42,
        travelPush * 0.18,
      );

    const camera =
      state.camera as THREE.PerspectiveCamera;

    camera.fov =
      THREE.MathUtils.damp(
        camera.fov,
        targetFov,
        7,
        delta,
      );

    camera.updateProjectionMatrix();

    previousPosition.current.copy(
      state.camera.position,
    );
  });

  return null;
}