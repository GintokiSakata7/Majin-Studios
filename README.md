# Majin Studios — Global Experience System

This is the central web platform for **Majin Studios**, engineered around a custom cinematic architecture.

## Architecture

The experience is built on a 5-layer model:

1. **DOM**: Semantic story and content layer (`z-index: 40`)
2. **SVG**: Interactive motion paths (`z-index: 30`)
3. **2.5D UI**: Elevated panels and dashboards (`z-index: 20`)
4. **Three.js**: Persistent WebGL universe (`z-index: 10`)
5. **Atmosphere**: Background glows and scanlines (`z-index: 0`)

The application avoids hard cuts, instead relying on continuous spatial movement choreographed to the user's scroll progression using GSAP `ScrollTrigger` and `@react-three/fiber`.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + Custom CSS Modules (Vanilla)
- **3D Engine**: Three.js + React Three Fiber + Drei
- **Animation**: GSAP + ScrollTrigger
- **State**: Zustand

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
