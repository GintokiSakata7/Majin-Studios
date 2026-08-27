"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const METRICS = [
  {
    value: "100%",
    label:
      "DIGITAL ORDERING WORKFLOW",
  },
  {
    value: "<60s",
    label:
      "TESTED ORDER PLACEMENT FLOW",
  },
  {
    value: "LIVE",
    label:
      "WEBSOCKET + POLLING DELIVERY",
  },
];

export default function ScanfeastOutcome() {
  const ref =
    useRef<HTMLElement | null>(
      null,
    );

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setVisible(
            entry.isIntersecting,
          );
        },
        {
          threshold: 0.2,
        },
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`sf-outcome ${
        visible ? "is-visible" : ""
      }`}
    >
      <div className="sf-outcome__top">
        <span>
          05 / OUTCOME
        </span>

        <small>
          SCANFEAST / SYSTEM COMPLETE
        </small>
      </div>

      <div className="sf-outcome__headline">
        <h2>
          THE RESTAURANT
          <br />
          <em>
            MOVES AS ONE.
          </em>
        </h2>

        <p>
          By replacing fragmented manual processes 
          with a unified real-time architecture, 
          Scanfeast eliminated communication delays 
          and delivered a frictionless experience 
          for both staff and guests.
        </p>
      </div>

      <div className="sf-outcome__metrics">
        {METRICS.map((metric, index) => (
          <article
            key={metric.label}
            style={{
              transitionDelay: `${
                index * 120
              }ms`,
            }}
          >
            <strong>
              {metric.value}
            </strong>

            <span>
              {metric.label}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}