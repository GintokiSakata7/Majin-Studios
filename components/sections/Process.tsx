'use client';

import React, {
  useLayoutEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/dist/ScrollTrigger';

import styles from './Process.module.css';

import {
  SectionHeading,
  TechnicalLabel,
} from '../ui';

const steps = [
  {
    num: '01',
    title: 'DISCOVER',
    caption: 'DISCOVERY / DIRECTION',
    desc:
      'Understand the business, users, operational bottlenecks, constraints, and target outcomes.',
  },
  {
    num: '02',
    title: 'DEFINE',
    caption: 'STRATEGY / SCOPE',
    desc:
      'Map system architecture, API boundaries, security constraints, and intelligent workflow requirements.',
  },
  {
    num: '03',
    title: 'DESIGN',
    caption: 'DESIGN / INTERFACES',
    desc:
      'Create modular design systems, high-fidelity interfaces, interaction models, and frictionless user flows.',
  },
  {
    num: '04',
    title: 'BUILD',
    caption: 'ENGINEERING / SPRINTS',
    desc:
      'Develop production application code, integrate AI models & agents, and build resilient frontend/backend pipelines.',
  },
  {
    num: '05',
    title: 'INTEGRATE',
    caption: 'INTEGRATION / QA',
    desc:
      'Connect all third-party services, database schemas, real-time WebSockets, and persistent memory.',
  },
  {
    num: '06',
    title: 'LAUNCH & SCALE',
    caption: 'DELIVERY / NEXT STEPS',
    desc:
      'Continuous deployment, telemetry monitoring, performance optimization, and SLA-backed reliability.',
  },
];

export function Process() {
  const rootRef =
    useRef<HTMLDivElement>(null);

  const activeLineRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root =
      rootRef.current;

    const line =
      activeLineRef.current;

    if (!root || !line) return;

    gsap.registerPlugin(
      ScrollTrigger
    );

    const reduced =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    if (reduced) {
      gsap.set(line, {
        height: '100%',
      });

      return;
    }

    const context =
      gsap.context(() => {
        const stepsElements =
          gsap.utils.toArray<HTMLElement>(
            '[data-process-step]'
          );

        gsap.to(line, {
          height: '100%',

          ease: 'none',

          scrollTrigger: {
            trigger: root,
            start: 'top 65%',
            end: 'bottom 55%',
            scrub: 1,
          },
        });

        stepsElements.forEach(
          (step) => {
            gsap.fromTo(
              step,
              {
                opacity: 0.35,
                x: -20,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,

                scrollTrigger: {
                  trigger: step,
                  start: 'top 70%',
                  end: 'bottom 40%',
                  toggleClass: {
                    targets: step,
                    className:
                      styles.stepActive,
                  },
                  toggleActions:
                    'play none none reverse',
                },
              }
            );
          }
        );
      }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      className={`section ${styles.section} py-16 md:py-32`}
      id="process"
    >
      <div
        ref={rootRef}
        className="page-container"
      >
        <div className="mb-24">
          <SectionHeading
            title="HOW WE BUILD."
            metadata="FIG. 05 — PROCESS"
          />
        </div>

        <div className={styles.processList}>
          <div className={styles.track}>
            <div
              className={styles.line}
            />

            <div
              ref={activeLineRef}
              className={
                styles.activeLine
              }
            />
          </div>

          {steps.map(
            (step) => (
              <article
                key={step.num}
                data-process-step
                className={
                  styles.step
                }
              >
                <div
                  className={
                    styles.node
                  }
                />

                <div
                  className={
                    styles.content
                  }
                >
                  <div className="flex items-center gap-3 mb-2">
                    <TechnicalLabel
                      variant="accent"
                      className={
                        styles.stepNum
                      }
                    >
                      {step.num}
                    </TechnicalLabel>
                    <span className="font-mono text-[9.5px] font-bold tracking-widest text-text-metadata uppercase">
                      {step.caption}
                    </span>
                  </div>

                  <h3
                    className={
                      styles.title
                    }
                  >
                    {step.title}
                  </h3>

                  <p
                    className={
                      `text-body-lg ${styles.desc}`
                    }
                  >
                    {step.desc}
                  </p>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
