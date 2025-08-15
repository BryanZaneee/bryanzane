Here’s a concise README you can drop in as README.md.

# Personal Portfolio (TypeScript)

A clean, professional single‑page portfolio website built with HTML, CSS, and TypeScript. It showcases who I am, my skills, and selected projects with live previews, GitHub links, and “Live App” buttons.

Highlights
- Subtle scroll‑reactive gradient background between #F3E9DC and #323B45
- Glassmorphism UI with smooth reveal animations on scroll
- Responsive layout: splash/hero, about + skills, and projects
- Project cards include embedded previews, GitHub, and Live App links
- Respects prefers‑reduced‑motion for accessibility

Tech
- HTML + CSS for structure and styling
- TypeScript for scroll effects, color interpolation, and animations
- No frameworks required

Project structure
- index.html — markup for all sections
- styles.css — styles and glass UI
- main.ts — TypeScript for background + reveal animations
- tsconfig.json — TypeScript config
- package.json — scripts and dev dependencies

Quick start
- npm install
- npm run build
- Open index.html in your browser
- Optional: npm run serve to start a local server

Customize
- Edit text, links, and project cards in index.html
- Replace iframe src with your live app URLs
- Tweak colors, spacing, and glass styles in styles.css

Deploy
- Build (npm run build), then upload index.html, styles.css, and main.js to any static host (GitHub Pages, Netlify, Vercel, etc.).