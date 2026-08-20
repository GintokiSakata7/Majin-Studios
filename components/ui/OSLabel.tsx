'use client';

import React from 'react';

import {
  getAccentVar,
  useGlobalState,
} from '../../store/useGlobalState';

interface OSLabelProps {
  label: string;

  value: string;

  status?:
    | 'neutral'
    | 'active'
    | 'alert';

  className?: string;
}

export function OSLabel({
  label,

  value,

  status = 'neutral',

  className = '',
}: OSLabelProps) {
  const activeAccent =
    useGlobalState(
      (state) => state.activeAccent
    );

  const getValueColor = () => {
    if (status === 'active') {
      return getAccentVar(activeAccent);
    }

    if (status === 'alert') {
      return getAccentVar('AMBER');
    }

    return 'var(--text-primary)';
  };

  return (
    <div
      className={[
        'flex',
        'flex-col',
        'gap-1',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="text-os-label">
        {label}
      </span>

      <span
        className="text-os-value"
        style={{
          color: getValueColor(),
        }}
      >
        {value}
      </span>
    </div>
  );
}
