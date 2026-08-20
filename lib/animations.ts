import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/*
 * ------------------------------------------------------------
 * GSAP REGISTRATION
 * ------------------------------------------------------------
 */

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/*
 * ------------------------------------------------------------
 * MOTION CONFIGURATION
 * ------------------------------------------------------------
 */

export const motionConfig = {
  ease: {
    standard: 'power3.out',
    smooth: 'power2.inOut',
    reveal: 'power4.out',
    mechanical: 'none',
    elastic: 'back.out(1.35)',
  },

  duration: {
    micro: 0.25,
    fast: 0.4,
    standard: 0.7,
    slow: 1.1,
    cinematic: 1.6,
    transformation: 2.0,
  },

  stagger: {
    tight: 0.04,
    standard: 0.08,
    relaxed: 0.14,
  },
};

/*
 * ------------------------------------------------------------
 * TRACE
 * ------------------------------------------------------------
 *
 * Draw SVG geometry from start to finish.
 */

export function trace(
  element: SVGGeometryElement | string | SVGGeometryElement[],
  duration = motionConfig.duration.slow,
  stagger = motionConfig.stagger.tight
) {
  const targets = gsap.utils.toArray<SVGGeometryElement>(
    element
  );

  targets.forEach((target) => {
    try {
      const length = target.getTotalLength();

      gsap.set(target, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      });
    } catch {
      // Ignore unsupported SVG nodes.
    }
  });

  return gsap.to(targets, {
    strokeDashoffset: 0,
    opacity: 1,
    duration,
    stagger,
    ease: motionConfig.ease.smooth,
  });
}

/*
 * Alias retained for compatibility with older components.
 */
export const drawLine = trace;

/*
 * ------------------------------------------------------------
 * CONNECT
 * ------------------------------------------------------------
 *
 * Draws relationships between nodes.
 */

export function connect(
  element: SVGGeometryElement | string | SVGGeometryElement[],
  duration = motionConfig.duration.standard
) {
  return trace(
    element,
    duration,
    motionConfig.stagger.tight
  );
}

/*
 * ------------------------------------------------------------
 * ASSEMBLE
 * ------------------------------------------------------------
 *
 * Brings panels / interface layers / cards into place.
 */

export function assemble(
  element: Element | string,
  duration = motionConfig.duration.standard,
  stagger = motionConfig.stagger.standard
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 18,
      scale: 0.985,
      transformOrigin: 'center center',
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease: motionConfig.ease.standard,
    }
  );
}

/*
 * ------------------------------------------------------------
 * ACTIVATE
 * ------------------------------------------------------------
 *
 * Used when a node/system changes from dormant to active.
 */

export function activate(
  element: Element | string,
  duration = motionConfig.duration.fast
) {
  const timeline = gsap.timeline();

  timeline
    .to(element, {
      opacity: 1,
      duration,
      ease: motionConfig.ease.standard,
    })
    .to(
      element,
      {
        scale: 1.02,
        duration: duration * 0.5,
        ease: motionConfig.ease.smooth,
      },
      '<'
    )
    .to(element, {
      scale: 1,
      duration: duration * 0.5,
      ease: motionConfig.ease.smooth,
    });

  return timeline;
}

/*
 * ------------------------------------------------------------
 * TRANSFORM
 * ------------------------------------------------------------
 *
 * A state transition rather than a simple reveal.
 */

export function transform(
  element: Element | string,
  values: gsap.TweenVars,
  duration = motionConfig.duration.transformation
) {
  return gsap.to(element, {
    ...values,
    duration,
    ease: motionConfig.ease.smooth,
  });
}

/*
 * ------------------------------------------------------------
 * RESOLVE
 * ------------------------------------------------------------
 *
 * Final subtle settling state.
 */

export function resolve(
  element: Element | string,
  duration = motionConfig.duration.standard
) {
  return gsap.to(element, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration,
    ease: motionConfig.ease.standard,
  });
}

/*
 * ------------------------------------------------------------
 * FADE IN UP
 * ------------------------------------------------------------
 *
 * Kept for compatibility with existing sections.
 */

export function fadeInUp(
  element: Element | string,
  delay = 0,
  duration = motionConfig.duration.standard
) {
  return gsap.fromTo(
    element,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: motionConfig.ease.standard,
    }
  );
}

/*
 * ------------------------------------------------------------
 * STAGGER CHILDREN
 * ------------------------------------------------------------
 */

