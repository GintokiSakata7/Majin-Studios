'use client';

import React, {
  useState,
} from 'react';
import emailjs from '@emailjs/browser';

import styles from './Contact.module.css';

import {
  SectionHeading,
  Button,
  OSLabel,
  HUDMarker,
  TechnicalLabel,
} from '../ui';

import {
  useMotionEngine,
} from '../../hooks/useMotionEngine';

export function Contact() {
  const containerRef =
    useMotionEngine();

  const [step, setStep] =
    useState(1);

  const [status, setStatus] =
    useState<
      'idle' |
      'submitting' |
      'success'
    >('idle');

  const [projectType, setProjectType] =
    useState('AI SYSTEM');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (step < 3) {
      setStep(
        (current) =>
          current + 1
      );

      return;
    }

    setStatus('submitting');

    try {
      await emailjs.send(
        'service_wmrsyml',
        'YOUR_TEMPLATE_ID',
        {
          project_type: projectType,
          description: description,
          user_name: name,
          user_email: email,
          company: company,
          budget: budget,
          timeline: timeline,
        },
        'YOUR_PUBLIC_KEY'
      );
      setStatus('success');
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  const reset =
    () => {
      setStatus('idle');
      setStep(1);
    };

  return (
    <section
      id="contact"
      className={styles.section}
    >
      <div
        ref={containerRef}
        className="page-container"
      >
        <div
          className={styles.wrapper}
        >
          <div className="mb-16">
            <SectionHeading
              title="WHAT ARE YOU BUILDING?"
              metadata="FIG. 07 — PROJECT INITIALIZATION"
            />
          </div>

          <div className={styles.content}>
            <div
              className={`${styles.form} motion-assemble`}
            >
              <HUDMarker
                type="corner"
                top="-1px"
                left="-1px"
              />

              <HUDMarker
                type="corner"
                top="-1px"
                right="-1px"
              />

              <HUDMarker
                type="corner"
                bottom="-1px"
                left="-1px"
              />

              <HUDMarker
                type="corner"
                bottom="-1px"
                right="-1px"
              />

              <div className="flex items-center justify-between border-b border-line-structural pb-4 mb-8">
                <OSLabel
                  label="SYSTEM"
                  value="INITIALIZATION"
                />

                <OSLabel
                  label="STEP"
                  value={`0${step}/03`}
                  status="active"
                />
              </div>

              {status === 'success' ? (
                <div
                  className={
                    styles.success
                  }
                >
                  <div
                    className={
                      styles.successIcon
                    }
                  >
                    ✓
                  </div>

                  <h3 className="mt-8 text-display">
                    SYSTEM INITIALIZED.
                  </h3>

                  <p className="mt-4 text-body text-secondary max-w-md">
                    Your project parameters have
                    been captured. The Majin team
                    can now review the system.
                  </p>

                  <div className="mt-8">
                    <Button
                      variant="outline"
                      onClick={reset}
                    >
                      NEW SEQUENCE
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={
                    handleSubmit
                  }
                >
                  {step === 1 && (
                    <div
                      className="motion-assemble"
                    >
                      <div
                        className={
                          styles.field
                        }
                      >
                        <label
                          className={
                            styles.label
                          }
                        >
                          PROJECT.TYPE
                        </label>

                        <select
                          className={
                            styles.select
                          }
                          value={
                            projectType
                          }
                          onChange={(
                            event
                          ) =>
                            setProjectType(
                              event.target
                                .value
                            )
                          }
                        >
                          <option>
                            AI SYSTEM
                          </option>

                          <option>
                            AGENT ARCHITECTURE
                          </option>

                          <option>
                            DIGITAL PRODUCT
                          </option>

                          <option>
                            CUSTOM SOFTWARE
                          </option>
                        </select>
                      </div>

                      <div
                        className={
                          styles.field
                        }
                      >
                        <label
                          className={
                            styles.label
                          }
                        >
                          PROJECT.DESCRIPTION
                        </label>

                        <textarea
                          required
                          className={
                            styles.textarea
                          }
                          placeholder="Describe the problem, product, or system you want to build..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div
                      className="motion-assemble"
                    >
                      <div
                        className={
                          styles.field
                        }
                      >
                        <label
                          className={
                            styles.label
                          }
                        >
                          USER.NAME
                        </label>

                        <input
                          required
                          type="text"
                          className={
                            styles.input
                          }
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div
                        className={
                          styles.field
                        }
                      >
                        <label
                          className={
                            styles.label
                          }
                        >
                          USER.EMAIL
                        </label>

                        <input
                          required
                          type="email"
                          className={
                            styles.input
                          }
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div
                        className={
                          styles.field
                        }
                      >
                        <label
                          className={
                            styles.label
                          }
                        >
                          COMPANY / INDIVIDUAL
                        </label>

                        <input
                          type="text"
                          className={
                            styles.input
                          }
                          placeholder="Your company or just 'Individual'"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div
                      className="motion-assemble"
                    >
                      <div
                        className={
                          styles.status
                        }
                      >
                        <div
                          className={
                            styles.field
                          }
                        >
                          <label
                            className={
                              styles.label
                            }
                          >
                            BUDGET
                          </label>

                          <select
                            className={
                              styles.select
                            }
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                          >
                            <option>
                              SELECT
                            </option>

                            <option>
                              &lt;$10K
                            </option>

                            <option>
                              $10K–$25K
                            </option>

                            <option>
                              $25K–$50K
                            </option>

                            <option>
                              $50K+
                            </option>
                          </select>
                        </div>

                        <div
                          className={
                            styles.field
                          }
                        >
                          <label
                            className={
                              styles.label
                            }
                          >
                            TIMELINE
                          </label>

                          <select
                            className={
                              styles.select
                            }
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                          >
                            <option>
                              SELECT
                            </option>

                            <option>
                              1–3 MONTHS
                            </option>

                            <option>
                              3–6 MONTHS
                            </option>

                            <option>
                              6+ MONTHS
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-5">
                        <TechnicalLabel variant="accent">
                          TYPE /{' '}
                          {projectType}
                        </TechnicalLabel>
                      </div>
                    </div>
                  )}

                  <div className="mt-10 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        className="text-os-label hover:text-accent-current transition-colors"
                        onClick={() =>
                          setStep(
                            (value) =>
                              value - 1
                          )
                        }
                      >
                        ← PREVIOUS
                      </button>
                    ) : (
                      <span />
                    )}

                    <Button
                      type="submit"
                      disabled={
                        status ===
                        'submitting'
                      }
                      withArrow
                    >
                      {status ===
                      'submitting'
                        ? 'INITIALIZING...'
                        : step < 3
                          ? 'CONTINUE SEQUENCE'
                          : 'INITIALIZE PROJECT'}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div
              className={`${styles.sequence} motion-assemble`}
            >
              <div
                className={
                  styles.sequenceGrid
                }
              />

              <div className="absolute top-6 left-6">
                <TechnicalLabel variant="accent">
                  SYSTEM SCHEMATIC
                </TechnicalLabel>
              </div>

              {/* Architecture connectors */}
              <div
                className={
                  styles.connection
                }
                style={{
                  width: '40%',
                  left: '12%',
                  top: '37%',
                  transform:
                    'rotate(15deg)',
                }}
              />

              <div
                className={
                  styles.connection
                }
                style={{
                  width: '32%',
                  right: '12%',
                  top: '60%',
                  transform:
                    'rotate(-15deg)',
                }}
              />

              <div
                className={
                  styles.connection
                }
                style={{
                  width: '28%',
                  left: '36%',
                  top: '58%',
                  transform:
                    'rotate(90deg)',
                }}
              />

              <div
                className={
                  styles.sequenceCore
                }
                data-cursor="3d"
              >
                <div className="text-center">
                  <TechnicalLabel variant="accent">
                    MAJIN CORE
                  </TechnicalLabel>

                  <div className="mt-2 text-os-value">
                    {status ===
                    'success'
                      ? 'READY'
                      : 'BUILDING'}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex justify-between">
                  <OSLabel
                    label="PROJECT"
                    value={
                      status ===
                      'success'
                        ? 'INITIALIZED'
                        : projectType
                    }
                    status={
                      status ===
                      'success'
                        ? 'active'
                        : 'neutral'
                    }
                  />

                  <OSLabel
                    label="PHASE"
                    value={
                      status ===
                      'success'
                        ? 'COMPLETE'
                        : `0${step}/03`
                    }
                    status="active"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
