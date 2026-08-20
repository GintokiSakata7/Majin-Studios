'use client';

import React from 'react';

import styles from './TechnicalLabel.module.css';

interface TechnicalLabelProps {
  children: React.ReactNode;

  variant?:
    | 'primary'
    | 'secondary'
    | 'accent';

  className?: string;

  id?: string;
}

export function TechnicalLabel({
  children,

  variant = 'primary',

  className = '',

  id,
}: TechnicalLabelProps) {
  return (
    <span
      id={id}
      className={[
        styles.label,
        styles[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-reveal-label
    >
      {children}
    </span>
  );
}
