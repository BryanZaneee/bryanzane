# Personal Portfolio

A single-page portfolio website built with vanilla HTML, CSS, and TypeScript. Features an animated background, glassmorphism UI, project showcase, and interactive conversational contact form.

## Features

- Animated BZS pattern background with staggered scrolling effects
- Glassmorphism design with backdrop-filter effects
- Scroll-triggered reveal animations using Intersection Observer
- Interactive multi-step chat form for contact with Formspree integration
- Fully responsive design with mobile-first approach
- Respects prefers-reduced-motion for accessibility

## Tech Stack

- HTML, CSS, TypeScript
- Vite for development and production builds
- No frameworks or dependencies

## Project Structure

- `src/index.html` - Main HTML with hero, about, skills, projects, and chat sections
- `src/styles.css` - Complete styling with glassmorphism and animations
- `src/main.ts` - TypeScript for scroll effects, animations, and chat form logic
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## Development

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (port 3000, auto-opens browser)
pnpm build            # Build for production (outputs to dist/)
pnpm preview          # Preview production build
```

## Deployment

Build the project with `pnpm build`, then deploy the `dist/` folder to any static hosting service like GitHub Pages, Netlify, or Vercel.