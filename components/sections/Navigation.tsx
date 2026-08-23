'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './Navigation.module.css';

import { TechnicalLabel } from '../ui';

const NAV_LINKS = [
  { href: '#work',        label: 'Work' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#systems',     label: 'Systems' },
  { href: '#studio',      label: 'Studio' },
  { href: '#why-majin',   label: 'Why Us' },
  { href: '#contact',     label: 'Contact' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Close drawer on resize to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Prevent body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeDrawer = () => setMobileOpen(false);

  return (
    <>
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
            onClick={closeDrawer}
          >
            <Image
              src="/logo.jpg"
              alt="Majin Studios"
              width={140}
              height={45}
              className={styles.brandLogo}
            />
          </a>

          {/* Desktop links */}
          <div className={styles.links}>
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.link}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className={styles.status}>
            <span className={styles.dot} />
            ACCEPTING SELECTED PROJECTS
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className={styles.hamburger}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span
              className={[
                styles.hamburgerLine,
                mobileOpen ? styles.hamburgerLineTopOpen : '',
              ].join(' ')}
            />
            <span
              className={[
                styles.hamburgerLine,
                mobileOpen ? styles.hamburgerLineMidOpen : '',
              ].join(' ')}
            />
            <span
              className={[
                styles.hamburgerLine,
                mobileOpen ? styles.hamburgerLineBottomOpen : '',
              ].join(' ')}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={[
          styles.drawerOverlay,
          mobileOpen ? styles.drawerOverlayOpen : '',
        ].join(' ')}
        aria-hidden={!mobileOpen}
        onClick={closeDrawer}
      />

      {/* Mobile drawer panel */}
      <div
        className={[
          styles.drawer,
          mobileOpen ? styles.drawerOpen : '',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        {/* Drawer header */}
        <div className={styles.drawerHeader}>
          <span className={styles.drawerLabel}>NAVIGATION</span>
          <button
            type="button"
            className={styles.drawerClose}
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            ✕
          </button>
        </div>

        {/* Drawer links */}
        <nav className={styles.drawerLinks}>
          {NAV_LINKS.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.drawerLink}
              onClick={closeDrawer}
              style={{ transitionDelay: mobileOpen ? `${index * 55}ms` : '0ms' }}
            >
              <span className={styles.drawerLinkNum}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.drawerLinkLabel}>
                {item.label}
              </span>
              <span className={styles.drawerLinkArrow}>→</span>
            </a>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className={styles.drawerFooter}>
          <span className={styles.dot} />
          ACCEPTING SELECTED PROJECTS
        </div>
      </div>
    </>
  );
}
