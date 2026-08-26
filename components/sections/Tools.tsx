'use client';

import React from 'react';
import { SectionHeading, TechnicalLabel, Button, AgentTarget } from '../ui';
import { useMotionEngine } from '../../hooks/useMotionEngine';

export function Tools() {
  const containerRef = useMotionEngine();

  return (
    <section className="section relative pt-16 md:pt-32 z-10" id="tools">
      <div ref={containerRef} className="page-container">
        <div className="mb-12 md:mb-24">
          <SectionHeading
            title="PUBLIC TOOLS."
            metadata="FIG. 05 — OPEN INFRASTRUCTURE"
          />
        </div>

        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          <article className="border border-line-structural bg-surface/30 p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center hover:border-line-active transition-all duration-500 group">
            <div className="flex-1 flex flex-col justify-center w-full">
              <TechnicalLabel variant="accent">TOOL / 01</TechnicalLabel>
              <h3 className="text-2xl md:text-4xl font-display uppercase tracking-tighter mt-4 mb-4 text-text-primary group-hover:text-accent-current transition-colors">
                Resume & Portfolio Builder
              </h3>
              <p className="text-text-secondary font-mono text-xs md:text-sm max-w-md mb-8 leading-relaxed">
                Build a highly advanced, ATS-compliant resume and receive a fully deployed, live portfolio link within 24 hours—provided completely free by Majin Studios.
              </p>
              
              <div className="w-max">
                <AgentTarget id="tool-builder-btn" message="Launch the builder" vanishAfterMs={3000}>
                  <Button 
                    href="/tools/builder" 
                    variant="primary" 
                    withArrow
                  >
                    START BUILDING
                  </Button>
                </AgentTarget>
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-[220px] border border-line-structural/50 bg-[#020202] relative overflow-hidden flex items-center justify-center p-6 group">
              {/* Decorative grid */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(var(--accent-current) 1px, transparent 1px), linear-gradient(90deg, var(--accent-current) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
              
              {/* Deployment Flow Graphic */}
              <div className="relative w-full max-w-[450px] md:max-w-xl lg:max-w-2xl h-40 md:h-48 flex items-center justify-between z-10 mx-auto mt-8 md:mt-12">
                
                {/* Build Phase */}
                <div className="relative w-24 md:w-32 lg:w-36 h-32 md:h-36 lg:h-40 flex flex-col items-center justify-center group-hover:-translate-y-1 transition-transform duration-500">
                   
                   {/* Hammer hitting 'E' animation */}
                   <div className="absolute top-[2px] right-[18px] md:right-[22px] w-6 h-6 z-20 pointer-events-none">
                     {/* The Hammer */}
                     <div className="absolute inset-0 text-accent-current origin-[10%_60%] group-hover:animate-[hammerHit_0.5s_ease-in-out_infinite_alternate]">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-[45deg] drop-shadow-[0_0_5px_rgba(var(--color-accent-current-rgb),0.5)]">
                         <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 010-3L12 9" />
                         <path d="M17.64 15L22 10.64" />
                         <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 00-3.94-1.64H9l.92.82A6.18 6.18 0 0112 8.4v1.56l2 2h2.47l2.26 1.91" />
                       </svg>
                     </div>
                   </div>

                   {/* Wrench turning bolt animation */}
                   <div className="absolute top-10 -left-4 w-6 h-6 z-20">
                     {/* The Hex Bolt (Scaled down to fit inside wrench mouth) */}
                     <div className="absolute top-[4px] right-[4px] w-2 h-2 bg-line-structural flex items-center justify-center z-10 group-hover:animate-[screwSpin_1s_ease-in-out_infinite]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                       <div className="w-1 h-1 bg-[#050505] rounded-full" />
                     </div>
                     {/* The Wrench (pivots around the bolt) */}
                     <div className="absolute inset-0 text-text-primary origin-[80%_20%] group-hover:animate-[wrenchTurn_1s_ease-in-out_infinite] z-20 pointer-events-none">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                         <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                       </svg>
                     </div>
                   </div>

                   {/* Yellow Construction Helmet */}
                   <div className="absolute -bottom-3 -right-6 z-30 group-hover:animate-[bounce_2s_infinite] pointer-events-none">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                       <path d="M4 16C4 9.5 8 5 12 5C16 5 20 9.5 20 16" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
                       <rect x="1" y="16" width="22" height="3" rx="1.5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
                       <path d="M12 5V16" stroke="#ca8a04" strokeWidth="2" />
                       <path d="M9 8V16" stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
                       <path d="M15 8V16" stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
                     </svg>
                   </div>

                   {/* Resume Base */}
                   <div className="w-full h-full border border-line-structural bg-[#050505] flex flex-col p-3 gap-2 relative shadow-[0_0_15px_rgba(var(--color-accent-current-rgb),0.05)]">
                     
                     {/* Centered RESUME Text */}
                     <div className="w-full flex justify-center text-[10px] md:text-[12px] font-display font-bold tracking-[0.15em] text-text-primary mt-1 mb-2">
                       <span>R</span><span>E</span><span>S</span><span>U</span><span>M</span>
                       <span className="group-hover:animate-[nailDrive_0.5s_ease-in-out_infinite_alternate] inline-block text-accent-current transform origin-bottom">E</span>
                     </div>

                     <div className="w-full h-[1px] bg-line-structural/50 mb-1" />
                     <div className="w-full h-1 bg-line-structural" />
                     <div className="w-4/5 h-1 bg-line-structural" />
                     
                   {/* ATS Score Indicator */}
                     <div className="mt-auto pt-2 border-t border-line-structural/50 flex justify-between items-center">
                        <span className="text-[6px] md:text-[7px] tracking-widest text-text-secondary font-mono">ATS SCORE</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[7px] md:text-[9px] text-green-500 font-bold">99%</span>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                     </div>
                   </div>
                   
                   {/* Measuring Tape (Below Resume) */}
                   <div className="absolute -bottom-8 -left-4 z-30">
                     <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(234,179,8,0.2)]">
                       <defs>
                         <clipPath id="tape-clip">
                           <rect x="17" y="0" width="103" height="24" />
                         </clipPath>
                         <pattern id="ruler-marks" x="0" y="0" width="12" height="24" patternUnits="userSpaceOnUse">
                           <path d="M6 14v2 M12 15v1" stroke="#000" strokeWidth="1" />
                         </pattern>
                       </defs>
                       
                       {/* Extended Tape Group (Clips at casing mouth) */}
                       <g clipPath="url(#tape-clip)">
                         <g className="group-hover:animate-[tapeExtract_2.5s_infinite]">
                           {/* Extended Tape */}
                           <path d="M-80 16h188" stroke="#facc15" strokeWidth="4" />
                           {/* Tape Markings */}
                           <rect x="-80" y="0" width="188" height="24" fill="url(#ruler-marks)" />
                           {/* Tape Hook */}
                           <path d="M108 15v5" stroke="#a1a1aa" strokeWidth="2.5" />
                         </g>
                       </g>

                       {/* Tape Body */}
                       <rect x="2" y="4" width="16" height="16" rx="4" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
                       <circle cx="10" cy="12" r="4" fill="#050505" stroke="#ca8a04" strokeWidth="1" />
                       <path d="M12 12h-2" stroke="#ca8a04" strokeWidth="1" />
                     </svg>
                   </div>
                </div>

                {/* Connecting Pipeline */}
                <div className="flex-1 h-[1px] bg-line-structural relative mx-4 md:mx-6">
                   {/* Data Packet animating along the line */}
                   <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-accent-current transform -translate-y-1/2 shadow-[0_0_10px_var(--accent-current)] animate-[flow_2s_ease-in-out_infinite]" />
                   
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[7px] md:text-[9px] tracking-widest text-text-primary bg-[#020202] px-2 border border-line-structural/50 rounded-sm whitespace-nowrap group-hover:border-accent-current/50 transition-colors">
                     COMPILE & DEPLOY
                   </div>
                </div>

                {/* Live Portfolio Node */}
                <div className="w-28 md:w-36 lg:w-44 h-20 md:h-24 lg:h-28 border border-line-structural bg-[#0a0a0a] flex flex-col overflow-hidden group-hover:scale-105 transition-all duration-700 group-hover:border-accent-current/60 group-hover:shadow-[0_0_20px_rgba(var(--color-accent-current-rgb),0.15)] relative">
                   {/* "Browser" Top Bar */}
                   <div className="w-full h-3 md:h-4 bg-surface border-b border-line-structural flex items-center px-1 md:px-2 z-10 shrink-0">
                     <div className="flex gap-[2px]">
                       <div className="w-1 h-1 rounded-full bg-red-500/50" />
                       <div className="w-1 h-1 rounded-full bg-yellow-500/50" />
                       <div className="w-1 h-1 rounded-full bg-green-500/50" />
                     </div>
                     {/* URL Bar */}
                     <div className="ml-1 md:ml-2 flex-1 h-[6px] md:h-[8px] bg-[#111] rounded-[2px] flex items-center px-1 overflow-hidden">
                       <span className="text-[3px] md:text-[4px] text-text-secondary/70 font-mono tracking-tighter">majin.link/you</span>
                     </div>
                   </div>
                   
                   <div className="p-2 md:p-3 flex flex-col gap-2 relative h-full">
                     <div className="flex gap-2">
                       {/* Avatar */}
                       <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-accent-current/50 overflow-hidden bg-[#111] flex flex-col items-center justify-end shrink-0 shadow-[0_0_10px_rgba(var(--color-accent-current-rgb),0.1)]">
                         <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-accent-current/80 translate-y-[1px]">
                           <circle cx="12" cy="8" r="4" fill="currentColor" />
                           <path d="M4 22c0-4 4-7 8-7s8 3 8 7" fill="currentColor" />
                         </svg>
                       </div>
                       
                       <div className="flex-1 flex flex-col gap-1 md:gap-1.5 justify-center">
                          <div className="w-full h-1 md:h-1.5 bg-line-structural/50" />
                          <div className="w-2/3 h-1 bg-line-structural/30" />
                       </div>
                     </div>
                     <div className="w-full flex justify-between items-end mt-auto">
                       <span className="text-[6px] md:text-[8px] tracking-widest text-text-secondary font-mono">PORTFOLIO</span>
                       <div className="flex items-center gap-1 bg-[#020202] px-1.5 py-0.5 border border-green-500/30 rounded-sm">
                         <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
                         <span className="text-[6px] md:text-[8px] text-green-500 font-mono tracking-widest">LIVE</span>
                       </div>
                     </div>
                   </div>
                   
                   {/* Scanning line for live portfolio */}
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500/30 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_3s_ease-in-out_infinite]" />
                </div>

              </div>
            </div>
          </article>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        @keyframes flow {
          0% { left: 0; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          10% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { left: 100%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        }
        @keyframes hammerHit {
          0% { transform: rotate(-40deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes nailDrive {
          0% { transform: translateY(0); }
          100% { transform: translateY(3px); }
        }
        @keyframes rulerSlide {
          0% { transform: translateY(-5px); }
          100% { transform: translateY(5px); }
        }
        @keyframes tapeExtract {
          0% { transform: translateX(-90px); animation-timing-function: ease-out; }
          50% { transform: translateX(0); animation-timing-function: linear; }
          85% { transform: translateX(0); animation-timing-function: ease-in; }
          100% { transform: translateX(-90px); }
        }
        @keyframes wrenchTurn {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(60deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes screwSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
}
