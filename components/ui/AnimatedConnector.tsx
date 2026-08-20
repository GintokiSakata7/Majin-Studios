'use client';

import React from 'react';
import styles from './AnimatedConnector.module.css';

interface AnimatedConnectorProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'structural' | 'active' | 'accent';
  animated?: boolean;
  className?: string;
  showNode?: boolean;
  nodePosition?: number;
}

export function AnimatedConnector({
  orientation = 'horizontal',
  variant = 'structural',
  animated = true,
  className = '',
  showNode = true,
  nodePosition = 0.5,
}: AnimatedConnectorProps) {
  const isHorizontal = orientation === 'horizontal';

  const safePosition = Math.min(
    1,
    Math.max(0, nodePosition)
  );

  const startX = isHorizontal ? 0 : 12;
  const startY = isHorizontal ? 12 : 0;

  const endX = isHorizontal ? 100 : 12;
  const endY = isHorizontal ? 12 : 100;

  const nodeX = isHorizontal
    ? safePosition * 100
    : 12;

  const nodeY = isHorizontal
    ? 12
    : safePosition * 100;

  return (
    <div
      className={[
        styles.connector,
        styles[orientation],
        styles[variant],
        animated ? styles.animated : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        viewBox="0 0 100 24"
        preserveAspectRatio={
          isHorizontal ? 'none' : 'none'
        }
      >
        {isHorizontal ? (
          <>
            <line
              className={styles.path}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
            />

            {showNode && (
              <circle
                className={styles.node}
                cx={nodeX}
                cy={nodeY}
                r="1.5"
              />
            )}
          </>
        ) : (
          <>
            <line
              className={styles.path}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
            />

            {showNode && (
              <circle
                className={styles.node}
                cx={nodeX}
                cy={nodeY}
                r="1.5"
              />
            )}
          </>
        )}
      </svg>
    </div>
  );
}
