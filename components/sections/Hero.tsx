'use client';

import React from 'react';

import styles from './Hero.module.css';

import {
  Button,
  TechnicalLabel,
} from '../ui';

export function Hero() {
  return (
    <section
      className={styles.hero}
      id="home"
    >
      <span
        className={[
          styles.corner,
          styles.cornerTL,
        ].join(' ')}
      />

      <span
        className={[
          styles.corner,
          styles.cornerBR,
        ].join(' ')}
      />

      <div
        className={`page-container ${styles.container}`}
      >
        <div
          className={styles.content}
        >
          <TechnicalLabel
            variant="accent"
            className={styles.label}
          >
            SYS / 001 — MAJIN CORE
          </TechnicalLabel>

          <h1
            className={[
              styles.headline,
              'text-display-giant',
            ].join(' ')}
          >
            WE BUILD
            <br />
            INTELLIGENT
            <br />
            <span
              className={
                styles.headlineAccent
              }
            >
              DIGITAL
            </span>
            <br />
            PRODUCTS.
          </h1>

          <p
            className={[
              styles.description,
              'text-body-lg',
            ].join(' ')}
          >
            We engineer AI systems, intelligent
            agents, full-stack applications, and
            custom software built around real-world
            problems.
          </p>

          <div
            className={[
              styles.actions,
              'actions',
            ].join(' ')}
          >
            <Button
              href="#contact"
              withArrow
            >
              START A PROJECT
            </Button>

            <Button
              href="#work"
              variant="secondary"
            >
              EXPLORE OUR WORK
            </Button>
          </div>
        </div>

        <div
          className={
            styles.systemReadout
          }
        >
          <span>CORE</span>
          <span
            className={
              styles.readoutAccent
            }
          >
            ACTIVE
          </span>

          <span>MODE</span>
          <span>BUILD</span>

          <span>AGENTS</span>
          <span>READY</span>

          <span>ENV</span>
          <span>PRODUCTION</span>
        </div>
      </div>
    </section>
  );
}
