import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  withArrow?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  external,
  withArrow = false,
  ...props
}: ButtonProps) {
  const btnClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;
  
  const content = (
    <>
      <span className={styles.text}>{children}</span>
      {withArrow && (
        <span className={styles.arrow}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
      <span className={styles.lineReveal}></span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={btnClass} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={btnClass}>
        {content}
      </Link>
    );
  }

  return (
    <button className={btnClass} {...props}>
      {content}
    </button>
  );
}
