'use client';

import React, { useEffect, useRef, useId } from 'react';
import { useGlobalState } from '../../store/useGlobalState';

interface AgentTargetProps {
  children: React.ReactNode;
  message: string;
  className?: string;
  offsetX?: number;
  offsetY?: number;
  vanishAfterMs?: number;
  id?: string;
  block?: boolean;
  autoTrigger?: boolean;
}

export function AgentTarget({ 
  children, 
  message, 
  className = '',
  offsetX = 0,
  offsetY = 0,
  vanishAfterMs,
  id: customId,
  block = false,
  autoTrigger = true
}: AgentTargetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const id = customId || generatedId;
  const { registerTarget, unregisterTarget, setActiveTargetId } = useGlobalState();

  useEffect(() => {
    if (containerRef.current) {
      registerTarget(id, containerRef.current, message, offsetX, offsetY, vanishAfterMs);
    }
    return () => unregisterTarget(id);
  }, [id, message, offsetX, offsetY, vanishAfterMs, registerTarget, unregisterTarget]);

  useEffect(() => {
    if (!autoTrigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveTargetId(id);
        } else {
          // If we leave the screen, we can unset the active target
          // Using a small timeout to avoid flickering if another target takes over immediately
          setTimeout(() => {
            const { activeTargetId, setActiveTargetId, setAgentMessage } = useGlobalState.getState();
            if (activeTargetId === id) {
              setActiveTargetId(null);
              setAgentMessage(null);
            }
          }, 100);
        }
      },
      { 
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px' 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [id, setActiveTargetId, autoTrigger]);

  return (
    <div ref={containerRef} className={`relative ${block ? 'block w-full' : 'inline-block'} ${className}`}>
      {children}
    </div>
  );
}
