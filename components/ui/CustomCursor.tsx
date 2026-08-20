'use client';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import gsap from 'gsap';

import styles from './CustomCursor.module.css';

type CursorType =
  | 'normal'
  | 'interactive'
  | 'threeD'
  | 'active';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const [cursorType, setCursorType] =
    useState<CursorType>('normal');

  const typeRef = useRef<CursorType>('normal');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const supportsHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;

    if (!supportsHover) return;

    const cursor = cursorRef.current;

    if (!cursor) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const moveX = gsap.quickTo(cursor, 'x', {
      duration: reducedMotion ? 0 : 0.12,
      ease: 'power3.out',
    });

    const moveY = gsap.quickTo(cursor, 'y', {
      duration: reducedMotion ? 0 : 0.12,
      ease: 'power3.out',
    });

    const updateType = (nextType: CursorType) => {
      if (typeRef.current === nextType) return;

      typeRef.current = nextType;
      setCursorType(nextType);
    };

    const onMouseMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);

      document.documentElement.style.setProperty(
        '--mouse-x',
        `${event.clientX}px`
      );

      document.documentElement.style.setProperty(
        '--mouse-y',
        `${event.clientY}px`
      );
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) {
        updateType('normal');
        return;
      }

      if (
        target.closest(
          '[data-cursor="active"]'
        )
      ) {
        updateType('active');
        return;
      }

      if (
        target.closest(
          '[data-cursor="3d"]'
        ) ||
        target.closest('canvas')
      ) {
        updateType('threeD');
        return;
      }

      if (
        target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]'
        )
      ) {
        updateType('interactive');
        return;
      }

      updateType('normal');
    };

    const onMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.2,
      });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.2,
      });
    };

    window.addEventListener(
      'mousemove',
      onMouseMove,
      { passive: true }
    );

    window.addEventListener(
      'mouseover',
      onMouseOver
    );

    document.addEventListener(
      'mouseleave',
      onMouseLeave
    );

    document.addEventListener(
      'mouseenter',
      onMouseEnter
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        onMouseMove
      );

      window.removeEventListener(
        'mouseover',
        onMouseOver
      );

      document.removeEventListener(
        'mouseleave',
        onMouseLeave
      );

      document.removeEventListener(
        'mouseenter',
        onMouseEnter
      );
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={[
        styles.cursor,
        styles[cursorType],
      ].join(' ')}
      aria-hidden="true"
    >
      <span className={styles.core} />
      <span className={styles.cross} />
      <span className={styles.ring} />

      {cursorType !== 'normal' && (
        <span className={styles.hudMark}>
          {cursorType === 'threeD'
            ? '3D SYSTEM'
            : cursorType === 'active'
              ? 'ACTIVE'
              : 'INTERACT'}
        </span>
      )}
    </div>
  );
}
