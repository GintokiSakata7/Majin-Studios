'use client';

import React from 'react';

import {
  Html,
} from '@react-three/drei';

import {
  useGlobalState,
  getAccentVar,
} from '../../store/useGlobalState';

interface LabelProps {
  position: [
    number,
    number,
    number
  ];

  text: string;

  accent?: boolean;
}

function Label({
  position,
  text,
  accent = false,
}: LabelProps) {
  const activeAccent =
    useGlobalState(
      (state) => state.activeAccent
    );

  return (
    <Html
      position={position}
      center
      distanceFactor={9}
      transform
      sprite
      zIndexRange={[
        10,
        0,
      ]}
      pointerEvents="none"
    >
      <span
        style={{
          display: 'block',

          fontFamily:
            'var(--font-mono)',

          fontSize:
            '9px',

          lineHeight: 1,

          letterSpacing:
            '0.14em',

          textTransform:
            'uppercase',

          whiteSpace:
            'nowrap',

          color: accent
            ? getAccentVar(
                activeAccent
              )
            : 'rgba(184, 192, 202, 0.62)',

          textShadow: accent
            ? `0 0 10px ${getAccentVar(
                activeAccent
              )}`
            : 'none',

          userSelect:
            'none',
        }}
      >
        {text}
      </span>
    </Html>
  );
}

export function TechLabels3D() {
  const { currentScene } =
    useGlobalState();

  return (
    <group>
      <Label
        position={[
          2.6,
          2.15,
          0,
        ]}
        text="SYS / 001"
        accent
      />

      <Label
        position={[
          2.6,
          -2.15,
          0,
        ]}
        text={`STATE / ${currentScene}`}
        accent
      />

      <Label
        position={[
          -1.8,
          3.15,
          -1.8,
        ]}
        text="NODE / AI"
      />

      <Label
        position={[
          5.7,
          2.65,
          -3.3,
        ]}
        text="NODE / AGENTS"
        accent={
          currentScene === 'AGENTS'
        }
      />

      <Label
        position={[
          0.1,
          -3.55,
          -1.3,
        ]}
        text="NODE / PRODUCTS"
        accent={
          currentScene === 'PRODUCTS'
        }
      />

      {currentScene ===
        'AGENTS' && (
        <Label
          position={[
            0,
            -3.8,
            0,
          ]}
          text="EXECUTION / ACTIVE"
          accent
        />
      )}
    </group>
  );
}
