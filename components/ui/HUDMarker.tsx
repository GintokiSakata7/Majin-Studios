'use client';

import React from 'react';

import {
  getAccentVar,
  useGlobalState,
} from '../../store/useGlobalState';

interface HUDMarkerProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;

  type?: 'crosshair' | 'corner' | 'dot' | 'target';

  label?: string;

  className?: string;

  size?: number;
}

export function HUDMarker({
  top,
  left,
  right,
  bottom,

  type = 'crosshair',

  label,

  className = '',

  size = 16,
}: HUDMarkerProps) {
  const activeAccent = useGlobalState(
    (state) => state.activeAccent
  );

  const accent = getAccentVar(activeAccent);

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    top,
    left,
    right,
    bottom,
    color: accent,
    pointerEvents: 'none',
  };

  return (
    <div
      className={[
        'layer-hud',
        'flex',
        'items-center',
        'gap-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={positionStyle}
      aria-hidden="true"
    >
      {type === 'crosshair' && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 0V16M0 8H16"
            stroke="var(--line-active)"
            strokeWidth="0.8"
          />

          <circle
            cx="8"
            cy="8"
            r="1.75"
            fill={accent}
          />
        </svg>
      )}

      {type === 'target' && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle
            cx="8"
            cy="8"
            r="5.5"
            stroke="var(--line-active)"
            strokeWidth="0.8"
          />

          <circle
            cx="8"
            cy="8"
            r="1.8"
            fill={accent}
          />

          <path
            d="M8 0V3M8 13V16M0 8H3M13 8H16"
            stroke="var(--line-active)"
            strokeWidth="0.8"
          />
        </svg>
      )}

      {type === 'corner' && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M0 0H16M0 0V16"
            stroke="var(--line-active)"
            strokeWidth="0.8"
          />
        </svg>
      )}

      {type === 'dot' && (
        <span
          style={{
            display: 'block',
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: accent,
            boxShadow: `0 0 12px ${accent}`,
          }}
        />
      )}

      {label && (
        <span className="text-os-label">
          {label}
        </span>
      )}
    </div>
  );
}
