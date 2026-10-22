'use client';

import React from 'react';
import {
  TechnicalLabel,
  HUDMarker,
} from '../ui';
import {
  teamData,
} from '../../data/team';
import {
  useMotionEngine,
} from '../../hooks/useMotionEngine';

export function Team() {
  const containerRef = useMotionEngine();
  const founder = teamData[0];

  if (!founder) return null;

  return (
    <section
      className="section relative py-12 md:py-16"
      id="studio"
    >
      <div
        ref={containerRef}
        className="page-container"
      >
        <div className="relative border border-line-structural bg-surface/50 backdrop-blur-sm p-6 sm:p-8">
          <HUDMarker type="corner" top="-1px" left="-1px" />
          <HUDMarker type="corner" top="-1px" right="-1px" className="rotate-90" />
          <HUDMarker type="corner" bottom="-1px" left="-1px" className="-rotate-90" />
          <HUDMarker type="corner" bottom="-1px" right="-1px" className="rotate-180" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent-current animate-pulse" />
                <TechnicalLabel variant="accent">
                  FOUNDER
                </TechnicalLabel>
              </div>

              <div className="h-4 w-px bg-line-structural hidden sm:block" />

              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                  {founder.name}
                </span>
                <span className="ml-2.5 font-mono text-xs text-secondary tracking-widest uppercase">
                  ({founder.fullName})
                </span>
              </div>

              <div className="hidden lg:block text-xs text-secondary font-mono tracking-wide max-w-md">
                — {founder.focus}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-line-structural hover:border-accent-current text-os-label hover:text-accent-current transition-all duration-300 group font-mono text-xs tracking-widest"
                >
                  <span>LINKEDIN</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

