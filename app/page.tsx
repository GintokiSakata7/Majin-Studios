'use client';

import {
  useEffect,
} from 'react';

import {
  UniverseScene,
} from '../components/three';

import {
  Navigation,
  Hero,
  Capabilities,
  Systems,
  Work,
  Process,
  Team,
  WhyMajin,
  Footer,
  Tools,
} from '../components/sections';

import {
  ScrollProgress,
  CustomCursor,
  BootLoader,
  GlobalAgent,
} from '../components/ui';

import {
  usePageAnimations,
} from '../hooks/usePageAnimations';

import { useGlobalState } from '../store/useGlobalState';

export default function Home() {
  const mainRef = usePageAnimations();
  const { hasBooted } = useGlobalState();

  useEffect(() => {
    /*
     * Start the experience at the top only after
     * the initial browser paint, unless there is a hash fragment.
     */
    if (!window.location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    } else {
      setTimeout(() => {
        const id = window.location.hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // slight delay to let DOM render
    }
  }, []);

  // Control body scrolling based on boot sequence
  useEffect(() => {
    if (!hasBooted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasBooted]);

  return (
    <>
      {/* ---------------------------------------------------
          GLOBAL EXPERIENCE CHROME
          --------------------------------------------------- */}

      <BootLoader />
      <GlobalAgent />

      <CustomCursor />

      <ScrollProgress />

      <Navigation />

      {/* ---------------------------------------------------
          PERSISTENT WEBGL UNIVERSE
          --------------------------------------------------- */}

      <UniverseScene />

      {/* ---------------------------------------------------
          SEMANTIC DOM STORY
          --------------------------------------------------- */}

      <main
        ref={mainRef}
        className="layer-dom"
      >
        <Hero />

        <Capabilities />

        <Systems />

        {/*
         * Dedicated AGENTS experience can be inserted here
         * once the Agents section is implemented.
         */}

        <Work />
        
        <Tools />

        <Process />

        <Team />

        <WhyMajin />
      </main>

      <Footer />
    </>
  );
}
