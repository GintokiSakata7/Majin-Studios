'use client';

import React, { useRef, useState } from 'react';
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
  const containerRef = useMotionEngine();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    setStatus('submitting');
    try {
      await emailjs.sendForm(
        'service_wmrsyml',
        'template_48fvrme',
        formRef.current,
        '8fJxCzFEsIZ75m-59'
      );
      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('idle');
      alert('Failed to send message. Please try again.');
    }
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
              <HUDMarker type="corner" top="-1px" left="-1px" />
              <HUDMarker type="corner" top="-1px" right="-1px" />
              <HUDMarker type="corner" bottom="-1px" left="-1px" />
              <HUDMarker type="corner" bottom="-1px" right="-1px" />

              <div className="flex items-center justify-between border-b border-line-structural pb-4 mb-8">
                <OSLabel
                  label="SYSTEM"
                  value="COMMUNICATIONS"
                />
              </div>

              {status === 'success' ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>✓</div>
                  <h3 className="mt-8 text-display">SYSTEM INITIALIZED.</h3>
                  <p className="mt-4 text-body text-secondary max-w-md">
                    Your project parameters have been captured. The Majin team can now review the system.
                  </p>
                  <div className="mt-8">
                    <Button variant="outline" onClick={() => setStatus('idle')}>
                      NEW SEQUENCE
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  <div className="motion-assemble">
                    <p className="text-body-lg text-secondary mb-8">
                      Ready to build your next system? Send us an outline of your project, requirements, or general inquiry.
                    </p>
                    
                    <form 
                      ref={formRef}
                      className="flex flex-col gap-6 w-full max-w-xl"
                      onSubmit={handleSubmit}
                    >
                      <div className={styles.field}>
                        <label className={styles.label}>USER.NAME</label>
                        <input required type="text" className={styles.input} placeholder="Your name" name="name" />
                      </div>
                      
                      <div className={styles.field}>
                        <label className={styles.label}>USER.EMAIL</label>
                        <input required type="email" className={styles.input} placeholder="you@company.com" name="email" />
                      </div>
                      
                      <div className={styles.field}>
                        <label className={styles.label}>COMPANY / INDIVIDUAL</label>
                        <input type="text" className={styles.input} placeholder="Your company or just 'Individual'" name="company" />
                      </div>
                      
                      <div className={styles.field}>
                        <label className={styles.label}>QUERY</label>
                        <textarea required className={styles.textarea} placeholder="Describe your project, requirements, or inquiry..." name="query" />
                      </div>

                      <div className="mt-4">
                        <Button type="submit" disabled={status === 'submitting'} withArrow>
                          {status === 'submitting' ? 'INITIALIZING...' : 'INITIALIZE COMMS'}
                        </Button>
                      </div>
                    </form>
                  </div>

                  <div className="motion-assemble border-t border-line-structural pt-8">
                    <TechnicalLabel variant="secondary">NETWORK PROTOCOLS</TechnicalLabel>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6">
                      <a href="https://linkedin.com/company/majinstudios" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-os-label hover:text-accent-current transition-colors group">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LINKEDIN
                      </a>
                      
                      <a href="https://instagram.com/majinstudios" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-os-label hover:text-accent-current transition-colors group">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        INSTAGRAM
                      </a>
                    </div>
                  </div>
                </div>
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
                    ONLINE
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex justify-between">
                  <OSLabel
                    label="NETWORK"
                    value="SECURE"
                    status="active"
                  />

                  <OSLabel
                    label="STATUS"
                    value="AWAITING PING"
                    status="neutral"
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
