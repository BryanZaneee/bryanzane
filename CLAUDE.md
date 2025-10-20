# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm install` - Install dependencies
- `pnpm dev` - Start Vite development server with hot reloading (port 3000, auto-opens browser)
- `pnpm build` - Build for production using Vite (outputs to `dist/`)
- `pnpm preview` - Preview production build locally
- `pnpm build:ts` - Compile TypeScript standalone (optional)
- `pnpm watch` - Watch mode for TypeScript compilation

## Project Architecture

This is a single-page portfolio website built with vanilla HTML, CSS, and TypeScript. The architecture is intentionally simple and framework-free.

### Core Files
- `src/index.html` - Main HTML structure with hero, about, skills, projects, and interactive contact chat sections
- `src/styles.css` - Complete CSS styling with glassmorphism effects, responsive design, and bold minimalist aesthetic
- `src/main.ts` - TypeScript for scroll effects, intersection observers, reveal animations, and interactive chat form
- `vite.config.ts` - Vite configuration (root: 'src', outDir: '../dist', port: 3000)
- `tsconfig.json` - TypeScript configuration (ES2019 target, ES2020 modules, strict mode)

### Key Features
- **Animated BZS pattern background** - Scrolling text pattern in hero section with staggered animations
- **Glassmorphism UI** - CSS backdrop-filter effects with glass-like components
- **Reveal animations** - Elements animate into view on scroll using Intersection Observer API
- **Interactive chat form** - Multi-step conversational contact form with validation, skip logic, and Formspree integration
- **Accessibility** - Respects `prefers-reduced-motion` preference and disables animations accordingly

### TypeScript Architecture
The `main.ts` file is organized into functional IIFE modules:
- DOM helpers (`$`, `$$`) for query selection
- Intersection Observer for `.reveal` elements with threshold and rootMargin configuration
- Intersection Observer for `.animated-text` elements
- Reduced motion handler that disables transitions and animations when user preference is set
- Interactive chat form system with:
  - Multi-step state machine (name → email → phone → workplace → role)
  - Email and phone validation
  - Skip functionality for optional fields (phone, workplace, role)
  - Dynamic message display and scrolling
  - Formspree API integration (endpoint: `https://formspree.io/f/xkgqkwbg`)

### CSS Architecture
- CSS custom properties for theming (colors, fonts, spacing, effects)
- Glassmorphism effects using `backdrop-filter: blur()`
- Mobile-first responsive design with breakpoints at 1024px (tablet), 768px (mobile), 480px (small mobile)
- Smooth transitions and keyframe animations (`streamIn`, `slideLeft`, `slideRight`, `fadeIn`, `pulse`)
- Accessibility support via `@media (prefers-reduced-motion: reduce)`

### Design System
- **Color palette**: Light beige (#f5f5f0), dark teal (#2d4a4a), navy (#0a0e27), black (#1a1a1a), accent green (#8bc34a)
- **Typography**: Inter font family with weights 300-900, extreme size range (clamp() for responsive scaling)
- **Layout**: Max container width 1400px, generous padding (60px desktop, 40px tablet, 30px/20px mobile)
- **Effects**: Glass backgrounds with rgba transparency, subtle borders, hover transforms

## Development Notes

- **Modern tooling**: Uses Vite for fast development with HMR and optimized production builds
- **TypeScript**: Compiles to ES2019 with ES2020 modules and strict type checking
- **Hot reloading**: Vite provides instant updates during development
- **Production builds**: Optimized bundles with asset hashing and minification in `dist/`
- **Static hosting**: Compatible with GitHub Pages, Netlify, Vercel, etc.
- **Source structure**: All source files in `src/`, builds output to `dist/`
- **Assets**: SVG logos in `src/img/` (bzssoftware.svg, infinichat.svg, infinity.svg)

## Git Workflow

- Repository: https://github.com/BryanZaneee/bryanzane
- Main branch: `main`
- Standard git workflow

## Important Implementation Details

- The contact form uses a conversational UI pattern where messages are pre-rendered in HTML with `display: none` and shown via JavaScript when needed
- All animations respect the `prefers-reduced-motion` media query to ensure accessibility
- The hero BZS pattern uses multiple rows with different animation speeds and delays to create a parallax-like effect
- Form submission happens via fetch API to Formspree after the conversation completes, not on individual steps
