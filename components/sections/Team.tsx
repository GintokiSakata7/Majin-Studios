'use client';

import React, {
  useState,
} from 'react';

import {
  SectionHeading,
  TechnicalLabel,
} from '../ui';

import {
  teamData,
} from '../../data/team';

import {
  useGlobalState,
} from '../../store/useGlobalState';

import {
  useMotionEngine,
} from '../../hooks/useMotionEngine';

const accents: Array<
  'LIME' |
  'CYAN' |
  'AMBER' |
  'VIOLET'
> = [
  'LIME',
  'CYAN',
  'AMBER',
  'VIOLET',
];

export function Team() {
  const containerRef =
    useMotionEngine();

  const {
    setAccent,
  } = useGlobalState();

  const [activeId, setActiveId] =
    useState(
      teamData[0]?.id ?? ''
    );

  const activeMember =
    teamData.find(
      (member) =>
        member.id === activeId
    ) ?? teamData[0];

  const activateMember = (
    id: string,
    fallbackIndex: number
  ) => {
    setActiveId(id);

    const member =
      teamData.find(
        (item) => item.id === id
      );

    setAccent(
      member?.accent === 'MONOCHROME'
        ? accents[
            fallbackIndex %
              accents.length
          ]
        : member?.accent ?? 'VIOLET'
    );
  };

  return (
    <section
      className="section relative min-h-[auto] md:min-h-screen py-16 md:py-32"
      id="studio"
    >
      <div
        ref={containerRef}
        className="page-container"
      >
        <div className="mb-20">
          <SectionHeading
            title="SIX PEOPLE. ONE BUILD SYSTEM."
            metadata="FIG. 06 — CORE TEAM"
          />
        </div>

        <div className="grid grid-cols-12 gap-8 min-h-[auto] md:min-h-[760px]">
          {/* MATRIX */}
          <div className="col-span-12 lg:col-span-8 relative min-h-[650px] border border-line-structural overflow-hidden hidden lg:block">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `
                  linear-gradient(
                    var(--line-structural) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    var(--line-structural) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize:
                  '48px 48px',
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              {/* Core */}
              <div
                className="relative w-48 h-48 rounded-full border border-line-active flex items-center justify-center"
                data-cursor="3d"
              >
                <div
                  className="absolute inset-6 rounded-full border border-accent-current opacity-45"
                />

                <div className="text-center">
                  <TechnicalLabel variant="accent">
                    MAJIN
                  </TechnicalLabel>

                  <div className="mt-2 text-os-value">
                    {activeMember?.role}
                  </div>
                </div>
              </div>

              {/* Connection field */}
              {teamData.map(
                (member, index) => {
                  const position =
                    member.matrixPosition ?? {
                      x: 0,
                      y: 0,
                    };

                  return (
                    <React.Fragment
                      key={
                        member.id
                      }
                    >
                      <div
                        className="absolute left-1/2 top-1/2 origin-left"
                        style={{
                          width: `${Math.max(
                            90,
                            Math.abs(position.x) * 260
                          )}px`,
                          transform: `translateY(-50%) rotate(${Math.atan2(
                            position.y,
                            position.x
                          ).toFixed(5)}rad)`,
                          opacity: activeId === member.id ? 1 : 0.35,
                        }}
                      >
                        <div
                          className="h-px bg-line-structural"
                        />
                      </div>

                      <button
                        type="button"
                        className="absolute"
                        style={{
                          left: `calc(50% + ${
                            position.x *
                            34
                          }%)`,
                          top: `calc(50% - ${
                            position.y *
                            34
                          }%)`,
                          transform:
                            'translate(-50%, -50%)',
                        }}
                        onMouseEnter={() =>
                          activateMember(
                            member.id,
                            index
                          )
                        }
                        onFocus={() =>
                          activateMember(
                            member.id,
                            index
                          )
                        }
                      >
                        <span
                          className={[
                            'flex items-center justify-center',
                            'w-12 h-12',
                            'border',
                            activeId ===
                            member.id
                              ? 'border-accent-current'
                              : 'border-line-active',
                            'bg-universe',
                            'transition-all duration-500',
                            activeId ===
                            member.id
                              ? 'scale-125 shadow-[0_0_24px_var(--accent-glow)]'
                              : '',
                          ].join(' ')}
                        >
                          <span
                            className={[
                              'w-1.5 h-1.5 rounded-full',
                              activeId ===
                              member.id
                                ? 'bg-accent-current'
                                : 'bg-line-active',
                            ].join(' ')}
                          />
                        </span>

                        <span className="block mt-2 text-os-label whitespace-nowrap">
                          {member.name}
                        </span>
                      </button>
                    </React.Fragment>
                  );
                }
              )}
            </div>
          </div>

          {/* ACTIVE MEMBER */}
          <div className="col-span-12 lg:col-span-4 hidden lg:flex flex-col justify-center">
            <TechnicalLabel variant="accent">
              ACTIVE TEAM
            </TechnicalLabel>

            <h3 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter uppercase whitespace-nowrap">
              {activeMember?.name}
            </h3>

            <div className="mt-4 text-lg sm:text-xl font-mono text-white tracking-widest uppercase opacity-90">
              {activeMember?.fullName}
            </div>

            <div className="mt-2 text-os-value text-accent-current">
              {activeMember?.role}
            </div>

            <p className="mt-6 text-body-lg text-secondary">
              {activeMember?.focus}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {activeMember?.specialties.map(
                (specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-2 border border-line-structural font-mono text-[9px] tracking-[0.12em] uppercase text-secondary"
                  >
                    {specialty}
                  </span>
                )
              )}
            </div>

            <div className="mt-10 flex gap-6">
              {activeMember?.linkedin && (
                <a
                  href={
                    activeMember.linkedin
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-os-label hover:text-accent-current transition-colors"
                >
                  LINKEDIN →
                </a>
              )}


            </div>
          </div>

          {/* MOBILE LIST */}
          <div className="col-span-12 flex flex-col gap-6 lg:hidden">
            {teamData.map((member) => (
              <div 
                key={member.id} 
                className="border border-line-structural border-l-[3px] p-6 bg-surface backdrop-blur-sm"
                style={{
                  '--accent-current': `var(--accent-${member.accent.toLowerCase()})`,
                  '--accent-text': `var(--accent-${member.accent.toLowerCase()})`,
                  borderLeftColor: `color-mix(in srgb, var(--accent-mono) 30%, transparent)`,
                } as React.CSSProperties}
              >
                <TechnicalLabel variant="accent">
                  {member.role}
                </TechnicalLabel>

                <h3 className="mt-4 text-4xl font-black leading-none tracking-tighter uppercase">
                  {member.name}
                </h3>

                <div className="mt-2 text-sm font-mono text-white tracking-widest uppercase opacity-90">
                  {member.fullName}
                </div>

                <p className="mt-4 text-body text-secondary">
                  {member.focus}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 border border-line-structural font-mono text-[9px] tracking-[0.12em] uppercase text-secondary"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {member.linkedin && (
                  <div className="mt-6">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-os-label hover:text-accent-current transition-colors"
                    >
                      LINKEDIN →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
