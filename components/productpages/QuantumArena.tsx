
'use client';
import React, { useEffect, useRef } from 'react';
import './quantum.css';

export function QuantumArena() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const getEl = (id: string) => container.querySelector(`#${id}`) as HTMLElement;
    const getAll = (sel: string) => container.querySelectorAll<HTMLElement>(sel);

    
        const images = [
            '/quantumarena/images/Screenshot 2026-08-25 204631.png', '/quantumarena/images/Screenshot 2026-08-25 204657.png', '/quantumarena/images/Screenshot 2026-08-25 204713.png', '/quantumarena/images/Screenshot 2026-08-25 204731.png', '/quantumarena/images/Screenshot 2026-08-25 204746.png', '/quantumarena/images/Screenshot 2026-08-25 204800.png', '/quantumarena/images/Screenshot 2026-08-25 204814.png', '/quantumarena/images/Screenshot 2026-08-25 204825.png', '/quantumarena/images/Screenshot 2026-08-25 204842.png', '/quantumarena/images/Screenshot 2026-08-25 204859.png', '/quantumarena/images/Screenshot 2026-08-25 204916.png'
        ];
        const labels = ['System Overview', 'Event About', 'Participant Experience', 'Tracks / Discover', 'Timeline / Operations', 'Timeline / Execution', 'Prizes / Outcomes', 'Rules / Governance', 'Registration / Conversion', 'Event Location / Context', 'Additional Interface'];
        const workflow = [
            ['REGISTRATION', 'Participant intake', 'Teams register with 1–5 members, submit payment and identity material, and move through a trackable approval process.', 'registered → submitted → verified → approved'],
            ['CHECK-IN', 'Live event operations', 'QR-based check-in and multi-day attendance tracking turned event-day entry into a controlled digital workflow.', 'scan → identify → verify → check-in → attendance'],
            ['EVALUATION', 'Judge workflow', 'Judges and super-admins access structured team information and evaluate projects through dedicated portals.', 'login → roster → abstract → stack → evaluation → score'],
            ['RANKING', 'Results processing', 'Evaluation inputs can be consolidated into master sheets and top-ranking reports for the final event workflow.', 'evaluations → scores → ranking → top-3 report'],
            ['CERTIFICATION', 'Post-event automation', 'Approved, checked-in participants flow into image generation and email distribution.', 'eligible → render → queue → email → delivered']
        ];

        // loader
        const startLoader = () => { const bar = getEl("loadBar"), pct = getEl("loadPct"), status = getEl("loadStatus"); let n = 0; const timer = setInterval(() => { n += Math.floor(Math.random() * 14) + 8; if (n > 100) n = 100; bar.style.width = n + '%'; pct.textContent = String(n).padStart(2, '0') + '%'; status.textContent = n < 45 ? 'LOADING ASSETS' : n < 78 ? 'PREPARING' : n < 100 ? 'STARTING' : 'READY'; if (n === 100) { clearInterval(timer); setTimeout(() => { getEl("loader").classList.add('hide'); container.classList.remove('lock') }, 350) } }, 80) };
        if (document.readyState === 'complete') startLoader(); else window.addEventListener('load', startLoader);

        // cursor
        const cur = getEl("cursor"), dot = getEl("cursorDot"); let cx = innerWidth / 2, cy = innerHeight / 2, dx = cx, dy = cy; addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; container.style.setProperty('--mx', cx + 'px'); container.style.setProperty('--my', cy + 'px'); });
        (function tick() { dx += (cx - dx) * .18; dy += (cy - dy) * .18; cur.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`; dot.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(tick) })();
        getAll("a,button,.shot,.story-item,.cap").forEach(el => { el.addEventListener('mouseenter', () => cur.classList.add('hover')); el.addEventListener('mouseleave', () => cur.classList.remove('hover')) });

        // scroll progress
        addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; document.documentElement.style.setProperty('--scroll', Math.min(100, (scrollY / max) * 100) + '%') }, { passive: true });

        // mobile nav
        const menu = getEl("menu"), nav = getEl("navlinks"); menu.addEventListener('click', () => nav.classList.toggle('open')); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

        // hero tilt
        const stage = getEl("heroStage"), device = getEl("heroDevice"); stage.addEventListener("pointermove", (e: any) => { if (innerWidth < 1000) return; const r = stage.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; device.style.transform = `perspective(1200px) rotateY(${x * -14}deg) rotateX(${y * 8}deg) translate3d(${x * 7}px,${y * 7}px,0)` }); stage.addEventListener('pointerleave', () => device.style.transform = 'perspective(1200px) rotateY(-10deg) rotateX(4deg)');



        // reveal
        const revealObs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target) } }), { threshold: .08 }); getAll(".reveal,.clip-in").forEach(el => revealObs.observe(el));

        // count-up
        const countObs = new IntersectionObserver(entries => entries.forEach(e => { if (!e.isIntersecting) return; const el = e.target as HTMLElement, target = +(el.dataset.count || 0), duration = 1250, start = performance.now(); function run(t: number) { const p = Math.min(1, (t - start) / duration), ease = 1 - Math.pow(1 - p, 4); el.textContent = Math.floor(target * ease).toLocaleString() + (target === 1500 ? '+' : ''); if (p < 1) requestAnimationFrame(run) } requestAnimationFrame(run); countObs.unobserve(el) }), { threshold: .5 }); getAll("[data-count]").forEach(el => countObs.observe(el));

        // story system & interactive canvas
        const storyColors = ['#ff2538', '#00f2a1', '#ffc43d', '#00f2a1', '#ff3c50'];
        let activeStoryColor = storyColors[0];
        
        const sCanvas = getEl("storyCanvas") as HTMLCanvasElement;
        let animId: number;
        let sCtx: CanvasRenderingContext2D | null = null;
        let sWidth = 0, sHeight = 0, particles: any[] = [];
        
        if (sCanvas) {
            sCtx = sCanvas.getContext('2d');
            sCanvas.addEventListener('click', () => {
                particles.forEach(p => {
                    p.vx = (Math.random() - 0.5) * 15;
                    p.vy = (Math.random() - 0.5) * 15;
                });
                const core = getEl("storyOrbCore");
                if (core) {
                    core.style.transform = 'scale(1.6)';
                    setTimeout(() => core.style.transform = 'scale(1)', 400);
                }
                setTimeout(() => {
                    particles.forEach(p => {
                        p.vx = (Math.random() - 0.5) * 0.6;
                        p.vy = (Math.random() - 0.5) * 0.6;
                    });
                }, 500);
            });
        }
        
        function initCanvas() {
            if (!sCanvas) return;
            const centerEl = getEl('storyCenter');
            if (!centerEl) return;
            const rect = centerEl.getBoundingClientRect();
            if(!rect.width) return;
            sCanvas.width = sWidth = rect.width;
            sCanvas.height = sHeight = rect.height;
            particles = [];
            for (let i = 0; i < 45; i++) {
                particles.push({
                    x: Math.random() * sWidth,
                    y: Math.random() * sHeight,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    size: Math.random() * 1.5 + 0.5
                });
            }
        }
        
        function animateCanvas() {
            if (!sCtx || !sCanvas) return;
            sCtx.clearRect(0, 0, sWidth, sHeight);
            sCtx.fillStyle = activeStoryColor;
            sCtx.lineWidth = 0.5;
            
            const rect = sCanvas.getBoundingClientRect();
            const mouseX = cx - rect.left;
            const mouseY = cy - rect.top;
            
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > sWidth) p.vx *= -1;
                if (p.y < 0 || p.y > sHeight) p.vy *= -1;
                
                const distMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
                if (distMouse < 140) {
                    sCtx.strokeStyle = activeStoryColor + '30';
                    sCtx.beginPath();
                    sCtx.moveTo(p.x, p.y);
                    sCtx.lineTo(mouseX, mouseY);
                    sCtx.stroke();
                }
                
                sCtx.beginPath();
                sCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                sCtx.fill();
                
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 70) {
                        sCtx.strokeStyle = activeStoryColor + '20';
                        sCtx.beginPath();
                        sCtx.moveTo(p.x, p.y);
                        sCtx.lineTo(p2.x, p2.y);
                        sCtx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(animateCanvas);
        }
        
        window.addEventListener('resize', initCanvas);
        setTimeout(initCanvas, 100);
        animId = requestAnimationFrame(animateCanvas);

        const storyList = getEl("storyList"), sk = getEl("storyCodeTop"), st = getEl("storyTitle"), sx = getEl("storyText"), sc = getEl("storyCode"), sk2 = getEl("storyKicker");
        const sOrb = getEl("storyOrb"), sOrbCore = getEl("storyOrbCore");
        
        storyList.innerHTML = '';
        workflow.forEach((it, i) => { 
            const row = document.createElement('div'); 
            row.className = 'story-item' + (i === 0 ? ' active' : ''); 
            row.innerHTML = `<div class="story-index">0${i + 1}</div><div><div class="story-name">${it[1]}</div><div class="story-tag">${it[0]}</div></div><div class="story-arrow">↗</div>`; 
            row.onclick = () => { 
                getAll(".story-item").forEach(x => x.classList.remove('active')); 
                row.classList.add('active'); 
                sk.textContent = it[0]; 
                sk2.textContent = 'LIVE WORKFLOW'; 
                st.textContent = it[1]; 
                sx.textContent = it[2]; 
                sc.innerHTML = '<span>flow</span> → ' + it[3];
                
                activeStoryColor = storyColors[i % storyColors.length];
                if (sOrb && sOrbCore) {
                    sOrb.style.borderColor = activeStoryColor + '59';
                    sOrbCore.style.background = activeStoryColor;
                    sOrbCore.style.boxShadow = `0 0 35px ${activeStoryColor}a6`;
                }
                
                particles.forEach(p => {
                    p.vx = (Math.random() - 0.5) * 5;
                    p.vy = (Math.random() - 0.5) * 5;
                });
                
                setTimeout(() => {
                    particles.forEach(p => {
                        p.vx = (Math.random() - 0.5) * 0.6;
                        p.vy = (Math.random() - 0.5) * 0.6;
                    });
                }, 300);
            }; 
            storyList.appendChild(row); 
        });

        // gallery slideshow (Native Scroll + Auto Slide)
        const gallery = getEl("gallery"); 
        const wrapper = getEl("galleryWrapper");
        gallery.innerHTML = '';
        
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        images.forEach((src, i) => { 
            const card = document.createElement('article'); 
            card.className = 'shot'; 
            card.innerHTML = `<img src="${src}" alt="${labels[i]}" loading="lazy"><div class="shot-meta"><div><strong>${labels[i]}</strong><div style="margin-top:5px"><span>${String(i + 1).padStart(2, '0')} // INTERFACE</span></div></div><div class="shot-open">OPEN ↗</div></div>`; 
            card.onclick = () => openModal(src, labels[i]); 
            gallery.appendChild(card); 
            
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => {
                // Calculate scroll position to center the card
                const scrollLeft = card.offsetLeft - (gallery.clientWidth - card.clientWidth) / 2;
                gallery.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                resetTimer();
            };
            dotsContainer.appendChild(dot);
        });
        
        wrapper.appendChild(dotsContainer);
        
        // Auto slide logic
        let slideTimer: any;
        const autoSlide = () => {
            const maxScroll = gallery.scrollWidth - gallery.clientWidth;
            if (gallery.scrollLeft >= maxScroll - 10) {
                gallery.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                gallery.scrollBy({ left: gallery.clientWidth * 0.7, behavior: 'smooth' });
            }
        };
        
        const resetTimer = () => {
            clearInterval(slideTimer);
            slideTimer = setInterval(autoSlide, 2000); // 2 seconds
        };
        
        gallery.addEventListener('scroll', () => {
            const cards = gallery.querySelectorAll('.shot');
            let activeIdx = 0;
            let minDiff = Infinity;
            cards.forEach((card, idx) => {
                const diff = Math.abs((card as HTMLElement).offsetLeft - gallery.scrollLeft - (gallery.clientWidth - card.clientWidth) / 2);
                if (diff < minDiff) {
                    minDiff = diff;
                    activeIdx = idx;
                }
            });
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, idx) => dot.classList.toggle('active', idx === activeIdx));
        }, { passive: true });
        
        wrapper.addEventListener('mouseenter', () => clearInterval(slideTimer));
        wrapper.addEventListener('mouseleave', () => resetTimer());
        wrapper.addEventListener('touchstart', () => clearInterval(slideTimer), {passive: true});
        wrapper.addEventListener('touchend', () => resetTimer(), {passive: true});
        
        resetTimer();

        // modal
        const modal = getEl("modal"), modalImg = getEl("modalImg") as HTMLImageElement, modalTitle = getEl("modalTitle"); function openModal(src: string, title: string) { modalImg.src = src; modalTitle.textContent = 'QUANTUM ARENA // ' + title.toUpperCase(); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); container.classList.add('lock') } function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); modalImg.removeAttribute('src'); if (!getEl("loader").classList.contains('hide')) return; container.classList.remove('lock') } getEl("modalClose").onclick = closeModal; modal.addEventListener("click", (e: any) => { if (e.target === modal) closeModal() }); document.addEventListener("keydown", (e: any) => { if (e.key === 'Escape') closeModal() });

        // active nav
        const navA = [...document.querySelectorAll('.navlinks a[href^="#"]')]; const sec = [...getAll("main section[id]")]; const activeObs = new IntersectionObserver(entries => entries.forEach(e => { if (!e.isIntersecting) return; navA.forEach(a => a.classList.remove('active')); const a = navA.find(x => x.getAttribute('href') === '#' + e.target.id); if (a) a.classList.add('active') }), { rootMargin: '-35% 0px -55% 0px', threshold: 0 }); sec.forEach(s => activeObs.observe(s));

        getEl("year").textContent = new Date().getFullYear().toString();
        // keep missing-image fallbacks visible and calm
        setTimeout(() => getAll("img").forEach((img: any) => img.addEventListener('error', () => { img.style.opacity = '0'; img.parentElement.style.background = 'radial-gradient(circle,rgba(255,37,56,.12),transparent 45%),#05070a'; })), 50);
    

        // Terminal animation for Capabilities section
        const term = getEl('termOutput');
        if (term) term.innerHTML = '';
        const termLogs = [
            "Mounting Participant Gateway...",
            "SUCCESS: Access granted.",
            "Loading Verification Engine...",
            "Connecting to Cloudinary...",
            "SUCCESS: Storage bucket active.",
            "Booting Check-in Scanner...",
            "WARNING: Event Day countdown active.",
            "Loading Judge Workflows...",
            "Authenticating admin tokens...",
            "SUCCESS: Roles mapped.",
            "Booting Scoring Algorithms...",
            "Linking Nodemailer & Resend...",
            "SYSTEM READY: All modules online.",
            "Awaiting traffic..."
        ];
        let termLogIndex = 0;
        const termInterval = setInterval(() => {
            if (!term) return;
            if (termLogIndex < termLogs.length) {
                const div = document.createElement('div');
                div.textContent = "> " + termLogs[termLogIndex];
                div.style.marginBottom = '6px';
                if(termLogs[termLogIndex].includes('SUCCESS')) div.style.color = 'var(--green)';
                if(termLogs[termLogIndex].includes('WARNING')) div.style.color = '#ffc43d';
                term.appendChild(div);
                termLogIndex++;
                if (term.children.length > 7) {
                    term.removeChild(term.firstChild!);
                }
            } else {
                termLogIndex = 0;
                term.innerHTML = '';
            }
        }, 900);
    

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(termInterval);
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  return (
    <div className="quantum-page" ref={containerRef} style={{ cursor: 'default' }}>
      <div className="loader" id="loader">
        <div className="loader-core">
            <div className="loader-top"><span>MAJIN STUDIOS // CASE STUDY</span><span id="loadPct">00%</span></div>
            <div className="loader-name">QUANTUM <span>ARENA</span></div>
            <div className="loader-bar"><i id="loadBar"></i></div>
            <div className="loader-status"><span>BOOTING EXPERIENCE</span><b id="loadStatus">INITIALIZING...</b></div>
        </div>
    </div>
    <div className="noise"></div>
    <div className="scan"></div>
    <div className="cursor" id="cursor"></div>
    <div className="cursor-dot" id="cursorDot"></div>

    <header className="nav">
        <div className="nav-inner"><a className="brand" href="#top">MAJIN <span>STUDIOS</span></a>
            <nav className="navlinks" id="navlinks"><a href="#system">System</a><a href="#capabilities">Capabilities</a><a
                    href="#interfaces">Interfaces</a><a href="#architecture">Architecture</a><a
                    href="#automation">Automation</a><a href="#contact" className="nav-cta">Start a project</a></nav><button
                className="menu" id="menu">☰</button>
        </div>
    </header>

    <main id="top">
        <section className="wrap hero">
            <div className="hero-copy reveal">
                <a href="https://www.majinstudios.tech/" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--green)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '2px', fontFamily: 'var(--mono)', opacity: 0.8 }}>
                    ← BACK TO MAJIN STUDIOS
                </a>
                <div className="hero-label eyebrow"><span className="live-dot"></span> MAJIN STUDIOS // FIELD REPORT 001 //
                    SYSTEM OPERATIONAL</div>
                <h1 className="hero-title">QUANTUM<br /><span className="line2">ARENA</span></h1>
                <p className="hero-sub"><strong>We didn't just build a hackathon website.</strong> We engineered the digital
                    infrastructure behind a 36-hour event — registration, payment verification, QR check-in, attendance,
                    judge evaluation, scoring, rankings and automated certification.</p>
                <div className="hero-actions"><a className="btn primary magnetic" href="#interfaces">Explore the build ↓</a><a
                        className="btn magnetic" href="#architecture">Open system map →</a></div>
                <div className="hero-metrics">
                    <div className="metric">
                        <div className="metric-num" data-count="1500">0+</div>
                        <div className="metric-label">Participants handled</div>
                    </div>
                    <div className="metric">
                        <div className="metric-num" data-count="36">0</div>
                        <div className="metric-label">Hour event</div>
                    </div>
                    <div className="metric">
                        <div className="metric-num">01</div>
                        <div className="metric-label">End-to-end platform</div>
                    </div>
                </div>
            </div>
            <div className="hero-stage reveal delay2" id="heroStage">
                <div className="halo"></div>
                <div className="halo"></div>
                <div className="hero-float"><b>// LIVE</b> event operations<br />participant → judge → certificate</div>
                <div className="hero-device" id="heroDevice">
                    <div className="device-main">
                        <div className="bar"><span className="dot"
                            style={{background:"#ff3c50",width:"7px",height:"7px",borderRadius:"50%"}}></span><span
                            className="dot"
                            style={{background:"#ffc43d",width:"7px",height:"7px",borderRadius:"50%"}}></span><span
                            className="dot"
                            style={{background:"#20d998",width:"7px",height:"7px",borderRadius:"50%"}}></span><b>quantum_arena
                            // system overview</b></div><img className="hero-shot"
                        src="/quantumarena/images/Screenshot 2026-08-25 204631.png" alt="Quantum Arena interface" />
                    </div>
                    <div className="hero-tag">
                        <div className="t1">SYSTEM / OPERATIONAL</div>
                        <div className="t2">1,500+ PARTICIPANTS</div>
                        <div className="t3">registration • check-in • evaluation • automation</div>
                    </div>
                </div>
            </div>
        </section>

        <div className="marquee">
            <div className="marquee-track"><span>WEB <b>×</b> SOFTWARE <b>×</b> APIS <b>×</b> AUTOMATION <b>×</b> EVENT OPS
                    <b>×</b> PRODUCT ENGINEERING <b>×</b> WEB <b>×</b> SOFTWARE <b>×</b> APIS <b>×</b> AUTOMATION
                    <b>×</b> EVENT OPS <b>×</b></span><span>WEB <b>×</b> SOFTWARE <b>×</b> APIS <b>×</b> AUTOMATION
                    <b>×</b> EVENT OPS <b>×</b> PRODUCT ENGINEERING <b>×</b></span></div>
        </div>

        <section id="system" className="wrap">
            <div className="section-grid reveal">
                <div className="section-kicker">
                    <div className="index"><b>01</b> // THE SYSTEM</div>
                    <div className="rule"></div>
                </div>
                <div>
                    <h2 className="section-title">More than<br /><span>a website.</span></h2>
                    <p className="section-copy">Quantum Arena evolved from a public-facing event experience into a connected
                        operations platform. The value wasn't any single page — it was the way participant, admin and
                        judge workflows shared one system.</p>
                </div>
            </div>
            <div className="story-shell" style={{marginTop:"42px"}}>
                <div className="story-list reveal" id="storyList"></div>
                <div className="story-view reveal delay1">
                    <div className="story-topline"><span id="storyCodeTop">SYSTEM / REGISTRATION</span><span>INTERACTIVE
                            MODULE</span></div>
                    <div className="story-center" id="storyCenter">
                        <canvas id="storyCanvas" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, cursor: 'pointer'}}></canvas>
                        <div className="orb" id="storyOrb" style={{zIndex: 1, pointerEvents: 'none', transition: 'border-color 0.4s, box-shadow 0.4s'}}>
                            <div className="orb-core" id="storyOrbCore" style={{transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.4s, box-shadow 0.4s'}}></div>
                        </div>
                    </div>
                    <div className="story-copy">
                        <div className="k" id="storyKicker">LIVE WORKFLOW</div>
                        <h3 id="storyTitle">Participant intake</h3>
                        <p id="storyText">Teams register with 1–5 members, submit payment and identity material, then
                            move through a trackable approval process.</p>
                        <div className="codeblock" id="storyCode"><span>flow</span> → registered → submitted → verified →
                            approved</div>
                    </div>
                </div>
            </div>
        </section>

        <section id="capabilities" className="wrap">
            <div className="section-grid reveal">
                <div className="section-kicker">
                    <div className="index"><b>02</b> // WHAT WE BUILT</div>
                    <div className="rule"></div>
                    
                    <div className="term-module reveal delay1" style={{marginTop: "50px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(5,7,10,0.7)", padding: "22px", fontFamily: "'JetBrains Mono'", fontSize: "9px", color: "#58636e", height: "190px", overflow: "hidden", position: "relative", boxShadow: "0 10px 30px rgba(0,0,0,0.5)"}}>
                        <div style={{color: "var(--green)", marginBottom: "12px", fontWeight: 700, fontSize: "10px", letterSpacing: "0.15em"}}>// MODULE_INITIALIZATION</div>
                        <div id="termOutput"></div>
                        <div style={{position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(transparent, #05070a)"}}></div>
                    </div>
                </div>
                <div>
                    <h2 className="section-title">One platform.<br /><span>Multiple roles.</span></h2>
                    <p className="section-copy">Six systems were designed to feel like one product: participant-facing
                        flows, event-day controls, judge tooling and post-event automation.</p>
                </div>
            </div>
            <div className="cap-grid" style={{marginTop:"42px"}}>
                <article className="cap reveal">
                    <div className="cap-num">MODULE / 01</div>
                    <div className="cap-icon">01</div>
                    <h3>Participant</h3>
                    <p>Registration, team information, live status and published scorecards.</p>
                    <div className="bar"></div>
                </article>
                <article className="cap reveal delay1">
                    <div className="cap-num">MODULE / 02</div>
                    <div className="cap-icon">02</div>
                    <h3>Verification</h3>
                    <p>Payment and ID uploads, secure review and approval workflow.</p>
                    <div className="bar"></div>
                </article>
                <article className="cap reveal delay2">
                    <div className="cap-num">MODULE / 03</div>
                    <div className="cap-icon">03</div>
                    <h3>Check-in</h3>
                    <p>QR scanning, participant lookup and multi-day attendance operations.</p>
                    <div className="bar"></div>
                </article>
                <article className="cap reveal">
                    <div className="cap-num">MODULE / 04</div>
                    <div className="cap-icon">04</div>
                    <h3>Judging</h3>
                    <p>Dedicated judge and super-admin views for structured evaluation.</p>
                    <div className="bar"></div>
                </article>
                <article className="cap reveal delay1">
                    <div className="cap-num">MODULE / 05</div>
                    <div className="cap-icon">05</div>
                    <h3>Scoring</h3>
                    <p>Score inputs, master evaluation sheet and top-ranking report generation.</p>
                    <div className="bar"></div>
                </article>
                <article className="cap reveal delay2">
                    <div className="cap-num">MODULE / 06</div>
                    <div className="cap-icon">06</div>
                    <h3>Automation</h3>
                    <p>Image-based certificates and controlled transactional email distribution.</p>
                    <div className="bar"></div>
                </article>
            </div>
        </section>

        <section id="interfaces" className="wrap">
            <div className="section-grid reveal">
                <div className="section-kicker">
                    <div className="index"><b>03</b> // INTERFACE ARCHIVE</div>
                    <div className="rule"></div>
                </div>
                <div>
                    <h2 className="section-title">Real screens.<br /><span>Real proof.</span></h2>
                    <p className="section-copy">We built the UI for people who had to use it during the event. Explore the
                        actual system screens and open them full-size.</p>
                </div>
            </div>
            <div className="gallery-wrapper" id="galleryWrapper" style={{marginTop:"42px", position: "relative"}}>
                <div className="gallery" id="gallery"></div>
            </div>
        </section>

        <section id="architecture" className="wrap">
            <div className="section-grid reveal">
                <div className="section-kicker">
                    <div className="index"><b>04</b> // UNDER THE HOOD</div>
                    <div className="rule"></div>
                    
                    <div className="stack-visual reveal delay1" style={{marginTop: "50px", display: "flex", flexDirection: "column", gap: "14px"}}>
                        <div style={{padding: "16px 20px", border: "1px solid rgba(255, 37, 56, 0.15)", background: "rgba(255, 37, 56, 0.03)", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "4px"}}>
                            <span style={{font: "800 12px Orbitron", color: "#fff", letterSpacing: "0.05em"}}>FRONTEND</span>
                            <span style={{font: "600 10px 'JetBrains Mono'", color: "var(--red)"}}>REACT 19 / VITE</span>
                        </div>
                        <div style={{padding: "16px 20px", border: "1px solid rgba(255, 37, 56, 0.15)", background: "rgba(255, 37, 56, 0.03)", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "4px"}}>
                            <span style={{font: "800 12px Orbitron", color: "#fff", letterSpacing: "0.05em"}}>BACKEND</span>
                            <span style={{font: "600 10px 'JetBrains Mono'", color: "#67727d"}}>NODE / EXPRESS 5</span>
                        </div>
                        <div style={{padding: "16px 20px", border: "1px solid rgba(255, 37, 56, 0.15)", background: "rgba(255, 37, 56, 0.03)", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "4px"}}>
                            <span style={{font: "800 12px Orbitron", color: "#fff", letterSpacing: "0.05em"}}>DATABASE</span>
                            <span style={{font: "600 10px 'JetBrains Mono'", color: "#67727d"}}>MONGODB</span>
                        </div>
                        <div style={{padding: "16px 20px", border: "1px solid rgba(255, 37, 56, 0.15)", background: "rgba(255, 37, 56, 0.03)", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "4px"}}>
                            <span style={{font: "800 12px Orbitron", color: "#fff", letterSpacing: "0.05em"}}>INFRASTRUCTURE</span>
                            <span style={{font: "600 10px 'JetBrains Mono'", color: "#67727d"}}>CLOUDINARY / RESEND</span>
                        </div>
                        
                        <div style={{marginTop: "15px", display: "flex", gap: "10px", alignItems: "center", font: "700 9px 'JetBrains Mono'", color: "var(--green)", letterSpacing: "0.1em"}}>
                            <div style={{width: "8px", height: "8px", background: "var(--green)", borderRadius: "50%", boxShadow: "0 0 15px var(--green)", animation: "pulse 1.5s infinite"}}></div>
                            SYSTEM ARCHITECTURE OPTIMIZED
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="section-title">Built like a product.<br /><span>Not a landing page.</span></h2>
                    <p className="section-copy">React handled the participant and admin experiences; Node/Express powered
                        the API layer; MongoDB handled state; Cloudinary, authentication and mail services supported
                        operations.</p>
                </div>
            </div>
            <div className="arch-wrap reveal" style={{marginTop:"42px"}}>
                <div className="arch-canvas">
                    <div className="arch-node a">
                        <div className="n">Participant UI</div>
                        <div className="s">React 19 / Vite<br />registration · status · pass</div>
                    </div>
                    <div className="arch-node b">
                        <div className="n">Admin + Judge UI</div>
                        <div className="s">secure portals<br />check-in · evaluation</div>
                    </div>
                    <div className="arch-node c core">
                        <div className="n">Node + Express API</div>
                        <div className="s">auth · workflows · scoring · event logic</div>
                    </div>
                    <div className="arch-node d">
                        <div className="n">MongoDB</div>
                        <div className="s">registrations · state · scores</div>
                    </div>
                    <div className="arch-node e">
                        <div className="n">Cloudinary + Email</div>
                        <div className="s">uploads · certificates · notifications</div>
                    </div>
                    <div className="arch-line l1"></div>
                    <div className="arch-line l2"></div>
                    <div className="arch-line l3"></div>
                    <div className="arch-line l4"></div>
                </div>
                <div className="arch-console"><b>ARCHITECTURE</b> React 19 → Node/Express → MongoDB / Cloudinary / Mail →
                    live event operations<br /><span style={{color:"#5f6b75"}}>STACK //</span> React 19 · Vite · Node.js ·
                    Express 5 · MongoDB · Mongoose · Cloudinary · Multer · Jimp · Nodemailer · Resend · JWT · bcryptjs
                </div>
            </div>
        </section>

        <section id="automation" className="wrap">
            <div className="section-grid reveal">
                <div className="section-kicker">
                    <div className="index"><b>05</b> // AUTOMATION</div>
                    <div className="rule"></div>
                </div>
                <div>
                    <h2 className="section-title">Remove the<br /><span>manual work.</span></h2>
                    <p className="section-copy">Post-event certification became a pipeline: identify eligible participants,
                        generate certificate images, queue mail, distribute and log delivery.</p>
                </div>
            </div>
            <div className="automation-grid" style={{marginTop:"42px"}}>
                <div className="auto-panel reveal">
                    <div className="eyebrow">PIPELINE / CERTIFICATE ENGINE</div>
                    <div className="auto-steps">
                        <div className="auto-row"><i>01</i>
                            <div><strong>Eligibility</strong><small>approved + checked-in</small></div>
                            <div className="ok">●</div>
                        </div>
                        <div className="auto-row"><i>02</i>
                            <div><strong>Render</strong><small>Jimp image generation</small></div>
                            <div className="ok">●</div>
                        </div>
                        <div className="auto-row"><i>03</i>
                            <div><strong>Queue</strong><small>rate-limited delivery</small></div>
                            <div className="ok">●</div>
                        </div>
                        <div className="auto-row"><i>04</i>
                            <div><strong>Send</strong><small>Nodemailer / Resend</small></div>
                            <div className="ok">●</div>
                        </div>
                    </div>
                </div>
                <div className="auto-panel reveal delay1">
                    <div className="eyebrow">OUTPUT / GENERATED ASSET</div>
                    <div className="cert-visual">
                        <div className="cert-card">
                            <div className="k">QUANTUM ARENA // OFFICIAL</div>
                            <h4>CERTIFICATE</h4>
                            <div className="line"></div>
                            <div className="name">Participant Name</div>
                            <div className="seal">DIGITAL DELIVERY // COMPLETE</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" className="wrap final">
            <div className="final-box reveal">
                <div className="final-copy">
                    <div className="eyebrow">06 // WHY THIS MATTERS</div>
                    <h2 className="final-title">We build systems<br />that run <span>operations.</span></h2>
                    <p className="final-sub">Quantum Arena is one example of the work Majin Studios can take from
                        requirement to deployed product — interfaces, backend workflows, integrations, automation and
                        operational tooling working as one system.</p>
                    <div className="final-links"><a className="btn primary magnetic" href="/#contact">Talk
                            to Majin Studios →</a><a className="btn magnetic" href="#top">Back to top ↑</a></div>
                    <div className="final-tags">
                        <span>WEB</span><span>SOFTWARE</span><span>APIs</span><span>AI</span><span>AUTOMATION</span>
                    </div>
                </div>
                <div className="final-art">
                    <div className="screen"><img src="/quantumarena/images/Screenshot 2026-08-25 204916.png"
                            alt="Quantum Arena interface preview" /></div>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <div className="wrap foot"><span>MAJIN STUDIOS // QUANTUM ARENA CASE STUDY</span><span>BUILT FOR REAL WORKFLOWS //
                <span id="year"></span></span></div>
    </footer>

    <div className="modal" id="modal" aria-hidden="true">
        <div className="modal-inner">
            <div className="modal-bar"><span id="modalTitle">QUANTUM ARENA // INTERFACE</span><button className="modal-close"
                    id="modalClose">×</button></div>
            <div className="modal-body"><img id="modalImg" alt="Quantum Arena full-size interface" /></div>
        </div>
    </div>
    </div>
  );
}
