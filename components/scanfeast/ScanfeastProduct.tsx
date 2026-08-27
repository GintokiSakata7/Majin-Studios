"use client";

import { useRef, type CSSProperties, type ReactNode, type RefObject } from "react";
import {
  lerp,
  segment,
  smooth,
  useSceneProgress,
} from "./ScanfeastScene";

import "./scanfeast-multi-scene.css";

const MENU_ITEMS = [
  ["B", "Paneer Biryani", "Chef special · serves 1", "₹280"],
  ["T", "Masala Tea", "Fresh brewed", "₹60"],
  ["S", "Crispy Samosa", "3 pieces", "₹90"],
] as const;

const ORDER_STATES = ["PLACED", "ACCEPTED", "COOKING", "READY"] as const;

function Scene({
  children,
  sceneRef,
  className = "",
  height = "250vh",
}: {
  children: ReactNode;
  sceneRef: RefObject<HTMLElement | null>;
  className?: string;
  height?: string;
}) {
  return (
    <section
      ref={sceneRef}
      className={`sf-ms-scene ${className}`}
      style={
        {
          "--scene-height": height,
        } as CSSProperties
      }
    >
      <div className="sf-ms-sticky">
        <div className="sf-ms-stage">{children}</div>
      </div>
    </section>
  );
}

function Copy({
  index,
  eyebrow,
  title,
  body,
  side = "left",
  opacity = 1,
  y = 0,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
  side?: "left" | "right";
  opacity?: number;
  y?: number;
}) {
  return (
    <div
      className={`sf-ms-copy sf-ms-copy--${side}`}
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
    <section className="sf-section sf-product sf-ms-product">
      <div className="sf-section__intro sf-ms-product-intro">
        <span>02 / PRODUCT</span>
        <div>
          <h2>
            ONE PRODUCT.
            <br />
            MANY MOMENTS.
          </h2>
          <p>
            We do not present Scanfeast as a screenshot gallery.
            We let the workflow unfold — from a table scan to a
            live kitchen and an operational dashboard.
          </p>
        </div>
      </div>

      <DinerScene />
      <OrderHandoffScene />
      <KitchenScene />
      <ManagerScene />
      <SystemReveal />
    </section>
  );
}

/* =========================================================
   SCENE 01 — DINER
   ========================================================= */

function DinerScene() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const table = smooth(segment(p, 0.00, 0.20));
  const phone = smooth(segment(p, 0.12, 0.34));
  const menu = smooth(segment(p, 0.25, 0.48));
  const cart = smooth(segment(p, 0.43, 0.62));
  const tracking = smooth(segment(p, 0.59, 0.82));
  const exit = smooth(segment(p, 0.80, 1));

  return (
    <Scene sceneRef={ref} height="285vh">

      <div className="sf-ms-grid" />
      <div className="sf-ms-glow" />

      <Copy
        index="01"
        eyebrow="DINER EXPERIENCE"
        title={
          <>
            ORDER
            <br />
            WITHOUT
            <br />
            WAITING.
          </>
        }
        body="Scan the table. Browse the menu. Place the order. Follow the kitchen live."
        opacity={1 - tracking * 0.45 - exit}
        y={lerp(0, -44, exit)}
      />

      <div
        className="sf-ms-table"
        style={{
          opacity: 1 - phone * 1.05,
          transform: `
            translate3d(-50%, -50%, 0)
            perspective(900px)
            rotateX(${lerp(62, 56, phone)}deg)
            rotateZ(${lerp(-8, 2, phone)}deg)
            scale(${lerp(1, 0.88, phone)})
          `,
        }}
      >
        <div className="sf-ms-table__top">
          <div className="sf-ms-qr">
            {Array.from({ length: 49 }, (_, i) => <i key={i} />)}
          </div>
          <small>SCANFEAST · TABLE 12</small>
        </div>
        <div className="sf-ms-table__leg sf-ms-table__leg--a" />
        <div className="sf-ms-table__leg sf-ms-table__leg--b" />
      </div>

      <div
        className="sf-ms-phone"
        style={{
          opacity: phone,
          transform: `
            translate3d(-50%, -50%, 0)
            rotateY(${lerp(16, 0, phone)}deg)
            rotateZ(${lerp(-7, 0, phone)}deg)
            scale(${lerp(0.78, 1, phone)})
          `,
        }}
      >
        <PhoneUI menu={menu} cart={cart} tracking={tracking} />
      </div>

      <div
        className="sf-ms-event sf-ms-event--left"
        style={{
          opacity: tracking,
          transform: `
            translateY(${lerp(35, 0, tracking)}px)
            scale(${lerp(0.93, 1, tracking)})
          `,
        }}
      >
        <span>ORDER CREATED</span>
        <strong>#104</strong>
        <small>TABLE 12 · 1 ITEM</small>
      </div>

      <div className="sf-ms-progress-dots">
        <span className={table > 0.45 ? "is-active" : ""}>SCAN</span>
        <span className={menu > 0.3 ? "is-active" : ""}>BROWSE</span>
        <span className={cart > 0.3 ? "is-active" : ""}>ORDER</span>
        <span className={tracking > 0.3 ? "is-active" : ""}>TRACK</span>
      </div>
    </Scene>
  );
}

