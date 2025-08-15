# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm install` - Install dependencies
- `pnpm dev` - Start Vite development server with hot reloading (port 3000)
- `pnpm build` - Build for production using Vite
- `pnpm preview` - Preview production build locally
- `pnpm build:ts` - Compile TypeScript standalone (optional)
- `pnpm watch` - Watch mode for TypeScript compilation

## Project Architecture

This is a single-page portfolio website built with vanilla HTML, CSS, and TypeScript. The architecture is intentionally simple and framework-free:

### Core Files
- `src/index.html` - Main HTML structure with hero, about, skills, and projects sections
- `src/styles.css` - Complete CSS styling with glassmorphism effects and responsive design
- `src/main.ts` - TypeScript for scroll effects, color interpolation, and reveal animations
- `vite.config.ts` - Vite configuration for development and build
- `tsconfig.json` - TypeScript configuration

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

- **Modern tooling**: Uses Vite for fast development and optimized builds
- **TypeScript**: Compiles to ES2020 modules with strict type checking
- **Hot reloading**: Vite provides instant updates during development
- **Production builds**: Optimized bundles with asset hashing and minification
- **Static hosting**: Compatible with GitHub Pages, Netlify, Vercel, etc.
- **Source structure**: All source files in `src/`, builds output to `dist/`

## Git Workflow

- Repository: https://github.com/BryanZaneee/bryanzane
- Main branch: `main`
- Standard git workflow with conventional commits