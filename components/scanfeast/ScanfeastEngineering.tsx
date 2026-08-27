"use client";

const MODULES = [
  {
    number: "01",
    title:
      "TIME SYNCHRONIZATION",
    eyebrow:
      "SERVER-AUTHORITATIVE TIMERS",
    body:
      "Client devices cannot be trusted for mission-critical countdowns. The interface calculates remaining time from the server timestamp and a synchronized offset.",
    diagram: [
      "CLIENT CLOCK",
      "       ×",
      "SERVER TIME",
      "       ↓",
      "CANONICAL TIMER",
    ],
  },

  {
    number: "02",
    title:
      "SMART PREP",
    eyebrow:
      "RULE-BASED AUTOMATION",
    body:
      "Preparation time is inferred from cart contents so kitchen teams do not have to manually configure every incoming order.",
    diagram: [
      "CART",
      "  ↓",
      "PREP RULES",
      "  ↓",
      "ETA",
    ],
  },

  {
    number: "03",
    title:
      "NETWORK RESILIENCE",
    eyebrow:
      "REALTIME + FALLBACK",
    body:
      "WebSockets provide immediate updates, while periodic HTTP synchronization guarantees the KDS can recover the canonical state after connectivity interruptions.",
    diagram: [
      "WEBSOCKET",
      "    ↓",
      "LIVE EVENT",
      "    ×",
      "HTTP FALLBACK",
      "    ↓",
      "CANONICAL STATE",
    ],
  },
];

export default function ScanfeastEngineering() {
  return (
    <section className="sf-section sf-engineering">
      <div className="sf-section__intro">
        <span>
          04 / ENGINEERING
        </span>

        <h2>
          THE HARD PART
          <br />
          WASN'T THE UI.
        </h2>

        <p>
          The system had to remain accurate
          when clocks drifted, traffic increased
          and restaurant connectivity became
          unreliable.
        </p>
      </div>

      <div className="sf-engineering__grid">
        {MODULES.map(
          (module) => (
            <article
              key={module.number}
              className="sf-engineering-card"
            >
              <div className="sf-engineering-card__top">
                <span>
                  {module.number}
                </span>

                <small>
                  {module.eyebrow}
                </small>
              </div>

              <h3>
                {module.title}
              </h3>

              <p>
                {module.body}
              </p>

              <pre>
                {module.diagram.join(
                  "\n"
                )}
              </pre>
            </article>
          )
        )}
      </div>
    </section>
  );
}
