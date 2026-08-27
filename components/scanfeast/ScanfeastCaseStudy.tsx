"use client";

import ScanfeastProduct from "./ScanfeastProduct";
import ScanfeastArchitecture from "./ScanfeastArchitecture";
import ScanfeastEngineering from "./ScanfeastEngineering";
import ScanfeastOutcome from "./ScanfeastOutcome";

import "./scanfeast-case-study.css";

export default function ScanfeastCaseStudy() {
  return (
    <main className="sf-case-study">
      <section className="sf-case-study__intro">
        <div>
          <span>
            MAJIN STUDIOS
            {" "}
            / CASE STUDY
          </span>

          <h1>
            SCANFEAST
          </h1>

          <p>
            A smart contactless ordering
            system connecting diners,
            chefs and management through
            real-time web technology.
          </p>

          <div className="sf-case-study__meta">
            <span>
              WEB SAAS
            </span>

            <span>
              DESIGN / FULL-STACK / DEPLOYMENT
            </span>

            <span>
              REACT · NODE · SOCKET.IO · MONGODB
            </span>
          </div>
        </div>
      </section>

      <section className="sf-problem">
        <div>
          <span>
            01 / THE PROBLEM
          </span>

          <h2>
            RESTAURANTS
            <br />
            SHOULDN&apos;T RUN
            <br />
            ON FRAGMENTED
            <br />
            COMMUNICATION.
          </h2>
        </div>

        <p>
          Traditional dine-in workflows
          separate guests, waitstaff,
          kitchen tickets and management
          visibility. Scanfeast was designed
          to connect those surfaces into one
          live operating layer.
        </p>
      </section>

      <ScanfeastProduct />

      <ScanfeastArchitecture />

      <ScanfeastEngineering />

      <ScanfeastOutcome />

      <footer className="sf-footer">
        <span>
          BUILT BY
        </span>

        <strong>
          MAJIN STUDIOS
        </strong>

        <small>
          DESIGN / ENGINEERING / DEPLOYMENT
        </small>
      </footer>
    </main>
  );
}
