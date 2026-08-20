'use client';

import React, {
  useEffect,
  useRef,
} from 'react';

import gsap from 'gsap';

import styles from './MagneticButton.module.css';

import { Button } from './Button';

interface MagneticButtonProps {
  children: React.ReactNode;

  href?: string;

  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost';

  withArrow?: boolean;

  strength?: number;
}

export function MagneticButton({
  children,

  href,

  variant = 'primary',

  withArrow,

  strength = 0.18,
}: MagneticButtonProps) {
  const wrapRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element =
      wrapRef.current;

    if (!element) return;

    const supportsHover =
      window.matchMedia(
        '(hover: hover) and (pointer: fine)'
      ).matches;

    if (!supportsHover) return;

    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    if (reducedMotion) return;

    const context = gsap.context(() => {
      const xTo = gsap.quickTo(element, 'x', {
        duration: 0.45,
        ease: 'power3.out',
      });

      const yTo = gsap.quickTo(element, 'y', {
        duration: 0.45,
        ease: 'power3.out',
      });

      const onMove = (
        event: MouseEvent
      ) => {
        const rect =
          element.getBoundingClientRect();

        const centerX =
          rect.left + rect.width / 2;

        const centerY =
          rect.top + rect.height / 2;

        const offsetX =
          (event.clientX - centerX) * strength;

        const offsetY =
          (event.clientY - centerY) * strength;

        xTo(offsetX);
        yTo(offsetY);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener(
        'mousemove',
        onMove,
        { passive: true }
      );

      element.addEventListener(
        'mouseleave',
        onLeave
      );

      return () => {
        element.removeEventListener(
          'mousemove',
          onMove
        );

        element.removeEventListener(
          'mouseleave',
          onLeave
        );
      };
    }, element);

    return () => {
      context.revert();
    };
  }, [strength]);

  return (
    <div
      ref={wrapRef}
      className={styles.magneticWrap}
      data-cursor="interactive"
    >
      <Button
        href={href}
        variant={variant}
        withArrow={withArrow}
      >
        {children}
      </Button>
    </div>
  );
}
