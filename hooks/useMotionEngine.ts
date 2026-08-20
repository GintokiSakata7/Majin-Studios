'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGlobalState } from '../store/useGlobalState';

type SVGTraceElement = SVGGeometryElement;

export function useMotionEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeAccent } = useGlobalState();

  /*
   * ---------------------------------------------------------
   * GLOBAL ACCENT STATE
   * ---------------------------------------------------------
   *
   * The actual color should be controlled by CSS.
   * We only expose the current state here.
   *
   * Example:
   *   document.documentElement[data-accent="lime"]
   */
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const normalizedAccent = String(activeAccent ?? 'MONOCHROME')
      .toLowerCase()
      .replace(/\s+/g, '-');

    document.documentElement.dataset.accent = normalizedAccent;
  }, [activeAccent]);

  /*
   * ---------------------------------------------------------
   * MOTION ENGINE
   * ---------------------------------------------------------
   *
   * The animation vocabulary is:
   *
   * TRACE
   * CONNECT
   * ASSEMBLE
   * ACTIVATE
   * TRANSFORM
   * RESOLVE
   *
   * The hook is intentionally reusable. Any section can use
   * the same classes and receive the same motion language.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const root = containerRef.current;

    if (!root) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      /*
       * -----------------------------------------------------
       * REDUCED MOTION
       * -----------------------------------------------------
       *
       * Keep content visible and usable.
       * No cinematic motion.
       */
      if (reducedMotion) {
        const allAnimatedElements = gsap.utils.toArray<HTMLElement | SVGElement>(
          [
            '.motion-trace',
            '.motion-node',
            '.motion-assemble',
            '.motion-activate',
            '.motion-transform',
            '.motion-resolve',
          ].join(',')
        );

        if (allAnimatedElements.length) {
          gsap.set(allAnimatedElements, {
            clearProps: 'all',
            opacity: 1,
            visibility: 'visible',
          });
        }

        return;
      }

      /*
       * -----------------------------------------------------
       * TRACE
       * -----------------------------------------------------
       *
       * SVG geometry draws itself.
       */
      const traces = gsap.utils.toArray<SVGTraceElement>(
        '.motion-trace'
      );

      traces.forEach((path) => {
        try {
          const length = path.getTotalLength();

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0,
          });
        } catch {
          // Ignore malformed SVG geometry.
        }
      });

      /*
       * -----------------------------------------------------
       * CONNECT
       * -----------------------------------------------------
       *
       * Connection paths behave slightly differently from
       * normal trace paths. They begin dormant and activate
       * during the connection stage.
       */
      const connections = gsap.utils.toArray<SVGTraceElement>(
        '.motion-connect'
      );

      connections.forEach((path) => {
        try {
          const length = path.getTotalLength();

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0,
          });
        } catch {
          // Ignore malformed SVG geometry.
        }
      });

      /*
       * -----------------------------------------------------
       * ASSEMBLE
       * -----------------------------------------------------
       *
       * Panels, cards, labels, UI pieces and 2.5D elements.
       */
      const assemblyElements = gsap.utils.toArray<HTMLElement>(
        '.motion-assemble'
      );

      if (assemblyElements.length) {
        gsap.set(assemblyElements, {
          opacity: 0,
          y: 18,
          scale: 0.985,
          transformOrigin: 'center center',
        });
      }

      /*
       * -----------------------------------------------------
       * NODES
       * -----------------------------------------------------
       *
       * Nodes appear only after structure has been traced.
       */
      const nodes = gsap.utils.toArray<HTMLElement | SVGElement>(
        '.motion-node'
      );

      if (nodes.length) {
        gsap.set(nodes, {
          opacity: 0,
          scale: 0,
          transformOrigin: 'center center',
        });
      }

      /*
       * -----------------------------------------------------
       * ACTIVATE
       * -----------------------------------------------------
       *
       * Elements become visually "alive".
       * Actual accent color is controlled by CSS.
       */
      const activateElements = gsap.utils.toArray<HTMLElement | SVGElement>(
        '.motion-activate'
      );

      if (activateElements.length) {
        gsap.set(activateElements, {
          opacity: 0.55,
        });
      }

      /*
       * -----------------------------------------------------
       * TRANSFORM
       * -----------------------------------------------------
       *
       * Elements that transition into another state.
       */
      const transformElements = gsap.utils.toArray<HTMLElement | SVGElement>(
        '.motion-transform'
      );

      /*
       * -----------------------------------------------------
       * RESOLVE
       * -----------------------------------------------------
       *
       * Final elements become stable.
       */
      const resolveElements = gsap.utils.toArray<HTMLElement | SVGElement>(
        '.motion-resolve'
      );

      if (resolveElements.length) {
        gsap.set(resolveElements, {
          opacity: 0,
        });
      }

      /*
       * -----------------------------------------------------
       * MASTER SEQUENCE
       * -----------------------------------------------------
       */

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },

        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          end: 'bottom 22%',
          toggleActions: 'play none none reverse',

          /*
           * Refresh after layout settles.
           */
          invalidateOnRefresh: true,
        },
      });

      /*
       * 01 — TRACE
       */
      if (traces.length) {
        timeline.to(
          traces,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.15,
            ease: 'power2.inOut',
            stagger: 0.055,
          },
          0
        );
      }

      /*
       * 02 — CONNECT
       */
      if (connections.length) {
        timeline.to(
          connections,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            stagger: 0.045,
          },
          '-=0.72'
        );
      }

      /*
       * 03 — ASSEMBLE
       */
      if (nodes.length) {
        timeline.to(
          nodes,
          {
            opacity: 1,
            scale: 1,
            duration: 0.52,
            ease: 'back.out(1.6)',
            stagger: 0.045,
          },
          '-=0.55'
        );
      }

      if (assemblyElements.length) {
        timeline.to(
          assemblyElements,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.075,
          },
          '-=0.4'
        );
      }

      /*
       * 04 — ACTIVATE
       */
      if (activateElements.length) {
        timeline.to(
          activateElements,
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
          },
          '-=0.25'
        );
      }

      /*
       * 05 — TRANSFORM
       */
      if (transformElements.length) {
        timeline.fromTo(
          transformElements,
          {
            scale: 0.985,
            opacity: 0.8,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.055,
            ease: 'power2.inOut',
          },
          '-=0.15'
        );
      }

      /*
       * 06 — RESOLVE
       */
      if (resolveElements.length) {
        timeline.to(
          resolveElements,
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }

      /*
       * -----------------------------------------------------
       * GLOBAL HOVER INTELLIGENCE
       * -----------------------------------------------------
       *
       * Elements marked data-motion-hover respond subtly.
       * This is intentionally restrained.
       */
      const hoverTargets = gsap.utils.toArray<HTMLElement>(
        '[data-motion-hover]'
      );

      hoverTargets.forEach((element) => {
        const onEnter = () => {
          gsap.to(element, {
            y: -3,
            duration: 0.35,
            ease: 'power2.out',
          });

          element.dataset.motionActive = 'true';
        };

        const onLeave = () => {
          gsap.to(element, {
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
          });

          delete element.dataset.motionActive;
        };

        element.addEventListener('mouseenter', onEnter);
        element.addEventListener('mouseleave', onLeave);

        /*
         * Store references for cleanup.
         */
        const cleanupStore = (
          element as HTMLElement & {
            __motionCleanup?: () => void;
          }
        );

        cleanupStore.__motionCleanup = () => {
          element.removeEventListener('mouseenter', onEnter);
          element.removeEventListener('mouseleave', onLeave);
        };
      });

      /*
       * Cleanup hover listeners when GSAP context is reverted.
       */
      return () => {
        hoverTargets.forEach((element) => {
          const cleanupStore = (
            element as HTMLElement & {
              __motionCleanup?: () => void;
            }
          );

          cleanupStore.__motionCleanup?.();
          delete cleanupStore.__motionCleanup;
        });
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return containerRef;
}