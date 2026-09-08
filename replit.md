# Rajesh Koyi Portfolio

## Overview

A single-page, dark-mode-first portfolio for Rajesh Koyi, Senior Software Engineer. The site is built with Next.js 15 App Router, TypeScript, Framer Motion, and a custom responsive CSS system.

## Sections

- **Hero** — Animated role rotation, availability status, and coordinate cue
- **Impact** — Animated count-up stats (test coverage, transactions, SSO users, zero CVEs)
- **Projects** — Six featured architecture projects across fintech, logistics, robotics, IoT, and academia
- **Capabilities** — Six-column skills matrix (Frontend, Backend, Cloud & Data, DevOps, Architecture, AI & Security)
- **Experience** — Five career chapters (Goldman Sachs, TIAA, Arkansas State University, Wipro × FedEx, BHEL)
- **Recognition** — Three key recognition milestones
- **Research** — IJSRET peer-reviewed publication on autonomous maze-solving robotics
- **Beyond the Code** — Education (MS ASU, BTech KLEF), certifications, and personal narrative
- **Contact** — Email CTA, location, and social links

## Run

```bash
npm run dev
```

The development server listens on port 5000. Production builds can be tested with `npm run build && npm run start`.

## Notes

- Theme preference is persisted in local storage.
- Animations use viewport-aware Framer Motion reveals and CSS sticky positioning for the experience stack.
- The contact CTA uses `mailto:` and the social links point to Rajesh's final profile URLs.