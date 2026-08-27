"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Canvas,
} from "@react-three/fiber";

import {
  ScanfeastProgressRef,
} from "./three/CameraDirector";

import {
  SCANFEAST_TIMELINE,
  getChapter,
  type ChapterId,
} from "./scanfeast-state";

import ScanfeastScene from "./three/ScanfeastScene";

export default function ScanfeastWalkthrough() {
  const progressRef =
    useRef(0);

  const [
    chapterId,
    setChapterId,
  ] =
    useState<ChapterId>(
      "arrival"
    );

  const [
    ready,
    setReady,
  ] =
    useState(false);

  useEffect(() => {
    let raf = 0;

    let previous =
      "arrival";

    let last =
      performance.now();

    const tick =
      (time: number) => {
        const delta =
          Math.min(
            0.05,
            (
              time -
              last
            ) / 1000
          );

        last =
          time;

        const max =
          document.documentElement
            .scrollHeight -
          window.innerHeight;

        const target =
          max <= 0
            ? 0
            : Math.min(
                1,
                Math.max(
                  0,
                  window.scrollY /
                    max
                )
              );

        const smoothing =
          1 -
          Math.exp(
            -11 * delta
          );

        progressRef.current =
          progressRef.current +
          (
            target -
            progressRef.current
          ) *
            smoothing;

        const chapter =
          getChapter(
            target
          );

        if (
          chapter.id !==
          previous
        ) {
          previous =
            chapter.id;

          setChapterId(
            chapter.id
          );
        }

        raf =
          requestAnimationFrame(
            tick
          );
      };

    raf =
      requestAnimationFrame(
        tick
      );

    return () =>
      cancelAnimationFrame(
        raf
      );
  }, []);

  const chapter =
    useMemo(
      () =>
        SCANFEAST_TIMELINE.find(
          (item) =>
            item.id ===
            chapterId
        )!,
      [chapterId]
    );

  return (
    <section className="sf-walkthrough">
      <div className="sf-walkthrough__scene">
        <Canvas
          camera={{
            position: [
              -10.5,
              5.6,
              12.5,
            ],
            fov: 48,
            near: 0.1,
            far: 100,
          }}
          dpr={[
            1,
            1.5,
          ]}
          shadows
          gl={{
            antialias: true,
            powerPreference:
              "high-performance",
          }}
        >
          <ScanfeastScene
            progressRef={
              progressRef
            }
          />
        </Canvas>
      </div>

      <div className="sf-walkthrough__top">
        <span>
          MAJIN STUDIOS / CASE STUDY
        </span>

        <span>
          SCANFEAST
        </span>
      </div>

      {chapterId ===
        "arrival" && (
        <div className="sf-walkthrough__hero">
          <span>
            RESTAURANT OPERATING SYSTEM
          </span>

          <h1>
            SCANFEAST
            <br />
            <em>
              CONNECTS
            </em>
            <br />
            THE FLOOR.
          </h1>

          <p>
            A smart contactless
            ordering system
            connecting diners,
            chefs and management
            through real-time
            web technology.
          </p>
        </div>
      )}

      {chapterId !==
        "arrival" && (
        <div
          key={chapter.id}
          className="sf-walkthrough__chapter"
        >
          <span>
            {chapter.number}
            {" "}
            /
            {" "}
            {chapter.label}
          </span>

          <h2>
            {chapter.title}
          </h2>

          <p>
            {chapter.body}
          </p>
        </div>
      )}

      <div className="sf-walkthrough__timeline">
        {SCANFEAST_TIMELINE.map(
          (item) => (
            <button
              key={item.id}
              type="button"
              className={
                item.id ===
                chapterId
                  ? "active"
                  : ""
              }
              onClick={() => {
                const max =
                  document.documentElement
                    .scrollHeight -
                  window.innerHeight;

                window.scrollTo({
                  top:
                    max *
                    item.start,
                  behavior:
                    "smooth",
                });
              }}
            >
              <span>
                {item.number}
              </span>

              <strong>
                {item.label}
              </strong>
            </button>
          )
        )}
      </div>

      <div className="sf-walkthrough__progress">
        <span
          style={{
            transform: `scaleX(${progressRef.current})`,
          }}
        />
      </div>

      {!ready && (
        <div
          className="sf-walkthrough__loader"
          ref={() => {
            if (!ready) {
              window.setTimeout(
                () =>
                  setReady(
                    true
                  ),
                700
              );
            }
          }}
        >
          <strong>
            SCANFEAST
          </strong>

          <span>
            LOADING EXPERIENCE
          </span>
        </div>
      )}
    </section>
  );
}
