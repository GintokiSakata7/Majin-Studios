'use client';

import React, { useState, useEffect } from 'react';
import { TechnicalLabel, HUDMarker } from '../ui';
import { jobPostings, JobPosting } from '../../data/careers';
import styles from './CareersSection.module.css';

type ModalTab = 'ALL' | 'OVERVIEW' | 'RESPONSIBILITIES' | 'REQUIREMENTS' | 'GAINS' | 'EVALUATION';

export function CareersSection() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<ModalTab>('ALL');
  const [filterDepartment, setFilterDepartment] = useState<string>('ALL');

  // Prevent background scroll when modal is open & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedJob(null);
      }
    };

    if (selectedJob) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setActiveModalTab('ALL');
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedJob]);

  const departments = ['ALL', 'Marketing', 'Business Development', 'Sales'];

  const filteredJobs =
    filterDepartment === 'ALL'
      ? jobPostings
      : jobPostings.filter((job) => job.department === filterDepartment);

  return (
    <section className={styles.section}>
      {/* Background ambient grid */}
      <div className={styles.gridBackground} />

      <div className="page-container relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-secondary hover:text-accent-current transition-colors uppercase group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>BACK TO HOME</span>
          </a>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-current animate-pulse" />
            <TechnicalLabel variant="accent">
              CAREERS & INTERNSHIPS · 2026
            </TechnicalLabel>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
            JOIN THE CORE ENGINE.
          </h1>

          <p className="mt-6 text-body-lg text-secondary leading-relaxed">
            Majin Studios is building intelligent systems, AI agents, and custom digital software.
            Work directly alongside our founding team, take real ownership of high-impact initiatives,
            and gain hands-on execution experience in a fast-moving technology startup.
          </p>

          {/* Quick Perks Bar */}
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-[11px] tracking-wider uppercase text-secondary">
            <span className="px-3 py-1.5 border border-line-structural bg-surface/60">
              🌍 Fully Remote
            </span>
            <span className="px-3 py-1.5 border border-line-structural bg-surface/60">
              ⏳ 2–3 Months Duration
            </span>
            <span className="px-3 py-1.5 border border-line-structural bg-surface/60">
              🕒 Flexible Hours
            </span>
            <span className="px-3 py-1.5 border border-line-structural bg-surface/60">
              🎯 Direct Founder Mentorship
            </span>
            <span className="px-3 py-1.5 border border-line-structural bg-surface/60">
              📜 Official Certificate
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-line-structural pb-4">
          <span className="font-mono text-xs text-secondary tracking-widest mr-2 uppercase">
            FILTER:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDepartment(dept)}
              className={[
                'px-3.5 py-1.5 font-mono text-xs tracking-wider uppercase transition-all duration-200 border',
                filterDepartment === dept
                  ? 'border-accent-current text-white bg-accent-current/10 shadow-[0_0_12px_rgba(var(--accent-current-rgb),0.3)]'
                  : 'border-line-structural text-secondary hover:border-line-active hover:text-white',
              ].join(' ')}
            >
              {dept === 'ALL' ? `ALL ROLES (${jobPostings.length})` : dept}
            </button>
          ))}
        </div>

        {/* Small Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={styles.jobCard}
            >
              <HUDMarker type="corner" top="-1px" left="-1px" />
              <HUDMarker type="corner" top="-1px" right="-1px" className="rotate-90" />
              <HUDMarker type="corner" bottom="-1px" left="-1px" className="-rotate-90" />
              <HUDMarker type="corner" bottom="-1px" right="-1px" className="rotate-180" />

              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent-current border border-accent-current/30 px-2.5 py-1 bg-accent-current/5">
                    {job.badge}
                  </span>
                  <span className="font-mono text-[10px] text-secondary tracking-widest uppercase">
                    {job.location}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white transition-colors">
                  {job.title}
                </h3>

                {/* Key Spec Badges */}
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] text-secondary tracking-wider uppercase">
                  <span className="bg-white/5 px-2 py-0.5 border border-line-structural">
                    ⏳ {job.duration}
                  </span>
                  <span className="bg-white/5 px-2 py-0.5 border border-line-structural">
                    💰 {job.stipend}
                  </span>
                  <span className="bg-white/5 px-2 py-0.5 border border-line-structural">
                    🎯 Incentives
                  </span>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm text-secondary leading-relaxed line-clamp-3">
                  {job.summary}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border border-line-structural font-mono text-[9px] tracking-wider uppercase text-secondary/80 bg-black/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-5 border-t border-line-structural/70 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(job);
                    setActiveModalTab('ALL');
                  }}
                  className={styles.secondaryButton}
                  style={{ flex: 1 }}
                >
                  View Description
                </button>

                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                >
                  <span>Apply</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Description Modal */}
      {selectedJob && (
        <div className={styles.modalOverlay}>
          {/* Backdrop click area */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setSelectedJob(null)}
          />

          <div
            role="dialog"
            aria-modal="true"
            className={styles.modalContainer}
          >
            <HUDMarker type="corner" top="-1px" left="-1px" />
            <HUDMarker type="corner" top="-1px" right="-1px" className="rotate-90" />
            <HUDMarker type="corner" bottom="-1px" left="-1px" className="-rotate-90" />
            <HUDMarker type="corner" bottom="-1px" right="-1px" className="rotate-180" />

            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent-current border border-accent-current/30 px-2 py-0.5 bg-accent-current/5">
                    {selectedJob.badge}
                  </span>
                  <span className="font-mono text-xs text-secondary tracking-widest uppercase">
                    MAJIN STUDIOS INTERNSHIP
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  {selectedJob.title}
                </h2>

                <div className="mt-2.5 flex flex-wrap gap-2 font-mono text-xs text-secondary tracking-wider uppercase">
                  <span>📍 {selectedJob.location}</span>
                  <span className="text-line-structural">•</span>
                  <span>⏳ {selectedJob.duration}</span>
                  <span className="text-line-structural">•</span>
                  <span>🕒 Flexible Hours</span>
                  <span className="text-line-structural">•</span>
                  <span>💰 {selectedJob.stipend} (Performance Incentives)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedJob.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                >
                  <span>APPLY NOW</span>
                  <span>↗</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="w-10 h-10 border border-line-structural hover:border-white text-secondary hover:text-white flex items-center justify-center font-mono text-lg transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Section Tabs */}
            <div className={styles.modalTabs}>
              <button
                type="button"
                onClick={() => setActiveModalTab('ALL')}
                className={`${styles.modalTab} ${activeModalTab === 'ALL' ? styles.modalTabActive : ''}`}
              >
                VIEW FULL DETAILS
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('OVERVIEW')}
                className={`${styles.modalTab} ${activeModalTab === 'OVERVIEW' ? styles.modalTabActive : ''}`}
              >
                01 · ABOUT & OVERVIEW
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('RESPONSIBILITIES')}
                className={`${styles.modalTab} ${activeModalTab === 'RESPONSIBILITIES' ? styles.modalTabActive : ''}`}
              >
                02 · WHAT YOU&apos;LL DO
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('REQUIREMENTS')}
                className={`${styles.modalTab} ${activeModalTab === 'REQUIREMENTS' ? styles.modalTabActive : ''}`}
              >
                03 · REQUIREMENTS
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('GAINS')}
                className={`${styles.modalTab} ${activeModalTab === 'GAINS' ? styles.modalTabActive : ''}`}
              >
                04 · WHAT YOU&apos;LL GAIN
              </button>
              {selectedJob.timeline && (
                <button
                  type="button"
                  onClick={() => setActiveModalTab('EVALUATION')}
                  className={`${styles.modalTab} ${activeModalTab === 'EVALUATION' ? styles.modalTabActive : ''}`}
                >
                  05 · INCENTIVES & TIMELINE
                </button>
              )}
            </div>

            {/* Modal Content Scrollable Area */}
            <div className={styles.modalBody}>
              {/* Quick Spec Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3.5 border border-line-structural bg-surface/30">
                  <span className="block text-[10px] text-secondary uppercase tracking-widest mb-1">
                    LOCATION
                  </span>
                  <span className="font-bold text-white uppercase">{selectedJob.location}</span>
                </div>

                <div className="p-3.5 border border-line-structural bg-surface/30">
                  <span className="block text-[10px] text-secondary uppercase tracking-widest mb-1">
                    DURATION
                  </span>
                  <span className="font-bold text-white uppercase">{selectedJob.duration}</span>
                </div>

                <div className="p-3.5 border border-line-structural bg-surface/30">
                  <span className="block text-[10px] text-secondary uppercase tracking-widest mb-1">
                    STIPEND
                  </span>
                  <span className="font-bold text-white uppercase">{selectedJob.stipend}</span>
                </div>

                <div className="p-3.5 border border-line-structural bg-surface/30">
                  <span className="block text-[10px] text-secondary uppercase tracking-widest mb-1">
                    INCENTIVES
                  </span>
                  <span className="font-bold text-accent-current uppercase">PERFORMANCE-BASED</span>
                </div>
              </div>

              {/* About Section */}
              {(activeModalTab === 'ALL' || activeModalTab === 'OVERVIEW') && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent-current mb-3 flex items-center gap-2">
                    <span>■</span> 01 · ABOUT MAJIN STUDIOS & THE ROLE
                  </h4>
                  <div className="bg-surface/30 border border-line-structural/80 p-5 text-white/90 space-y-3 leading-relaxed">
                    {selectedJob.about.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* What You'll Do */}
              {(activeModalTab === 'ALL' || activeModalTab === 'RESPONSIBILITIES') && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent-current mb-4 flex items-center gap-2">
                    <span>■</span> 02 · WHAT YOU&apos;LL DO
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedJob.responsibilities.map((group, idx) => (
                      <div
                        key={idx}
                        className="border border-line-structural p-5 bg-surface/20"
                      >
                        <h5 className="font-mono text-xs font-bold text-white tracking-wider uppercase mb-3 flex items-center gap-2">
                          <span className="text-accent-current">0{idx + 1}.</span> {group.category}
                        </h5>
                        <ul className="space-y-2 font-mono text-[11px] text-secondary">
                          {group.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2">
                              <span className="text-accent-current mt-0.5">›</span>
                              <span className="text-white/90">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {(activeModalTab === 'ALL' || activeModalTab === 'REQUIREMENTS') && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent-current mb-3 flex items-center gap-2">
                    <span>■</span> 03 · WHAT WE&apos;RE LOOKING FOR
                  </h4>
                  <div className="border border-line-structural p-5 bg-surface/20">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-[11px] text-secondary">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-current mt-1.5 flex-shrink-0" />
                          <span className="text-white/90">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* What You'll Gain */}
              {(activeModalTab === 'ALL' || activeModalTab === 'GAINS') && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent-current mb-3 flex items-center gap-2">
                    <span>■</span> 04 · WHAT YOU&apos;LL GAIN
                  </h4>
                  <div className="border border-line-structural p-5 bg-surface/20">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-[11px] text-secondary">
                      {selectedJob.gains.map((gain, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-accent-current font-bold">✓</span>
                          <span className="text-white/90">{gain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Timeline / Evaluation */}
              {selectedJob.timeline && (activeModalTab === 'ALL' || activeModalTab === 'EVALUATION') && (
                <div className="p-5 border border-line-active bg-accent-current/5">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent-current mb-2">
                    05 · PROGRAM STRUCTURE & PERFORMANCE INCENTIVES
                  </h4>
                  <p className="font-mono text-xs text-white/90 leading-relaxed">
                    {selectedJob.timeline}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Sticky Bottom Action Bar */}
            <div className={styles.modalFooter}>
              <div className="font-mono text-xs text-secondary text-center sm:text-left">
                Direct application via official Google Form · Applications reviewed on a rolling basis
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className={styles.secondaryButton}
                  style={{ flex: 1 }}
                >
                  Close
                </button>

                <a
                  href={selectedJob.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                  style={{ flex: 1 }}
                >
                  <span>APPLY FOR THIS ROLE</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
