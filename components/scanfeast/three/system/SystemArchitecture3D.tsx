"use client";

import {
  Html,
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
  ScanfeastProgressRef,
} from "../CameraDirector";

import EventPulse from "./EventPulse";

type NodeId =
  | "customer"
  | "api"
  | "socket"
  | "diner"
  | "kds"
  | "manager"
  | "db";

type SystemNode = {
  id: NodeId;
  label: string;
  position: [
    number,
    number,
    number,
  ];
  width: number;
};

const NODES: readonly SystemNode[] = [
  {
    id: "customer",
    label: "CUSTOMER",
    position: [
      -4.2,
      3.35,
      0.16,
    ],
    width: 1.7,
  },
  {
    id: "api",
    label: "EXPRESS REST API",
    position: [
      0,
      4.25,
      0.16,
    ],
    width: 2.15,
  },
  {
    id: "socket",
    label: "SOCKET.IO",
    position: [
      0,
      2.65,
      0.16,
    ],
    width: 1.85,
  },
  {
    id: "diner",
    label: "DINER",
    position: [
      -4.2,
      1.35,
      0.16,
    ],
    width: 1.65,
  },
  {
    id: "kds",
    label: "KDS",
    position: [
      0,
      1.35,
      0.16,
    ],
    width: 1.65,
  },
  {
    id: "manager",
    label: "MANAGER",
    position: [
      4.2,
      1.35,
      0.16,
    ],
    width: 1.8,
  },
  {
    id: "db",
    label: "MONGODB ATLAS",
    position: [
      0,
      0.0,
      0.16,
    ],
    width: 2.15,
  },
];

const EDGES: readonly [
  NodeId,
  NodeId,
  string,
][] = [
    [
      "customer",
      "api",
      "HTTP",
    ],
    [
      "api",
      "socket",
      "EVENT LAYER",
    ],
    [
      "socket",
      "diner",
      "REALTIME",
    ],
    [
      "socket",
      "kds",
      "WEBSOCKET",
    ],
    [
      "socket",
      "manager",
      "WEBSOCKET",
    ],
    [
      "socket",
      "db",
      "PERSISTENCE",
    ],
  ];

function getNode(
  id: NodeId,
) {
  const node =
    NODES.find(
      (item) =>
        item.id === id,
    );

  if (!node) {
    throw new Error(
      `Unknown Scanfeast system node: ${id}`,
    );
  }

  return node;
}

function getPosition(
  id: NodeId,
) {
  return new THREE.Vector3(
    ...getNode(id).position,
  );
}

function range(
  value: number,
  start: number,
  end: number,
) {
  return THREE.MathUtils.smootherstep(
    THREE.MathUtils.clamp(
      (value - start) /
      Math.max(
        end - start,
        0.0001,
      ),
      0,
      1,
    ),
    0,
    1,
  );
}

export default function SystemArchitecture3D({
  progressRef,
}: {
  progressRef: ScanfeastProgressRef;
}) {
  const group =
    useRef<THREE.Group>(null);

  const glow =
    useRef<THREE.Mesh>(null);

  const pulseRoutes =
    useMemo(
      () => ({
        request: {
          from:
            getPosition(
              "customer",
            ),
          to:
            getPosition(
              "api",
            ),
        },

        kitchen: {
          from:
            getPosition(
              "socket",
            ),
          to:
            getPosition(
              "kds",
            ),
        },

        manager: {
          from:
            getPosition(
              "socket",
            ),
          to:
            getPosition(
              "manager",
            ),
        },

        persistence: {
          from:
            getPosition(
              "socket",
            ),
          to:
            getPosition(
              "db",
            ),
        },
      }),
      [],
    );

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    const p =
      THREE.MathUtils.clamp(
        progressRef.current,
        0,
        1,
      );

    const reveal =
      range(
        p,
        0.90,
        0.95,
      );

    const exit =
      1 -
      range(
        p,
        0.975,
        1.0,
      );

    const visibility =
      reveal * exit;

    group.current.visible =
      p > 0.78;
      
    // Apply visibility to all HTML overlays in this component
    const htmlOverlays = document.querySelectorAll('.sf-arch-html') as NodeListOf<HTMLElement>;
    htmlOverlays.forEach((el) => {
      el.style.opacity = visibility.toString();
      el.style.transition = "opacity 0.1s ease-out";
    });

    const targetY =
      THREE.MathUtils.lerp(
        -0.7,
        0,
        reveal,
      );

    const targetScale =
      THREE.MathUtils.lerp(
        0.82,
        1,
        reveal,
      );

    group.current.position.y =
      THREE.MathUtils.damp(
        group.current.position.y,
        targetY,
        7,
        delta,
      );

    group.current.scale.setScalar(
      THREE.MathUtils.damp(
        group.current.scale.x,
        targetScale,
        7,
        delta,
      ),
    );

    if (glow.current) {
      const material =
        glow.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        0.035 *
        visibility;

      glow.current.rotation.z =
        THREE.MathUtils.damp(
          glow.current.rotation.z,
          p * 0.18,
          2,
          delta,
        );
    }
  });

  return (
    <group
      ref={group}
      position={[
        2.0,
        -0.7,
        -21.05,
      ]}
    >
      <mesh
        position={[
          0,
          2.2,
          -0.18,
        ]}
      >
        <planeGeometry
          args={[
            11.6,
            6.6,
          ]}
        />

        <meshBasicMaterial
          color="#090d12"
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={glow}
        position={[
          0,
          2.2,
          -0.12,
        ]}
      >
        <planeGeometry
          args={[
            11.35,
            6.35,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.025}
          wireframe
          depthWrite={false}
        />
      </mesh>

      <ArchitectureFrame />

      <Html
        position={[
          0,
          5.15,
          0.18,
        ]}
        center
        style={{
          pointerEvents:
            "none",
        }}
      >
        <div className="sf-system-title sf-arch-html">
          <span>
            07 / SYSTEM ARCHITECTURE
          </span>

          <strong>
            THE SOFTWARE BEHIND THE RESTAURANT
          </strong>

          <small>
            REST · REALTIME · PERSISTENCE
          </small>
        </div>
      </Html>

      <Connections />

      {NODES.map(
        (node) => (
          <SystemNode
            key={node.id}
            node={node}
          />
        ),
      )}

      <EventPulse
        progressRef={progressRef}
        from={pulseRoutes.request.from}
        to={pulseRoutes.request.to}
        start={0.88}
        end={0.96}
        speed={0.22}
      />

      <EventPulse
        progressRef={progressRef}
        from={pulseRoutes.kitchen.from}
        to={pulseRoutes.kitchen.to}
        start={0.90}
        end={0.98}
        speed={0.3}
        delay={0.18}
      />

      <EventPulse
        progressRef={progressRef}
        from={pulseRoutes.manager.from}
        to={pulseRoutes.manager.to}
        start={0.92}
        end={1.00}
        speed={0.26}
        delay={0.42}
      />

      <EventPulse
        progressRef={progressRef}
        from={
          pulseRoutes.persistence.from
        }
        to={
          pulseRoutes.persistence.to
        }
        start={0.925}
        end={1}
        speed={0.18}
        delay={0.58}
        size={0.8}
      />
    </group>
  );
}

