'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './Navigation.module.css';

import { TechnicalLabel } from '../ui';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Systems', href: '#systems' },
  { label: 'Builder', href: '/tools/builder' },
  { label: 'Studio', href: '#studio' },
  { label: 'Why Us', href: '#why-majin' },
  { label: 'Contact', href: '#contact' }
];

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
            href="/tools/builder"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Builder
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
        <div className={styles.mobileMenuBackground} aria-hidden="true" />
        
        <div className={styles.mobileLinks}>
          <div className={styles.mobileLinksList}>
            {NAV_LINKS.map((link, index) => (
              <a 
                key={link.href} 
                href={link.href} 
                className={styles.mobileLink} 
                onClick={closeMenu}
              >
                <span className={styles.mobileLinkNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            ))}
          </div>
          
          <div className={styles.mobileFooter}>
            <div className={styles.mobileStatus}>
              <span className={styles.dot} />
              ACCEPTING SELECTED PROJECTS
            </div>
            <div className={styles.mobileContact}>
              <a href="mailto:hello@majin.studio" className={styles.mobileFooterLink}>HELLO@MAJIN.STUDIO</a>
              <div className="flex gap-6 mt-4">
                <a href="https://www.linkedin.com/company/majin-studios" className={styles.mobileFooterLink} target="_blank" rel="noreferrer">LINKEDIN</a>
                <a href="https://www.instagram.com/majin_studios/" className={styles.mobileFooterLink} target="_blank" rel="noreferrer">INSTAGRAM</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