/* =========================================================
   SCENE 02 — ORDER HANDOFF
   ========================================================= */

function OrderHandoffScene() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const handoff = smooth(segment(p, 0.08, 0.55));
  const packet = smooth(segment(p, 0.18, 0.72));
  const reveal = smooth(segment(p, 0.48, 0.95));

  return (
    <Scene sceneRef={ref} height="220vh" className="sf-ms-handoff-scene">

      <div className="sf-ms-grid" />
      <div className="sf-ms-glow sf-ms-glow--wide" />

      <Copy
        index="02"
        eyebrow="REAL-TIME HANDOFF"
        title={
          <>
            ONE TAP.
            <br />
            EVERY
            <br />
            SURFACE
            <br />
            KNOWS.
          </>
        }
        body="The order leaves the diner interface and becomes a live system event."
        opacity={1 - reveal}
        y={lerp(34, 0, packet)}
      />

      <div
        className="sf-ms-handoff-phone"
        style={{
          opacity: 1 - reveal * 0.65,
          transform: `
            translate3d(-50%, -50%, 0)
            rotateY(${lerp(-11, 0, handoff)}deg)
            translateX(${lerp(-90, 0, handoff)}px)
          `,
        }}
      >
        <div className="sf-ms-handoff-card">
          <span>DINER</span>
          <strong>#104</strong>
          <small>PANEER BIRYANI</small>
        </div>
      </div>

      <div className="sf-ms-handoff-wire sf-ms-handoff-wire--a">
        <i style={{ left: `${packet * 100}%` }} />
      </div>

      <div className="sf-ms-handoff-wire sf-ms-handoff-wire--b">
        <i style={{ left: `${packet * 100}%` }} />
      </div>

      <div
        className="sf-ms-handoff-core"
        style={{
          opacity: handoff,
          transform: `
            translate3d(-50%, -50%, 0)
            scale(${lerp(0.65, 1, handoff)})
          `,
        }}
      >
        <span>SOCKET.IO</span>
        <strong>LIVE EVENT</strong>
        <small>ORDER → KDS → MANAGER</small>
      </div>

      <div
        className="sf-ms-handoff-target sf-ms-handoff-target--kds"
        style={{ opacity: reveal }}
      >
        <span>KDS</span>
        <small>KITCHEN TABLET</small>
      </div>

      <div
        className="sf-ms-handoff-target sf-ms-handoff-target--manager"
        style={{ opacity: reveal }}
      >
        <span>MANAGER</span>
        <small>DASHBOARD</small>
      </div>

      <div
        className="sf-ms-handoff-order"
        style={{
          opacity: reveal,
          transform: `translateY(${lerp(30, 0, reveal)}px)`,
        }}
      >
        <span>ORDER #104</span>
        <strong>ARRIVED IN KITCHEN</strong>
        <small>REALTIME · NO REFRESH</small>
      </div>
    </Scene>
  );
}

/* =========================================================
   SCENE 03 — KITCHEN
   ========================================================= */

