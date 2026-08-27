"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
    color?: string;
    active: boolean;
};

export default function ActorFallback({
    color = "#697078",
    active,
}: Props) {
    const group =
        useRef<THREE.Group>(null);

    useFrame(({ clock }, delta) => {
        if (!group.current) {
            return;
        }

        const target =
            active ? 1 : 0;

        const current =
            group.current.scale.x;

        const scale =
            THREE.MathUtils.damp(
                current,
                target,
                8,
                delta,
            );

        group.current.scale.setScalar(
            scale,
        );

        const t =
            clock.getElapsedTime();

        group.current.position.y =
            Math.sin(
                t * 1.7,
            ) *
            0.012;
    });

    return (
        <group
            ref={group}
            scale={0}
        >
            {/* torso */}
            <mesh
                position={[
                    0,
                    1.0,
                    0,
                ]}
                castShadow
            >
                <capsuleGeometry
                    args={[
                        0.22,
                        0.56,
                        8,
                        16,
                    ]}
                />

                <meshStandardMaterial
                    color={color}
                    roughness={0.72}
                />
            </mesh>

            {/* head */}
            <mesh
                position={[
                    0,
                    1.68,
                    0,
                ]}
                castShadow
            >
                <sphereGeometry
                    args={[
                        0.18,
                        16,
                        16,
                    ]}
                />

                <meshStandardMaterial
                    color="#b98567"
                    roughness={0.82}
                />
            </mesh>

            {/* left leg */}
            <mesh
                position={[
                    -0.1,
                    0.42,
                    0,
                ]}
                castShadow
            >
                <capsuleGeometry
                    args={[
                        0.075,
                        0.42,
                        6,
                        10,
                    ]}
                />

                <meshStandardMaterial
                    color="#20252a"
                    roughness={0.78}
                />
            </mesh>

            {/* right leg */}
            <mesh
                position={[
                    0.1,
                    0.42,
                    0,
                ]}
                castShadow
            >
                <capsuleGeometry
                    args={[
                        0.075,
                        0.42,
                        6,
                        10,
                    ]}
                />

                <meshStandardMaterial
                    color="#20252a"
                    roughness={0.78}
                />
            </mesh>

            {/* arms */}
            <mesh
                position={[
                    -0.3,
                    1.0,
                    0,
                ]}
                rotation={[
                    0,
                    0,
                    -0.18,
                ]}
            >
                <capsuleGeometry
                    args={[
                        0.06,
                        0.42,
                        6,
                        10,
                    ]}
                />

                <meshStandardMaterial
                    color={color}
                    roughness={0.72}
                />
            </mesh>

            <mesh
                position={[
                    0.3,
                    1.0,
                    0,
                ]}
                rotation={[
                    0,
                    0,
                    0.18,
                ]}
            >
                <capsuleGeometry
                    args={[
                        0.06,
                        0.42,
                        6,
                        10,
                    ]}
                />

                <meshStandardMaterial
                    color={color}
                    roughness={0.72}
                />
            </mesh>
        </group>
    );
}