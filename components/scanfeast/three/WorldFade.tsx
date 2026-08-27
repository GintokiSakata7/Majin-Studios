"use client";

import {
    useFrame,
} from "@react-three/fiber";

import {
    useRef,
} from "react";

import * as THREE from "three";

import type {
    ScanfeastProgressRef,
} from "./CameraDirector";

export default function WorldFade({
    progressRef,
}: {
    progressRef: ScanfeastProgressRef;
}) {
    const mesh =
        useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (!mesh.current) {
            return;
        }

        const p =
            progressRef.current;

        const reveal =
            THREE.MathUtils.smootherstep(
                THREE.MathUtils.clamp(
                    (p - 0.76) /
                    0.18,
                    0,
                    1,
                ),
                0,
                1,
            );

        const material =
            mesh.current.material as
            THREE.MeshBasicMaterial;

        material.opacity =
            THREE.MathUtils.damp(
                material.opacity,
                reveal * 0.78,
                5,
                delta,
            );

        mesh.current.visible =
            p > 0.70;
    });

    return (
        <mesh
            ref={mesh}
            position={[
                0,
                2.8,
                -7.5,
            ]}
            visible={false}
        >
            <planeGeometry
                args={[
                    30,
                    18,
                ]}
            />

            <meshBasicMaterial
                color="#05070a"
                transparent
                opacity={0}
                depthWrite={false}
            />
        </mesh>
    );
}