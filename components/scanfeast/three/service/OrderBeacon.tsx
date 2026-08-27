"use client";

import {
    useFrame,
} from "@react-three/fiber";

import {
    useRef,
} from "react";

import * as THREE from "three";

type Props = {
    position?: [
        number,
        number,
        number,
    ];

    active: boolean;
};

export default function OrderBeacon({
    position = [0, 0, 0],
    active,
}: Props) {
    const group =
        useRef<THREE.Group>(null);

    const ring =
        useRef<THREE.Mesh>(null);

    const core =
        useRef<THREE.Mesh>(null);

    const light =
        useRef<THREE.PointLight>(null);

    useFrame(({ clock }, delta) => {
        if (
            !group.current ||
            !ring.current ||
            !core.current ||
            !light.current
        ) {
            return;
        }

        const t =
            clock.getElapsedTime();

        const target =
            active ? 1 : 0;

        const current =
            group.current.scale.x;

        const next =
            THREE.MathUtils.damp(
                current,
                target,
                10,
                delta,
            );

        group.current.scale.setScalar(
            next,
        );

        const pulse =
            1 +
            Math.sin(t * 4.5) *
            0.11;

        ring.current.rotation.z =
            t * 0.9;

        ring.current.scale.set(
            pulse,
            pulse,
            pulse,
        );

        core.current.scale.setScalar(
            0.92 +
            Math.sin(t * 7) *
            0.08,
        );

        light.current.intensity =
            active ? 0.7 : 0;
    });

    return (
        <group
            ref={group}
            position={position}
            scale={0}
            visible={active}
        >
            <mesh
                ref={ring}
                rotation={[
                    Math.PI / 2,
                    0,
                    0,
                ]}
            >
                <torusGeometry
                    args={[
                        0.16,
                        0.018,
                        8,
                        28,
                    ]}
                />

                <meshBasicMaterial
                    color="#ff6a00"
                    transparent
                    opacity={0.75}
                />
            </mesh>

            <mesh ref={core}>
                <sphereGeometry
                    args={[
                        0.055,
                        16,
                        16,
                    ]}
                />

                <meshBasicMaterial
                    color="#ff6a00"
                />
            </mesh>

            <pointLight
                ref={light}
                color="#ff6a00"
                intensity={0}
                distance={1.8}
                decay={2}
            />
        </group>
    );
}