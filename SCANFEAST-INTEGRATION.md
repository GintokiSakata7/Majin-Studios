# Scanfeast Architectural Polish Pass

This bundle replaces the Scanfeast case-study presentation layer.

## 1. Copy files

Copy:

- `components/scanfeast/*`
- `scripts/*`
- `app/scanfeast/page.tsx`

Do not delete the old implementation until the new route is verified.

## 2. Required packages

The implementation expects the packages already used by the existing project:

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `playwright` for the screenshot script

No GSAP dependency is required by the new walkthrough.

## 3. Required GLBs

The new scene uses only these known model names:

- table_round_A.glb
- chair_A.glb
- stove_multi.glb
- pan_A.glb
- food_ingredient_burger_uncooked.glb
- food_ingredient_burger_cooked.glb
- food_ingredient_tomato.glb
- food_ingredient_onion.glb
- food_ingredient_lettuce.glb
- bowl.glb
- plate.glb
- cuttingboard.glb
- knife.glb
- server.glb
- chef.glb

Run:

```bash
node scripts/verify-scanfeast-assets.mjs
```

## 4. Product screenshots

Generate:

```text
public/scanfeast/images/diner@3x.png
public/scanfeast/images/kds@2x.png
public/scanfeast/images/manager@2x.png
```

Run:

```bash
node scripts/capture-scanfeast-surfaces.mjs
```

Routes can be overridden:

```bash
SCANFEAST_URL=http://localhost:3000 \
SCANFEAST_DINER_URL=http://localhost:3000/scanfeast \
SCANFEAST_KDS_URL=http://localhost:3000/kitchen \
SCANFEAST_MANAGER_URL=http://localhost:3000/manager \
node scripts/capture-scanfeast-surfaces.mjs
```

## 5. Performance architecture

The Canvas uses:

```tsx
frameloop="demand"
```

and is invalidated by:

- scroll
- active cinematic animations
- resize

The scene does not use `<Preload all />`.

## 6. Important visual rule

Do not re-add the old:

- WorldStatus
- SystemCore
- SystemNetwork
- DataPulse
- ReadyCelebration

The new scene is explicitly staged as:

```text
DINER
↓
SERVICE
↓
KITCHEN
↓
READY
↓
OPERATIONS
↓
SYSTEM
```

The camera is always authored to look toward the current composition instead of crossing through the building.

## 7. Font loading

Do not use `@import` inside the case-study CSS.

Use your existing Next font pipeline/global typography. The CSS intentionally falls back to system UI and monospace stacks.
