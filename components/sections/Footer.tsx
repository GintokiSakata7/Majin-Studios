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
              </div>
            </div>

            <div className={styles.formContainer}>
              <HUDMarker type="corner" top="-1px" left="-1px" />
              <HUDMarker type="corner" top="-1px" right="-1px" className="rotate-90" />
              <HUDMarker type="corner" bottom="-1px" left="-1px" className="-rotate-90" />
              <HUDMarker type="corner" bottom="-1px" right="-1px" className="rotate-180" />

              <div className="flex items-center justify-between border-b border-line-structural pb-2 mb-4">
                <OSLabel label="SYSTEM" value="CONTACT" />
              </div>

              {status === 'success' ? (
                <AgentTarget message="Message sent!<br/>Be sure to follow us on Instagram & LinkedIn." offsetX={-450} offsetY={0}>
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="text-4xl text-accent-current mb-4">✓</div>
                    <h3 className="text-display">MESSAGE SENT.</h3>
                    <p className="mt-4 text-body text-secondary max-w-md">
                      Thank you for reaching out. We have received your message and will get back to you shortly.
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
                      Ready to build your next system? Send us an outline of your project, requirements, or general inquiry.
                    </p>
                    
                    <AgentTarget id="footer-form" autoTrigger={false} block={true} message="Ready to build your next system?<br/>Fill out this form and we'll be in touch." offsetX={-450} offsetY={0}>
                      <form 
                        ref={formRef}
                        className="flex flex-col gap-6 w-full max-w-xl"
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
                          <label className={styles.label}>COMPANY / INDIVIDUAL</label>
                          <input type="text" className={styles.input} placeholder="Your company or just 'Individual'" name="company" />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.label}>MESSAGE</label>
                          <textarea required className={styles.textarea} placeholder="Describe your project, requirements, or inquiry..." name="query" />
                        </div>

                        <div className="mt-4">
                          <Button type="submit" disabled={status === 'submitting'} withArrow>
                            {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                          </Button>
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
          </div>

          <div
            className={styles.links}
          >
            <a
              href="#work"
              className={
                styles.link
              }
            >
              WORK
            </a>

            <a
              href="#studio"
              className={
                styles.link
              }
            >
              STUDIO
            </a>

            <a
              href="#contact"
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
