'use client';

import React from 'react';

import styles from './TeamCard.module.css';

import { TechnicalLabel } from './TechnicalLabel';

export interface TeamMemberProps {
  name: string;

  role: string;

  specialties: string[];

  linkedin?: string;


  focus?: string;

  accent?: string;

  className?: string;
}

export function TeamCard({
  name,

  role,

  specialties,

  linkedin,


  focus,

  accent,

  className = '',
}: TeamMemberProps) {
  const isPlaceholder =
    name.includes('TBD') ||
    name.includes('Member');

  return (
    <article
      className={[
        styles.card,
        isPlaceholder
          ? styles.placeholder
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-cursor="interactive"
      data-accent={accent}
    >
      <div className={styles.header}>
        <div
          className={
            styles.portraitPlaceholder
          }
        >
          <div
            className={styles.portraitGrid}
          />

          <span
            className={
              styles.portraitCorner
            }
          />

          <span
            className={
              styles.portraitCorner
            }
            style={{
              top: 0,
              right: 0,
            }}
          />

          <span
            className={
              styles.portraitCorner
            }
            style={{
              bottom: 0,
              left: 0,
            }}
          />

          <span
            className={
              styles.portraitCorner
            }
            style={{
              bottom: 0,
              right: 0,
            }}
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>
            {name}
          </h3>

          <TechnicalLabel
            variant="accent"
          >
            {role}
          </TechnicalLabel>
        </div>
      </div>

      <div className={styles.divider} />

      {focus && (
        <p className="text-body-sm mb-5">
          {focus}
        </p>
      )}

      <div className={styles.specialties}>
        {specialties.map(
          (specialty) => (
            <span
              key={specialty}
              className={styles.specialty}
            >
              <span
                className={styles.dot}
              />

              {specialty}
            </span>
          )
        )}
      </div>

      {linkedin && (
        <div className={styles.links}>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LINKEDIN →
          </a>
        </div>
      )}
    </article>
  );
}
