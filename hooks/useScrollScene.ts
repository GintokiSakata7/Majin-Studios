'use client';

import {
  useEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import {
  useThree,
} from '@react-three/fiber';

export interface ScrollCameraState {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export interface ScrollSceneOptions {
  /*
   * DOM element that controls the scene.
   * Defaults to the full document.
   */
  trigger?: string | Element;

  /*
   * ScrollTrigger range.
   */
  start?: string;
  end?: string;

  /*
   * Scroll smoothing.
   */
  scrub?: number | boolean;

  /*
   * Camera states.
   *
   * Example:
   *
   * keyframes: [
   *   {
   *     progress: 0,
   *     position: [0, 0, 8],
   *     rotation: [0, 0, 0]
   *   },
   *   {
   *     progress: 0.5,
   *     position: [2, 0.5, 6],
   *     rotation: [0, 0.2, 0]
   *   }
   * ]
   */
  keyframes?: Array<{
    progress: number;
    camera: ScrollCameraState;
  }>;

  /*
   * Called every time scroll progress changes.
   * Useful for UniverseScene / Zustand / scene transitions.
   */
  onProgress?: (progress: number) => void;

  /*
   * Allows disabling the scene.
   */
  enabled?: boolean;
}

interface CameraProxy {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
}

export function useScrollScene(
  options: ScrollSceneOptions = {}
) {
  const {
    camera,
  } = useThree();

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const progressRef = useRef(0);

  const {
    trigger = 'body',
    start = 'top top',
    end = 'bottom bottom',
    scrub = 1,
    keyframes = [],
    onProgress,
    enabled = true,
  } = options;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!enabled) return;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    /*
     * Reduced-motion mode:
     * the scene remains at its initial state.
     */
    if (reducedMotion) {
      progressRef.current = 0;
      onProgress?.(0);

      return;
    }

    const target =
      typeof trigger === 'string'
        ? document.querySelector(trigger)
        : trigger;

    if (!target) return;

    /*
     * -------------------------------------------------------
     * CAMERA PROXY
     * -------------------------------------------------------
     *
     * GSAP animates plain numeric values rather than mutating
     * the Three.js camera directly.
     *
     * This makes interpolation predictable.
     */
    const proxy: CameraProxy = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,

      rx: camera.rotation.x,
      ry: camera.rotation.y,
      rz: camera.rotation.z,
    };

    /*
     * -------------------------------------------------------
     * MASTER TIMELINE
     * -------------------------------------------------------
     */
    const timeline = gsap.timeline({
      paused: true,

      scrollTrigger: {
        trigger: target,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          progressRef.current = self.progress;

          onProgress?.(self.progress);
        },
      },
    });

    timelineRef.current = timeline;

    /*
     * -------------------------------------------------------
     * CAMERA KEYFRAMES
     * -------------------------------------------------------
     *
     * If no keyframes were supplied, the timeline still
     * exists and can be populated by the owning scene.
     */
    const sortedKeyframes = [...keyframes]
      .filter(
        (item) =>
          item &&
          typeof item.progress === 'number' &&
          item.progress >= 0 &&
          item.progress <= 1
      )
      .sort((a, b) => a.progress - b.progress);

    let previousProgress = 0;

    sortedKeyframes.forEach((frame, index) => {
      const progress = frame.progress;

      const duration =
        index === 0
          ? Math.max(progress, 0.001)
          : Math.max(progress - previousProgress, 0.001);

      const position = frame.camera.position;
      const rotation = frame.camera.rotation;

      if (position) {
        timeline.to(
          proxy,
          {
            x: position[0],
            y: position[1],
            z: position[2],
            duration,
            ease: 'none',

            onUpdate: () => {
              camera.position.set(
                proxy.x,
                proxy.y,
                proxy.z
              );
            },
          },
          previousProgress
        );
      }

      if (rotation) {
        timeline.to(
          proxy,
          {
            rx: rotation[0],
            ry: rotation[1],
            rz: rotation[2],
            duration,
            ease: 'none',

            onUpdate: () => {
              camera.rotation.set(
                proxy.rx,
                proxy.ry,
                proxy.rz
              );
            },
          },
          previousProgress
        );
      }

      previousProgress = progress;
    });

    /*
     * -------------------------------------------------------
     * GLOBAL SCROLL REFRESH
     * -------------------------------------------------------
     */
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const refreshTimeout = window.setTimeout(
      refresh,
      100
    );

    window.addEventListener('load', refresh);

    return () => {
      window.clearTimeout(refreshTimeout);
      window.removeEventListener('load', refresh);

      timeline.kill();
      timelineRef.current = null;

      progressRef.current = 0;
    };
  }, [
    camera,
    trigger,
    start,
    end,
    scrub,
    keyframes,
    onProgress,
    enabled,
  ]);

  return {
    camera,
    timelineRef,
    progressRef,
  };
}
