'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './Navigation.module.css';

import { TechnicalLabel } from '../ui';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

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

        <button 
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileLinks}>
          <a href="#work" className={styles.mobileLink} onClick={closeMenu}>Work</a>
          <a href="#capabilities" className={styles.mobileLink} onClick={closeMenu}>Capabilities</a>
          <a href="#systems" className={styles.mobileLink} onClick={closeMenu}>Systems</a>
          <a href="#studio" className={styles.mobileLink} onClick={closeMenu}>Studio</a>
          <a href="#why-majin" className={styles.mobileLink} onClick={closeMenu}>Why Us</a>
          <a href="#contact" className={styles.mobileLink} onClick={closeMenu}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
