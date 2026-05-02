# ChronoBreak

**ChronoBreak — Black Hole Relativity Lab** is an interactive physics visualization project focused on black holes, event horizons, gravitational time dilation, gravitational redshift, photon path bending and causal structure.

It is designed as a portfolio-grade physics/software project: not a game, not a static animation, and definitely not another calculator with a dark theme pretending to be advanced.

## Features

- Interactive Canvas black hole simulation
- Photon path bending visualization
- Light cone distortion mode
- Gravitational redshift mode
- Time dilation / spacetime grid mode
- Live relativity-inspired metrics
- Observer comparison panel
- Educational formula cards
- Preset scenarios
- Save and reload experiments with `localStorage`
- Export the current simulation as PNG
- Responsive interface
- Clean React + TypeScript architecture

## Stack

- React
- TypeScript
- Vite
- Canvas API
- Framer Motion
- Lucide React

## Running locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Structure

```txt
src/
├── components/
├── data/
├── hooks/
├── lib/
├── styles/
├── App.tsx
├── main.tsx
└── types.ts
```

## Physics model note

ChronoBreak uses simplified Schwarzschild-inspired equations and qualitative visual approximations. It is built for interactive intuition and educational visualization, not numerical general relativity research.

Future versions can add Kerr black holes, better geodesic approximations, real lensing field distortion, observer communication timelines, exportable lab reports and rigorous derivation panels.
