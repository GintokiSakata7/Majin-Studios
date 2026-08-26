'use client';

import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../ui';
import { useMotionEngine } from '../../hooks/useMotionEngine';

interface SystemNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  accent?: boolean;
  subsystems: string[];
}

const nodes: SystemNode[] = [
  { id: 'client', label: 'CLIENT', type: 'ENTRY', x: 10, y: 50, subsystems: ['WEB', 'MOBILE', 'DESKTOP', 'API CONSUMERS'] },
  { id: 'frontend', label: 'FRONTEND', type: 'EXPERIENCE', x: 25, y: 50, subsystems: ['REACT', 'THREE.JS', 'STATE', 'UI COMPONENTS'] },
  { id: 'api', label: 'API LAYER', type: 'ORCHESTRATION', x: 40, y: 50, subsystems: ['GRAPHQL', 'REST', 'WEBSOCKETS', 'GATEWAY'] },
  { id: 'backend', label: 'BACKEND', type: 'LOGIC', x: 55, y: 50, subsystems: ['APIs', 'AUTH', 'BUSINESS LOGIC', 'JOBS', 'INTEGRATIONS'] },
  { id: 'data', label: 'DATA', type: 'PERSISTENCE', x: 75, y: 25, subsystems: ['DATABASES', 'CACHING', 'QUEUES', 'STREAMS'] },
  { id: 'ai', label: 'AI ENGINE', type: 'INTELLIGENCE', x: 75, y: 50, accent: true, subsystems: ['LLM', 'RAG', 'TOOLS', 'MEMORY', 'EVALUATION'] },
  { id: 'agents', label: 'AGENTS', type: 'EXECUTION', x: 75, y: 75, accent: true, subsystems: ['PLANNER', 'WORKERS', 'STATE', 'ORCHESTRATOR'] },
  { id: 'product', label: 'PRODUCT', type: 'OUTPUT', x: 92, y: 50, accent: true, subsystems: ['DASHBOARD', 'WORKFLOWS', 'USER EXPERIENCE'] },
];

