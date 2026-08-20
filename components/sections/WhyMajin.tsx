'use client';

import React, {
  useLayoutEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/dist/ScrollTrigger';

const statements = [
  {
    main: 'WE START WITH THE',
    accent: 'PROBLEM.',
  },
  {
    main: 'NOT THE',
    accent: 'TECHNOLOGY.',
  },
  {
    main: 'WE DESIGN THE',
    accent: 'SYSTEM.',
  },
  {
    main: 'NOT JUST THE',
    accent: 'SCREEN.',
  },
  {
    main: 'WE BUILD FOR',
    accent: 'PRODUCTION.',
  },
];

export function WhyMajin() {
  const rootRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root =
      rootRef.current;

    if (!root) return;

    gsap.registerPlugin(
      ScrollTrigger
    );

    const reduced =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    if (reduced) return;

    const context =
      gsap.context(() => {
        const items =
          gsap.utils.toArray<HTMLElement>(
            '[data-statement]'
          );

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              pin: false,
            },
          });

        items.forEach(
          (item, index) => {
            if (index === 0) return;

            const previous =
              items[index - 1];

            timeline.to(
              previous,
              {
                opacity: 0.08,
                y: -60,
                scale: 0.9,
                filter:
                  'blur(5px)',
                duration: 1,
                ease: 'power2.inOut',
              }
            );

            timeline.fromTo(
              item,
              {
                opacity: 0,
                y: 60,
                scale: 1.1,
                filter:
                  'blur(5px)',
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter:
                  'blur(0px)',
                duration: 1,
                ease: 'power3.out',
              },
              '<'
            );
          }
        );
      }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      id="why-majin"
      className="section relative min-h-[230vh] py-32"
    >
      <div
        ref={rootRef}
        className="page-container h-full"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, var(--accent-dim), transparent 58%)',
              opacity: 0.5,
            }}
          />

          <div className="relative w-full max-w-7xl min-h-[420px]">
            {statements.map(
              (statement, index) => (
                <div
                  key={index}
                  data-statement
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                  style={{
                    opacity:
                      index === 0
                        ? 1
                        : 0,
                  }}
                >
                  <span className="text-os-label mb-6">
                    FIG. / {String(
                      index + 1
                    ).padStart(
                      2,
                      '0'
                    )}
                  </span>

                  <h2 className="text-display-giant leading-[0.82]">
                    {statement.main}
                    <br />
                    <span className="text-accent-current">
                      {statement.accent}
                    </span>
                  </h2>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
