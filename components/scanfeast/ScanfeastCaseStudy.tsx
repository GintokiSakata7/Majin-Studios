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
          <a href="https://www.majinstudios.tech/" style={{ display: 'block', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.875rem' }}>
            ← Back to Majin Studios
          </a>
          <span>
            MAJIN STUDIOS / CASE STUDY
          </span>

          <h1>
            SCANFEAST
          </h1>

          <p>
            A smart contactless ordering
            system connecting diners, chefs
            and management through real-time
            web technology.
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
        <div className="sf-footer__brand">
          <h2>DEVELOPED BY<br/><span>MAJIN STUDIOS</span></h2>
          <p>We design and build intelligent operating systems.</p>
        </div>
        
        <div className="sf-footer__content">
          <div className="sf-footer__actions">
            <a className="sf-btn-primary" href="/#contact">Talk to Majin Studios →</a>
            <a className="sf-btn-secondary" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top ↑</a>
          </div>
          
          <div className="sf-footer__tags">
            <span>WEB</span>
            <span>SOFTWARE</span>
            <span>APIs</span>
            <span>AI</span>
            <span>AUTOMATION</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
