'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SectionHeading } from '../ui';
import { AgentTarget } from '../ui/AgentTarget';
import { useMotionEngine } from '../../hooks/useMotionEngine';

interface SystemNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  step: number;
  accent?: boolean;
  subsystems: string[];
}

const initialNodes: SystemNode[] = [
  { id: 'client', label: 'CLIENT', type: 'ENTRY', x: 10, y: 50, step: 0, subsystems: ['WEB', 'MOBILE', 'DESKTOP', 'API CONSUMERS'] },
  { id: 'frontend', label: 'FRONTEND', type: 'EXPERIENCE', x: 25, y: 50, step: 1, subsystems: ['REACT', 'THREE.JS', 'STATE', 'UI COMPONENTS'] },
  { id: 'api', label: 'API LAYER', type: 'ORCHESTRATION', x: 40, y: 50, step: 2, subsystems: ['GRAPHQL', 'REST', 'WEBSOCKETS', 'GATEWAY'] },
  { id: 'backend', label: 'BACKEND', type: 'LOGIC', x: 55, y: 50, step: 3, subsystems: ['APIs', 'AUTH', 'BUSINESS LOGIC', 'JOBS', 'INTEGRATIONS'] },
  { id: 'data', label: 'DATA', type: 'PERSISTENCE', x: 75, y: 25, step: 4, subsystems: ['DATABASES', 'CACHING', 'QUEUES', 'STREAMS'] },
  { id: 'ai', label: 'AI ENGINE', type: 'INTELLIGENCE', x: 75, y: 50, step: 4, subsystems: ['LLM', 'RAG', 'TOOLS', 'MEMORY', 'EVALUATION'] },
  { id: 'agents', label: 'AGENTS', type: 'EXECUTION', x: 75, y: 75, step: 4, subsystems: ['PLANNER', 'WORKERS', 'STATE', 'ORCHESTRATOR'] },
  { id: 'product', label: 'PRODUCT', type: 'OUTPUT', x: 92, y: 50, step: 5, subsystems: ['DASHBOARD', 'WORKFLOWS', 'USER EXPERIENCE'] },
];

const initialConnections = [
  { source: 'client', target: 'frontend', step: 1 },
  { source: 'frontend', target: 'api', step: 2 },
  { source: 'api', target: 'backend', step: 3 },
  { source: 'backend', target: 'data', step: 4 },
  { source: 'backend', target: 'ai', step: 4 },
  { source: 'backend', target: 'agents', step: 4 },
  { source: 'data', target: 'product', step: 5 },
  { source: 'ai', target: 'product', step: 5 },
  { source: 'agents', target: 'product', step: 5 },
];

