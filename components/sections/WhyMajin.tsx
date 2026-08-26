'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useGlobalState,
  WhyStage,
} from '../../store/useGlobalState';

import {
  SectionHeading,
  TechnicalLabel,
  OSLabel,
  HUDMarker,
} from '../ui';

import styles from './WhyMajin.module.css';

interface Reason {
  id: WhyStage;
  number: string;
  label: string;
  title: string;
  description: string;
  system: string;
  signal: string;
}

const REASONS: Reason[] = [
  {
    id: 'complexity',
    number: '01',
    label: 'COMPLEXITY',
    title: 'WE START WITH THE REAL PROBLEM.',
    description:
      'We begin with the problem, the users, the workflow, and the constraints—not with a technology trend. Before choosing a model, framework, or architecture, we understand what the system actually needs to accomplish.',
    system: 'PROBLEM ANALYSIS',
    signal: 'INPUT / UNDERSTAND',
  },

  {
    id: 'systems',
    number: '02',
    label: 'SYSTEMS',
    title: 'WE THINK BEYOND THE INTERFACE.',
    description:
      'A product is more than a screen. We connect product experience, frontend, backend, APIs, data, AI, integrations, and infrastructure into one coherent system so each layer supports the others.',
    system: 'SYSTEM ARCHITECTURE',
    signal: 'STRUCTURE / CONNECT',
  },

  {
    id: 'build',
    number: '03',
    label: 'BUILD',
    title: 'WE BUILD, NOT JUST ADVISE.',
    description:
      'Ideas become working software. We can take a product from architecture and interface design through full-stack implementation, integrations, AI capabilities, deployment, and iteration.',
    system: 'PRODUCT ENGINEERING',
    signal: 'BUILD / INTEGRATE',
  },

  {
    id: 'ai',
    number: '04',
    label: 'AI',
    title: 'AI IS A SYSTEM, NOT A FEATURE.',
    description:
      'We go beyond putting a chat box on a product. We design intelligent workflows around models, agents, tools, retrieval, memory, evaluation, orchestration, and the actual work the system needs to perform.',
    system: 'INTELLIGENT SYSTEMS',
    signal: 'REASON / ACT',
  },

  {
    id: 'problem',
    number: '05',
    label: 'FIT',
    title: 'THE ARCHITECTURE FOLLOWS THE PROBLEM.',
    description:
      'Every project has different constraints. We choose the technologies, architecture, interactions, and implementation approach around the requirement instead of forcing the product into a predefined template.',
    system: 'PROBLEM-SPECIFIC BUILD',
    signal: 'ADAPT / SOLVE',
  },

  {
    id: 'resolve',
    number: '06',
    label: 'RESOLVE',
    title: 'A SMALL TEAM. DIRECT ENGINEERING.',
    description:
      'Majin is intentionally focused. The people discussing the product can stay close to the people designing and building it, keeping communication direct and technical decisions close to implementation.',
    system: 'DIRECT DELIVERY',
    signal: 'RESOLVE / SHIP',
  },
];

