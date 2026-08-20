'use client';

import React from 'react';

import styles from './Contact.module.css';

import {
  SectionHeading,
} from '../ui';

import {
  useMotionEngine,
} from '../../hooks/useMotionEngine';

export function Contact() {
  const containerRef = useMotionEngine();

  return (
    <section
      id="contact"
      className={styles.section}
    >
      <div
        ref={containerRef}
        className="page-container"
      >
        <div
          className={styles.wrapper}
        >
          <div className="mb-16">
            <SectionHeading
              title="WHAT ARE YOU BUILDING?"
              metadata="FIG. 07 — PROJECT INITIALIZATION"
            />
          </div>

          <div className={styles.content}>



          </div>
        </div>
      </div>
    </section>
  );
}
