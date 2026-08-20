'use client';

import React, {
  useLayoutEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { HUDMarker } from './HUDMarker';
import { OSLabel } from './OSLabel';

interface ProductPanelProps {
  title: string;

  metadata?: string;

  children: React.ReactNode;

  delay?: number;

  className?: string;

  depth?: number;

  accent?: boolean;

  rotate?: number;
}

export function ProductPanel({
  title,

  metadata,

  children,

  delay = 0,

  className = '',

  depth = 1,

  accent = false,

  rotate = 0,
}: ProductPanelProps) {
  const panelRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const panel =
      panelRef.current;

    if (!panel) return;

    if (typeof window === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    const context =
      gsap.context(() => {
        if (reducedMotion) {
          gsap.set(panel, {
            clearProps: 'all',
            opacity: 1,
          });

          return;
        }

        gsap.set(panel, {
          opacity: 0,
          y: 22 * depth,
          z: -50 * depth,
          rotateX: 8,
          rotateY: rotate,
          scale: 0.97,
          transformPerspective: 1200,
          transformOrigin: 'center center',
        });

        gsap.to(panel, {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,

          duration: 1.15,

          delay,

          ease: 'power3.out',

          scrollTrigger: {
            trigger: panel,
            start: 'top 86%',
            once: true,
          },
        });
      }, panel);

    return () => {
      context.revert();
    };
  }, [
    delay,
    depth,
    rotate,
  ]);

  return (
    <div
      ref={panelRef}
      className={[
        'layer-panels',
        'relative',
        'overflow-hidden',
        'p-6',
        'border',
        accent
          ? 'border-line-active'
          : 'border-line-structural',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        transformStyle:
          'preserve-3d',

        background:
          'linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))',

        backdropFilter:
          'blur(14px)',
      }}
      data-cursor="3d"
    >
      <HUDMarker
        type="corner"
        top="-1px"
        left="-1px"
      />

      <HUDMarker
        type="corner"
        top="-1px"
        right="-1px"
      />

      <HUDMarker
        type="corner"
        bottom="-1px"
        left="-1px"
      />

      <HUDMarker
        type="corner"
        bottom="-1px"
        right="-1px"
      />

      <div
        className="relative z-10 flex justify-between items-start mb-6 pb-4"
        style={{
          borderBottom:
            '1px solid var(--line-structural)',
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-os-label">
            PRODUCT SYSTEM
          </span>

          <h4
            className="text-os-value"
            style={{
              color:
                'var(--text-primary)',
            }}
          >
            {title}
          </h4>
        </div>

        {metadata && (
          <OSLabel
            label="STATUS"
            value={metadata}
            status={
              accent
                ? 'active'
                : 'neutral'
            }
          />
        )}
      </div>

      <div className="relative z-10">
        {children}
      </div>

      {accent && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at 85% 15%, var(--accent-dim), transparent 35%)',
            opacity: 0.65,
          }}
        />
      )}
    </div>
  );
}