export function WhyMajin() {
  const {
    setWhyStage,
  } = useGlobalState();

  const [
    activeId,
    setActiveId,
  ] = useState<WhyStage>('complexity');

  const activeReason =
    REASONS.find(
      (reason) =>
        reason.id === activeId
    ) ?? REASONS[0];

  useEffect(() => {
    setWhyStage(activeId);
  }, [
    activeId,
    setWhyStage,
  ]);

  return (
    <section
      id="why-majin"
      className={styles.section}
    >
      <div className="page-container min-h-[auto] md:min-h-screen flex flex-col justify-center relative z-10 py-16 md:py-32">
        <div className={styles.header}>
          <SectionHeading
            title="THE MAJIN DIFFERENCE."
            metadata="FIG. 08 — WHY MAJIN"
          />

          <p className={styles.intro}>
            We combine product thinking,
            full-stack engineering, and
            intelligent systems to turn
            complex problems into software
            that can actually be used.
          </p>
        </div>

        <div className={styles.splitLayout}>
          {/* ------------------------------------------------
              INDEX / PRINCIPLES
             ------------------------------------------------ */}
          <aside className={styles.indexPanel}>
            <div className={styles.indexHeader}>
              <OSLabel
                label="SYSTEM"
                value="WHY MAJIN"
              />

              <TechnicalLabel variant="accent">
                {String(
                  REASONS.findIndex(
                    (reason) =>
                      reason.id ===
                      activeId
                  ) + 1
                ).padStart(2, '0')}
                /06
              </TechnicalLabel>
            </div>

            <div className={styles.tabList}>
              {REASONS.map(
                (reason) => {
                  const isActive =
                    activeId ===
                    reason.id;

                  return (
                    <div key={reason.id} className={styles.tabWrapper}>
                      <button
                        type="button"
                        className={[
                          styles.tab,
                          isActive
                            ? styles.tabActive
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onMouseEnter={() =>
                          setActiveId(
                            reason.id
                          )
                        }
                        onFocus={() =>
                          setActiveId(
                            reason.id
                          )
                        }
                        onClick={() =>
                          setActiveId(
                            reason.id
                          )
                        }
                      >
                        <span
                          className={
                            styles.tabNumber
                          }
                        >
                          {reason.number}
                        </span>

                        <span
                          className={
                            styles.tabTitle
                          }
                        >
                          {reason.label}
                        </span>

                        <span
                          className={
                            styles.tabSignal
                          }
                        >
                          {reason.signal}
                        </span>

                        {isActive && (
                          <span
                            className={
                              styles.tabIndicator
                            }
                          />
                        )}
                      </button>

                      {/* MOBILE ACCORDION CONTENT */}
                      {isActive && (
                        <div className={styles.accordionContent}>
                          <h2 className={styles.accordionTitle}>
                            {reason.title}
                          </h2>
                          <p className={styles.accordionDescription}>
                            {reason.description}
                          </p>
                          <div className={styles.accordionFooter}>
                            <div>
                              <TechnicalLabel>SYSTEM</TechnicalLabel>
                              <div className={styles.accordionFooterValueAccent}>
                                {reason.system}
                              </div>
                            </div>
                            <div>
                              <TechnicalLabel>SIGNAL</TechnicalLabel>
                              <div className={styles.accordionFooterValue}>
                                {reason.signal}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>

            <div className={styles.indexFooter}>
              <TechnicalLabel>
                MAJIN / ENGINEERING STUDIO
              </TechnicalLabel>
            </div>
          </aside>

          {/* ------------------------------------------------
              ACTIVE PRINCIPLE VIEWER (DESKTOP)
             ------------------------------------------------ */}
          <div
            className={
              styles.viewerPanel
            }
          >
            <HUDMarker
              type="corner"
              top="-1px"
              left="-1px"
            />

            <HUDMarker
              type="corner"
              top="-1px"
              right="-1px"
            />

            <HUDMarker
              type="corner"
              bottom="-1px"
              left="-1px"
            />

            <HUDMarker
              type="corner"
              bottom="-1px"
              right="-1px"
            />

            {/* Background technical structure */}
            <div
              className={
                styles.viewerGrid
              }
              aria-hidden="true"
            />

            <div
              className={
                styles.viewerOrb
              }
              aria-hidden="true"
            />

            <div
              className={
                styles.viewerHeader
              }
            >
              <OSLabel
                label="ACTIVE SYSTEM"
                value={
                  activeReason.system
                }
                status="active"
              />

              <TechnicalLabel variant="accent">
                {activeReason.number}{' '}
                / {activeReason.label}
              </TechnicalLabel>
            </div>

            <div
              className={
                styles.viewerContent
              }
              key={activeReason.id}
            >
              <div
                className={
                  styles.viewerNumber
                }
              >
                {activeReason.number}
              </div>

              <h2 className={styles.title}>
                {activeReason.title}
              </h2>

              <p
                className={
                  styles.description
                }
              >
                {activeReason.description}
              </p>

              <div
                className={
                  styles.viewerFooter
                }
              >
                <div>
                  <TechnicalLabel>
                    PRINCIPLE
                  </TechnicalLabel>

                  <div
                    className={
                      styles.footerValue
                    }
                  >
                    {activeReason.label}
                  </div>
                </div>

                <div>
                  <TechnicalLabel>
                    SIGNAL
                  </TechnicalLabel>

                  <div
                    className={
                      styles.footerValue
                    }
                  >
                    {activeReason.signal}
                  </div>
                </div>

                <div>
                  <TechnicalLabel>
                    STATUS
                  </TechnicalLabel>

                  <div
                    className={
                      styles.footerValueAccent
                    }
                  >
                    ACTIVE
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                styles.viewerIndex
              }
            >
              {REASONS.map(
                (reason) => (
                  <span
                    key={reason.id}
                    className={
                      reason.id ===
                        activeId
                        ? styles.progressActive
                        : styles.progress
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}