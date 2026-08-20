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
    desc:
      'Identify the core problem, technical constraints, users, and business objectives.',
  },
  {
    num: '02',
    title: 'DEFINE',
    desc:
      'Map the architecture, data flows, system boundaries, and intelligent workflow requirements.',
  },
  {
    num: '03',
    title: 'DESIGN',
    desc:
      'Create system blueprints, interfaces, interaction models, and the product experience.',
  },
  {
    num: '04',
    title: 'BUILD',
    desc:
      'Engineer the application, integrate AI systems, construct the frontend and build the backend.',
  },
  {
    num: '05',
    title: 'INTEGRATE',
    desc:
      'Connect the complete system across APIs, services, data, AI, interfaces, and infrastructure.',
  },
  {
    num: '06',
    title: 'DEPLOY',
    desc:
      'Launch, validate, monitor, iterate, and prepare the production system for real use.',
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
      className={`section ${styles.section} py-32`}
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
                  <TechnicalLabel
                    variant="accent"
                    className={
                      styles.stepNum
                    }
                  >
                    {step.num}
                  </TechnicalLabel>

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
