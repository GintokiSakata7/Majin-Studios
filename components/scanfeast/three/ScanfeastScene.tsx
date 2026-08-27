"use client";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
  useState,
} from "react";

import type {
  ScanfeastProgressRef,
} from "./CameraDirector";

import CameraDirector from "./CameraDirector";
import SceneLighting from "./SceneLighting";
import SceneLabels from "./SceneLabels";
import CinematicTransition from "./CinematicTransition";
import WorldFade from "./WorldFade";

import SystemTransform from "./system/SystemTransform";
import SystemArchitecture3D from "./system/SystemArchitecture3D";

import DinerSet from "./diner/DinerSet";

import ServiceCorridor from "./service/ServiceCorridor";
import OrderFlow from "./service/OrderFlow";
import ServicePass from "./service/ServicePass";

import KitchenSet from "./kitchen/KitchenSet";

import ReadySet from "./ready/ReadySet";

import OperationsZone from "./operations/OperationsZone";

import type {
  OrderPhase,
} from "../scanfeast-state";

import {
  getOrderPhase,
} from "../scanfeast-state";

export default function ScanfeastScene({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const [
    phase,
    setPhase,
  ] =
    useState<OrderPhase>("idle");

  const previousPhase =
    useRef<OrderPhase>("idle");

  useFrame(() => {
    const nextPhase =
      getOrderPhase(
        progressRef.current,
      );

    if (
      nextPhase !==
      previousPhase.current
    ) {
      previousPhase.current =
        nextPhase;

      setPhase(nextPhase);
    }
  });

  return (
    <>
      {/* WORLD */}
      <SceneLighting
        progressRef={
          progressRef
        }
      />

      <CameraDirector
        progressRef={
          progressRef
        }
      />

      <DinerSet
        progressRef={
          progressRef
        }
      />

      <ServiceCorridor
        progressRef={
          progressRef
        }
      />

      <OrderFlow
        progressRef={
          progressRef
        }
        phase={phase}
      />

      <KitchenSet
        progressRef={
          progressRef
        }
        phase={phase}
      />

      <ServicePass
        progressRef={
          progressRef
        }
        phase={phase}
      />

      <ReadySet
        progressRef={
          progressRef
        }
        phase={phase}
      />

      <OperationsZone
        progressRef={
          progressRef
        }
      />

      {/* TRANSFORMATION */}
      <CinematicTransition
        progressRef={
          progressRef
        }
      />

      <WorldFade
        progressRef={
          progressRef
        }
      />

      <SystemTransform
        progressRef={
          progressRef
        }
      />

      {/* SOFTWARE */}
      <SystemArchitecture3D
        progressRef={
          progressRef
        }
      />

      {/* EDITORIAL */}
      <SceneLabels
        progressRef={
          progressRef
        }
        phase={phase}
      />
    </>
  );
}