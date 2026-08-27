"use client";

import {
  Html,
  Line,
} from "@react-three/drei";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import * as THREE from "three";

import type {
  OrderPhase,
} from "../scanfeast-state";

import type {
  ScanfeastProgressRef,
} from "./CameraDirector";

type LabelProps = {
  progressRef:
  ScanfeastProgressRef;

  start: number;

  end: number;

  position: [
    number,
    number,
    number,
  ];

  eyebrow: string;

  title: string;

  body: string;
};

export default function SceneLabels({
  progressRef,
  phase,
}: {
  progressRef: ScanfeastProgressRef;

  phase: OrderPhase;
}) {
  return (
    <group>
      <AnchoredLabel
        progressRef={
          progressRef
        }
        start={0.095}
        end={0.235}
        position={[
          -4.05,
          2.35,
          2.4,
        ]}
        eyebrow="DINER EXPERIENCE"
        title="SCAN → BROWSE → ORDER"
        body="The guest starts the workflow directly at the table."
      />

      <AnchoredLabel
        progressRef={
          progressRef
        }
        start={0.225}
        end={0.34}
        position={[
          -0.3,
          2.2,
          0.25,
        ]}
        eyebrow="REAL-TIME TRANSMISSION"
        title="ORDER EVENT"
        body="A placed order moves through the service path into the kitchen."
      />

      <AnchoredLabel
        progressRef={
          progressRef
        }
        start={0.34}
        end={0.56}
        position={[
          5.55,
          3.65,
          -12.05,
        ]}
        eyebrow="KITCHEN DISPLAY SYSTEM"
        title={
          phase ===
            "cooking"
            ? "FIFO / COOKING / ETA"
            : "KITCHEN QUEUE"
        }
        body="Live order state, preparation timing and kitchen actions."
      />

      <AnchoredLabel
        progressRef={
          progressRef
        }
        start={0.55}
        end={0.68}
        position={[
          5.75,
          2.75,
          -14.55,
        ]}
        eyebrow="SERVICE HANDOFF"
        title="READY → SERVER"
        body="The completed order returns to the service workflow."
      />

      <AnchoredLabel
        progressRef={
          progressRef
        }
        start={0.67}
        end={0.85}
        position={[
          1.9,
          5.0,
          -19.85,
        ]}
        eyebrow="MANAGER OPERATIONS"
        title="ONE VIEW OF THE RESTAURANT"
        body="Orders, revenue and operational state converge in one live view."
      />

    </group>
  );
}

function AnchoredLabel({
  progressRef,
  start,
  end,
  position,
  eyebrow,
  title,
  body,
}: LabelProps) {
  const group =
    useRef<THREE.Group>(null);

  const htmlRef =
    useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!group.current) {
      return;
    }

    const progress =
      progressRef.current;

    const active =
      progress >= start &&
      progress <= end;

    group.current.visible =
      active;

    if (!active) {
      if (htmlRef.current) {
        htmlRef.current.style.opacity = "0";
        htmlRef.current.style.pointerEvents = "none";
      }
      return;
    }

    const local =
      THREE.MathUtils.clamp(
        (
          progress -
          start
        ) /
        Math.max(
          end -
          start,
          0.0001,
        ),
        0,
        1,
      );

    // Bell curve for fade in/out
    const reveal =
      Math.sin(local * Math.PI);

    group.current.scale.setScalar(
      THREE.MathUtils.lerp(
        0.92,
        1,
        reveal,
      ),
    );
    
    if (htmlRef.current) {
      htmlRef.current.style.opacity = reveal.toString();
    }
  });

  return (
    <group
      ref={group}
      position={
        position
      }
    >
      <Line
        points={[
          [0, 0, 0],
          [0, -0.42, 0],
        ]}
        color="#ff6a00"
        transparent
        opacity={0.42}
        lineWidth={0.8}
      />

      <Html
        transform
        center
        position={[
          0,
          0.05,
          0,
        ]}
        distanceFactor={5.9}
      >
        <div 
          ref={htmlRef}
          className="sf-3d-label"
          style={{
            opacity: 0,
            transition: "opacity 0.1s ease-out",
            pointerEvents: "none",
            userSelect: "none"
          }}
        >
          <span>
            {eyebrow}
          </span>

          <strong>
            {title}
          </strong>

          <p>
            {body}
          </p>
        </div>
      </Html>
    </group>
  );
}