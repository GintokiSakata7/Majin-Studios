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
