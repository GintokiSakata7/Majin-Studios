'use client';

import React from 'react';

import styles from './Footer.module.css';

import {
  TechnicalLabel,
} from '../ui';

export function Footer() {
  return (
    <footer
      className={styles.footer}
    >
      <div
        className={`page-container ${styles.container}`}
      >
        <div className={styles.brand}>
          <TechnicalLabel variant="accent">
            END OF SYSTEM / 2026
          </TechnicalLabel>

          <h2
            className={
              styles.brandTitle
            }
          >
            MAJIN
          </h2>

          <div
            className={styles.services}
          >
            <span>
              AI SYSTEMS
            </span>

            <span
              className={styles.dot}
            />

            <span>
              AI AGENTS
            </span>

            <span
              className={styles.dot}
            />

            <span>
              DIGITAL PRODUCTS
            </span>

            <span
              className={styles.dot}
            />

            <span>
              CUSTOM SOFTWARE
            </span>
          </div>
        </div>

        <div
          className={styles.bottom}
        >
          <div
            className={styles.meta}
          >
            <span>
              HYDERABAD · INDIA
            </span>

            <span>
              BUILDING INTELLIGENT SYSTEMS
            </span>
          </div>

          <div
            className={styles.links}
          >
            <a
              href="#work"
              className={
                styles.link
              }
            >
              WORK
            </a>

            <a
              href="#studio"
              className={
                styles.link
              }
            >
              STUDIO
            </a>

            <a
              href="#contact"
              className={
                styles.link
              }
            >
              CONTACT
            </a>
          </div>

          <div
            className={`${styles.meta} ${styles.right}`}
          >
            <a
              href="#"
              className={
                styles.link
              }
            >
              LINKEDIN
            </a>

            <a
              href="#"
              className={
                styles.link
              }
            >
              GITHUB
            </a>

            <a
              href="mailto:hello@majin.studio"
              className={
                styles.link
              }
            >
              HELLO@MAJIN.STUDIO
            </a>

            <span>
              © {new Date().getFullYear()} MAJIN STUDIOS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
