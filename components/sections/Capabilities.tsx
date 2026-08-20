'use client';

import React, {
  useState,
} from 'react';

import styles from './Capabilities.module.css';

import {
  SectionHeading,
  TechnicalLabel,
} from '../ui';

import { useMotionEngine } from '../../hooks/useMotionEngine';

interface Capability {
  id: string;
  number: string;
  title: string;
  description: string;
  status: string;
  className: string;
}

const capabilities: Capability[] = [
  {
    id: 'ai',
    number: 'CAP / 01',
    title: 'AI SYSTEMS',
    description:
      'LLM applications, retrieval systems, intelligent workflows, automation, evaluation, and production-oriented AI infrastructure.',
    status: 'INTELLIGENCE / ACTIVE',
    className: 'ai',
  },
  {
    id: 'agents',
    number: 'CAP / 02',
    title: 'AI AGENTS',
    description:
      'Planning, tool use, multi-step execution, memory, orchestration, and agentic workflows designed around real tasks.',
    status: 'AGENT NETWORK / READY',
    className: 'agents',
  },
  {
    id: 'products',
    number: 'CAP / 03',
    title: 'DIGITAL PRODUCTS',
    description:
      'SaaS platforms, web applications, dashboards, and product experiences built from architecture through deployment.',
    status: 'PRODUCT SYSTEM / READY',
    className: 'products',
  },
  {
    id: 'custom',
    number: 'CAP / 04',
    title: 'CUSTOM SOFTWARE',
    description:
      'Client-specific systems, internal tools, business workflows, integrations, and software engineered around actual requirements.',
    status: 'DELIVERY / READY',
    className: 'custom',
  },
];

export function Capabilities() {
  const containerRef =
    useMotionEngine();

  const [active, setActive] =
    useState('ai');

  return (
    <section
      id="capabilities"
      className={styles.section}
    >
      <div
        ref={containerRef}
        className="page-container"
      >
        <div className={styles.inner}>
          <div className={styles.header}>
            <SectionHeading
              title="FROM IDEA TO INTELLIGENT SYSTEM."
              metadata="FIG. 02 — CAPABILITIES"
            />
          </div>

          <div className={styles.visualField}>
            <div className={styles.network}>
              <div
                className={[
                  styles.orbit,
                  styles.orbitOne,
                ].join(' ')}
              />

              <div
                className={[
                  styles.orbit,
                  styles.orbitTwo,
                ].join(' ')}
              />

              <div
                className={styles.core}
                data-cursor="3d"
              >
                <span className="text-os-label text-accent-current">
                  MAJIN
                </span>

                <span className={styles.coreLabel}>
                  CORE / SYSTEM
                </span>
              </div>

              {/* Visual connector field */}
              <div
                className={styles.connector}
                style={{
                  width: '34%',
                  top: '43%',
                  left: '22%',
                }}
              />

              <div
                className={styles.connector}
                style={{
                  width: '27%',
                  top: '31%',
                  right: '20%',
                }}
              />

              <div
                className={styles.connector}
                style={{
                  height: '28%',
                  width: 1,
                  top: '50%',
                  left: '48%',
                }}
              />
            </div>

            <div className={styles.capabilities}>
              {capabilities.map(
                (capability) => (
                  <article
                    key={capability.id}
                    className={[
                      styles.capability,
                      styles[capability.className],
                      capability.id === active
                        ? 'opacity-100'
                        : 'opacity-65',
                      'motion-assemble',
                    ].join(' ')}
                    onMouseEnter={() =>
                      setActive(
                        capability.id
                      )
                    }
                    onFocus={() =>
                      setActive(
                        capability.id
                      )
                    }
                    tabIndex={0}
                  >
                    <TechnicalLabel
                      variant="accent"
                    >
                      {capability.number}
                    </TechnicalLabel>

                    <h3
                      className={
                        styles.title
                      }
                    >
                      {capability.title}
                    </h3>

                    <p
                      className={
                        styles.description
                      }
                    >
                      {capability.description}
                    </p>

                    <div
                      className={
                        styles.status
                      }
                    >
                      <span
                        className={
                          styles.statusDot
                        }
                      />

                      {capability.status}
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
