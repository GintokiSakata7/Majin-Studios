"use client";

const PRODUCT_SURFACES = [
  {
    number: "01",
    label: "DINER EXPERIENCE",
    title:
      "Ordering starts at the table.",
    body:
      "QR-based browser ordering removes the physical handoff between guest and staff.",
    image:
      "/scanfeast/images/diner.png",
    className:
      "sf-product__image--mobile",
  },

  {
    number: "02",
    label: "KITCHEN DISPLAY SYSTEM",
    title:
      "The kitchen sees the queue in real time.",
    body:
      "Orders arrive directly into a FIFO workflow with live preparation status and timers.",
    image:
      "/scanfeast/images/kds.png",
    className:
      "sf-product__image--desktop",
  },

  {
    number: "03",
    label: "MANAGER OPERATIONS",
    title:
      "One view of the restaurant.",
    body:
      "Revenue, tables, kitchen state and operational alerts converge into one dashboard.",
    image:
      "/scanfeast/images/manager.png",
    className:
      "sf-product__image--desktop",
  },
];

export default function ScanfeastProduct() {
  return (
    <section className="sf-section sf-product">
      <div className="sf-section__intro">
        <span>
          02 / PRODUCT
        </span>

        <h2>
          THE SYSTEM
          <br />
          BECOMES A SCREEN.
        </h2>
      </div>

      <div className="sf-product__stack">
        {PRODUCT_SURFACES.map(
          (surface) => (
            <article
              key={surface.number}
              className="sf-product-card"
            >
              <div className="sf-product-card__copy">
                <span>
                  {surface.number}
                  {" "}
                  /
                  {" "}
                  {surface.label}
                </span>

                <h3>
                  {surface.title}
                </h3>

                <p>
                  {surface.body}
                </p>
              </div>

              <div
                className={[
                  "sf-product-card__screen",
                  surface.className,
                ].join(" ")}
              >
                <img
                  src={
                    surface.image
                  }
                  alt={
                    surface.label
                  }
                  loading="lazy"
                  onError={(
                    event
                  ) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}
