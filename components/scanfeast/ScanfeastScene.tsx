"use client";

import {
    useEffect,
    useState,
    type RefObject,
} from "react";

export function clamp(
    value: number,
    min = 0,
    max = 1,
) {
    return Math.min(
        Math.max(value, min),
        max,
    );
}

export function segment(
    progress: number,
    start: number,
    end: number,
) {
    return clamp(
        (progress - start) /
        Math.max(end - start, 0.0001),
    );
}

export function smooth(
    value: number,
) {
    return value * value * (3 - 2 * value);
}

export function lerp(
    start: number,
    end: number,
    value: number,
) {
    return start + (end - start) * value;
}

export function useSceneProgress(
    ref: RefObject<HTMLElement | null>,
) {
    const [progress, setProgress] =
        useState(0);

    useEffect(() => {
        let raf = 0;

        const update = () => {
            raf = 0;

            const element = ref.current;

            if (!element) {
                return;
            }

            const rect =
                element.getBoundingClientRect();

            const scrollDistance =
                Math.max(
                    element.offsetHeight -
                    window.innerHeight,
                    1,
                );

            const travelled =
                clamp(
                    -rect.top,
                    0,
                    scrollDistance,
                );

            setProgress(
                travelled /
                scrollDistance,
            );
        };

        const requestUpdate = () => {
            if (raf) return;

            raf =
                requestAnimationFrame(update);
        };

        update();

        window.addEventListener(
            "scroll",
            requestUpdate,
            { passive: true },
        );

        window.addEventListener(
            "resize",
            requestUpdate,
        );

        return () => {
            window.removeEventListener(
                "scroll",
                requestUpdate,
            );

            window.removeEventListener(
                "resize",
                requestUpdate,
            );

            if (raf) {
                cancelAnimationFrame(raf);
            }
        };
    }, [ref]);

    return progress;
}