function ArchitectureFrame() {
  return (
    <group>
      <Line
        points={[
          [-5.65, -0.95, 0.05],
          [5.65, -0.95, 0.05],
          [5.65, 5.0, 0.05],
          [-5.65, 5.0, 0.05],
          [-5.65, -0.95, 0.05],
        ]}
        color="#ff6a00"
        transparent
        opacity={0.14}
        lineWidth={0.75}
      />

      <Line
        points={[
          [-5.25, -0.5, 0.035],
          [5.25, -0.5, 0.035],
          [5.25, 4.55, 0.035],
          [-5.25, 4.55, 0.035],
          [-5.25, -0.5, 0.035],
        ]}
        color="#ffffff"
        transparent
        opacity={0.07}
        lineWidth={0.55}
      />

      <Line
        points={[
          [-5.1, 0.25, 0.03],
          [5.1, 0.25, 0.03],
        ]}
        color="#ffffff"
        transparent
        opacity={0.045}
        lineWidth={0.5}
      />

      <Line
        points={[
          [-5.1, 1.85, 0.03],
          [5.1, 1.85, 0.03],
        ]}
        color="#ffffff"
        transparent
        opacity={0.045}
        lineWidth={0.5}
      />

      <Line
        points={[
          [-5.1, 3.2, 0.03],
          [5.1, 3.2, 0.03],
        ]}
        color="#ffffff"
        transparent
        opacity={0.045}
        lineWidth={0.5}
      />
    </group>
  );
}

function Connections() {
  return (
    <group>
      {EDGES.map(
        ([
          fromId,
          toId,
          label,
        ]) => {
          const from =
            getNode(fromId);

          const to =
            getNode(toId);

          const midX =
            (from.position[0] +
              to.position[0]) /
            2;

          const midY =
            (from.position[1] +
              to.position[1]) /
            2;

          return (
            <group
              key={`${fromId}-${toId}`}
            >
              <Line
                points={[
                  from.position,
                  to.position,
                ]}
                color="#ff6a00"
                transparent
                opacity={0.22}
                lineWidth={0.7}
              />

              <Line
                points={[
                  from.position,
                  to.position,
                ]}
                color="#ffffff"
                transparent
                opacity={0.045}
                lineWidth={1.4}
              />

              <Html
                position={[
                  midX,
                  midY,
                  0.25,
                ]}
                center
                style={{
                  pointerEvents:
                    "none",
                }}
              >
                <span className="sf-system-edge sf-arch-html">
                  {label}
                </span>
              </Html>
            </group>
          );
        },
      )}
    </group>
  );
}

function SystemNode({
  node,
}: {
  node: SystemNode;
}) {
  return (
    <group
      position={node.position}
    >
      <mesh castShadow>
        <boxGeometry
          args={[
            node.width,
            0.78,
            0.14,
          ]}
        />

        <meshStandardMaterial
          color="#141a22"
          roughness={0.28}
          metalness={0.38}
        />
      </mesh>

      <mesh
        position={[
          0,
          0,
          0.085,
        ]}
      >
        <boxGeometry
          args={[
            0.05,
            0.52,
            0.02,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
        />
      </mesh>

      <mesh
        position={[
          0,
          -0.31,
          0.09,
        ]}
      >
        <boxGeometry
          args={[
            node.width * 0.72,
            0.015,
            0.012,
          ]}
        />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.24}
        />
      </mesh>

      <Html
        transform
        center
        position={[
          0,
          0,
          0.12,
        ]}
        distanceFactor={5.7}
        style={{
          pointerEvents:
            "none",
          userSelect:
            "none",
        }}
      >
        <div className="sf-system-node sf-arch-html">
          {node.label}
        </div>
      </Html>
    </group>
  );
}