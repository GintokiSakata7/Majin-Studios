'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useGlobalState } from '../../store/useGlobalState';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import styles from './Footer.module.css';

import {
  TechnicalLabel,
  HUDMarker,
  OSLabel,
  Button,
  AgentTarget
} from '../ui';

export function Footer() {
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const tourPlayed = useRef(false);
  const { setActiveTargetId, setAgentMessage } = useGlobalState();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tourPlayed.current) {
          tourPlayed.current = true;
          
          // Start the automated tour sequence
          setActiveTargetId('footer-form');
          
          setTimeout(() => {
            setActiveTargetId('footer-linkedin');
            setTimeout(() => {
              setActiveTargetId('footer-instagram');
              setTimeout(() => {
                setActiveTargetId('footer-mail');
                setTimeout(() => {
                  setActiveTargetId(null);
                  setAgentMessage(null);
                }, 3000);
              }, 3000);
            }, 3000);
          }, 4000);
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveTargetId, setAgentMessage]);

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
    <footer
      id="contact"
      className={styles.footer}
      ref={footerRef}
    >
      <div
        className={`page-container ${styles.container}`}
      >
        <div className={styles.brand}>
          <TechnicalLabel variant="accent">
            END OF SYSTEM / 2026
          </TechnicalLabel>

          <div className={styles.brandRow}>
            <div className={styles.brandLeft}>
              <Image
                src="/logo.jpg"
                alt="Majin Studios"
                width={800}
                height={200}
                className={styles.brandImage}
              />

              {/* 4 Studio Guarantees */}
              <div className={styles.guaranteesGrid}>
                <div className={styles.guaranteeCard}>
                  <div className={styles.guaranteeHeader}>
                    <span className={styles.guaranteeIcon}>✦</span>
                    <strong className={styles.guaranteeTitle}>Direct Founder Review</strong>
                  </div>
                  <p className={styles.guaranteeDesc}>Zero junior account managers. You collaborate directly with senior engineers from day one.</p>
                </div>

                <div className={styles.guaranteeCard}>
                  <div className={styles.guaranteeHeader}>
                    <span className={styles.guaranteeIcon}>✦</span>
                    <strong className={styles.guaranteeTitle}>Pragmatic Scope &amp; Tech</strong>
                  </div>
                  <p className={styles.guaranteeDesc}>We prioritize what is worth building first to eliminate wasted engineering and decorative complexity.</p>
                </div>

                <div className={styles.guaranteeCard}>
                  <div className={styles.guaranteeHeader}>
                    <span className={styles.guaranteeIcon}>✦</span>
                    <strong className={styles.guaranteeTitle}>Full IP Ownership</strong>
                  </div>
                  <p className={styles.guaranteeDesc}>Strict mutual NDA upfront. You retain 100% intellectual property ownership of all source code.</p>
                </div>

                <div className={styles.guaranteeCard}>
                  <div className={styles.guaranteeHeader}>
                    <span className={styles.guaranteeIcon}>✦</span>
                    <strong className={styles.guaranteeTitle}>Fast Sprint Cadence</strong>
                  </div>
                  <p className={styles.guaranteeDesc}>From agreed brief to verified production staging checkpoints in focused 4-week sprint cycles.</p>
                </div>
              </div>

              <div className={styles.brandContact}>
                <AgentTarget id="footer-linkedin" autoTrigger={false} message="Follow us on LinkedIn for updates!" offsetX={15}>
                  <a
                    href="https://www.linkedin.com/company/majin-studios"
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LINKEDIN
                  </a>
                </AgentTarget>

                <AgentTarget id="footer-instagram" autoTrigger={false} message="Follow us on Instagram!" offsetX={15}>
                  <a
                    href="https://www.instagram.com/majin_studios/"
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    INSTAGRAM
                  </a>
                </AgentTarget>

                <AgentTarget id="footer-mail" autoTrigger={false} message="Have a query? Mail us directly." offsetX={15}>
                  <a
                    href="mailto:hello@majin.studio"
                    className={styles.link}
                  >
                    HELLO@MAJIN.STUDIO
                  </a>
                </AgentTarget>

                <a
                  href="https://www.linkedin.com/in/dhanush0254"
                  className={styles.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  FOUNDER: DHANUSH ↗
                </a>
              </div>
            </div>

            <div className={styles.formContainer}>
              <HUDMarker type="corner" top="-1px" left="-1px" />
              <HUDMarker type="corner" top="-1px" right="-1px" className="rotate-90" />
              <HUDMarker type="corner" bottom="-1px" left="-1px" className="-rotate-90" />
              <HUDMarker type="corner" bottom="-1px" right="-1px" className="rotate-180" />

              <div className="flex items-center justify-between border-b border-line-structural pb-2 mb-4">
                <OSLabel label="SYSTEM" value="CONTACT" />
                <span className={styles.formEstimatePill}>~ 2 MIN INTAKE</span>
              </div>

              {status === 'success' ? (
                <AgentTarget message="Message sent!<br/>Be sure to follow us on Instagram & LinkedIn." offsetX={-450} offsetY={0}>
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="text-4xl text-accent-current mb-4">✓</div>
                    <h3 className="text-display">MESSAGE SENT.</h3>
                    <p className="mt-4 text-body text-secondary max-w-md">
                      Thank you for reaching out. We have received your message and will review your project details and get back to you within 24 hours.
                    </p>
                    <div className="mt-8">
                      <Button variant="outline" onClick={() => setStatus('idle')}>
                        SEND ANOTHER MESSAGE
                      </Button>
                    </div>
                  </div>
                </AgentTarget>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-body text-secondary mb-4">
                      Have a project in mind? Send us an outline of what you&apos;re trying to build or scale. We review every brief personally within 24 hours.
                    </p>
                    
                    <AgentTarget id="footer-form" autoTrigger={false} block={true} message="Ready to build your next system?<br/>Fill out this form and we'll be in touch." offsetX={-450} offsetY={0}>
                      <form 
                        ref={formRef}
                        className="flex flex-col gap-5 w-full max-w-xl"
                        onSubmit={handleSubmit}
                      >
                        <div className={styles.field}>
                          <label className={styles.label}>NAME</label>
                          <input required type="text" className={styles.input} placeholder="Your name" name="name" />
                        </div>
                        
                        <div className={styles.field}>
                          <label className={styles.label}>EMAIL</label>
                          <input required type="email" className={styles.input} placeholder="you@company.com" name="email" />
                        </div>
                        
                        <div className={styles.field}>
                          <label className={styles.label}>COMPANY / PROJECT (OPTIONAL)</label>
                          <input type="text" className={styles.input} placeholder="Company or project name" name="company" />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.label}>WHAT CAN WE HELP WITH?</label>
                          <select className={styles.select} name="service" defaultValue="">
                            <option value="" disabled>Choose a service area (optional)</option>
                            <option value="Digital products & web apps">Digital products &amp; web apps</option>
                            <option value="Software, AI & automation">Software, AI &amp; automation</option>
                            <option value="Brand & creative design">Brand &amp; creative design</option>
                            <option value="Digital marketing & growth">Digital marketing &amp; growth</option>
                            <option value="Custom architecture / not sure yet">Custom architecture / not sure yet</option>
                          </select>
                        </div>

                        <div className={styles.field}>
                          <label className={styles.label}>TELL US ABOUT THE PROJECT</label>
                          <textarea required className={styles.textarea} placeholder="What problem are you trying to solve or build?" name="query" />
                        </div>

                        <div className="mt-2">
                          <Button type="submit" disabled={status === 'submitting'} withArrow>
                            {status === 'submitting' ? 'SENDING ENQUIRY...' : 'SEND PROJECT ENQUIRY'}
                          </Button>
                          <p className={styles.privacyNote}>
                            ✦ Strict mutual NDA upfront. Your project details remain 100% confidential.
                          </p>
                        </div>
                      </form>
                    </AgentTarget>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={styles.services}
          >
            <span>
              AI SYSTEMS
            </span>

            <span
              className={styles.dot}
            />

            <span>
              AI AGENTS
            </span>

            <span
              className={styles.dot}
            />

            <span>
              DIGITAL PRODUCTS
            </span>

            <span
              className={styles.dot}
            />

            <span>
              CUSTOM SOFTWARE
            </span>
          </div>
        </div>

        <div
          className={styles.bottom}
        >
          <div
            className={styles.meta}
          >
            <span>
              HYDERABAD · INDIA
            </span>

            <span>
              BUILDING INTELLIGENT SYSTEMS
            </span>

            <span>
              FOUNDER: <a href="https://www.linkedin.com/in/dhanush0254" target="_blank" rel="noopener noreferrer" className="hover:text-accent-current transition-colors underline decoration-line-structural underline-offset-4">DHANUSH</a>
            </span>
          </div>

          <div
            className={styles.links}
          >
            <a
              href="/#work"
              className={
                styles.link
              }
            >
              WORK
            </a>

            <a
              href="/join-us"
              className={
                styles.link
              }
            >
              JOIN US
            </a>

            <a
              href="/#contact"
              className={
                styles.link
              }
            >
              CONTACT
            </a>
          </div>

          <div
            className={`${styles.meta} ${styles.right}`}
          >

            <span>
              © {new Date().getFullYear()} MAJIN STUDIOS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
