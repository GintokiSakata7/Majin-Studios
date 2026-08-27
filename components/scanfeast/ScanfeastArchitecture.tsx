"use client";

const layers = [
  {
    label: "CLIENT LAYER",
    items: [
      "CUSTOMER BROWSER",
      "KITCHEN TABLET / KDS",
      "MANAGER DASHBOARD",
    ],
  },

  {
    label: "BACKEND / REAL-TIME",
    items: [
      "EXPRESS REST API",
      "SOCKET.IO SERVER",
    ],
  },

  {
    label: "PERSISTENCE",
    items: [
      "MONGODB ATLAS",
    ],
  },
];

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

      <div className="sf-architecture__diagram">
        {layers.map(
          (layer, index) => (
            <div
              key={layer.label}
              className="sf-architecture__layer"
            >
              <span>
                {layer.label}
              </span>

              <div>
                {layer.items.map(
                  (item) => (
                    <article
                      key={item}
                    >
                      <strong>
                        {item}
                      </strong>
                    </article>
                  )
                )}
              </div>

              {index <
                layers.length -
                  1 && (
                <i className="sf-architecture__connector">
                  ↓
                </i>
              )}
            </div>
          )
        )}
      </div>

      <p className="sf-section__note">
        Node.js / Express provides the
        API layer, Socket.IO carries live
        events, and MongoDB remains the
        canonical persistence layer.
      </p>
    </section>
  );
}
