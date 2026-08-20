'use client';

import React from 'react';

import {
  useGlobalState,
  getAccentVar,
} from '../../store/useGlobalState';

export function SceneEnvironment() {
  const activeAccent =
    useGlobalState(
      (state) => state.activeAccent
    );

  const accent =
    getAccentVar(activeAccent);

  return (
    <>
      {/* Base space */}
      <color
        attach="background"
        args={['#050607']}
      />

      {/* Atmospheric lighting */}
      <ambientLight
        intensity={0.22}
      />

      <directionalLight
        position={[
          8,
          7,
          5,
        ]}
        intensity={0.35}
        color="#FFFFFF"
      />

      <pointLight
        position={[
          4,
          1,
          4,
        ]}
        intensity={0.45}
        distance={18}
        color={accent}
      />

      <pointLight
        position={[
          -5,
          -2,
          -5,
        ]}
        intensity={0.12}
        distance={16}
        color="#4C5866"
      />

      {/* Depth atmosphere */}
      <fog
        attach="fog"
        args={[
          '#050607',
          9,
          25,
        ]}
      />

      {/* Scene-level environment data */}
      <group
        userData={{
          environment: 'MAJIN_UNIVERSE',
        }}
      />
    </>
  );
}
