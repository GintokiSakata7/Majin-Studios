'use client';

import React, {
  useMemo,
  useState,
} from 'react';

import {
  SectionHeading,
  OSLabel,
  TechnicalLabel,
} from '../ui';

import { useMotionEngine } from '../../hooks/useMotionEngine';

interface SystemNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  accent?: boolean;
}

const nodes: SystemNode[] = [
  {
    id: 'client',
    label: 'CLIENT',
    type: 'ENTRY',
    x: 8,
    y: 50,
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    type: 'EXPERIENCE',
    x: 25,
    y: 50,
  },
  {
    id: 'api',
    label: 'API LAYER',
    type: 'ORCHESTRATION',
    x: 42,
    y: 50,
  },
  {
    id: 'backend',
    label: 'BACKEND',
    type: 'LOGIC',
    x: 59,
    y: 35,
  },
  {
    id: 'database',
    label: 'DATABASE',
    type: 'STATE',
    x: 59,
    y: 68,
  },
  {
    id: 'ai',
    label: 'AI ENGINE',
    type: 'INTELLIGENCE',
    x: 76,
    y: 35,
    accent: true,
  },
  {
    id: 'agents',
    label: 'AGENTS',
    type: 'EXECUTION',
    x: 76,
    y: 68,
    accent: true,
  },
  {
    id: 'result',
    label: 'PRODUCT',
    type: 'OUTPUT',
    x: 94,
    y: 50,
    accent: true,
  },
];

export function Systems() {
  const containerRef =
    useMotionEngine();

  const [activeNode, setActiveNode] =
    useState('ai');

  const activeDetails = useMemo(
    () =>
      nodes.find(
        (node) =>
          node.id === activeNode
      ),
    [activeNode]
  );

  return (
    <section
      className="section relative min-h-[130vh] py-32"
      id="systems"
    >
      <div
        ref={containerRef}
        className="page-container"
      >
        <div className="mb-20">
          <SectionHeading
            title="SOFTWARE IS MORE THAN AN INTERFACE."
            metadata="FIG. 03 — SYSTEM ARCHITECTURE"
          />
        </div>

        <div className="relative min-h-[760px] flex flex-col justify-between">
          <div className="relative h-[560px] border border-line-structural overflow-hidden">
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `
                  linear-gradient(
                    var(--line-structural) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    var(--line-structural) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize:
                  '56px 56px',
              }}
            />

            {/* Main architecture SVG */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="motion-trace"
                d="M80 250 H250 H420 L590 175 H760 L930 250"
                stroke="var(--line-active)"
                strokeWidth="1"
              />

              <path
                className="motion-trace"
                d="M420 250 L590 340 H760 L930 250"
                stroke="var(--line-structural)"
                strokeWidth="1"
              />

              <path
                className="motion-connect"
                d="M590 175 V340"
                stroke="var(--line-structural)"
                strokeWidth="1"
              />

              <path
                className="motion-connect"
                d="M760 175 V340"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.55"
              />

              <path
                className="motion-connect"
                d="M420 250 C500 180 520 145 590 175"
                stroke="var(--line-structural)"
                strokeWidth="1"
                strokeDasharray="5 7"
              />
            </svg>

            {/* Nodes */}
            {nodes.map(
              (node) => (
                <button
                  key={node.id}
                  type="button"
                  className="absolute motion-node group"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform:
                      'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() =>
                    setActiveNode(
                      node.id
                    )
                  }
                  onFocus={() =>
                    setActiveNode(
                      node.id
                    )
                  }
                >
                  <span
                    className={[
                      'flex items-center justify-center',
                      'w-10 h-10',
                      'border',
                      node.accent
                        ? 'border-accent-current'
                        : 'border-line-active',
                      'bg-universe/90',
                      'transition-all duration-500',
                      activeNode ===
                      node.id
                        ? 'scale-125'
                        : '',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'w-1.5 h-1.5 rounded-full',
                        node.accent
                          ? 'bg-accent-current'
                          : 'bg-line-active',
                      ].join(' ')}
                    />
                  </span>
                </button>
              )
            )}

            {/* Node labels */}
            {nodes.map(
              (node) => (
                <div
                  key={`${node.id}-label`}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${node.x}%`,
                    top: `calc(${node.y}% + 28px)`,
                    transform:
                      'translateX(-50%)',
                  }}
                >
                  <TechnicalLabel
                    variant={
                      node.accent
                        ? 'accent'
                        : 'secondary'
                    }
                  >
                    {node.label}
                  </TechnicalLabel>
                </div>
              )
            )}

            {/* Active inspection HUD */}
            <div className="absolute top-6 right-6">
              <div className="w-64 p-5 border border-line-structural bg-universe/70 backdrop-blur-md">
                <TechnicalLabel variant="secondary">
                  ACTIVE NODE
                </TechnicalLabel>

                <div className="mt-3">
                  <OSLabel
                    label={
                      activeDetails?.type ??
                      'SYSTEM'
                    }
                    value={
                      activeDetails?.label ??
                      'SYSTEM'
                    }
                    status={
                      activeDetails?.accent
                        ? 'active'
                        : 'neutral'
                    }
                  />
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6">
              <TechnicalLabel>
                SYS / ARCHITECTURE / 003
              </TechnicalLabel>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 mt-16">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="text-display-giant motion-assemble">
                SOFTWARE
                <br />
                <span className="text-accent-current">
                  THAT THINKS.
                </span>
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-5 flex items-end">
              <p className="text-body-lg text-secondary max-w-lg">
                We design systems across the full
                stack — interface, APIs, data,
                intelligence, agents, integrations,
                and production infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
