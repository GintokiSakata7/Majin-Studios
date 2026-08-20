'use client';

import React from 'react';

import styles from './InteractiveCard.module.css';

import { TechnicalLabel } from './TechnicalLabel';

interface InteractiveCardProps {
  children: React.ReactNode;

  metadata?: string;

  className?: string;

  withGlow?: boolean;

  cursor?: 'interactive' | 'active';

  onClick?: () => void;
}

export function InteractiveCard({
  children,

  metadata,

  className = '',

  withGlow = true,

  cursor = 'interactive',

  onClick,
}: InteractiveCardProps) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      {...(onClick
        ? {
            type: 'button' as const,
            onClick,
          }
        : {})}
      className={[
        styles.card,
        withGlow ? styles.withGlow : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(cursor
        ? {
            'data-cursor': cursor,
          }
        : {})}
    >
      {metadata && (
        <div className={styles.header}>
          <TechnicalLabel variant="secondary">
            {metadata}
          </TechnicalLabel>
        </div>
      )}

      <div className={styles.content}>
        {children}
      </div>

      <span
        className={`${styles.marker} ${styles.tl}`}
      />
      <span
        className={`${styles.marker} ${styles.tr}`}
      />
      <span
        className={`${styles.marker} ${styles.bl}`}
      />
      <span
        className={`${styles.marker} ${styles.br}`}
      />
    </Tag>
  );
}
