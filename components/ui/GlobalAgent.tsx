'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './GlobalAgent.module.css';
import { useGlobalState } from '../../store/useGlobalState';

export function GlobalAgent() {
  const { agentIsVisible, activeTargetId, targetRegistry, agentMessage, setAgentMessage, hasBooted } = useGlobalState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Actual coordinates (for smooth lerping)
  const currentPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    
    // Initial popup message only happens once it boots
    if (hasBooted) {
      setAgentMessage("Hi! I am Majin Guide.");
      const timer = setTimeout(() => {
        setAgentMessage(null); // Vanish in 2.5 seconds
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [setAgentMessage, hasBooted]);

  useEffect(() => {
    // If no active target, go to spawn position (bottom right)
    if (!activeTargetId || !targetRegistry[activeTargetId]) {
      setIsTracking(false);
      cancelAnimationFrame(requestRef.current);
      
      if (typeof window !== 'undefined') {
        const spawnX = window.innerWidth - 80;
        const spawnY = window.innerHeight - 80;
        
        // Use lerp to glide to spawn position
        const returnToBase = () => {
          currentPos.current.x += (spawnX - currentPos.current.x) * 0.05;
          currentPos.current.y += (spawnY - currentPos.current.y) * 0.05;
          
          setPosition({ x: currentPos.current.x, y: currentPos.current.y });
          setIsFlipped(currentPos.current.x > window.innerWidth / 2);

          // Stop loop if close enough
          if (Math.abs(currentPos.current.x - spawnX) > 1 || Math.abs(currentPos.current.y - spawnY) > 1) {
            requestRef.current = requestAnimationFrame(returnToBase);
          }
        };
        
        requestRef.current = requestAnimationFrame(returnToBase);
      }
      return () => cancelAnimationFrame(requestRef.current);
    }

    setIsTracking(true);
    const target = targetRegistry[activeTargetId];
    
    if (target.message !== agentMessage) {
      setAgentMessage(target.message);
      
      if (target.vanishAfterMs) {
        setTimeout(() => {
          // Verify we are still on the same target before clearing
          const currentTargetId = useGlobalState.getState().activeTargetId;
          if (currentTargetId === activeTargetId) {
            setAgentMessage(null);
          }
        }, target.vanishAfterMs);
      }
    }

    // Active tracking loop with Lerp
    const trackTarget = () => {
      if (target.ref) {
        const rect = target.ref.getBoundingClientRect();
        
        let targetX = rect.right + target.offsetX;
        
        // If the element is too far to the right, we flip it and put the bot on the left side of the element
        const flipped = targetX > window.innerWidth - 250; 
        
        if (flipped) {
          targetX = rect.left - 60 - Math.abs(target.offsetX); // Place on left
        }

        const targetY = rect.top + (rect.height / 2) + target.offsetY - 24; // Center vertically

        // Lerp coordinates
        currentPos.current.x += (targetX - currentPos.current.x) * 0.08;
        currentPos.current.y += (targetY - currentPos.current.y) * 0.08;

        setPosition({
          x: currentPos.current.x,
          y: currentPos.current.y
        });
        setIsFlipped(flipped);
      }
      requestRef.current = requestAnimationFrame(trackTarget);
    };

    requestRef.current = requestAnimationFrame(trackTarget);

    return () => cancelAnimationFrame(requestRef.current);
  }, [activeTargetId, targetRegistry, agentMessage, setAgentMessage]);

  if (!mounted || !agentIsVisible || !hasBooted) return null;

  const handleInteract = () => {
    if (!activeTargetId) {
      setAgentMessage("Hi! I am Majin Guide.");
      setTimeout(() => setAgentMessage(null), 2500);
    }
  };

  return (
    <div 
      className={`${styles.globalAgent} ${isFlipped ? styles.flipped : ''}`}
      style={{
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      <div 
        className={styles.avatarWrapper}
        onClick={handleInteract}
        style={{ cursor: activeTargetId ? 'default' : 'pointer' }}
      >
        <Image 
          src="/logo.jpg" 
          alt="Majin Guide" 
          width={48} 
          height={48} 
          className={styles.avatarImage}
        />
      </div>
      
      {agentMessage && (
        <div className={styles.speechBubble}>
          <p className={styles.message} dangerouslySetInnerHTML={{ __html: agentMessage }} />
        </div>
      )}
    </div>
  );
}
