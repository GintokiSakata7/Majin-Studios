"use client";

import {
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import {
  lerp,
  segment,
  smooth,
  useSceneProgress,
} from "./ScanfeastScene";

import "./scanfeast-reel-v4.css";

type SceneProps = {
  children: ReactNode;
  sceneRef: React.RefObject<HTMLElement | null>;
  height?: string;
  className?: string;
};

function Scene({
  children,
  sceneRef,
  height = "180vh",
  className = "",
}: SceneProps) {
  return (
    <section
      ref={sceneRef}
      className={`sf-r4-scene ${className}`}
      style={{ "--scene-height": height } as CSSProperties}
    >
      <div className="sf-r4-sticky">
        <div className="sf-r4-stage">
          <div className="sf-r4-grid" />
          <div className="sf-r4-vignette" />
          <div className="sf-r4-corner sf-r4-corner--tl">
            SCANFEAST / PRODUCT FILM
          </div>
          <div className="sf-r4-corner sf-r4-corner--tr">
            SYSTEM / LIVE
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

function Copy({
  index,
  eyebrow,
  title,
  body,
  opacity = 1,
  y = 0,
  side = "left",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
  opacity?: number;
  y?: number;
  side?: "left" | "right";
}) {
  return (
    <div
      className={`sf-r4-copy sf-r4-copy--${side}`}
      style={{
        opacity,
        transform: `translate3d(0, ${y}px, 0)`,
      }}
    >
      <span>{index} / {eyebrow}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

export default function ScanfeastProduct() {
  return (
    <section className="sf-section sf-product sf-r4-product">
      <div className="sf-section__intro sf-r4-intro">
        <span>02 / PRODUCT</span>
        <div>
          <h2>
            WATCH THE
            <br />
            SYSTEM MOVE.
          </h2>
          <p>
            Five cinematic cuts. One restaurant workflow.
            Every transition is tied to the actual product
            story instead of a screenshot carousel.
          </p>
        </div>
      </div>

      <DinerScene />
      <RealtimeScene />
      <KitchenScene />
      <ManagerScene />
      <SystemScene />
    </section>
  );
}

/* =========================================================
   01 — DINER
   ========================================================= */

function DinerScene() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const enter = smooth(segment(p, 0.00, 0.18));
  const cards = smooth(segment(p, 0.12, 0.36));
  const cart = smooth(segment(p, 0.31, 0.52));
  const track = smooth(segment(p, 0.47, 0.68));
  const punch = smooth(segment(p, 0.62, 0.76));
  const cut = smooth(segment(p, 0.74, 1.00));

  return (
    <Scene sceneRef={ref} height="195vh" className="sf-r4-diner">
      <Copy
        index="01"
        eyebrow="DINER EXPERIENCE"
        title={
          <>
            SCAN.
            <br />
            ORDER.
            <br />
            TRACK.
          </>
        }
        body="A mobile-first ordering flow that removes the wait between table and kitchen."
        opacity={1 - cut}
        y={lerp(28, -34, cut)}
      />

      <div
        className="sf-r4-diner-orb"
        style={{
          transform: `
            translate(-50%, -50%)
            scale(${lerp(0.65, 1.15, enter)})
          `,
          opacity: 0.28 + enter * 0.5,
        }}
      />

      <div
        className="sf-r4-phone"
        style={{
          opacity: enter,
          transform: `
            translate3d(-50%, -50%, 0)
            rotateZ(${lerp(-9, 0, enter)}deg)
            rotateY(${lerp(18, -2, enter)}deg)
            scale(${lerp(0.68, 1, enter)})
          `,
        }}
      >
        <DinerPhone cards={cards} cart={cart} track={track} />
      </div>

      <div
        className="sf-r4-chip sf-r4-chip--table"
        style={{
          opacity: 1 - enter,
          transform: `
            translateY(${lerp(25, 0, enter)}px)
            scale(${lerp(1.05, 0.92, enter)})
          `,
        }}
      >
        <span>TABLE</span>
        <strong>12</strong>
      </div>

      <div
        className="sf-r4-chip sf-r4-chip--qr"
        style={{
          opacity: 1 - enter,
          transform: `translateY(${lerp(32, 0, enter)}px)`,
        }}
      >
        <div className="sf-r4-mini-qr">
          {Array.from({ length: 25 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <span>SCAN TO ENTER</span>
      </div>

      <div
        className="sf-r4-order-float"
        style={{
          opacity: cart * (1 - track * 0.35),
          transform: `
            translate3d(
              ${lerp(40, 0, cart)}px,
              ${lerp(32, 0, cart)}px,
              0
            )
            scale(${lerp(0.88, 1, cart)})
          `,
        }}
      >
        <span>CART</span>
        <strong>1 ITEM · ₹280</strong>
        <small>READY TO PLACE</small>
      </div>

      <div
        className="sf-r4-live-pill"
        style={{
          opacity: track,
          transform: `translateY(${lerp(26, 0, track)}px)`,
        }}
      >
        <i />
        <span>ORDER #104 / LIVE</span>
      </div>

      <div
        className="sf-r4-scene-number"
        style={{
          opacity: 1 - cut,
          transform: `scale(${lerp(1, 1.2, punch)})`,
        }}
      >
        <strong>01</strong>
      </div>
    </Scene>
  );
}

function DinerPhone({
  cards,
  cart,
  track,
}: {
  cards: number;
  cart: number;
  track: number;
}) {
  const menu = [
    ["B", "Paneer Biryani", "₹280"],
    ["T", "Masala Tea", "₹60"],
    ["S", "Crispy Samosa", "₹90"],
  ];

  return (
    <div className="sf-r4-phone-shell">
      <div className="sf-r4-phone-notch" />
      <div className="sf-r4-phone-screen">
        <div className="sf-r4-phone-top">
          <span>09:41</span>
          <div><i /><i /><i /></div>
        </div>

        <div className="sf-r4-phone-content">
          <div className="sf-r4-brand">
            <strong>SCANFEAST</strong>
            <span>TABLE 12</span>
          </div>

          <div
            className="sf-r4-phone-hero"
            style={{
              opacity: 1 - cart * 0.7,
              transform: `translateY(${lerp(0, -18, cart)}px)`,
            }}
          >
            <small>GOOD EVENING</small>
            <h4>WHAT ARE YOU<br />CRAVING?</h4>
            <p>A faster way to dine.</p>
          </div>

          <div className="sf-r4-phone-label">
            <span>POPULAR</span>
            <span>VIEW ALL</span>
          </div>

          <div className="sf-r4-menu">
            {menu.map(([code, name, price], i) => {
              const q = smooth(
                segment(cards, i * 0.07, 0.36 + i * 0.08),
              );

              return (
                <div
                  className="sf-r4-menu-card"
                  key={name}
                  style={{
                    opacity: q,
                    transform: `
                      translateY(${lerp(24, 0, q)}px)
                      scale(${lerp(0.95, 1, q)})
                    `,
                  }}
                >
                  <div className={`sf-r4-food sf-r4-food--${i}`}>
                    {code}
                  </div>

                  <div className="sf-r4-food-copy">
                    <strong>{name}</strong>
                    <small>AVAILABLE NOW</small>
                  </div>

                  <div className="sf-r4-food-price">
                    <span>{price}</span>
                    <b>+</b>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="sf-r4-phone-cart"
            style={{
              opacity: cart,
              transform: `translateY(${lerp(36, 0, cart)}px)`,
            }}
          >
            <div>
              <span>1 ITEM</span>
              <strong>₹280</strong>
            </div>
            <button type="button">
              VIEW CART <span>→</span>
            </button>
          </div>

          <div
            className="sf-r4-phone-track"
            style={{
              opacity: track,
              transform: `translateY(${lerp(35, 0, track)}px)`,
            }}
          >
            <div className="sf-r4-track-head">
              <span>ORDER #104</span>
              <b>LIVE</b>
            </div>
            <div className="sf-r4-track-bar">
              <span style={{ width: `${lerp(15, 87, track)}%` }} />
            </div>
            <div className="sf-r4-track-states">
              <span className="is-active">PLACED</span>
              <span className={track > .45 ? "is-active" : ""}>ACCEPTED</span>
              <span className={track > .72 ? "is-active" : ""}>COOKING</span>
              <span>READY</span>
            </div>
          </div>
        </div>

        <div className="sf-r4-phone-nav">
          <span className="is-active">HOME</span>
          <span>ORDERS</span>
          <span>HELP</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   02 — REALTIME HANDOFF
   ========================================================= */

function RealtimeScene() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const card = smooth(segment(p, 0.02, 0.22));
  const move = smooth(segment(p, 0.16, 0.55));
  const core = smooth(segment(p, 0.35, 0.68));
  const split = smooth(segment(p, 0.56, 0.78));
  const finish = smooth(segment(p, 0.74, 1));

  return (
    <Scene
      sceneRef={ref}
      height="165vh"
      className="sf-r4-realtime"
    >
      <Copy
        index="02"
        eyebrow="REAL-TIME HANDOFF"
        title={
          <>
            ONE
            <br />
            ORDER.
            <br />
            EVERYWHERE.
          </>
        }
        body="The customer action becomes a live event — delivered to the kitchen and management layer."
        side="right"
        opacity={1 - finish}
        y={lerp(15, -34, finish)}
      />

      <div
        className="sf-r4-big-order"
        style={{
          opacity: card * (1 - core * .25),
          transform: `
            translate3d(
              ${lerp(-190, -30, move)}px,
              ${lerp(25, 0, move)}px,
              0
            )
            rotateZ(${lerp(-4, 0, move)}deg)
            scale(${lerp(.82, 1, move)})
          `,
        }}
      >
        <span>ORDER CREATED</span>
        <strong>#104</strong>
        <small>TABLE 12 / PANEER BIRYANI</small>
      </div>

      <div
        className="sf-r4-wire sf-r4-wire--a"
        style={{ transform: `scaleX(${move}) rotate(-11deg)` }}
      >
        <i style={{ left: `${move * 100}%` }} />
      </div>

      <div
        className="sf-r4-wire sf-r4-wire--b"
        style={{ transform: `scaleX(${move}) rotate(11deg)` }}
      >
        <i style={{ left: `${move * 100}%` }} />
      </div>

      <div
        className="sf-r4-realtime-core"
        style={{
          opacity: core,
          transform: `
            translate(-50%, -50%)
            scale(${lerp(.55, 1, core)})
          `,
        }}
      >
        <span>SOCKET.IO</span>
        <strong>LIVE EVENT</strong>
        <small>ORDER / KDS / MANAGER</small>
      </div>

      <div
        className="sf-r4-handoff-target sf-r4-handoff-target--left"
        style={{
          opacity: split,
          transform: `translateY(${lerp(24, 0, split)}px)`,
        }}
      >
        <span>KDS</span>
        <small>KITCHEN</small>
      </div>

      <div
        className="sf-r4-handoff-target sf-r4-handoff-target--right"
        style={{
          opacity: split,
          transform: `translateY(${lerp(24, 0, split)}px)`,
        }}
      >
        <span>MANAGER</span>
        <small>OPERATIONS</small>
      </div>

      <div
        className="sf-r4-signal-text"
        style={{
          opacity: split,
          transform: `translateY(${lerp(18, 0, split)}px)`,
        }}
      >
        ORDER #104 ARRIVED
      </div>
    </Scene>
  );
}

/* =========================================================
   03 — KITCHEN
   ========================================================= */

function KitchenScene() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const frame = smooth(segment(p, 0.00, 0.22));
  const queue = smooth(segment(p, 0.16, 0.45));
  const active = smooth(segment(p, 0.38, 0.60));
  const timer = smooth(segment(p, 0.53, 0.76));
  const ready = smooth(segment(p, 0.70, 0.90));
  const cut = smooth(segment(p, 0.86, 1));

  const rawSeconds = Math.round(9 * 60 - timer * 205);
  const mins = Math.max(0, Math.floor(rawSeconds / 60));
  const secs = Math.max(0, rawSeconds % 60);
  const display = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <Scene sceneRef={ref} height="190vh" className="sf-r4-kitchen">
      <Copy
        index="03"
        eyebrow="KITCHEN DISPLAY SYSTEM"
        title={
          <>
            THE QUEUE
            <br />
            NEVER
            <br />
            STOPS.
          </>
        }
        body="FIFO ordering makes the next action obvious. Timers stay synchronized with the server."
        opacity={1 - cut}
        y={lerp(20, -34, cut)}
      />

      <div
        className="sf-r4-kds-frame"
        style={{
          opacity: frame,
          transform: `
            translate3d(-50%, -50%, 0)
            perspective(1100px)
            rotateY(${lerp(-13, 0, frame)}deg)
            rotateX(${lerp(4, 0, frame)}deg)
            scale(${lerp(.86, 1, frame)})
          `,
        }}
      >
        <div className="sf-r4-kds-topbar">
          <div>
            <strong>KITCHEN LIVE</strong>
            <span>SCANFEAST KDS</span>
          </div>
          <div className="sf-r4-online"><i /> REALTIME</div>
        </div>

        <div className="sf-r4-kds-body">
          <aside>
            <span className="is-active">ALL</span>
            <span>NEW</span>
            <span>COOKING</span>
            <span>READY</span>
          </aside>

          <main>
            <div className="sf-r4-kds-heading">
              <div>
                <small>FIFO QUEUE</small>
                <h4>ORDERS IN MOTION</h4>
              </div>
              <strong>12:48</strong>
            </div>

            <div className="sf-r4-order-stack">
              {[
                ["#104", "TABLE 12", "PANEER BIRYANI", display, "COOKING"],
                ["#103", "TABLE 04", "MASALA TEA", "04:51", "QUEUED"],
                ["#102", "TABLE 09", "SAMOSA + TEA", "05:12", "QUEUED"],
              ].map((item, i) => {
                const q = smooth(
                  segment(queue, i * .06, .30 + i * .10),
                );
                return (
                  <article
                    key={item[0]}
                    className={i === 0 ? "is-primary" : ""}
                    style={{
                      opacity: q,
                      transform: `
                        translateX(${lerp(40, 0, q)}px)
                        translateY(${lerp(16, 0, q)}px)
                      `,
                    }}
                  >
                    <div className="sf-r4-order-top">
                      <span>{item[0]}</span>
                      <small>{item[1]}</small>
                    </div>
                    <strong>{item[2]}</strong>
                    <div className="sf-r4-order-bottom">
                      <span>ETA</span>
                      <b>{item[3]}</b>
                      <i />
                      <span>{i === 0 && ready > .6 ? "READY" : item[4]}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div
              className="sf-r4-ready-banner"
              style={{
                opacity: ready,
                transform: `translateY(${lerp(18, 0, ready)}px)`,
              }}
            >
              <span>ORDER #104</span>
              <strong>READY FOR PICKUP</strong>
              <small>STATE BROADCAST TO CUSTOMER</small>
            </div>
          </main>
        </div>
      </div>

      <div
        className="sf-r4-timer-card"
        style={{
          opacity: timer,
          transform: `
            translateY(${lerp(25, 0, timer)}px)
            scale(${lerp(.9, 1, timer)})
          `,
        }}
      >
        <span>SERVER-AUTHORITATIVE TIMER</span>
        <strong>{display}</strong>
        <small>CLIENT OFFSET ADJUSTED</small>
      </div>

      <div
        className="sf-r4-fifo-mark"
        style={{
          opacity: active,
          transform: `scale(${lerp(.86, 1, active)})`,
        }}
      >
        FIFO
      </div>
    </Scene>
  );
}

/* =========================================================
   04 — MANAGER
   ========================================================= */

function ManagerScene() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const enter = smooth(segment(p, 0.00, 0.24));
  const metrics = smooth(segment(p, 0.17, 0.42));
  const chart = smooth(segment(p, 0.34, 0.62));
  const rush = smooth(segment(p, 0.54, 0.75));
  const exit = smooth(segment(p, 0.73, 1));

  return (
    <Scene sceneRef={ref} height="185vh" className="sf-r4-manager">
      <Copy
        index="04"
        eyebrow="MANAGEMENT"
        title={
          <>
            SEE
            <br />
            EVERYTHING.
          </>
        }
        body="The operational layer turns live orders into decisions: revenue, queue health and rush control."
        opacity={1 - exit}
        y={lerp(18, -36, exit)}
      />

      <div
        className="sf-r4-dashboard"
        style={{
          opacity: enter,
          transform: `
            translate3d(-50%, -50%, 0)
            perspective(1300px)
            rotateY(${lerp(14, 0, enter)}deg)
            translateX(${lerp(-120, 0, enter)}px)
            scale(${lerp(.84, 1, enter)})
          `,
        }}
      >
        <div className="sf-r4-dashboard-bar">
          <div>
            <strong>MANAGER</strong>
            <span>SCANFEAST OPERATIONS</span>
          </div>
          <div className="sf-r4-health"><i /> SYSTEM HEALTHY</div>
        </div>

        <div className="sf-r4-dashboard-body">
          <div className="sf-r4-metrics">
            {[
              ["REVENUE", "₹15,135", "+18.4%"],
              ["LIVE ORDERS", "12", "+3"],
              ["TABLES", "18 / 24", "ACTIVE"],
              ["RUSH MODE", "OFF", "CONTROLLED"],
            ].map(([label, value, delta], i) => {
              const q = smooth(
                segment(metrics, i * .05, .42 + i * .04),
              );
              return (
                <article
                  key={label}
                  style={{
                    opacity: q,
                    transform: `translateY(${lerp(20, 0, q)}px)`,
                  }}
                >
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{delta}</small>
                </article>
              );
            })}
          </div>

          <div
            className="sf-r4-chart-panel"
            style={{
              opacity: chart,
              transform: `translateY(${lerp(24, 0, chart)}px)`,
            }}
          >
            <div className="sf-r4-chart-head">
              <span>SERVICE ACTIVITY</span>
              <span>LAST 6 HOURS</span>
            </div>

            <div className="sf-r4-chart">
              <div className="sf-r4-chart-grid" />
              <svg viewBox="0 0 720 190" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M0 155 C48 149 62 124 105 136 S164 107 210 119 S264 83 310 102 S362 61 404 80 S461 54 508 72 S580 41 720 18 L720 190 L0 190 Z"
                  fill="rgba(255,106,0,.11)"
                />
                <path
                  d="M0 155 C48 149 62 124 105 136 S164 107 210 119 S264 83 310 102 S362 61 404 80 S461 54 508 72 S580 41 720 18"
                  fill="none"
                  stroke="rgba(255,106,0,.95)"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - chart}
                />
              </svg>
            </div>
          </div>

          <div
            className="sf-r4-dashboard-footer"
            style={{
              opacity: chart,
              transform: `translateY(${lerp(18, 0, chart)}px)`,
            }}
          >
            <div><span>QUEUE HEALTH</span><strong>98.4%</strong></div>
            <div><span>AVERAGE ETA</span><strong>08:42</strong></div>
            <div><span>DELIVERY</span><strong>LIVE</strong></div>
          </div>
        </div>
      </div>

      <div
        className="sf-r4-rush"
        style={{
          opacity: rush,
          transform: `
            translateY(${lerp(35, 0, rush)}px)
            scale(${lerp(.9, 1, rush)})
          `,
        }}
      >
        <span>GLOBAL RUSH CONTROL</span>
        <strong>+05:00 BUFFER</strong>
        <small>ONE ACTION / ALL ACTIVE ORDERS</small>
      </div>
    </Scene>
  );
}

/* =========================================================
   05 — SYSTEM REVEAL
   ========================================================= */

function SystemScene() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const title = smooth(segment(p, 0.00, 0.24));
  const nodes = smooth(segment(p, 0.16, 0.48));
  const lines = smooth(segment(p, 0.36, 0.70));
  const core = smooth(segment(p, 0.58, 0.82));
  const finale = smooth(segment(p, 0.76, 1));

  return (
    <Scene
      sceneRef={ref}
      height="165vh"
      className="sf-r4-system"
    >
      <div
        className="sf-r4-system-heading"
        style={{
          opacity: 1 - finale,
          transform: `translateY(${lerp(28, 0, title)}px)`,
        }}
      >
        <span>05 / THE SYSTEM</span>
        <h3>
          ONE LIVE
          <br />
          OPERATING LAYER.
        </h3>
      </div>

      <div
        className="sf-r4-system-map"
        style={{
          opacity: nodes,
          transform: `scale(${lerp(.8, 1, nodes)})`,
        }}
      >
        <div className="sf-r4-node sf-r4-node--diner">
          <span>DINER</span>
        </div>

        <div className="sf-r4-node sf-r4-node--kds">
          <span>KDS</span>
        </div>

        <div className="sf-r4-node sf-r4-node--manager">
          <span>MANAGER</span>
        </div>

        <div className="sf-r4-node sf-r4-node--socket">
          <span>SOCKET.IO</span>
        </div>

        <div
          className="sf-r4-system-line sf-r4-system-line--a"
          style={{ transform: `scaleX(${lines}) rotate(-14deg)` }}
        >
          <i />
        </div>

        <div
          className="sf-r4-system-line sf-r4-system-line--b"
          style={{ transform: `scaleX(${lines}) rotate(3deg)` }}
        >
          <i />
        </div>

        <div
          className="sf-r4-system-line sf-r4-system-line--c"
          style={{ transform: `scaleX(${lines}) rotate(36deg)` }}
        >
          <i />
        </div>

        <div
          className="sf-r4-core"
          style={{
            opacity: core,
            transform: `
              translate(-50%, -50%)
              scale(${lerp(.55, 1, core)})
            `,
          }}
        >
          <div className="sf-r4-core-ring" />
          <span>REAL-TIME</span>
          <strong>SCANFEAST</strong>
          <small>ONE SYSTEM / MANY SURFACES</small>
        </div>
      </div>

      <div
        className="sf-r4-finale"
        style={{
          opacity: finale,
          transform: `translate3d(-50%, ${lerp(30, 0, finale)}px, 0)`,
        }}
      >
        <span>DESIGNED / ENGINEERED / DEPLOYED</span>
        <strong>THE RESTAURANT MOVES AS ONE.</strong>
      </div>
    </Scene>
  );
}
