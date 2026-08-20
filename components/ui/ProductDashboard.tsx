'use client';

import React from 'react';

import { ProductPanel } from './ProductPanel';

export function ProductDashboard({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={[
        'relative',
        'w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        perspective: '1400px',
      }}
      data-cursor="3d"
    >
      <style>
        {`
          @keyframes flowDash {
            to { stroke-dashoffset: -20; }
          }
          .animate-flow {
            stroke-dasharray: 4 4;
            animation: flowDash 1s linear infinite;
          }
          .dashboard-path {
            transition: stroke 0.5s ease;
          }
          .group:hover .dashboard-path {
            stroke: var(--accent);
          }
        `}
      </style>
      <div className="grid grid-cols-12 gap-3">
        {/* NAVIGATION */}
        <div className="col-span-12 md:col-span-3">
          <ProductPanel
            title="NAV"
            metadata="CONCEPT"
            delay={0.15}
            depth={1.2}
          >
            <ul className="flex flex-col gap-3">
              {[
                'OVERVIEW',
                'WORKFLOWS',
                'AGENTS',
                'SYSTEMS',
                'SETTINGS',
              ].map((item, index) => (
                <li
                  key={item}
                  className={[
                    'text-os-label',
                    'transition-all duration-300 cursor-pointer hover:text-text-primary hover:translate-x-1',
                    index === 0
                      ? 'text-accent-current'
                      : '',
                  ].join(' ')}
                >
                  <span className="mr-2 opacity-50 transition-opacity group-hover/li:opacity-100">
                    0{index + 1}
                  </span>

                  {item}
                </li>
              ))}
            </ul>
          </ProductPanel>
        </div>

        {/* MAIN SYSTEM */}
        <div className="col-span-12 md:col-span-9">
          <div className="flex flex-col gap-3">
            {/* METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ProductPanel
                title="TASK SUCCESS"
                metadata="DEMO"
                delay={0.28}
                depth={1}
                accent
              >
                <div className="flex flex-col gap-3">
                  <div
                    className="text-display transition-transform duration-500 hover:scale-105 origin-left"
                    style={{
                      fontSize:
                        'clamp(2rem, 5vw, 3.4rem)',
                    }}
                  >
                    94%
                  </div>

                  <div className="text-os-label">
                    SIMULATED RESULT
                  </div>
                </div>
              </ProductPanel>

              <ProductPanel
                title="EXECUTION"
                metadata="DEMO"
                delay={0.38}
                depth={1}
              >
                <div className="flex items-end gap-1 h-16">
                  {[
                    25,
                    38,
                    32,
                    58,
                    45,
                    78,
                    66,
                    92,
                  ].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 transition-all duration-500 hover:opacity-100 hover:bg-accent cursor-pointer"
                      style={{
                        height: `${height}%`,
                        minHeight: '4px',
                        background:
                          index === 7
                            ? 'var(--accent)'
                            : 'var(--line-active)',
                        opacity:
                          index === 7
                            ? 1
                            : 0.65,
                      }}
                    />
                  ))}
                </div>
              </ProductPanel>

              <ProductPanel
                title="SYSTEM"
                metadata="NOMINAL"
                delay={0.48}
                depth={1}
              >
                <div className="flex flex-col gap-2">
                  <div
                    style={{
                      width: '100%',
                      height: 1,
                      background:
                        'var(--line-active)',
                    }}
                  />

                  <div
                    style={{
                      width: '76%',
                      height: 1,
                      background:
                        'var(--accent)',
                      boxShadow:
                        '0 0 10px var(--accent-glow)',
                    }}
                  />

                  <div
                    style={{
                      width: '52%',
                      height: 1,
                      background:
                        'var(--line-active)',
                    }}
                  />
                </div>
              </ProductPanel>
            </div>

            {/* ORCHESTRATOR */}
            <ProductPanel
              title="AGENT ORCHESTRATOR"
              metadata="LIVE DEMO"
              delay={0.62}
              depth={0.75}
              accent
              className="group cursor-crosshair"
            >
              <div
                className="relative"
                style={{
                  minHeight:
                    'clamp(220px, 30vh, 400px)',
                  overflow: 'hidden',
                }}
              >
                {/* Structural network */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 400"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M60 200 H190"
                    stroke="var(--line-structural)"
                    strokeWidth="1"
                    className="dashboard-path animate-flow"
                  />

                  <path
                    d="M190 200 C250 200 260 110 340 110"
                    stroke="var(--line-structural)"
                    strokeWidth="1"
                    fill="none"
                    className="dashboard-path animate-flow"
                    style={{ animationDelay: '0.2s' }}
                  />

                  <path
                    d="M190 200 C250 200 260 290 340 290"
                    stroke="var(--line-structural)"
                    strokeWidth="1"
                    fill="none"
                    className="dashboard-path animate-flow"
                    style={{ animationDelay: '0.4s' }}
                  />

                  <path
                    d="M460 110 C560 110 560 200 680 200"
                    stroke="var(--line-structural)"
                    strokeWidth="1"
                    fill="none"
                    className="dashboard-path animate-flow"
                    style={{ animationDelay: '0.6s' }}
                  />

                  <path
                    d="M460 290 C560 290 560 200 680 200"
                    stroke="var(--line-structural)"
                    strokeWidth="1"
                    fill="none"
                    className="dashboard-path animate-flow"
                    style={{ animationDelay: '0.8s' }}
                  />

                  <circle
                    cx="190"
                    cy="200"
                    r="4"
                    fill="var(--accent)"
                    className="transition-all duration-300 group-hover:r-[6px] group-hover:drop-shadow-[0_0_8px_var(--accent)]"
                  />

                  <circle
                    cx="400"
                    cy="110"
                    r="4"
                    fill="var(--line-active)"
                    className="transition-all duration-300 group-hover:fill-accent group-hover:r-[6px]"
                  />

                  <circle
                    cx="400"
                    cy="290"
                    r="4"
                    fill="var(--line-active)"
                    className="transition-all duration-300 group-hover:fill-accent group-hover:r-[6px]"
                  />

                  <circle
                    cx="680"
                    cy="200"
                    r="4"
                    fill="var(--accent)"
                    className="transition-all duration-300 group-hover:r-[6px] group-hover:drop-shadow-[0_0_8px_var(--accent)]"
                  />
                </svg>

                <div className="absolute left-[3%] top-1/2 -translate-y-1/2">
                  <span className="text-os-label">
                    INPUT
                  </span>
                </div>

                <div className="absolute left-[45%] top-[20%]">
                  <span className="text-os-label">
                    PLANNER
                  </span>
                </div>

                <div className="absolute left-[45%] bottom-[20%]">
                  <span className="text-os-label">
                    CODER
                  </span>
                </div>

                <div className="absolute right-[3%] top-1/2 -translate-y-1/2">
                  <span
                    className="text-os-label"
                    style={{
                      color:
                        'var(--accent-text)',
                    }}
                  >
                    EXECUTION
                  </span>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-black"
                    style={{
                      width: 82,
                      height: 82,
                      border:
                        '1px solid var(--line-active)',
                      borderRadius: '50%',
                      background:
                        'rgba(7,8,9,0.68)',
                      boxShadow:
                        '0 0 30px var(--accent-glow)',
                    }}
                  >
                    <span className="text-os-label">
                      ORCH
                    </span>
                  </div>
                </div>
              </div>
            </ProductPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
