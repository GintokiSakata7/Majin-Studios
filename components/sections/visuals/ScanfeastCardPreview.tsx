'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './CardPreview.module.css';

const scanfeastTabs = [
  { id: 'kds', label: 'KDS QUEUE', src: '/scanfeast/images/kds.png', url: 'scanfeast.com/kds' },
  { id: 'diner', label: 'DINER APP', src: '/scanfeast/images/diner.png', url: 'scanfeast.com/menu' },
  { id: 'manager', label: 'MANAGER', src: '/scanfeast/images/manager.png', url: 'scanfeast.com/admin' },
];

export function ScanfeastCardPreview({ className = '' }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(scanfeastTabs[0]);

  return (
    <div className={`${styles.showcaseWrapper} ${className}`} data-cursor="3d">
      {/* HUD Control Bar */}
      <div className={styles.topControlBar}>
        <div className={styles.windowControls}>
          <div className={styles.winDotRed} />
          <div className={styles.winDotYellow} />
          <div className={styles.winDotGreen} />
          <span style={{ fontSize: '0.62rem', color: '#ffaa00', fontWeight: 700, marginLeft: '0.4rem' }}>
            SCANFEAST OS
          </span>
        </div>

        {/* Tab Group */}
        <div className={styles.tabGroup}>
          {scanfeastTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tabButton} ${activeTab.id === tab.id ? styles.tabActiveCyan : ''}`}
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
          alt={`Scanfeast ${activeTab.label}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1000px"
          className={styles.mainScreenshot}
          priority
        />

        <div className={styles.overlayGradient} />

        {/* Overlapping Mobile Device Mockup */}
        <div className={styles.mobileOverlay}>
          <Image
            src="/scanfeast/images/diner.png"
            alt="Scanfeast Mobile Ordering"
            fill
            sizes="200px"
            className={styles.mobileScreenshot}
          />
        </div>

        {/* Floating Telemetry Badges */}
        <div className={`${styles.floatingBadge} ${styles.badgeCyan}`} style={{ top: '15px', right: '15px' }}>
          <div className={styles.pulseDotCyan} />
          <span>REALTIME WS SYNC</span>
        </div>

        <div className={`${styles.floatingBadge} ${styles.badgeAmber}`} style={{ bottom: '20px', right: '20px' }}>
          <span>ORDER TIME &lt; 60s</span>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className={styles.bottomFooter}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: '#00f0ff', fontWeight: 700 }}>ARCHITECTURE:</span>
          <span>WEBSOCKET BROADCAST + HTTP FALLBACK</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span>DIGITAL QUEUE: 100%</span>
          <span style={{ color: '#ffaa00', fontWeight: 700 }}>RUSH HOUR CONTROL: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}