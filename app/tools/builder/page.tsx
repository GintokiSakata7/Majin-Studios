'use client';

import { useEffect, useState } from 'react';

// The full "MAJIN STUDIOS BUILDER" encoded into a 17x27 bitmap grid
const LOGO_MATRIX = [
  // MAJIN (5 rows)
  [1,0,0,0,1, 0, 0,1,1,1,0, 0, 0,0,1,1,1, 0, 1,1,1, 0, 1,0,0,0,1],
  [1,1,0,1,1, 0, 1,0,0,0,1, 0, 0,0,0,1,0, 0, 0,1,0, 0, 1,1,0,0,1],
  [1,0,1,0,1, 0, 1,1,1,1,1, 0, 0,0,0,1,0, 0, 0,1,0, 0, 1,0,1,0,1],
  [1,0,0,0,1, 0, 1,0,0,0,1, 0, 1,0,0,1,0, 0, 0,1,0, 0, 1,0,0,1,1],
  [1,0,0,0,1, 0, 1,0,0,0,1, 0, 0,1,1,0,0, 0, 1,1,1, 0, 1,0,0,0,1],
  // EMPTY ROW
  [0,0,0,0,0, 0, 0,0,0,0,0, 0, 0,0,0,0,0, 0, 0,0,0, 0, 0,0,0,0,0],
  // STUDIOS (5 rows)
  [1,1,1, 0, 1,1,1, 0, 1,0,1, 0, 1,1,0, 0, 0,1,0, 0, 1,1,1, 0, 1,1,1],
  [1,0,0, 0, 0,1,0, 0, 1,0,1, 0, 1,0,1, 0, 0,1,0, 0, 1,0,1, 0, 1,0,0],
  [1,1,1, 0, 0,1,0, 0, 1,0,1, 0, 1,0,1, 0, 0,1,0, 0, 1,0,1, 0, 1,1,1],
  [0,0,1, 0, 0,1,0, 0, 1,0,1, 0, 1,0,1, 0, 0,1,0, 0, 1,0,1, 0, 0,0,1],
  [1,1,1, 0, 0,1,0, 0, 1,1,1, 0, 1,1,0, 0, 0,1,0, 0, 1,1,1, 0, 1,1,1],
  // EMPTY ROW
  [0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0],
  // BUILDER (5 rows)
  [1,1,0, 0, 1,0,1, 0, 0,1,0, 0, 1,0,0, 0, 1,1,0, 0, 1,1,1, 0, 1,1,0],
  [1,0,1, 0, 1,0,1, 0, 0,1,0, 0, 1,0,0, 0, 1,0,1, 0, 1,0,0, 0, 1,0,1],
  [1,1,0, 0, 1,0,1, 0, 0,1,0, 0, 1,0,0, 0, 1,0,1, 0, 1,1,1, 0, 1,1,0],
  [1,0,1, 0, 1,0,1, 0, 0,1,0, 0, 1,0,0, 0, 1,0,1, 0, 1,0,0, 0, 1,0,1],
  [1,1,0, 0, 1,1,1, 0, 0,1,0, 0, 1,1,1, 0, 1,1,0, 0, 1,1,1, 0, 1,0,1],
];

