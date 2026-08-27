'use client';

import {
  useCallback,
  useEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

type AnimationCallback = (
  element: HTMLElement,
  isReducedMotion: boolean
) => void;

interface UseScrollAnimationOptions {
  enabled?: boolean;
}

export function useScrollAnimation(
  animationCallback: AnimationCallback,
  dependencies: unknown[] = [],
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  const callbackRef = useRef<AnimationCallback>(animationCallback);

  /*
   * Always keep the latest callback without making the
   * GSAP effect rerun unnecessarily.
   */
  useEffect(() => {
    callbackRef.current = animationCallback;
  }, [animationCallback]);

  const runAnimation = useCallback(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const element = ref.current;

    if (!element) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const enabled = options.enabled ?? true;

    if (!enabled) return;

    /*
     * GSAP context scopes every animation and ScrollTrigger
     * created by the callback to this element.
     */
    const context = gsap.context(() => {
      callbackRef.current(element, reducedMotion);
    }, element);

    return () => {
      context.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.enabled, ...dependencies]);

  useEffect(() => {
    const cleanup = runAnimation();

    return () => {
      cleanup?.();
    };
  }, [runAnimation]);

  /*
   * Refresh ScrollTrigger after the layout/image/font system
   * has had a chance to settle.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const timeout = window.setTimeout(refresh, 100);

    window.addEventListener('load', refresh);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return ref;
}
