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
} from '../components/sections';

import {
  ScrollProgress,
  CustomCursor,
} from '../components/ui';

import {
  usePageAnimations,
} from '../hooks/usePageAnimations';

export default function Home() {
  const mainRef =
    usePageAnimations();

  useEffect(() => {
    /*
     * Start the experience at the top only after
     * the initial browser paint.
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, []);

  return (
    <>
      {/* ---------------------------------------------------
          GLOBAL EXPERIENCE CHROME
          --------------------------------------------------- */}

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

        <Process />

        <Team />

        <WhyMajin />
      </main>

      <Footer />
    </>
  );
}
