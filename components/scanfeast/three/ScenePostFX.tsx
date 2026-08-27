"use client";

import {
    EffectComposer,
    Bloom,
    Vignette,
} from "@react-three/postprocessing";

export default function ScenePostFX() {
    return (
        <EffectComposer>
            <Bloom
                intensity={0.42}
                luminanceThreshold={0.72}
                luminanceSmoothing={0.3}
                mipmapBlur
            />

            <Vignette
                eskil={false}
                offset={0.22}
                darkness={0.72}
            />
        </EffectComposer>
    );
}