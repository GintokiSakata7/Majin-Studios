'use client';

import React, { useEffect, useState } from 'react';
import styles from './Capabilities.module.css';
import { SectionHeading, TechnicalLabel, Button } from '../ui';
import { AgentTarget } from '../ui/AgentTarget';
import { useMotionEngine } from '../../hooks/useMotionEngine';
import { useGlobalState } from '../../store/useGlobalState';
import type { CapabilitiesStage } from '../../store/useGlobalState';

interface Capability {
  id: CapabilitiesStage;
  number: string;
  title: string;
  description: string;
  outcome: string;
  items: string[];
  className: string;
}

const capabilities: Capability[] = [
  {
    id: 'ai',
    number: 'CAP / 01',
    title: 'AI SYSTEMS & AUTOMATION',
    description: 'We engineer production AI applications, retrieval-augmented generation (RAG), and intelligent workflows that run autonomously in production.',
    outcome: 'Reduce repetitive manual tasks and make internal systems continuously intelligent.',
    items: ['LLM APPLICATIONS & RAG', 'WORKFLOW AUTOMATION', 'DATA PIPELINES & VECTOR DBs', 'GUARDRAILS & EVALUATION', 'AUTONOMOUS AGENTS'],
    className: 'ai',
  },
  {
    id: 'agents',
    number: 'CAP / 02',
    title: 'AGENTS & ORCHESTRATION',
    description: 'We design autonomous agent swarms capable of complex multi-step reasoning, real-time tool calling, memory recall, and deterministic execution.',
    outcome: 'Delegate multi-step operational flows to verified, self-healing agent loops.',
    items: ['MULTI-STEP PLANNING', 'TOOL INTEGRATION', 'PERSISTENT VECTOR MEMORY', 'SWARM ORCHESTRATION', 'SELF-HEALING FLOWS'],
    className: 'agents',
  },
  {
    id: 'products',
    number: 'CAP / 03',
    title: 'DIGITAL PRODUCTS & SAAS',
    description: 'We design and engineer high-performance web applications, customer portals, SaaS platforms, and responsive mobile interfaces.',
    outcome: 'Turn an initial idea or manual operational workflow into a usable, scalable product.',
    items: ['FULL-STACK WEB APPS', 'B2B SAAS PLATFORMS', 'CUSTOMER & CLIENT PORTALS', 'REAL-TIME DASHBOARDS', 'MOBILE-FIRST INTERFACES'],
    className: 'products',
  },
  {
    id: 'custom',
    number: 'CAP / 04',
    title: 'CUSTOM BUSINESS SOFTWARE',
    description: 'We build tailored operational tools, mission-critical admin consoles, and resilient API integrations around real-world business constraints.',
    outcome: 'Eliminate fragmented spreadsheets and unify disconnected third-party tools.',
    items: ['INTERNAL OPERATIONAL TOOLS', 'API INTEGRATIONS & GATEWAYS', 'PAYMENT & BILLING SYSTEMS', 'CUSTOM ADMIN CONSOLES'],
    className: 'custom',
  },
  {
    id: 'data',
    number: 'CAP / 05',
    title: 'BRAND & CREATIVE DESIGN',
    description: 'We create distinct digital brand identities, design systems, interactive component libraries, and conversion-optimized UI/UX.',
    outcome: 'Make your business instantly recognizable and interfaces effortless for high user retention.',
    items: ['DESIGN SYSTEMS & TOKENS', 'PRODUCT UI/UX DESIGN', 'INTERACTIVE MOTION CRAFT', 'BRAND IDENTITY & GUIDELINES'],
    className: 'data',
  },
  {
    id: 'cloud',
    number: 'CAP / 06',
    title: 'DIGITAL GROWTH & SCALE',
    description: 'We build high-converting landing pages, scalable cloud infrastructure, automated telemetry, and conversion-focused funnels.',
    outcome: 'Help the business reach its target audience and turn traffic into qualified enquiries.',
    items: ['HIGH-CONVERSION LANDING PAGES', 'ANALYTICS & CONVERSION TRACKING', 'CI/CD & SERVERLESS CLOUD', 'PERFORMANCE OPTIMIZATION'],
    className: 'cloud',
  },
];

