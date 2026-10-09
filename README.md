# ElevateU

ElevateU is an AI-powered career guidance platform for students. It provides interactive skill assessments, personalized career recommendations, skill gap analysis, resume review, and tailored learning roadmaps — all designed to help students define and achieve their career goals.

## Tech Stack

- **Framework & Build**: React 19, Vite
- **Styling**: Tailwind CSS (with a custom light/dark design-token system)
- **Routing**: React Router v7
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **Testing**: Vitest, React Testing Library, Playwright

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/ashmitakhanal306/ElevateU.git
   ```
2. Navigate into the project directory:
   ```bash
   cd ElevateU
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create local environment file:
   ```bash
   cp .env.example .env
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Compiles production assets into the `dist/` directory.
- `npm run lint`: Runs the oxlint linter across the codebase.
- `npm run test`: Runs the Vitest unit and component test suite.
- `npm run test:e2e`: Runs the Playwright end-to-end core user journey tests.

## Live Demo

[https://elevate-u-lemon.vercel.app/](https://elevate-u-lemon.vercel.app/)

## Status

This is a frontend prototype using modular mock/service layers designed for seamless backend API integration.
