"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const MODULES = [
  {
    number: "01",
    eyebrow:
      "SERVER-AUTHORITATIVE TIMERS",
    title:
      "TIME SYNCHRONIZATION",
    body:
      "Countdowns use server-authoritative time so different devices do not visibly drift.",
  },
  {
    number: "02",
    eyebrow:
      "RULE-BASED AUTOMATION",
    title:
      "SMART PREP",
    body:
      "Cart contents are evaluated against preparation rules to create useful ETAs automatically.",
  },
  {
    number: "03",
    eyebrow:
      "REALTIME + FALLBACK",
    title:
      "NETWORK RESILIENCE",
    body:
      "Realtime delivery is backed by periodic HTTP synchronization so canonical state can recover.",
  },
];

export default function ScanfeastEngineering() {
  return (
    <section className="sf-section sf-engineering">
      <div className="sf-section__intro">
        <span>
          04 / ENGINEERING
        </span>

        <div>
          <h2>
            THE HARD PART
            <br />
            WASN&apos;T THE UI.
          </h2>

          <p>
            Accuracy, automation and
            resilience are what make
            a restaurant workflow feel
            instant.
          </p>
        </div>
      </div>

      <div className="sf-engineering__grid">
        {MODULES.map((module) => (
          <EngineeringCard
            key={module.number}
            {...module}
          />
        ))}
      </div>
    </section>
  );
}

function EngineeringCard({
  number,
  eyebrow,
  title,
  body,
}: {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const ref =
    useRef<HTMLDivElement | null>(
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
          threshold: 0.28,
        },
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`sf-engineering-card ${
        visible
          ? "is-visible"
          : ""
      }`}
    >
      <div className="sf-engineering-card__top">
        <span>{number}</span>

        <small>
          {eyebrow}
        </small>
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {body}
      </p>

      {number === "01" && (
        <TimerDiagram
          visible={visible}
        />
      )}

      {number === "02" && (
        <PrepDiagram
          visible={visible}
        />
      )}

      {number === "03" && (
        <ResilienceDiagram
          visible={visible}
        />
      )}
    </article>
  );
}

function TimerDiagram({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <div
      className={`sf-engineering-visual sf-timer-diagram ${
        visible ? "is-active" : ""
      }`}
    >
      <div className="sf-timer-device">
        <span>
          SERVER
        </span>

        <strong>
          09:57
        </strong>

        <small>
          AUTHORITATIVE
        </small>
      </div>

      <div className="sf-timer-arrow">
        ↓
      </div>

      <div className="sf-timer-device">
        <span>
          CLIENT
        </span>

        <strong>
          09:57
        </strong>

        <small>
          OFFSET ADJUSTED
        </small>
      </div>
    </div>
  );
}

function PrepDiagram({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <div
      className={`sf-engineering-visual sf-prep-diagram ${
        visible ? "is-active" : ""
      }`}
    >
      <div className="sf-prep-step">
        <span>
          CART
        </span>

        <strong>
          BIRYANI
          <br />
          TEA
          <br />
          SAMOSA
        </strong>
      </div>

      <div className="sf-prep-arrow">
        →
      </div>

      <div className="sf-prep-step sf-prep-step--active">
        <span>
          RULES
        </span>

        <strong>
          PREP TIME
        </strong>
      </div>

      <div className="sf-prep-arrow">
        →
      </div>

      <div className="sf-prep-step">
        <span>
          ETA
        </span>

        <strong>
          15 MIN
        </strong>
      </div>
    </div>
  );
}

function ResilienceDiagram({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <div
      className={`sf-engineering-visual sf-resilience-diagram ${
        visible ? "is-active" : ""
      }`}
    >
      <div className="sf-resilience-line">
        <span>
          WEBSOCKET
        </span>

        <i />

        <b>
          LIVE EVENT
        </b>
      </div>

      <div className="sf-resilience-break">
        ×
      </div>

      <div className="sf-resilience-line sf-resilience-line--fallback">
        <span>
          HTTP FALLBACK
        </span>

        <i />

        <b>
          CANONICAL STATE
        </b>
      </div>
    </div>
  );
}
