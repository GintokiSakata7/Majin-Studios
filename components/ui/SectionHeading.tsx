'use client';

import React from 'react';

import styles from './SectionHeading.module.css';

import { TechnicalLabel } from './TechnicalLabel';

interface SectionHeadingProps {
  title: React.ReactNode;

  metadata?: string;

  className?: string;

  as?: 'h1' | 'h2' | 'h3';

  align?: 'left' | 'center';

  id?: string;
}

export function SectionHeading({
  title,

  metadata,

  className = '',

  as: Component = 'h2',

  align = 'left',

  id,
}: SectionHeadingProps) {
  const headingClass =
    Component === 'h1'
      ? 'text-heading-1'
      : Component === 'h2'
        ? 'text-heading-2'
        : 'text-heading-3';

  return (
    <div
      id={id}
      className={[
        styles.container,
        styles[align],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-reveal-heading
    >
      {metadata && (
        <TechnicalLabel
          variant="secondary"
          className={styles.metadata}
        >
          {metadata}
        </TechnicalLabel>
      )}

      <Component
        className={[
          headingClass,
          styles.title,
        ].join(' ')}
      >
        {title}
      </Component>
    </div>
  );
}
