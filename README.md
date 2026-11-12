# ElevateU

**ElevateU** is an AI-powered career guidance platform for students. It provides interactive skill assessments, personalized career recommendations, skill gap analysis, and tailored learning roadmaps to help students define and achieve their career goals.

## 🌐 Live Demo

> Hosted on Vercel — [https://elevateu.vercel.app](https://elevateu.vercel.app)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Routing** | React Router v7 |
| **State Management** | Zustand |
| **Backend / Auth** | Supabase |
| **AI Assistant** | Google Gemini API (`@google/genai`) |
| **Animations** | Framer Motion |
| **Data Visualization** | Recharts |
| **Icons** | Lucide React, Simple Icons |
| **Testing** | Vitest, React Testing Library, Playwright |
| **Linting** | oxlint |

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/ashmitakhanal306/ElevateU.git
cd ElevateU
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Then open `.env` and fill in your credentials:

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/publishable key |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID (for SSO) |
| `VITE_GEMINI_API_KEY` | Google Gemini API key (for AI assistant) |
| `VITE_API_URL` | Base URL for backend API services |

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Compile production assets into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run oxlint static analysis |
| `npm run test` | Run Vitest unit and component tests |
| `npm run test:ui` | Run Vitest with the interactive UI |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run test:e2e:ui` | Run Playwright tests with the interactive UI |

---

## 📁 Project Structure

```
ElevateU/
├── public/           # Static assets
├── src/              # Application source code
│   ├── components/   # Reusable UI components
│   ├── pages/        # Route-level page components
│   ├── store/        # Zustand state stores
│   └── services/     # API & service layer
├── supabase/         # Supabase seeds and config
├── e2e/              # Playwright end-to-end tests
├── .env.example      # Environment variable template
├── vercel.json       # Vercel SPA routing config
└── vite.config.js    # Vite build configuration
```

---

## 🧪 Testing

**Unit & Component Tests** (Vitest + React Testing Library):
```bash
npm run test
```

**End-to-End Tests** (Playwright):
```bash
npm run test:e2e
```

---

## 📝 Notes

- This project uses **Supabase** for authentication and database.
- The **Gemini API** powers the AI career assistant feature.
- `vercel.json` includes a catch-all rewrite rule to support client-side routing on Vercel.
- The project is a frontend application with a modular service layer designed for seamless backend API integration.
