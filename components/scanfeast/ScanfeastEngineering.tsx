const MODULES = [
  {
    number: "01",
    eyebrow: "SERVER-AUTHORITATIVE TIMERS",
    title: "TIME SYNCHRONIZATION",
    body:
      "Countdowns are derived from server time instead of trusting a device clock, avoiding visible drift between diner, kitchen and manager surfaces.",
    diagram: [
      "CLIENT",
      "  ×",
      "SERVER TIME",
      "  ↓",
      "CANONICAL TIMER",
    ],
  },
  {
    number: "02",
    eyebrow: "RULE-BASED AUTOMATION",
    title: "SMART PREP",
    body:
      "Cart contents are evaluated against preparation rules so the kitchen receives a useful estimated completion time without manual setup for every order.",
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
    eyebrow: "REALTIME + FALLBACK",
    title: "NETWORK RESILIENCE",
    body:
      "WebSockets deliver immediate updates while periodic HTTP synchronization restores canonical state after connectivity interruptions.",
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

        <div>
          <h2>
            THE HARD PART
            <br />
            WASN&apos;T THE UI.
          </h2>

          <p>
            Accuracy, automation and resilience
            are what make a restaurant workflow
            feel instant.
          </p>
        </div>
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
                  "\n",
                )}
              </pre>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
