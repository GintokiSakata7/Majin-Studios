'use client';

import React, {
  useLayoutEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from './LineReveal.module.css';

interface LineRevealProps {
  className?: string;

  width?: string | number;

  height?: string | number;

  orientation?: 'horizontal' | 'vertical';

  delay?: number;

  color?:
    | 'structural'
    | 'active'
    | 'accent';

  scroll?: boolean;
}

export function LineReveal({
  className = '',

  width = '100%',

  height = '1px',

  orientation = 'horizontal',

  delay = 0,

  color = 'structural',

  scroll = true,
}: LineRevealProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const lineRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container =
      containerRef.current;

    const line =
      lineRef.current;

    if (!container || !line) return;

    if (typeof window === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const context = gsap.context(() => {
      const isHorizontal =
        orientation === 'horizontal';

      /*
       * Initial state.
       */
      gsap.set(line, {
        transformOrigin: isHorizontal
          ? 'left center'
          : 'center top',

        scaleX: isHorizontal ? 0 : 1,

        scaleY: isHorizontal ? 1 : 0,
      });

      if (reducedMotion) {
        gsap.set(line, {
          scaleX: 1,
          scaleY: 1,
        });

        return;
      }

      const animation = gsap.to(line, {
        scaleX: 1,
        scaleY: 1,

        duration: 1.05,

        delay,

        ease: 'power2.inOut',

        paused: true,
      });

      if (!scroll) {
        animation.play();
        return;
      }

      const trigger = ScrollTrigger.create({
        trigger: container,

        start: 'top 88%',

        once: true,

        onEnter: () => {
          animation.play();
        },
      });

      return () => {
        trigger.kill();
      };
    }, container);

    return () => {
      context.revert();
    };
  }, [
    delay,
    orientation,
    scroll,
  ]);

  return (
    <div
      ref={containerRef}
      className={[
        styles.container,
        styles[orientation],
        className,
      ].join(' ')}
      style={{
        width:
          typeof width === 'number'
            ? `${width}px`
            : width,

        height:
          typeof height === 'number'
            ? `${height}px`
            : height,
      }}
      aria-hidden="true"
    >
      <div
        ref={lineRef}
        className={[
          styles.line,
          styles[color],
        ].join(' ')}
      />
    </div>
  );
}
