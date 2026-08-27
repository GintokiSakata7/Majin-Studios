"use client";

import { SCANFEAST_CASE_STUDY } from "./scanfeast-data";

export default function ScanfeastHero({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="sf-hero-copy">
      <div className="sf-kicker">
        01 / {SCANFEAST_CASE_STUDY.category}
      </div>

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
        {SCANFEAST_CASE_STUDY.subtitle}
      </p>

      <button
        type="button"
        onClick={onEnter}
      >
        ENTER THE SYSTEM
        <span>
          ↓
        </span>
      </button>
    </section>
  );
}
