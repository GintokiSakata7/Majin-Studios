"use client";

import { SCANFEAST_CASE_STUDY } from "./scanfeast-data";

export default function ScanfeastFooter() {
  return (
    <footer className="sf-footer">
      <div>
        <strong>MAJIN STUDIOS</strong>
      </div>
      <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "8px" }}>
        <span>DESIGN</span>
        <span>ENGINEERING</span>
        <span>DEPLOYMENT</span>
      </div>
    </footer>
  );
}
