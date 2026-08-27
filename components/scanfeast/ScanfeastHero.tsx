"use client";

export default function ScanfeastHero() {
  return (
    <section className="sf-hero">
      <div className="sf-hero__content">
        <div className="sf-hero__eyebrow">
          MAJIN STUDIOS / CASE STUDY
        </div>

        <h1>
          SCAN
          <span>FEAST</span>
        </h1>

        <p>
          A restaurant operating system
          connecting the table, kitchen and
          management layer through one live
          digital workflow.
        </p>

        <div className="sf-hero__meta">
          <span>WEB SAAS</span>
          <span>PRODUCT / ENGINEERING</span>
          <span>REACT · NODE · SOCKET.IO</span>
        </div>
      </div>

      <div className="sf-hero__device">
        <div className="sf-laptop">
          <div className="sf-laptop__screen-shell">
            <div className="sf-browser">
              <div className="sf-browser__bar">
                <div className="sf-browser__dots">
                  <i />
                  <i />
                  <i />
                </div>

                <div className="sf-browser__url">
                  scanfeast.app
                </div>

                <span />
              </div>

              <div className="sf-browser__content">
                <div className="sf-hero-appbar">
                  <strong>
                    SCANFEAST
                  </strong>

                  <span>
                    TABLE 12
                  </span>
                </div>

                <div className="sf-hero-workspace">
                  <div className="sf-hero-copy-panel">
                    <small>
                      DINER EXPERIENCE
                    </small>

                    <strong>
                      ORDER.
                      <br />
                      WITHOUT
                      <br />
                      WAITING.
                    </strong>

                    <p>
                      Scan the table.
                      Browse the menu.
                      Follow the order live.
                    </p>
                  </div>

                  <div className="sf-hero-mobile">
                    <div className="sf-hero-mobile__top">
                      <span>
                        GOOD EVENING
                      </span>

                      <b>
                        T12
                      </b>
                    </div>

                    <div className="sf-hero-mobile__headline">
                      Today&apos;s
                      <br />
                      picks
                    </div>

                    <div className="sf-hero-food">
                      <div>
                        BIRYANI
                        <small>
                          ₹280
                        </small>
                      </div>

                      <div>
                        SAMOSA
                        <small>
                          ₹50
                        </small>
                      </div>

                      <div>
                        MASALA TEA
                        <small>
                          ₹60
                        </small>
                      </div>
                    </div>

                    <div className="sf-hero-cart">
                      VIEW CART
                      <strong>
                        3 ITEMS
                      </strong>
                    </div>
                  </div>

                  <div className="sf-hero-kds-mini">
                    <div className="sf-hero-kds-mini__head">
                      <span>
                        KITCHEN LIVE
                      </span>

                      <b>
                        ●
                      </b>
                    </div>

                    <article>
                      <div>
                        <small>
                          #104 / TABLE 1
                        </small>

                        <strong>
                          BIRYANI
                        </strong>
                      </div>

                      <span>
                        04:32
                      </span>
                    </article>

                    <article>
                      <div>
                        <small>
                          #105 / TABLE 4
                        </small>

                        <strong>
                          SAMOSA
                        </strong>
                      </div>

                      <span>
                        READY
                      </span>
                    </article>
                  </div>
                </div>

                <div className="sf-hero-statusbar">
                  <span>
                    REAL-TIME SYSTEM
                  </span>

                  <i />

                  <span>
                    SOCKET.IO
                  </span>

                  <i />

                  <span>
                    MONGODB
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="sf-laptop__base">
            <div className="sf-laptop__hinge" />

            <div className="sf-laptop__keyboard">
              {Array.from(
                { length: 60 },
                (_, index) => (
                  <i key={index} />
                ),
              )}
            </div>

            <div className="sf-laptop__trackpad" />
          </div>
        </div>
      </div>

      <div className="sf-hero__scroll">
        <span>
          SCROLL TO ENTER THE SYSTEM
        </span>

        <i />
      </div>
    </section>
  );
}