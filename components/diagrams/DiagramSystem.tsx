'use client';

import React, {
  useLayoutEffect,
  useRef,
} from 'react';

import gsap from 'gsap';

import {
  ScrollTrigger,
} from 'gsap/dist/ScrollTrigger';

interface DiagramSystemProps {
  children: React.ReactNode;

  className?: string;

  animated?: boolean;
}

export function DiagramSystem({
  children,

  className = '',

  animated = true,
}: DiagramSystemProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container =
      containerRef.current;

    if (!container) return;

    if (!animated) return;

    if (
      typeof window ===
      'undefined'
    ) {
      return;
    }

    gsap.registerPlugin(
      ScrollTrigger
    );

    const reduced =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    const context =
      gsap.context(() => {
        const paths =
          gsap.utils.toArray<SVGGeometryElement>(
            'path.anim-path, path.motion-trace, path.motion-connect'
          );

        const nodes =
          gsap.utils.toArray<
            HTMLElement | SVGElement
          >(
            '.anim-node, .motion-node'
          );

        const labels =
          gsap.utils.toArray<HTMLElement>(
            '.anim-label, [data-diagram-label]'
          );

        /*
         * Reduced motion:
         * show everything immediately.
         */
        if (reduced) {
          gsap.set(
            [
              ...paths,
              ...nodes,
              ...labels,
            ],
            {
              clearProps:
                'all',

              opacity: 1,

              visibility:
                'visible',
            }
          );

          return;
        }

        /*
         * ---------------------------------------------------
         * TRACE
         * ---------------------------------------------------
         */

        paths.forEach(
          (path) => {
            try {
              const length =
                path.getTotalLength();

              gsap.set(path, {
                strokeDasharray:
                  length,

                strokeDashoffset:
                  length,

                opacity: 0,
              });
            } catch {
              // Ignore unsupported geometry.
            }
          }
        );

        /*
         * ---------------------------------------------------
         * CONNECT / NODES
         * ---------------------------------------------------
         */

        gsap.set(nodes, {
          scale: 0,

          opacity: 0,

          transformOrigin:
            'center center',
        });

        /*
         * ---------------------------------------------------
         * LABELS
         * ---------------------------------------------------
         */

        gsap.set(labels, {
          opacity: 0,

          y: 10,
        });

        /*
         * ---------------------------------------------------
         * SEQUENCE
         * ---------------------------------------------------
         */

        const timeline =
          gsap.timeline({
            paused: true,
          });

        /*
         * TRACE
         */
        if (paths.length) {
          timeline.to(
            paths,
            {
              strokeDashoffset: 0,

              opacity: 1,

              duration: 1.2,

              ease:
                'power2.inOut',

              stagger: 0.065,
            }
          );
        }

        /*
         * CONNECT / ACTIVATE
         */
        if (nodes.length) {
          timeline.to(
            nodes,
            {
              scale: 1,

              opacity: 1,

              duration: 0.5,

              ease:
                'back.out(1.45)',

              stagger: 0.045,
            },
            '-=0.7'
          );
        }

        /*
         * LABEL
         */
        if (labels.length) {
          timeline.to(
            labels,
            {
              opacity: 1,

              y: 0,

              duration: 0.5,

              ease:
                'power2.out',

              stagger: 0.055,
            },
            '-=0.4'
          );
        }

        /*
         * Scroll trigger.
         */
        const trigger =
          ScrollTrigger.create({
            trigger: container,

            start: 'top 82%',

            end: 'bottom 22%',

            toggleActions:
              'play none none reverse',

            onEnter: () =>
              timeline.play(),

            onLeaveBack: () =>
              timeline.reverse(),
          });

        return () => {
          trigger.kill();
          timeline.kill();
        };
      }, container);

    return () => {
      context.revert();
    };
  }, [animated]);

  return (
    <div
      ref={containerRef}
      className={[
        'diagram-system',

        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        position: 'relative',

        width: '100%',

        height: '100%',
      }}
    >
      {children}
    </div>
  );
}
