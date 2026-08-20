'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGlobalState, WhyStage } from '../../store/useGlobalState';
import { TechnicalLabel } from '../ui';
import styles from './WhyMajin.module.css';

const REASONS = [
  {
    id: 'systems',
    number: '01',
    title: 'WE THINK IN SYSTEMS.',
    description: 'Not isolated features. We consider the product, architecture, intelligence, and infrastructure as one continuous pipeline. Because a great interface fails if the data model doesn\'t support it, and a powerful AI fails if the UX doesn\'t guide it.',
  },
  {
    id: 'production',
    number: '02',
    title: 'WE BUILD FOR PRODUCTION.',
    description: 'Not just proofs of concept. Our background is in shipping enterprise software and complex platforms. We engineer for reliability, latency, scale, and maintainability from day one.',
  },
  {
    id: 'workflows',
    number: '03',
    title: 'WE DESIGN AGENTIC WORKFLOWS.',
    description: 'Not basic wrappers. We go beyond simple chat interfaces. We design architectures where LLMs have memory, tools, planning capabilities, and autonomous execution loops to solve actual business problems.',
  },
  {
    id: 'studio',
    number: '04',
    title: 'WE ARE AN ENGINEERING STUDIO.',
    description: 'Not a generic agency. We don\'t farm out work or use off-the-shelf templates. You work directly with senior engineers who understand both the deep technical constraints and the product vision.',
  },
];

export function WhyMajin() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statementsRef = useRef<HTMLDivElement>(null);
  
  const { setWhyStage } = useGlobalState();
  const [activeId, setActiveId] = useState<string>('systems');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const statements = gsap.utils.toArray<HTMLElement>('.why-statement');

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        
        let nextStage: WhyStage = 'systems';
        
        if (p < 0.25) {
          nextStage = 'systems';
        } else if (p < 0.50) {
          nextStage = 'production';
        } else if (p < 0.75) {
          nextStage = 'workflows';
        } else {
          nextStage = 'studio';
        }

        setWhyStage(nextStage);
        setActiveId(nextStage);

        statements.forEach((el, i) => {
          const segmentSize = 0.25;
          const peak = i * segmentSize + (segmentSize / 2);
          const distance = Math.abs(p - peak);
          
          let opacity = 0;
          let y = 30;

          // Crossfade radius
          const fadeRadius = segmentSize * 0.8;

          if (distance < fadeRadius) {
             const normalizedDist = distance / fadeRadius; // 0 (center) to 1 (edge)
             
             // Smooth easing for opacity (sine wave)
             opacity = Math.cos(normalizedDist * Math.PI / 2);
             
             // Y transform
             const direction = p < peak ? 1 : -1;
             y = direction * (normalizedDist * 40);
          }

          gsap.set(el, { 
            opacity, 
            y,
            visibility: opacity > 0.01 ? 'visible' : 'hidden',
            pointerEvents: opacity > 0.8 ? 'auto' : 'none'
          });
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setWhyStage]);

  return (
    <section ref={sectionRef} id="why-majin" className={styles.section}>
      <div ref={containerRef} className={styles.viewport}>
        <div ref={statementsRef}>
          {REASONS.map((reason) => (
            <div 
              key={reason.id} 
              className={`why-statement ${styles.statement}`}
              style={{ opacity: 0, visibility: 'hidden' }}
            >
              <h2 className={styles.statementText}>
                {reason.title}
              </h2>
              {reason.description && (
                <div className={styles.subline}>
                  <div style={{ marginBottom: '12px' }}>
                    <TechnicalLabel variant="default">
                      {reason.number} — {reason.id.toUpperCase()}
                    </TechnicalLabel>
                  </div>
                  <p>{reason.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.progress}>
          {REASONS.map((reason) => (
            <div 
              key={`prog-${reason.id}`} 
              className={
                activeId === reason.id 
                  ? `${styles.progressItem} ${styles.progressItemActive}` 
                  : styles.progressItem
              } 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