export function Systems() {
  const containerRef = useMotionEngine();
  const [activeNode, setActiveNode] = useState('ai');
  const activeDetails = useMemo(() => nodes.find((n) => n.id === activeNode), [activeNode]);

  return (
    <section className="section relative min-h-[auto] md:min-h-[120vh] py-16 md:py-32" id="systems">
      <style>{`
        @keyframes floatNode {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
      <div ref={containerRef} className="page-container">
        <div className="mb-20">
          <SectionHeading
            title="SYSTEM ARCHITECTURE"
            metadata="FIG. 03 — PRECISION PIPELINE"
          />
        </div>

        <div className="relative min-h-[700px] flex flex-col justify-between">
          <div className="relative h-[600px] border border-line-structural overflow-hidden bg-universe">
            {/* Background Grid */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `linear-gradient(var(--line-structural) 1px, transparent 1px), linear-gradient(90deg, var(--line-structural) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* SVG Data Pipeline */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              {/* Static faint tracks */}
              <path d="M100 300 H550" stroke="var(--line-structural)" strokeWidth="1" opacity="0.3" />
              <path d="M550 300 C620 300 680 150 750 150" stroke="var(--line-structural)" strokeWidth="1" opacity="0.3" />
              <path d="M550 300 H750" stroke="var(--line-structural)" strokeWidth="1" opacity="0.3" />
              <path d="M550 300 C620 300 680 450 750 450" stroke="var(--line-structural)" strokeWidth="1" opacity="0.3" />
              
              <path d="M750 150 C820 150 880 300 920 300" stroke="var(--line-structural)" strokeWidth="1" opacity="0.3" />
              <path d="M750 300 H920" stroke="var(--line-structural)" strokeWidth="1" opacity="0.3" />
              <path d="M750 450 C820 450 880 300 920 300" stroke="var(--line-structural)" strokeWidth="1" opacity="0.3" />

              {/* Animated glowing data flow */}
              <path
                className="motion-trace"
                d="M100 300 H550"
                stroke="var(--line-active)"
                strokeWidth="2"
              />
              <path
                className="motion-trace"
                d="M550 300 C620 300 680 150 750 150"
                stroke="var(--line-active)"
                strokeWidth="2"
                style={{ animationDelay: '0.4s' }}
              />
              <path
                className="motion-trace"
                d="M550 300 H750"
                stroke="var(--accent-current)"
                strokeWidth="2"
                style={{ animationDelay: '0.5s' }}
              />
              <path
                className="motion-trace"
                d="M550 300 C620 300 680 450 750 450"
                stroke="var(--accent-current)"
                strokeWidth="2"
                style={{ animationDelay: '0.6s' }}
              />

              {/* Output flow */}
              <path
                className="motion-trace"
                d="M750 300 H920"
                stroke="var(--accent-current)"
                strokeWidth="2"
                style={{ animationDelay: '0.9s' }}
              />
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const isActive = activeNode === node.id;
              
              return (
                <button
                  key={node.id}
                  type="button"
                  className="absolute motion-node group z-10"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity: isActive ? 1 : 0.6,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onFocus={() => setActiveNode(node.id)}
                >
                  <div 
                    className="flex flex-col items-center transition-all duration-300"
                    style={{ animation: isActive ? 'floatNode 2.5s ease-in-out infinite' : 'none' }}
                  >
                    <span
                      className={[
                        'flex items-center justify-center relative',
                        'w-12 h-12',
                        'border bg-universe',
                        node.accent ? 'border-accent-current' : 'border-line-active',
                        'transition-all duration-500',
                        isActive ? 'scale-110 shadow-[0_0_20px_rgba(var(--accent-current-rgb),0.2)]' : 'hover:scale-105',
                      ].join(' ')}
                    >
                      {/* Inner spinning element for tech vibe */}
                      <span 
                        className="absolute inset-1 border border-dashed rounded-sm animate-[spin_12s_linear_infinite]"
                        style={{ borderColor: node.accent ? 'var(--accent-current)' : 'var(--line-structural)' }}
                      />
                      {isActive && (
                        <span 
                          className="absolute inset-0 animate-ping opacity-25"
                          style={{ background: node.accent ? 'var(--accent-current)' : 'var(--line-active)' }}
                        />
                      )}
                      <span
                        className={[
                          'w-2 h-2 z-10 shadow-sm',
                          node.accent ? 'bg-accent-current' : 'bg-text-primary',
                        ].join(' ')}
                      />
                    </span>
                    
                    {/* Static Label Below Node */}
                    <span className="absolute top-[120%] whitespace-nowrap text-os-label font-mono text-[10px] tracking-widest text-text-secondary pointer-events-none transition-opacity duration-300">
                      {node.label}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Small Anchored HUD (Desktop) */}
            <div 
              className="hidden md:flex absolute z-20 pointer-events-none transition-all duration-400 ease-out items-center"
              style={{
                left: activeDetails && activeDetails.x > 70 
                  ? `calc(${activeDetails.x}% - 14rem - 3rem)` // HUD is ~14rem wide, placed to the left
                  : `calc(${activeDetails?.x ?? 50}% + 3rem)`, // placed to the right
                top: `calc(${activeDetails?.y ?? 50}%)`,
                transform: 'translateY(-50%)',
                opacity: activeDetails ? 1 : 0,
              }}
            >
              {/* Physical Line anchor */}
              {activeDetails && activeDetails.x > 70 && (
                <div className="h-px bg-line-active w-8 ml-auto mr-0 opacity-70" />
              )}
              
              <div 
                className="w-56 p-4 bg-universe/95 backdrop-blur-md border border-line-active shadow-2xl"
                style={{ animation: activeDetails ? 'floatNode 4s ease-in-out infinite' : 'none' }}
              >
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-line-structural">
                  <span className="w-1.5 h-1.5 bg-accent-current" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-primary">
                    {activeDetails?.label ?? 'SYSTEM'}
                  </span>
                </div>
                
                <ul className="space-y-2">
                  {activeDetails?.subsystems.map((sub) => (
                    <li key={sub} className="font-mono text-[9.5px] tracking-wide text-text-secondary flex items-center gap-2">
                      <span className="text-accent-current/50 opacity-60">&gt;</span>
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>

              {activeDetails && activeDetails.x <= 70 && (
                <div className="h-px bg-line-active w-8 ml-0 opacity-70" />
              )}
            </div>

            {/* Top Banner HUD (Mobile) */}
            <div 
              className="md:hidden absolute top-4 left-4 right-4 z-20 pointer-events-none transition-opacity duration-400 ease-out flex justify-center"
              style={{
                opacity: activeDetails ? 1 : 0,
              }}
            >
              <div 
                className="w-full max-w-md p-4 bg-universe/95 backdrop-blur-md border border-line-active shadow-2xl"
                style={{ animation: activeDetails ? 'floatNode 4s ease-in-out infinite' : 'none' }}
              >
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-line-structural">
                  <span className="w-1.5 h-1.5 bg-accent-current" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-primary">
                    {activeDetails?.label ?? 'SYSTEM'}
                  </span>
                </div>
                
                <ul className="grid grid-cols-2 gap-y-2 gap-x-2">
                  {activeDetails?.subsystems.map((sub) => (
                    <li key={sub} className="font-mono text-[9.5px] tracking-wide text-text-secondary flex items-center gap-2 truncate">
                      <span className="text-accent-current/50 opacity-60 flex-shrink-0">&gt;</span>
                      <span className="truncate">{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-12 gap-8 mt-16">
            <div className="col-span-12 lg:col-span-6 flex items-end">
              <p className="text-body-lg text-secondary">
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
