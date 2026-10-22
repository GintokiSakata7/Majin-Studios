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
          <div className={styles.statusPill}>
            <span className={styles.statusPulseDot} />
            <span>STUDIO INTAKE OPEN · Q4 2026</span>
          </div>

          <TechnicalLabel
            variant="accent"
            className={styles.label}
          >
            MAJIN STUDIOS · DIGITAL PRODUCT HOUSE
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
            We bridge product strategy, engineering rigor, and aesthetic craft to engineer AI systems, autonomous agents, and full-stack software built around real business outcomes.
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
              EXPLORE OUR WORK ↓
            </Button>
          </div>

          {/* Quick 4-Pillar Capability Deck */}
          <div className={styles.heroDeck}>
            <a href="#capabilities" className={styles.heroDeckCard}>
              <div className={styles.deckCardHeader}>
                <span className={styles.deckCardIndex}>01 / WEB</span>
                <span className={styles.deckCardArrow}>↗</span>
              </div>
              <div className={styles.deckCardTitle}>Digital Products</div>
              <p className={styles.deckCardDesc}>SaaS platforms, web &amp; mobile apps, customer portals.</p>
            </a>

            <a href="#capabilities" className={styles.heroDeckCard}>
              <div className={styles.deckCardHeader}>
                <span className={styles.deckCardIndex}>02 / AI</span>
                <span className={styles.deckCardArrow}>↗</span>
              </div>
              <div className={styles.deckCardTitle}>Software &amp; AI</div>
              <p className={styles.deckCardDesc}>Autonomous agents, internal tooling &amp; API pipelines.</p>
            </a>

            <a href="#capabilities" className={styles.heroDeckCard}>
              <div className={styles.deckCardHeader}>
                <span className={styles.deckCardIndex}>03 / DESIGN</span>
                <span className={styles.deckCardArrow}>↗</span>
              </div>
              <div className={styles.deckCardTitle}>Brand &amp; Creative</div>
              <p className={styles.deckCardDesc}>UI/UX systems, brand identity &amp; interactive craft.</p>
            </a>

            <a href="#capabilities" className={styles.heroDeckCard}>
              <div className={styles.deckCardHeader}>
                <span className={styles.deckCardIndex}>04 / SCALE</span>
                <span className={styles.deckCardArrow}>↗</span>
              </div>
              <div className={styles.deckCardTitle}>Digital Growth</div>
              <p className={styles.deckCardDesc}>High-converting landing pages &amp; performance engines.</p>
            </a>
          </div>

          {/* Trust Strip */}
          <div className={styles.trustStrip}>
            <span>100% In-house</span>
            <span className={styles.trustDot}>●</span>
            <span>Direct founders</span>
            <span className={styles.trustDot}>●</span>
            <span>4-week sprints</span>
          </div>
        </div>

      </div>
    </section>
  );
}
