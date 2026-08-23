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
      className="section relative min-h-screen py-32"
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

        {/* =====================================================
            DESKTOP LAYOUT — interactive node matrix
            Hidden on mobile via CSS
            ===================================================== */}
        <div className="team-desktop-layout grid grid-cols-12 gap-8 min-h-[760px]">
          {/* MATRIX */}
          <div className="col-span-12 lg:col-span-8 relative min-h-[650px] border border-line-structural overflow-hidden">
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
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-center">
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
        </div>

        {/* =====================================================
            MOBILE LAYOUT — stacked member cards
            Shown only on mobile via CSS
            ===================================================== */}
        <div className="team-mobile-layout">
          <div className="team-mobile-grid">
            {teamData.map((member, index) => (
              <article
                key={member.id}
                className="team-mobile-card"
                onClick={() => activateMember(member.id, index)}
              >
                {/* Card top bar */}
                <div className="team-mobile-card-header">
                  <TechnicalLabel variant="accent">
                    {String(index + 1).padStart(2, '0')} / {teamData.length.toString().padStart(2, '0')}
                  </TechnicalLabel>
                  <span className="team-mobile-card-role">
                    {member.role}
                  </span>
                </div>

                {/* Name */}
                <h3 className="team-mobile-card-name">
                  {member.name}
                </h3>

                <p className="team-mobile-card-fullname">
                  {member.fullName}
                </p>

                {/* Focus */}
                {member.focus && (
                  <p className="team-mobile-card-focus">
                    {member.focus}
                  </p>
                )}

                {/* Specialties */}
                <div className="team-mobile-card-tags">
                  {member.specialties.map((s) => (
                    <span key={s} className="team-mobile-card-tag">
                      {s}
                    </span>
                  ))}
                </div>

                {/* LinkedIn */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-mobile-card-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    LINKEDIN →
                  </a>
                )}

                {/* Bottom accent line */}
                <div className="team-mobile-card-accent" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
