'use client';

import React from 'react';

import styles from './Work.module.css';

import {
  SectionHeading,
  TechnicalLabel,
  Button,
  ProductDashboard,
} from '../ui';

import {
  projectsData,
} from '../../data/projects';

import {
  useMotionEngine,
} from '../../hooks/useMotionEngine';

export function Work() {
  const containerRef =
    useMotionEngine();

  return (
    <section
      className={`section relative pt-32 ${styles.section}`}
      id="work"
    >
      <div
        ref={containerRef}
        className="page-container"
      >
        <div className="mb-24">
          <SectionHeading
            title="SELECTED SYSTEMS."
            metadata="FIG. 04 — PRODUCTS / CASE STUDIES"
          />
        </div>

        <div className={styles.projectList}>
          {projectsData.map(
            (project) => (
              <article
                key={project.id}
                className={styles.project}
              >
                <div
                  className={`${styles.meta} motion-assemble`}
                >
                  <TechnicalLabel>
                    {project.number}
                  </TechnicalLabel>

                  <TechnicalLabel variant="secondary">
                    {project.category}
                  </TechnicalLabel>

                  <TechnicalLabel variant="accent">
                    {project.status}
                  </TechnicalLabel>
                </div>

                <div
                  className={`${styles.content} motion-assemble`}
                >
                  <TechnicalLabel variant="accent">
                    SYS / {project.number}
                  </TechnicalLabel>

                  <h2
                    className={
                      styles.title
                    }
                  >
                    {project.name}
                  </h2>

                  <p
                    className={`text-body-lg ${styles.tagline}`}
                  >
                    {project.tagline}
                  </p>

                  <p className="mt-5 text-body text-secondary max-w-lg">
                    {project.solution}
                  </p>

                  {project.metrics &&
                    project.metrics.length >
                      0 && (
                      <div
                        className={
                          styles.metrics
                        }
                      >
                        {project.metrics.map(
                          (metric) => (
                            <div
                              key={
                                metric.label
                              }
                            >
                              <div
                                className={
                                  styles.metricValue
                                }
                              >
                                {
                                  metric.value
                                }
                              </div>

                              <div
                                className={
                                  styles.metricLabel
                                }
                              >
                                {
                                  metric.label
                                }
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}

                  {project.isConcept && (
                    <div
                      className={
                        styles.conceptNote
                      }
                    >
                      CONCEPT / SIMULATED DATA
                    </div>
                  )}

                  <div className="mt-8">
                    <Button
                      href={`#project-${project.id}`}
                      variant="outline"
                      withArrow
                    >
                      VIEW SYSTEM
                    </Button>
                  </div>
                </div>

                <div
                  id={`project-${project.id}`}
                  className={`${styles.visual} motion-assemble`}
                >
                  <div
                    className={
                      styles.visualGlow
                    }
                  />

                  <div
                    className={
                      styles.visualGrid
                    }
                  />

                  <div className="relative z-10 w-full h-full flex items-center justify-center p-0 sm:p-8 overflow-hidden">
                    <div className="w-[800px] h-full origin-center scale-[0.4] sm:scale-100 sm:w-full flex items-center justify-center">
                      <ProductDashboard
                        className="w-full max-w-[1000px]"
                      />
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 z-20">
                    <TechnicalLabel variant="secondary">
                      VISUAL / MATERIALIZATION
                    </TechnicalLabel>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