export function Systems() {
  const containerRef = useMotionEngine();
  
  const [nodes, setNodes] = useState<SystemNode[]>(initialNodes);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState(false);
  const dragStartRef = useRef<{x: number, y: number} | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const canvasRef = useRef<HTMLDivElement>(null);

  const activeDetailsId = hoveredNode || activeNode;
  const activeDetails = useMemo(() => nodes.find((n) => n.id === activeDetailsId), [activeDetailsId, nodes]);

  // Sequential data flow animation triggered on scroll
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          interval = setInterval(() => {
            setActiveStep((prev) => {
              if (prev >= 5) {
                clearInterval(interval);
                return 5;
              }
              return prev + 1;
            });
          }, 800);
          observer.disconnect(); // Only run once
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!draggingNode) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!canvasRef.current) return;
      
      if (dragStartRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) < 5) return; // 5px threshold for jitter
        dragStartRef.current = null; // We are now officially dragging
      }
      
      const rect = canvasRef.current.getBoundingClientRect();
      
      let newX = ((e.clientX - rect.left) / rect.width) * 100;
      let newY = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Clear active popups immediately when dragging starts
      setActiveNode(null);
      setHoveredNode(null);
      
      // Keep nodes within canvas bounds
      newX = Math.max(2, Math.min(98, newX));
      newY = Math.max(5, Math.min(95, newY));

      setNodes(prev => prev.map(n => 
        n.id === draggingNode ? { ...n, x: newX, y: newY } : n
      ));
    };

    const handlePointerUp = () => {
      setDraggingNode(null);
      dragStartRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggingNode]);

  // Generate a smooth bezier curve path for SVG
  const generatePath = (sourceId: string, targetId: string) => {
    const source = nodes.find(n => n.id === sourceId);
    const target = nodes.find(n => n.id === targetId);
    if (!source || !target) return '';

    // Convert percentages to internal 1000x600 viewBox space
    const x1 = (source.x / 100) * 1000;
    const y1 = (source.y / 100) * 600;
    const x2 = (target.x / 100) * 1000;
    const y2 = (target.y / 100) * 600;

    // Calculate robust control points based on primary direction
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    
    if (dx > dy) {
      const cx = dx * 0.4;
      return `M${x1} ${y1} C${x1 + cx} ${y1} ${x2 - cx} ${y2} ${x2} ${y2}`;
    } else {
      const cy = dy * 0.4;
      return `M${x1} ${y1} C${x1} ${y1 + cy} ${x2} ${y2 - cy} ${x2} ${y2}`;
    }
  };

  return (
    <section className="section relative min-h-[auto] md:min-h-[120vh] py-16 md:py-32" id="systems">
      <style>{`
        @keyframes floatNode {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }
        @keyframes dataFlow {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        .flow-anim {
          stroke-dasharray: 4 20;
          stroke-linecap: round;
          animation: dataFlow 0.4s linear infinite;
        }
      `}</style>
      <div ref={containerRef} className="page-container">
        <div className="mb-20">
          <AgentTarget 
            id="systems-heading"
            message={isMobile ? "Tap to explore" : ""}
            vanishAfterMs={2000}
            block
          >
            <SectionHeading
              title="SYSTEM ARCHITECTURE"
              metadata="FIG. 03 — PRECISION PIPELINE"
            />
          </AgentTarget>
        </div>

        <div className="relative min-h-[500px] lg:min-h-[550px] flex flex-col justify-between">
          <div 
            ref={canvasRef}
            className="relative h-[400px] lg:h-[450px] border border-line-structural overflow-hidden bg-universe cursor-crosshair touch-none select-none"
            onClick={() => {
              setActiveNode(null);
              setHoveredNode(null);
            }}
          >
            {/* Background Grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(var(--line-structural) 1px, transparent 1px), linear-gradient(90deg, var(--line-structural) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Dynamic SVG Data Pipeline */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              {initialConnections.map((conn, i) => {
                const path = generatePath(conn.source, conn.target);
                const isActiveConn = activeStep >= conn.step;
                const color = 'var(--accent-current)'; // Fluid color
                
                return (
                  <g key={`${conn.source}-${conn.target}-${i}`}>
                    {/* Static faint track always visible */}
                    <path 
                      d={path} 
                      stroke="var(--line-structural)" 
                      strokeWidth="1" 
                      opacity="0.3" 
                    />
                    {/* Animated glowing data flow - only visible if activeStep >= conn.step */}
                    <path
                      className={isActiveConn ? "motion-trace flow-anim" : ""}
                      d={path}
                      stroke={color}
                      strokeWidth="2"
                      style={{
                        opacity: isActiveConn ? 1 : 0,
                        transition: 'opacity 0.3s ease-out'
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Draggable Nodes */}
            {nodes.map((node) => {
              const isDetailsActive = activeDetailsId === node.id;
              const isDragging = draggingNode === node.id;
              const isFlowActive = activeStep >= node.step;
              
              return (
                <div
                  key={node.id}
                  className="absolute z-10 flex flex-col items-center group touch-none select-none"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity: isDetailsActive || draggingNode ? (isDragging ? 1 : 0.6) : (isFlowActive ? 1 : 0.5),
                    cursor: isDragging ? 'grabbing' : 'grab',
                    transition: draggingNode ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: (!draggingNode && isDetailsActive) ? 'floatNode 2.5s ease-in-out infinite' : 'none'
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    e.currentTarget.setPointerCapture(e.pointerId);
                    dragStartRef.current = { x: e.clientX, y: e.clientY };
                    setDraggingNode(node.id);
                    setActiveNode(node.id);
                  }}
                  onPointerEnter={() => !draggingNode && setHoveredNode(node.id)}
                  onPointerLeave={() => !draggingNode && setHoveredNode(null)}
                >
                  <span
                    className={[
                      'flex items-center justify-center relative',
                      'w-8 h-8 md:w-12 md:h-12 rounded-lg',
                      'border bg-universe backdrop-blur-sm',
                      isFlowActive ? 'border-accent-current shadow-[0_0_15px_rgba(var(--accent-current-rgb),0.15)]' : 'border-line-active',
                      'transition-all duration-300',
                      isDetailsActive ? 'scale-110 shadow-[0_0_20px_rgba(var(--accent-current-rgb),0.3)]' : 'hover:scale-105',
                      isDragging ? 'scale-110 shadow-lg' : ''
                    ].join(' ')}
                  >
                    {/* Inner spinning element for tech vibe */}
                    <span 
                      className="absolute inset-1 border border-dashed rounded-sm animate-[spin_12s_linear_infinite] transition-colors duration-300"
                      style={{ borderColor: isFlowActive ? 'var(--accent-current)' : 'var(--line-structural)' }}
                    />
                    {(isDetailsActive || isFlowActive) && (
                      <span 
                        className={`absolute inset-0 animate-ping opacity-25 rounded-lg transition-colors duration-300 ${isFlowActive ? 'bg-accent-current' : 'bg-line-active'}`}
                      />
                    )}
                    <span
                      className={[
                        'w-1.5 h-1.5 md:w-2 md:h-2 z-10 shadow-sm rounded-sm transition-colors duration-300',
                        isFlowActive ? 'bg-accent-current' : 'bg-text-primary',
                      ].join(' ')}
                    />
                  </span>
                  
                  {/* Static Label Below Node */}
                  <span className="absolute top-[120%] whitespace-nowrap text-os-label font-mono text-[7px] md:text-[10px] tracking-widest text-text-secondary pointer-events-none transition-opacity duration-300 bg-universe/80 px-1 md:px-2 py-0.5 rounded">
                    {node.label}
                  </span>
                </div>
              );
            })}

            {/* Small Anchored HUD (Desktop) */}
            <div 
              className="hidden md:flex absolute z-20 pointer-events-none transition-all duration-300 ease-out items-center"
              style={{
                left: activeDetails && activeDetails.x > 70 
                  ? `calc(${activeDetails.x}% - 14rem - 3rem)`
                  : `calc(${activeDetails?.x ?? 50}% + 3rem)`,
                top: `calc(${activeDetails?.y ?? 50}%)`,
                transform: 'translateY(-50%)',
                opacity: activeDetails && !draggingNode ? 1 : 0,
                transition: draggingNode ? 'none' : 'all 0.3s ease-out',
              }}
            >
              {/* Physical Line anchor */}
              {activeDetails && activeDetails.x > 70 && (
                <div className="h-px bg-line-active w-8 ml-auto mr-0 opacity-70" />
              )}
              
              <div className="w-56 p-4 bg-universe/95 backdrop-blur-md border border-line-active shadow-2xl rounded-sm">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-line-structural">
                  <span className="w-1.5 h-1.5 bg-accent-current rounded-sm" />
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
              className="md:hidden absolute top-4 left-4 right-4 z-20 pointer-events-none flex justify-center"
              style={{
                opacity: activeDetails && !draggingNode ? 1 : 0,
                transition: draggingNode ? 'none' : 'opacity 0.3s ease-out',
              }}
            >
              <div className="w-full max-w-md p-4 bg-universe/95 backdrop-blur-md border border-line-active shadow-2xl rounded-sm">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-line-structural">
                  <span className="w-1.5 h-1.5 bg-accent-current rounded-sm" />
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
