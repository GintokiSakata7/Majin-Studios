'use client';

import React, { useEffect } from 'react';
import styles from './Capabilities.module.css';
import { SectionHeading, TechnicalLabel } from '../ui';
import { useMotionEngine } from '../../hooks/useMotionEngine';
import { useGlobalState } from '../../store/useGlobalState';
import type { CapabilitiesStage } from '../../store/useGlobalState';

interface Capability {
  id: CapabilitiesStage;
  number: string;
  title: string;
  items: string[];
  className: string;
}

const capabilities: Capability[] = [
  {
    id: 'ai',
    number: 'CAP / 01',
    title: 'AI SYSTEMS',
    items: ['LLM APPLICATIONS', 'RAG', 'WORKFLOW AUTOMATION', 'EVALUATION', 'DATA PIPELINES', 'AI INTEGRATION'],
    className: 'ai',
  },
  {
    id: 'agents',
    number: 'CAP / 02',
    title: 'AGENTS',
    items: ['PLANNING', 'TOOL USE', 'MEMORY', 'ORCHESTRATION', 'MULTI-STEP EXECUTION', 'AUTONOMOUS WORKFLOWS'],
    className: 'agents',
  },
  {
    id: 'products',
    number: 'CAP / 03',
    title: 'PRODUCTS',
    items: ['SAAS', 'WEB APPLICATIONS', 'DASHBOARDS', 'PLATFORMS', 'REAL-TIME SYSTEMS', 'RESPONSIVE UX'],
    className: 'products',
  },
  {
    id: 'custom',
    number: 'CAP / 04',
    title: 'CUSTOM SOFTWARE',
    items: ['BUSINESS SYSTEMS', 'INTERNAL TOOLS', 'API INTEGRATIONS', 'WORKFLOW AUTOMATION', 'CLIENT-SPECIFIC SOFTWARE', 'DEPLOYMENT'],
    className: 'custom',
  },
  {
    id: 'data',
    number: 'CAP / 05',
    title: 'DATA SYSTEMS',
    items: ['VECTOR DATABASES', 'ETL PIPELINES', 'REAL-TIME STREAMING', 'DATA WAREHOUSING', 'ANALYTICS', 'KNOWLEDGE GRAPHS'],
    className: 'data',
  },
  {
    id: 'cloud',
    number: 'CAP / 06',
    title: 'CLOUD ARCHITECTURE',
    items: ['AWS / GCP', 'KUBERNETES', 'CI/CD PIPELINES', 'SERVERLESS', 'INFRASTRUCTURE AS CODE', 'SECURITY'],
    className: 'cloud',
  },
];

export function Capabilities() {
  const containerRef = useMotionEngine();
  const { capabilitiesStage, setCapabilitiesStage } = useGlobalState();

  // Set default stage on mount
  useEffect(() => {
    if (!capabilitiesStage) {
      setCapabilitiesStage('ai');
    }
  }, [capabilitiesStage, setCapabilitiesStage]);

  // Mobile scroll observer
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
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    const elements = document.querySelectorAll('[data-capability-id]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [setCapabilitiesStage]);

  return (
    <section id="capabilities" className={styles.section}>
      <div ref={containerRef} className="page-container flex-1 flex flex-col w-full">
        <div className={styles.inner}>
          <div className={styles.header}>
            <SectionHeading
              title={<>WE BUILD THE SYSTEM<br/>AROUND THE PRODUCT.</>}
              metadata="FIG. 02 — CAPABILITIES"
              as="h2"
            />
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

                      <h3 className="text-heading-3 mt-3 mb-6 text-text-primary">
                        {capability.title}
                      </h3>

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
          </div>
        </div>
      </div>
    </section>
  );
}