export function Capabilities() {
  const containerRef = useMotionEngine();
  const { capabilitiesStage, setCapabilitiesStage } = useGlobalState();

  const [isMobile, setIsMobile] = useState(false);
  const [agentMsg, setAgentMsg] = useState('');

  // Set default stage on mount and detect mobile for agent
  useEffect(() => {
    if (!capabilitiesStage) {
      setCapabilitiesStage('ai');
    }
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setAgentMsg(mobile ? 'Slide to see' : '');
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [capabilitiesStage, setCapabilitiesStage]);

  // Auto-scroll on mobile (physically scrolls the container)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMobile) {
      interval = setInterval(() => {
        const elements = document.querySelectorAll('[data-capability-id]');
        const currentIndex = capabilities.findIndex(c => c.id === capabilitiesStage);
        const nextIndex = (currentIndex + 1) % capabilities.length;
        
        if (elements[nextIndex]) {
          const el = elements[nextIndex] as HTMLElement;
          const container = el.parentElement;
          if (container) {
            // Scroll only the local container horizontally to center the element
            const scrollLeft = el.offsetLeft - (container.clientWidth / 2) + (el.clientWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
          }
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [capabilitiesStage, isMobile]);

  // Observer to track which card is currently visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-capability-id') as CapabilitiesStage;
            if (id) {
              setCapabilitiesStage(id);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: isMobile ? '0px -30% 0px -30%' : '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    const elements = document.querySelectorAll('[data-capability-id]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [setCapabilitiesStage, isMobile]);

  return (
    <section id="capabilities" className={styles.section}>
      <div ref={containerRef} className="page-container flex-1 flex flex-col w-full">
        <div className={styles.inner}>
          <div className={styles.header}>
            <AgentTarget 
              id="capabilities-heading"
              message={agentMsg}
              vanishAfterMs={2000}
              block
            >
              <SectionHeading
                title={<>WE BUILD THE SYSTEM<br/>AROUND THE PRODUCT.</>}
                metadata="FIG. 02 — CAPABILITIES"
                as="h2"
              />
            </AgentTarget>
          </div>

          <div className={styles.visualField}>
            <div className={styles.network}>
              <div className={[styles.orbit, styles.orbitOne].join(' ')} />
              <div className={[styles.orbit, styles.orbitTwo].join(' ')} />

              <div className={styles.core} data-cursor="3d">
                <span className="text-os-label text-accent-current">
                  MAJIN
                </span>
                <span className={styles.coreLabel}>
                  CORE
                </span>
              </div>

              {/* Spatial Connectors */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <svg className="w-full h-full max-w-3xl opacity-30" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  <path d="M50 50 L20 20" stroke="var(--line-active)" strokeWidth="0.2" strokeDasharray="1 1" />
                  <path d="M50 50 L80 20" stroke="var(--line-active)" strokeWidth="0.2" strokeDasharray="1 1" />
                  <path d="M50 50 L20 80" stroke="var(--line-active)" strokeWidth="0.2" strokeDasharray="1 1" />
                  <path d="M50 50 L80 80" stroke="var(--line-active)" strokeWidth="0.2" strokeDasharray="1 1" />
                  
                  <path d="M20 20 L80 20 L80 80 L20 80 Z" stroke="var(--line-structural)" strokeWidth="0.1" fill="none" />
                </svg>
              </div>
            </div>

            <div className={styles.capabilities}>
              {capabilities.map((capability) => {
                const isActive = capability.id === capabilitiesStage;
                
                return (
                  <article
                    key={capability.id}
                    data-capability-id={capability.id}
                    data-active={isActive.toString()}
                    className={[
                      styles.capability,
                      styles[capability.className],
                      'motion-assemble transition-all duration-700 ease-out',
                      isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95',
                    ].join(' ')}
                    onMouseEnter={() => setCapabilitiesStage(capability.id)}
                    onFocus={() => setCapabilitiesStage(capability.id)}
                    tabIndex={0}
                  >
                    <div className="flex flex-col h-full bg-surface/40 backdrop-blur-sm border border-line-structural p-6 hover:border-line-active transition-all duration-500 hover:-translate-y-2">
                      <TechnicalLabel variant={isActive ? 'accent' : 'secondary'}>
                        {capability.number}
                      </TechnicalLabel>

                      <h3 className="text-heading-3 mt-3 mb-2 text-text-primary">
                        {capability.title}
                      </h3>
                      
                      <p className="text-body-sm text-text-secondary mb-4 leading-relaxed">
                        {capability.description}
                      </p>

                      {/* Explicit Business Outcome Callout */}
                      <div className="mb-5 p-3 rounded border border-line-structural bg-universe/80 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-current animate-pulse" />
                          <span className="font-mono text-[9px] font-bold tracking-widest text-accent-current uppercase">
                            OUTCOME
                          </span>
                        </div>
                        <p className="font-sans text-[11.5px] text-text-secondary leading-snug">
                          {capability.outcome}
                        </p>
                      </div>

                      <ul className="flex flex-col gap-2 mt-auto">
                        {capability.items.map((item) => (
                          <li key={item} className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-3">
                            <span className={[
                              "w-1 h-1 rounded-full transition-colors",
                              isActive ? "bg-accent-current shadow-[0_0_8px_var(--accent-current)]" : "bg-line-structural"
                            ].join(' ')} />
                            <span className={isActive ? "text-text-primary" : "text-text-secondary"}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* High-Converting Guidance Box */}
            <div className="mt-10 p-6 rounded-lg border border-line-structural bg-surface/30 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-accent-current text-xl">✦</span>
                <p className="text-body-sm text-text-secondary">
                  <strong className="text-text-primary">Not sure which service you need?</strong> Tell us the business bottleneck you&apos;re trying to solve and we&apos;ll map out the right first step together.
                </p>
              </div>
              <Button href="#contact" variant="outline" withArrow>
                START WITH A CONVERSATION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
