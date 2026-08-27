"use client";

export default function ScanfeastArchitecture() {
  return (
    <section className="sf-section sf-architecture">
      <div className="sf-section__intro">
        <span>
          03 / ARCHITECTURE
        </span>

        <h2>
          ONE SYSTEM.
          <br />
          MANY SURFACES.
        </h2>
      </div>

      <div className="sf-architecture__visual">
        <svg
          viewBox="0 0 1200 680"
          role="img"
          aria-label="Scanfeast architecture"
          className="sf-architecture__svg"
        >
          <defs>
            <filter
              id="sfGlow"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                stdDeviation="4"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* background zones */}

          <rect
            x="70"
            y="45"
            width="1060"
            height="165"
            rx="24"
            className="sf-arch-zone"
          />

          <rect
            x="190"
            y="275"
            width="820"
            height="145"
            rx="24"
            className="sf-arch-zone"
          />

          <rect
            x="370"
            y="500"
            width="460"
            height="110"
            rx="24"
            className="sf-arch-zone"
          />

          {/* labels */}

          <text
            x="100"
            y="82"
            className="sf-arch-zone-label"
          >
            CLIENT LAYER
          </text>

          <text
            x="220"
            y="312"
            className="sf-arch-zone-label"
          >
            BACKEND / REAL-TIME
          </text>

          <text
            x="400"
            y="537"
            className="sf-arch-zone-label"
          >
            PERSISTENCE
          </text>

          {/* connections */}

          <path
            id="dinerApi"
            d="M220 155 C220 230 420 245 455 330"
            className="sf-arch-line"
          />

          <path
            id="kdsApi"
            d="M600 155 L600 330"
            className="sf-arch-line"
          />

          <path
            id="managerApi"
            d="M980 155 C980 230 780 245 745 330"
            className="sf-arch-line"
          />

          <path
            id="dinerSocket"
            d="M300 180 C430 215 450 215 510 330"
            className="sf-arch-line sf-arch-line--socket"
          />

          <path
            id="kdsSocket"
            d="M650 180 L650 330"
            className="sf-arch-line sf-arch-line--socket"
          />

          <path
            id="managerSocket"
            d="M900 180 C770 215 750 215 690 330"
            className="sf-arch-line sf-arch-line--socket"
          />

          <path
            id="databaseLine"
            d="M600 420 L600 545"
            className="sf-arch-line"
          />

          {/* client nodes */}

          <Node
            x={220}
            y={145}
            title="DINER"
            subtitle="CUSTOMER BROWSER"
          />

          <Node
            x={600}
            y={145}
            title="KDS"
            subtitle="KITCHEN TABLET"
          />

          <Node
            x={980}
            y={145}
            title="MANAGER"
            subtitle="DASHBOARD"
          />

          {/* backend */}

          <Node
            x={455}
            y={350}
            title="EXPRESS"
            subtitle="REST API"
            accent
          />

          <Node
            x={745}
            y={350}
            title="SOCKET.IO"
            subtitle="REAL-TIME SERVER"
            accent
          />

          {/* database */}

          <g>
            <ellipse
              cx="600"
              cy="555"
              rx="105"
              ry="28"
              className="sf-arch-db"
            />

            <rect
              x="495"
              y="555"
              width="210"
              height="28"
              className="sf-arch-db"
            />

            <ellipse
              cx="600"
              cy="583"
              rx="105"
              ry="28"
              className="sf-arch-db"
            />

            <text
              x="600"
              y="570"
              textAnchor="middle"
              className="sf-arch-node-title"
            >
              MONGODB ATLAS
            </text>
          </g>

          {/* packets */}

          <Packet href="#dinerApi" delay="0s" />
          <Packet href="#kdsApi" delay="0.8s" />
          <Packet href="#managerApi" delay="1.6s" />

          <Packet
            href="#dinerSocket"
            delay="0.4s"
            socket
          />

          <Packet
            href="#kdsSocket"
            delay="1.2s"
            socket
          />

          <Packet
            href="#managerSocket"
            delay="2s"
            socket
          />
        </svg>
      </div>

      <p className="sf-section__note">
        REST provides canonical API access,
        Socket.IO carries realtime events,
        and MongoDB remains the persistence
        layer.
      </p>
    </section>
  );
}

function Node({
  x,
  y,
  title,
  subtitle,
  accent = false,
}: {
  x: number;
  y: number;
  title: string;
  subtitle: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x - 110}
        y={y - 42}
        width="220"
        height="84"
        rx="14"
        className={
          accent
            ? "sf-arch-node sf-arch-node--accent"
            : "sf-arch-node"
        }
      />

      <text
        x={x}
        y={y - 2}
        textAnchor="middle"
        className="sf-arch-node-title"
      >
        {title}
      </text>

      <text
        x={x}
        y={y + 20}
        textAnchor="middle"
        className="sf-arch-node-subtitle"
      >
        {subtitle}
      </text>
    </g>
  );
}

function Packet({
  href,
  delay,
  socket = false,
}: {
  href: string;
  delay: string;
  socket?: boolean;
}) {
  return (
    <circle
      r="7"
      className={
        socket
          ? "sf-arch-packet sf-arch-packet--socket"
          : "sf-arch-packet"
      }
    >
      <animateMotion
        dur="2.8s"
        begin={delay}
        repeatCount="indefinite"
      >
        <mpath href={href} />
      </animateMotion>
    </circle>
  );
}
