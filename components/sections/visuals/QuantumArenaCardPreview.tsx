'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './CardPreview.module.css';

const quantumTabs = [
  { id: 'hero', label: 'COMMAND', src: '/quantumarena/images/Screenshot 2026-08-25 204631.png', url: 'quantumarena.io/ops' },
  { id: 'judging', label: 'JUDGE MATRIX', src: '/quantumarena/images/Screenshot 2026-08-25 204859.png', url: 'quantumarena.io/judging' },
  { id: 'teams', label: 'PARTICIPANTS', src: '/quantumarena/images/Screenshot 2026-08-25 204657.png', url: 'quantumarena.io/teams' },
  { id: 'checkin', label: 'QR SCANNER', src: '/quantumarena/images/Screenshot 2026-08-25 204746.png', url: 'quantumarena.io/checkin' },
];

export function QuantumArenaCardPreview({ className = '' }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(quantumTabs[0]);

  return (
    <div className={`${styles.showcaseWrapper} ${className}`} data-cursor="3d">
      {/* HUD Control Bar */}
      <div className={styles.topControlBar}>
        <div className={styles.windowControls}>
          <div className={styles.winDotRed} />
          <div className={styles.winDotYellow} />
          <div className={styles.winDotGreen} />
          <span style={{ fontSize: '0.62rem', color: '#00ff66', fontWeight: 700, marginLeft: '0.4rem' }}>
            QUANTUM ARENA
          </span>
        </div>

        {/* Tab Group */}
        <div className={styles.tabGroup}>
          {quantumTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tabButton} ${activeTab.id === tab.id ? styles.tabActiveLime : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.urlBar}>{activeTab.url}</div>
      </div>

      {/* Main Display Area */}
      <div className={styles.frameViewport}>
        <Image
          src={activeTab.src}
          alt={`Quantum Arena ${activeTab.label}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1000px"
          className={styles.mainScreenshot}
          priority
        />

        <div className={styles.overlayGradient} />

        {/* Overlapping Glass Detail Frame */}
        <div className={styles.glassDetailFrame}>
          <Image
            src="/quantumarena/images/Screenshot 2026-08-25 204746.png"
            alt="Checkin Portal"
            fill
            sizes="200px"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        {/* Floating Telemetry Badges */}
        <div className={`${styles.floatingBadge} ${styles.badgeLime}`} style={{ top: '15px', right: '15px' }}>
          <div className={styles.pulseDotLime} />
          <span>36H CONTINUOUS OPS</span>
        </div>

        <div className={`${styles.floatingBadge} ${styles.badgeLime}`} style={{ bottom: '20px', right: '20px' }}>
          <span>1,500+ ATHLETES ACTIVE</span>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className={styles.bottomFooter}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: '#00ff66', fontWeight: 700 }}>INFRASTRUCTURE:</span>
          <span>GATE CHECK-IN &rarr; JUDGING &rarr; CERT ENGINE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span>SCALE: 1,500+ PARTICIPANTS</span>
          <span style={{ color: '#00ff66', fontWeight: 700 }}>STATUS: PRODUCTION READY</span>
        </div>
      </div>
    </div>
  );
}