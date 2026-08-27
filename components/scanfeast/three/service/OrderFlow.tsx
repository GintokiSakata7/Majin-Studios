"use client";

import {
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

import type {
    OrderPhase,
} from "../../scanfeast-state";

const PATH = [
    new THREE.Vector3(
        -0.7,
        1.46,
        2.05,
    ),

    new THREE.Vector3(
        -0.25,
        1.47,
        0.75,
    ),

    new THREE.Vector3(
        1.25,
        1.48,
        -4.55,
    ),

    new THREE.Vector3(
        2.55,
        1.5,
        -9.9,
    ),

    new THREE.Vector3(
        3.35,
        1.5,
        -13.0,
    ),

    new THREE.Vector3(
        4.35,
        1.5,
        -14.15,
    ),
];

function sample(
    value: number,
    result: THREE.Vector3,
) {
    const clamped =
        THREE.MathUtils.clamp(
            value,
            0,
            0.99999,
        );

    const indexFloat =
        clamped *
        (PATH.length - 1);

    const index =
        Math.floor(
            indexFloat,
        );

    const local =
        indexFloat - index;

    const from =
        PATH[index];

    const to =
        PATH[
        Math.min(
            index + 1,
            PATH.length - 1,
        )
        ];

    result.lerpVectors(
        from,
        to,
        THREE.MathUtils.smootherstep(
            local,
            0,
            1,
        ),
    );

    return result;
}

export default function OrderFlow({
    progressRef,
    phase,
}: {
    progressRef: ScanfeastProgressRef;
    phase: OrderPhase;
}) {
    const group =
        useRef<THREE.Group>(null);

    const signal =
        useRef<THREE.Mesh>(null);

    const halo =
        useRef<THREE.Mesh>(null);

    const light =
        useRef<THREE.PointLight>(null);

    const position =
        useMemo(
            () => new THREE.Vector3(),
            [],
        );

    const direction =
        useMemo(
            () => new THREE.Vector3(),
            [],
        );

    const previous =
        useMemo(
            () => new THREE.Vector3(),
            [],
        );

    useFrame(
        ({ clock }, delta) => {
            if (
                !group.current ||
                !signal.current ||
                !halo.current ||
                !light.current
            ) {
                return;
            }

            const p =
                progressRef.current;

            const visible =
                phase !== "idle" &&
                p >= 0.205 &&
                p <= 0.62;

            if (!visible) {
                group.current.visible =
                    false;

                return;
            }

            group.current.visible =
                true;

            const travel =
                THREE.MathUtils.smootherstep(
                    THREE.MathUtils.clamp(
                        (p - 0.205) /
                        0.37,
                        0,
                        1,
                    ),
                    0,
                    1,
                );

            sample(
                travel,
                position,
            );

            group.current.position.lerp(
                position,
                1 -
                Math.exp(
                    -12 * delta,
                ),
            );

            direction
                .subVectors(
                    position,
                    previous,
                );

            if (
                direction.lengthSq() >
                0.00001
            ) {
                direction.normalize();

                group.current.rotation.z =
                    THREE.MathUtils.damp(
                        group.current.rotation.z,
                        -direction.x *
                        0.12,
                        8,
                        delta,
                    );
            }

            previous.copy(
                position,
            );

            const t =
                clock.getElapsedTime();

            const pulse =
                1 +
                Math.sin(
                    t * 8,
                ) *
                0.1;

            signal.current.scale.setScalar(
                pulse,
            );

            halo.current.scale.setScalar(
                1.8 +
                Math.sin(
                    t * 4,
                ) *
                0.25,
            );

            light.current.intensity =
                0.7 +
                Math.sin(
                    t * 5,
                ) *
                0.12;
        },
    );

    return (
        <>
            <Line
                points={PATH}
                color="#ff6a00"
                transparent
                opacity={0.13}
                lineWidth={0.9}
            />

            <Line
                points={PATH}
                color="#ffffff"
                transparent
                opacity={0.035}
                lineWidth={2.3}
            />

            <group
                ref={group}
                visible={false}
                position={
                    PATH[0].toArray()
                }
            >
                <mesh ref={signal}>
                    <sphereGeometry
                        args={[
                            0.065,
                            16,
                            16,
                        ]}
                    />

                    <meshBasicMaterial
                        color="#ff6a00"
                    />
                </mesh>

                <mesh ref={halo}>
                    <sphereGeometry
                        args={[
                            0.13,
                            16,
                            16,
                        ]}
                    />

                    <meshBasicMaterial
                        color="#ff6a00"
                        transparent
                        opacity={0.06}
                        depthWrite={false}
                        blending={
                            THREE.AdditiveBlending
                        }
                    />
                </mesh>

                <pointLight
                    ref={light}
                    color="#ff6a00"
                    intensity={0.7}
                    distance={1.5}
                    decay={2}
                />
            </group>
        </>
    );
}