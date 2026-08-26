'use client';

import { useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useGlobalState } from '../store/useGlobalState';
import { useScrollAnimation } from './useScrollAnimation';

type SceneState =
  | 'CORE'
  | 'CAPABILITIES'
  | 'SYSTEMS'
  | 'AGENTS'
  | 'PRODUCTS'
  | 'TEAM'
  | 'WHY_MAJIN'
  | 'CONTACT';

type AccentState =
  | 'MONOCHROME'
  | 'LIME'
  | 'CYAN'
  | 'AMBER'
  | 'VIOLET';

interface SceneDefinition {
  selector: string;
  state: SceneState;
  accent: AccentState;
}

const SCENES: SceneDefinition[] = [
  { selector: '#home', state: 'CORE', accent: 'MONOCHROME' },
  { selector: '#capabilities', state: 'CAPABILITIES', accent: 'MONOCHROME' },
  { selector: '#systems', state: 'SYSTEMS', accent: 'LIME' },
  { selector: '#agents', state: 'AGENTS', accent: 'CYAN' },
  { selector: '#work', state: 'PRODUCTS', accent: 'AMBER' },
  { selector: '#studio', state: 'TEAM', accent: 'VIOLET' },
  { selector: '#why-majin', state: 'WHY_MAJIN', accent: 'MONOCHROME' },
  { selector: '#contact', state: 'CONTACT', accent: 'MONOCHROME' },
];

export function usePageAnimations() {
  const { setScene, setAccent } = useGlobalState();

  const registerSceneTriggers = useCallback(() => {
    if (typeof window === 'undefined') return;

    SCENES.forEach(({ selector, state, accent }) => {
      const element = document.querySelector(selector);

      if (!element) return;

      ScrollTrigger.create({
        trigger: element,
        start: 'top 48%',
        end: 'bottom 48%',
        invalidateOnRefresh: true,

        onEnter: () => {
          setScene(state as never);
          setAccent(accent as never);
        },

        onEnterBack: () => {
          setScene(state as never);
          setAccent(accent as never);
        },
      });
    });

    /*
     * Determine initial scene.
     */
    const viewportCenter = window.innerHeight * 0.5;

    let activeScene: SceneDefinition | null = null;

    for (const scene of SCENES) {
      const element = document.querySelector(scene.selector);

      if (!element) continue;

      const rect = element.getBoundingClientRect();

      if (
        rect.top <= viewportCenter &&
        rect.bottom >= viewportCenter
      ) {
        activeScene = scene;
        break;
      }
    }

    if (activeScene) {
      setScene(activeScene.state as never);
      setAccent(activeScene.accent as never);
    }
  }, [setAccent, setScene]);

  const animation = useCallback(
    (element: HTMLElement, isReducedMotion: boolean) => {
      if (typeof window === 'undefined') return;

      /*
       * REDUCED MOTION
       */
      if (isReducedMotion) {
        gsap.set(
          element.querySelectorAll(
            '.text-display-giant, .text-display, .text-body-lg, .actions'
          ),
          {
            clearProps: 'all',
            opacity: 1,
            visibility: 'visible',
          }
        );

        registerSceneTriggers();

        return;
      }

      /*
       * HERO
       */
      const heroText = element.querySelectorAll(
        '.text-display-giant, .text-display'
      );

      const heroBody = element.querySelector('.text-body-lg');
      const heroActions = element.querySelector('.actions');

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      });

      if (heroText.length) {
        heroTimeline.fromTo(
          heroText,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
          },
          0.1
        );
      }

      if (heroBody) {
        heroTimeline.fromTo(
          heroBody,
          {
            y: 15,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          '-=0.4'
        );
      }

      if (heroActions) {
        heroTimeline.fromTo(
          heroActions,
          {
            y: 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          '-=0.3'
        );
      }

      /*
       * SECTION HEADINGS
       */
      const headings = gsap.utils.toArray<HTMLElement>(
        [
          '.section-heading',
          '[data-reveal-heading]',
          '.text-heading-1',
          '.text-heading-2',
        ].join(',')
      );

      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: heading,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /*
       * TECHNICAL LABELS
       */
      const labels = gsap.utils.toArray<HTMLElement>(
        '[data-reveal-label]'
      );

      labels.forEach((label) => {
        gsap.fromTo(
          label,
          {
            x: -10,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /*
       * EDITORIAL STATEMENTS
       */
      const statements = gsap.utils.toArray<HTMLElement>(
        '[data-editorial-statement]'
      );

      statements.forEach((statement, index) => {
        gsap.fromTo(
          statement,
          {
            y: index % 2 === 0 ? 20 : 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: statement,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /*
       * SCENE STATE
       */
      registerSceneTriggers();
    },
    [registerSceneTriggers]
  );

  return useScrollAnimation(animation, []);
}