function KitchenScene() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const panel = smooth(segment(p, 0.05, 0.30));
  const orders = smooth(segment(p, 0.22, 0.55));
  const active = smooth(segment(p, 0.46, 0.70));
  const timer = smooth(segment(p, 0.62, 0.84));
  const ready = smooth(segment(p, 0.80, 1));

  const seconds = Math.round(9 * 60 - timer * 137);
  const minutes = Math.max(0, Math.floor(seconds / 60));
  const remain = Math.max(0, seconds % 60);
  const timerText = `${String(minutes).padStart(2, "0")}:${String(remain).padStart(2, "0")}`;

  return (
    <Scene sceneRef={ref} height="275vh">

      <div className="sf-ms-grid" />
      <div className="sf-ms-glow" />

      <Copy
        index="03"
        eyebrow="KITCHEN DISPLAY SYSTEM"
        title={
          <>
            EVERY
            <br />
            ORDER
            <br />
            HAS A
            <br />
            PLACE.
          </>
        }
        body="FIFO queueing, synchronized countdowns and instant state changes keep the kitchen moving."
        side="right"
        opacity={1 - ready * 0.35}
        y={lerp(40, 0, active)}
      />

      <div
        className="sf-ms-kitchen"
        style={{
          opacity: panel,
          transform: `
            translate3d(-50%, -50%, 0)
            perspective(1200px)
            rotateY(${lerp(-15, 0, panel)}deg)
            translateX(${lerp(90, 0, panel)}px)
            scale(${lerp(0.9, 1, panel)})
          `,
        }}
      >
        <div className="sf-ms-kitchen__chrome">
          <div>
            <strong>KITCHEN LIVE</strong>
            <span>SCANFEAST KDS</span>
          </div>
          <div className="sf-ms-live"><i /> REALTIME</div>
        </div>

        <div className="sf-ms-kitchen__body">
          <aside>
            <span className="is-active">ALL ORDERS</span>
            <span>NEW</span>
            <span>COOKING</span>
            <span>READY</span>
          </aside>

          <main>
            <div className="sf-ms-kitchen__head">
              <div>
                <small>FIFO QUEUE</small>
                <h4>ORDERS IN MOTION</h4>
              </div>
              <strong>12:48</strong>
            </div>

            <div className="sf-ms-orders">
              {[
                ["#104", "TABLE 12", "PANEER BIRYANI", "09:48"],
                ["#103", "TABLE 04", "MASALA TEA", "04:51"],
                ["#102", "TABLE 09", "SAMOSA + TEA", "05:12"],
              ].map((order, i) => {
                const q = smooth(
                  segment(orders, i * 0.08, 0.30 + i * 0.11),
                );
                return (
                  <article
                    key={order[0]}
                    className={i === 0 ? "is-primary" : ""}
                    style={{
                      opacity: q,
                      transform: `translateY(${lerp(28, 0, q)}px)`,
                    }}
                  >
                    <div className="sf-ms-order-top">
                      <span>{order[0]}</span>
                      <small>{order[1]}</small>
                    </div>
                    <strong>{order[2]}</strong>
                    <div className="sf-ms-order-bottom">
                      <span>ETA</span>
                      <b>{i === 0 ? timerText : order[3]}</b>
                      <i />
                      <span>
                        {i === 0
                          ? ready > 0.5
                            ? "READY"
                            : timer > 0.3
                              ? "COOKING"
                              : "ACCEPTED"
                          : "QUEUED"}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div
              className="sf-ms-kitchen-ready"
              style={{
                opacity: ready,
                transform: `translateY(${lerp(25, 0, ready)}px)`,
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
        className="sf-ms-kitchen-callout"
        style={{
          opacity: timer,
          transform: `translateY(${lerp(20, 0, timer)}px)`,
        }}
      >
        <span>SERVER-AUTHORITATIVE TIMER</span>
        <strong>{timerText}</strong>
        <small>NO CLIENT CLOCK DRIFT</small>
      </div>
    </Scene>
  );
}

/* =========================================================
   SCENE 04 — MANAGER
   ========================================================= */

function ManagerScene() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const dashboard = smooth(segment(p, 0.05, 0.30));
  const metrics = smooth(segment(p, 0.20, 0.48));
  const chart = smooth(segment(p, 0.40, 0.68));
  const pulse = smooth(segment(p, 0.64, 0.86));
  const exit = smooth(segment(p, 0.83, 1));

  return (
    <Scene sceneRef={ref} height="260vh">

      <div className="sf-ms-grid" />
      <div className="sf-ms-glow" />

      <Copy
        index="04"
        eyebrow="MANAGEMENT"
        title={
          <>
            SEE THE
            <br />
            WHOLE
            <br />
            RESTAURANT.
          </>
        }
        body="Revenue, tables, rush mode and kitchen health become one operational view."
        opacity={1 - exit}
        y={lerp(42, 0, exit)}
      />

      <div
        className="sf-ms-manager"
        style={{
          opacity: dashboard,
          transform: `
            translate3d(-50%, -50%, 0)
            perspective(1200px)
            rotateY(${lerp(13, 0, dashboard)}deg)
            translateX(${lerp(-90, 0, dashboard)}px)
            scale(${lerp(0.91, 1, dashboard)})
          `,
        }}
      >
        <div className="sf-ms-manager__chrome">
          <div>
            <strong>MANAGER</strong>
            <span>SCANFEAST OPERATIONS</span>
          </div>
          <div className="sf-ms-health"><i /> SYSTEM HEALTHY</div>
        </div>

        <div className="sf-ms-manager__body">
          <div className="sf-ms-manager-metrics">
            {[
              ["REVENUE", "₹15,135", "+18.4%"],
              ["LIVE ORDERS", "12", "+3"],
              ["TABLES", "18 / 24", "ACTIVE"],
              ["RUSH MODE", "OFF", "CONTROLLED"],
            ].map(([label, value, delta], i) => (
              <article
                key={label}
                style={{
                  opacity: metrics,
                  transform: `translateY(${lerp(18, 0, metrics)}px)`,
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{delta}</small>
              </article>
            ))}
          </div>

          <div
            className="sf-ms-manager-chart"
            style={{
              opacity: chart,
              transform: `translateY(${lerp(20, 0, chart)}px)`,
            }}
          >
            <div className="sf-ms-manager-chart__top">
              <span>SERVICE ACTIVITY</span>
              <span>LAST 6 HOURS</span>
            </div>

            <div className="sf-ms-chart">
              <div className="sf-ms-chart__grid" />
              <svg viewBox="0 0 700 180" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M0 150 C45 145 52 118 96 132 S154 112 196 120 S247 85 295 101 S352 58 391 80 S448 48 493 66 S560 40 700 18 L700 180 L0 180 Z"
                  fill="rgba(255,106,0,.12)"
                />
                <path
                  d="M0 150 C45 145 52 118 96 132 S154 112 196 120 S247 85 295 101 S352 58 391 80 S448 48 493 66 S560 40 700 18"
                  fill="none"
                  stroke="rgba(255,106,0,.95)"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>

          <div
            className="sf-ms-manager-footer"
            style={{
              opacity: pulse,
              transform: `translateY(${lerp(18, 0, pulse)}px)`,
            }}
          >
            <div><span>QUEUE HEALTH</span><strong>98.4%</strong></div>
            <div><span>AVERAGE ETA</span><strong>08:42</strong></div>
            <div><span>DELIVERY</span><strong>LIVE</strong></div>
          </div>
        </div>
      </div>

      <div
        className="sf-ms-manager-signal"
        style={{
          opacity: pulse,
          transform: `translateY(${lerp(22, 0, pulse)}px)`,
        }}
      >
        <span>GLOBAL RUSH CONTROL</span>
        <strong>+05:00 BUFFER</strong>
        <small>ONE CONTROL / ALL ACTIVE ORDERS</small>
      </div>
    </Scene>
  );
}

/* =========================================================
   SCENE 05 — SYSTEM REVEAL
   ========================================================= */

function SystemReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSceneProgress(ref);

  const reveal = smooth(segment(p, 0.08, 0.50));
  const network = smooth(segment(p, 0.34, 0.72));
  const finish = smooth(segment(p, 0.66, 0.96));

  return (
    <Scene
      sceneRef={ref}
      height="245vh"
      className="sf-ms-system-scene"
    >

      <div className="sf-ms-grid" />
      <div className="sf-ms-glow sf-ms-glow--center" />

      <div
        className="sf-ms-system-title"
        style={{
          opacity: 1 - finish,
          transform: `translateY(${lerp(24, 0, reveal)}px)`,
        }}
      >
        <span>05 / THE SYSTEM</span>
        <h3>
          ONE SYSTEM.
          <br />
          MANY SURFACES.
        </h3>
      </div>

      <div
        className="sf-ms-system-network"
        style={{
          opacity: network,
          transform: `scale(${lerp(0.84, 1, network)})`,
        }}
      >
        <Node className="sf-ms-node--diner" label="DINER" />
        <Node className="sf-ms-node--kds" label="KDS" />
        <Node className="sf-ms-node--manager" label="MANAGER" />
        <Node className="sf-ms-node--socket" label="SOCKET.IO" accent />

        <div className="sf-ms-network-line sf-ms-network-line--a"><i /></div>
        <div className="sf-ms-network-line sf-ms-network-line--b"><i /></div>
        <div className="sf-ms-network-line sf-ms-network-line--c"><i /></div>

        <div className="sf-ms-network-core">
          <span>REAL-TIME</span>
          <strong>SCANFEAST</strong>
          <small>ONE LIVE OPERATING LAYER</small>
        </div>
      </div>

      <div
        className="sf-ms-system-finale"
        style={{
          opacity: finish,
          transform: `translateY(${lerp(24, 0, finish)}px)`,
        }}
      >
        <span>DESIGNED · ENGINEERED · DEPLOYED</span>
        <strong>THE RESTAURANT MOVES AS ONE.</strong>
      </div>
    </Scene>
  );
}

function Node({
  className,
  label,
  accent = false,
}: {
  className: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`sf-ms-node ${className} ${accent ? "is-accent" : ""}`}
    >
      <span>{label}</span>
    </div>
  );
}

/* =========================================================
   SHARED PHONE UI
   ========================================================= */

function PhoneUI({
  menu,
  cart,
  tracking,
}: {
  menu: number;
  cart: number;
  tracking: number;
}) {
  return (
    <div className="sf-ms-phone-screen">
      <div className="sf-ms-phone-notch" />

      <div className="sf-ms-phone-top">
        <span>09:41</span>
        <div><i /><i /><i /></div>
      </div>

      <div className="sf-ms-phone-content">
        <div className="sf-ms-phone-brand">
          <strong>SCANFEAST</strong>
          <span>TABLE 12</span>
        </div>

        <div
          className="sf-ms-phone-hero"
          style={{
            opacity: 1 - cart * 0.62,
            transform: `translateY(${lerp(0, -15, cart)}px)`,
          }}
        >
          <small>GOOD EVENING</small>
          <h4>WHAT ARE YOU<br />CRAVING?</h4>
          <p>A faster way to dine.</p>
        </div>

        <div className="sf-ms-phone-section-head">
          <span>POPULAR</span>
          <span>VIEW ALL</span>
        </div>

        <div className="sf-ms-menu">
          {MENU_ITEMS.map(([code, name, meta, price], i) => {
            const item = smooth(
              segment(menu, i * 0.07, 0.34 + i * 0.10),
            );

            return (
              <div
                key={name}
                className="sf-ms-menu-item"
                style={{
                  opacity: item,
                  transform: `
                    translateY(${lerp(18, 0, item)}px)
                    scale(${lerp(0.97, 1, item)})
                  `,
                }}
              >
                <div className={`sf-ms-menu-thumb sf-ms-menu-thumb--${i}`}>
                  {code}
                </div>
                <div>
                  <strong>{name}</strong>
                  <small>{meta}</small>
                </div>
                <div className="sf-ms-menu-price">
                  <span>{price}</span>
                  <b>+</b>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="sf-ms-cart"
          style={{
            opacity: cart,
            transform: `translateY(${lerp(32, 0, cart)}px)`,
          }}
        >
          <div><span>1 ITEM</span><strong>₹280</strong></div>
          <button type="button">
            VIEW CART <span>→</span>
          </button>
        </div>

        <div
          className="sf-ms-tracking"
          style={{
            opacity: tracking,
            transform: `translateY(${lerp(34, 0, tracking)}px)`,
          }}
        >
          <div className="sf-ms-tracking-head">
            <span>ORDER #104</span>
            <b>LIVE</b>
          </div>

          <div className="sf-ms-track-bar">
            <span
              style={{
                width: `${lerp(18, 88, tracking)}%`,
              }}
            />
          </div>

          <div className="sf-ms-track-states">
            {ORDER_STATES.map((state, i) => (
              <span
                key={state}
                className={
                  tracking > 0.2 + i * 0.18
                    ? "is-active"
                    : ""
                }
              >
                {state}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="sf-ms-phone-nav">
        <span className="is-active">HOME</span>
        <span>ORDERS</span>
        <span>HELP</span>
      </div>
    </div>
  );
}
