"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
} from "react";

import { Loader } from "@react-three/drei";

import {
  Canvas,
} from "@react-three/fiber";

import * as THREE from "three";

import {
  SCANFEAST_TIMELINE,
  getChapter,
  type ChapterId,
} from "./scanfeast-state";

import ScanfeastScene from "./three/ScanfeastScene";

import type {
  ScanfeastProgressRef,
} from "./three/CameraDirector";

export default function ScanfeastWalkthrough() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const progressRef =
    useRef<ScanfeastProgressRef>({
      current: 0,
    });

  const [
    chapterId,
    setChapterId,
  ] =
    useState<ChapterId>("arrival");

  const [
    sceneActive,
    setSceneActive,
  ] =
    useState(true);

  const updateProgress =
    useCallback(() => {
      const section =
        sectionRef.current;

      if (!section) {
        return;
      }

      const rect =
        section.getBoundingClientRect();

      const distance = Math.max(
        section.offsetHeight -
        window.innerHeight,
        1,
      );

      const progress = THREE.MathUtils.clamp(
        -rect.top / distance,
        0,
        1,
      );

      progressRef.current.current =
        progress;

      const chapter =
        getChapter(progress);

      setChapterId(
        (previous) =>
          previous === chapter.id
            ? previous
            : chapter.id,
      );
    }, []);

  useEffect(() => {
    let raf = 0;

    const schedule = () => {
      cancelAnimationFrame(raf);

      raf =
        requestAnimationFrame(
          updateProgress,
        );
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      schedule,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      schedule,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        schedule,
      );

      window.removeEventListener(
        "resize",
        schedule,
      );

      cancelAnimationFrame(raf);
    };
  }, [updateProgress]);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setSceneActive(
            entry.isIntersecting,
          );
        },
        {
          rootMargin:
            "200px 0px 200px 0px",
        },
      );

    observer.observe(section);

    return () =>
      observer.disconnect();
  }, []);

  const chapter =
    SCANFEAST_TIMELINE.find(
      (item) =>
        item.id === chapterId,
    ) ??
    SCANFEAST_TIMELINE[0];

  const jumpTo = (
    progress: number,
  ) => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const top =
      window.scrollY +
      section.getBoundingClientRect()
        .top;

    const distance = Math.max(
      section.offsetHeight -
      window.innerHeight,
      1,
    );

    window.scrollTo({
      top:
        top +
        distance *
        THREE.MathUtils.clamp(
          progress,
          0,
          1,
        ),
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="sf-walkthrough"
    >
      <div className="sf-walkthrough__sticky">
        <Canvas
          frameloop={
            sceneActive
              ? "always"
              : "demand"
          }
          dpr={
            typeof window !== "undefined" &&
            window.innerWidth < 768
              ? [1, 1.1]
              : [1, 1.45]
          }
          camera={{
            position: [
              -8.6,
              5.25,
              11.8,
            ],
            fov: 47,
            near: 0.1,
            far: 80,
          }}
          shadows
          gl={{
            antialias:
              typeof window !==
              "undefined"
                ? window.innerWidth >= 900
                : true,
            alpha: false,
            depth: true,
            stencil: false,
            powerPreference:
              "high-performance",
          }}
          performance={{
            min: 0.65,
            max: 1.25,
            debounce: 200,
          }}
          onCreated={({ gl, scene }) => {
            gl.outputColorSpace =
              THREE.SRGBColorSpace;

            gl.toneMapping =
              THREE.ACESFilmicToneMapping;

            gl.toneMappingExposure =
              1.03;

            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFShadowMap;

            scene.background =
              new THREE.Color(
                "#070a0d",
              );

            scene.fog =
              new THREE.FogExp2(
                "#070a0d",
                0.028,
              );
          }}
        >
          <Suspense fallback={null}>
            {/* eslint-disable react-hooks/refs */}
            <ScanfeastScene
              progressRef={
                progressRef.current
              }
            />
            {/* eslint-enable react-hooks/refs */}
          </Suspense>
        </Canvas>
        <Loader />
      </div>

      <div className="sf-walkthrough__topbar">
        <span>
          MAJIN STUDIOS / CASE STUDY
        </span>

        <span>
          SCANFEAST
        </span>
      </div>

      <div
        className={
          chapterId === "arrival"
            ? "sf-walkthrough__hero"
            : "sf-walkthrough__chapter"
        }
      >
        <span>
          {chapter.number} /{" "}
          {chapter.label}
        </span>

        <h1>
          {chapter.title}
        </h1>

        <p>
          {chapter.body}
        </p>

        <small className="sf-walkthrough__scene-code">
          {chapter.scene}
        </small>
      </div>

      <aside className="sf-walkthrough__rail">
        {SCANFEAST_TIMELINE.map(
          (item) => (
            <button
              key={item.id}
              type="button"
              className={
                item.id === chapterId
                  ? "active"
                  : ""
              }
              aria-label={`Go to ${item.label}`}
              onClick={() =>
                jumpTo(item.start)
              }
            >
              <span>
                {item.number}
              </span>

              <strong>
                {item.label}
              </strong>
            </button>
          ),
        )}
      </aside>

      <div className="sf-walkthrough__hint">
        <span>
          SCROLL TO MOVE
        </span>

        <i />
      </div>

      <div className="sf-walkthrough__end">
        <span>
          SYSTEM ONLINE / EXPERIENCE COMPLETE
        </span>
      </div>
    </section>
  );
}