export function staggerChildren(
  parent: Element | string,
  childSelector: string,
  stagger = motionConfig.stagger.standard,
  duration = motionConfig.duration.standard
) {
  return gsap.fromTo(
    `${typeof parent === 'string' ? parent : ''} ${childSelector}`,
    {
      y: 24,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: motionConfig.ease.standard,
    }
  );
}

/*
 * ------------------------------------------------------------
 * CLIP REVEAL
 * ------------------------------------------------------------
 */

export function clipReveal(
  element: Element | string,
  duration = motionConfig.duration.slow
) {
  return gsap.fromTo(
    element,
    {
      clipPath:
        'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      y: 40,
      opacity: 0,
    },
    {
      clipPath:
        'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      y: 0,
      opacity: 1,
      duration,
      ease: motionConfig.ease.reveal,
    }
  );
}

/*
 * ------------------------------------------------------------
 * LINE + LABEL SEQUENCE
 * ------------------------------------------------------------
 *
 * Useful for the FIG technical diagrams.
 */

export function technicalReveal(options: {
  line?: SVGGeometryElement | string;
  node?: Element | string;
  content?: Element | string;
  duration?: number;
}) {
  const {
    line,
    node,
    content,
    duration = motionConfig.duration.standard,
  } = options;

  const timeline = gsap.timeline();

  if (line) {
    timeline.add(
      trace(line, duration)
    );
  }

  if (node) {
    timeline.add(
      activate(node, motionConfig.duration.fast),
      '-=0.35'
    );
  }

  if (content) {
    timeline.add(
      assemble(content),
      '-=0.25'
    );
  }

  return timeline;
}

/*
 * ------------------------------------------------------------
 * NODE PULSE
 * ------------------------------------------------------------
 *
 * Subtle idle state for active technical nodes.
 */

export function pulse(
  element: Element | string,
  options: {
    scale?: number;
    duration?: number;
    repeat?: number;
  } = {}
) {
  const {
    scale = 1.04,
    duration = 1.8,
    repeat = -1,
  } = options;

  return gsap.to(element, {
    scale,
    duration,
    repeat,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

/*
 * ------------------------------------------------------------
 * SCENE TRANSITION
 * ------------------------------------------------------------
 *
 * DOM-side representation of a major cinematic scene change.
 * The actual 3D geometry transition will be handled by
 * UniverseScene.
 */

export function sceneTransition(
  from: Element | string,
  to: Element | string,
  options: {
    duration?: number;
    y?: number;
  } = {}
) {
  const {
    duration = motionConfig.duration.transformation,
    y = 25,
  } = options;

  const timeline = gsap.timeline();

  timeline.to(from, {
    opacity: 0,
    y: -y,
    duration: duration * 0.45,
    ease: motionConfig.ease.smooth,
  });

  timeline.fromTo(
    to,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration * 0.55,
      ease: motionConfig.ease.smooth,
    },
    `-=${duration * 0.15}`
  );

  return timeline;
}

/*
 * ------------------------------------------------------------
 * SCRUB TIMELINE
 * ------------------------------------------------------------
 *
 * Shared helper for scroll-driven cinematic sequences.
 */

export function scrubTimeline(
  trigger: string | Element,
  build: (timeline: gsap.core.Timeline) => void,
  options: {
    start?: string;
    end?: string;
    scrub?: number | boolean;
    pin?: boolean;
  } = {}
) {
  const {
    start = 'top top',
    end = 'bottom bottom',
    scrub = 1,
    pin = false,
  } = options;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      pin,
      invalidateOnRefresh: true,
    },
  });

  build(timeline);

  return timeline;
}

/*
 * ------------------------------------------------------------
 * MOTION STATES
 * ------------------------------------------------------------
 */

export const motionStates = {
  dormant: {
    opacity: 0,
    y: 18,
    scale: 0.985,
  },

  traced: {
    opacity: 1,
  },

  connected: {
    opacity: 1,
    scale: 1,
  },

  assembled: {
    opacity: 1,
    y: 0,
    scale: 1,
  },

  active: {
    opacity: 1,
    scale: 1.02,
  },

  resolved: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

/*
 * ------------------------------------------------------------
 * BACKWARDS-COMPATIBLE EXPORT
 * ------------------------------------------------------------
 *
 * Existing components can continue importing:
 *
 *   import { animations } from '../lib/animations'
 *
 * while the new V2 engine gets the richer named functions.
 */

export const animations = {
  trace,
  drawLine,

  connect,
  assemble,
  activate,
  transform,
  resolve,

  fadeInUp,
  staggerChildren,
  clipReveal,

  technicalReveal,
  pulse,
  sceneTransition,
  scrubTimeline,

  motionConfig,
  motionStates,
};

export default animations;
