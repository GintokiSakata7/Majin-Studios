'use client';

import React from 'react';
import Image from 'next/image';

import styles from './Navigation.module.css';

import { TechnicalLabel } from '../ui';

export function Navigation() {
  return (
    <nav
      className={styles.nav}
      aria-label="Primary navigation"
    >
      <div
        className={`page-container ${styles.container}`}
      >
        <a
          href="#home"
          className={styles.brand}
          data-cursor="interactive"
        >
          <Image 
            src="/logo.jpg" 
            alt="Majin Studios" 
            width={140} 
            height={45} 
            className={styles.brandLogo} 
          />
        </a>

        <div className={styles.links}>
          <a
            href="#work"
            className={styles.link}
          >
            Work
          </a>

          <a
            href="#capabilities"
            className={styles.link}
          >
            Capabilities
          </a>

          <a
            href="#systems"
            className={styles.link}
          >
            Systems
          </a>

          <a
            href="#studio"
            className={styles.link}
          >
            Studio
          </a>

          <a
            href="#why-majin"
            className={styles.link}
          >
            Why Us
          </a>

          <a
            href="#contact"
            className={styles.link}
          >
            Contact
          </a>
        </div>

        <div className={styles.status}>
          <span
            className={styles.dot}
          />

          ACCEPTING SELECTED PROJECTS
        </div>
      </div>
    </nav>
  );
}
