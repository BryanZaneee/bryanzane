# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm install` - Install dependencies
- `npm run build` - Compile TypeScript to JavaScript (main.ts → main.js)
- `npm run watch` - Watch mode for TypeScript compilation
- `npm run serve` - Start local HTTP server for development

## Project Architecture

This is a single-page portfolio website built with vanilla HTML, CSS, and TypeScript. The architecture is intentionally simple and framework-free:

### Core Files
- `src/index.html` - Main HTML structure with hero, about, skills, and projects sections
- `src/styles.css` - Complete CSS styling with glassmorphism effects and responsive design
- `src/main.ts` - TypeScript for scroll effects, color interpolation, and reveal animations

### Key Features
- **Scroll-reactive gradient background** - Interpolates between light (#F3E9DC) and dark (#323B45) colors based on scroll position
- **Glassmorphism UI** - CSS backdrop-filter effects with glass-like components
- **Reveal animations** - Elements animate into view on scroll using Intersection Observer
- **Adaptive text color** - Text color automatically adjusts based on background luminance
- **Accessibility** - Respects `prefers-reduced-motion` preference

### TypeScript Architecture
The main.ts file is organized into functional modules:
- Color utilities (hex/RGB conversion, interpolation)
- Scroll-driven background effects with smooth easing
- Intersection Observer for reveal animations
- Accessibility considerations for reduced motion

### CSS Architecture
- CSS custom properties for theming and responsive values
- Glass morphism effects using backdrop-filter
- Mobile-first responsive design with CSS Grid
- Smooth transitions and animations throughout

## Development Notes

- TypeScript compiles to ES2020 modules
- No build tools or bundlers required - just TypeScript compilation
- Static hosting compatible (GitHub Pages, Netlify, Vercel)
- The compiled main.js is loaded as a module in index.html