export default function BuilderRedirectPage() {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    "INITIALIZING BUILD ENGINE...",
    "ASSEMBLING RESUME BRICKS [ATS-COMPLIANT]...",
    "CONSTRUCTING PORTFOLIO MATRIX...",
    "WELDING 3D INTERFACE COMPONENTS...",
    "APPLYING MAJIN AESTHETICS...",
    "FINALIZING BUILD... SYSTEM READY."
  ];

  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000; // 4 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      const logIdx = Math.floor((newProgress / 100) * (logs.length - 1));
      setLogIndex(logIdx);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          window.location.replace('https://majinbuilder.onrender.com/');
        }, 500);
      }
    }, 16); 

    return () => clearInterval(interval);
  }, []);

  // Calculate Laser Position (3D Printer Head)
  // Building from bottom (row 16) to top (row 0), left to right
  const buildPhase = Math.min(progress / 85, 1); 
  const totalRows = LOGO_MATRIX.length;
  const cols = 27;
  const totalBricks = totalRows * cols;
  
  const currentBrickIndex = Math.min(Math.floor(buildPhase * totalBricks), totalBricks - 1);
  
  const laserRow = (totalRows - 1) - Math.floor(currentBrickIndex / cols);
  const laserCol = currentBrickIndex % cols;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-primary p-4 md:p-6 relative overflow-hidden font-mono select-none">
      
      {/* Moving Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(var(--accent-current) 1px, transparent 1px), linear-gradient(90deg, var(--accent-current) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: `0px ${progress * 3}px`
        }}
      />

      {/* Target UI Corners */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-16 h-16 border-t-2 border-l-2 border-accent-current opacity-50" />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 border-t-2 border-r-2 border-accent-current opacity-50" />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-16 h-16 border-b-2 border-l-2 border-accent-current opacity-50" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 border-b-2 border-r-2 border-accent-current opacity-50" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl bg-black/60 border border-line-structural p-6 md:p-12 backdrop-blur-xl shadow-2xl">
        
        {/* Header Label */}
        <div className="w-full flex justify-between text-[10px] md:text-xs tracking-widest text-accent-current opacity-80 mb-8 md:mb-12">
          <span>SYS.BUILD // v2.0.4</span>
          <span>TARGET: RESUME AND PORTFOLIO BUILDER</span>
        </div>

        {/* BRICK-BY-BRICK LOGO MATRIX */}
        <div className="relative flex flex-col gap-[2px] md:gap-1 mb-8 md:mb-12 p-3 md:p-6 border border-line-structural/50 bg-[#0a0a0a]">
          {LOGO_MATRIX.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-[2px] md:gap-1">
              {row.map((val, cIdx) => {
                const threshold = ((((totalRows - 1) - rIdx) * cols + cIdx) / totalBricks) * 85;
                const isBuilt = progress > threshold;
                const isJustBuilt = progress > threshold && progress < threshold + 1.5;
                
                // Color distinction: MAJIN (cyan/accent), STUDIOS (dimmer), BUILDER (cyan)
                const isStudios = rIdx >= 6 && rIdx <= 10;
                
                return (
                  <div 
                    key={cIdx} 
                    className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] transition-all duration-75 relative ${
                      val === 1 
                        ? isBuilt 
                          ? isJustBuilt 
                            ? 'bg-white shadow-[0_0_20px_#fff] scale-125 z-20' 
                            : (isStudios ? 'bg-text-secondary shadow-none opacity-80' : 'bg-accent-current shadow-[0_0_8px_var(--accent-current)]')
                          : 'bg-transparent border border-line-structural opacity-20'
                        : 'bg-transparent'
                    }`}
                  />
                );
              })}
            </div>
          ))}

          {/* 3D Printer Laser Head */}
          {progress < 85 && (
            <div 
              className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] bg-white shadow-[0_0_25px_#fff] transition-all duration-75 pointer-events-none z-30"
              style={{
                top: `calc(1.5rem + ${laserRow * (100 / totalRows)}% - ${laserRow > 0 ? 0 : 0}px)`, 
                left: `calc(1.5rem + ${laserCol * (100 / cols)}% - ${laserCol > 0 ? 0 : 0}px)`,
                transform: 'scale(1.5)',
              }}
            >
              {/* Laser vertical beam */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-[2px] h-[500px] bg-gradient-to-t from-white to-transparent opacity-80" />
            </div>
          )}
        </div>

        {/* Terminal Log */}
        <div className="w-full bg-[#050505] border border-line-structural p-4 md:p-6 h-28 overflow-hidden relative font-mono text-[10px] md:text-xs text-secondary flex flex-col justify-end shadow-inner">
          {logs.map((log, idx) => (
            <div 
              key={idx} 
              className={`transition-opacity duration-200 flex ${idx === logIndex ? 'text-accent-current opacity-100' : idx < logIndex ? 'opacity-40' : 'hidden'}`}
            >
              <span className="opacity-50 mr-3">{'>'}</span> 
              <span>
                {log}
                {idx === logIndex && <span className="animate-pulse inline-block w-2 h-3 md:h-4 bg-accent-current ml-1 align-middle" />}
              </span>
            </div>
          ))}
        </div>
        
        {/* Main Progress Bar */}
        <div className="w-full mt-6 md:mt-8 flex gap-4 md:gap-6 items-center">
          <div className="flex-1 h-2 bg-line-structural relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-accent-current transition-all duration-[16ms]"
              style={{ width: `${progress}%`, boxShadow: '0 0 15px var(--accent-current)' }}
            />
          </div>
          <div className="text-xl md:text-2xl font-bold w-12 md:w-16 text-right text-accent-current">
            {Math.floor(progress)}<span className="text-sm opacity-50">%</span>
          </div>
        </div>
        
        <div className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-secondary mt-4 animate-pulse">
          DO NOT CLOSE THIS WINDOW
        </div>

      </div>
    </div>
  );
}
