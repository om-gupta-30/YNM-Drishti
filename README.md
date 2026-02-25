# YNM Drishti

<div align="center">

![YNM Drishti](./ynm-drishti/public/logo-bg.png)

**AI-powered road infrastructure monitoring using computer vision and deep learning**

[![CI](https://github.com/your-org/ynm-drishti/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/ynm-drishti/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19.2-61DAFB.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF.svg?logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

</div>

---

## Overview

YNM Drishti is an AI-driven road infrastructure intelligence company based in Hyderabad, India. We detect, analyse, and report road conditions — potholes, signages, barriers, lane markings, and more — with 99.8 % accuracy.

This repository contains the **official company website** built with React + Vite + Tailwind CSS.

---

## Quick Start

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- (Optional) **Docker** for containerised deployment

### Run locally

```bash
# Install dependencies
make install

# Copy env template (chatbot works without a key — fallback mode)
cp ynm-drishti/.env.example ynm-drishti/.env

# Start dev server → http://localhost:5173
make dev
```

### Production build

```bash
make build        # outputs to ynm-drishti/dist/
make preview      # preview it locally
```

---

## Make Targets

Run `make help` for the full list.

| Target | Description |
|--------|-------------|
| `make install` | Install npm dependencies |
| `make dev` | Start Vite dev server |
| `make build` | Production build |
| `make preview` | Preview production build |
| `make lint` | Run ESLint |
| `make clean` | Remove `node_modules/` and `dist/` |
| `make fresh` | Clean reinstall |
| `make up` | Install + dev server |
| `make docker-build` | Build Docker image |
| `make docker-run` | Run container on port 8080 |
| `make docker-up` | Build + run in one step |
| `make docker-stop` | Stop and remove container |

---

## Project Structure

```
.
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Lint → Build → Docker on every push/PR
│   │   └── deploy.yml          # Deploy to Cloud Run on push to main
│   ├── dependabot.yml          # Weekly dependency updates
│   └── pull_request_template.md
├── ynm-drishti/                # Application source
│   ├── public/                 # Static assets (logos, mascot)
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   └── ui/             # UI primitives (Toast, TiltCard)
│   │   ├── pages/              # Route-level pages
│   │   ├── data/               # Static data (chatbot knowledge base)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── App.jsx             # Root component with routing
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── Dockerfile              # Multi-stage build (Node → Nginx)
│   ├── nginx.conf              # Production Nginx config
│   ├── cloudbuild.yaml         # Google Cloud Build config
│   ├── vercel.json             # Vercel deployment config
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── .env.example            # Env template (safe to commit)
├── Makefile                    # All dev/build/docker commands
├── LICENSE
├── .gitignore
└── README.md
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, features, stats, testimonials |
| About Us | `/about` | Company story, mission, vision, timeline |
| Leadership | `/leadership` | Director profile, expertise, achievements |
| Solutions | `/solutions` | Use cases, detection capabilities |
| Technology | `/technology` | AI pipeline, architecture, specs |
| Clients | `/clients` | Industries served, case studies |
| Partnerships | `/partnerships` | Collaboration models, inquiry form |
| Investors | `/investors` | Market opportunity, growth roadmap |
| Contact | `/contact` | Contact form, FAQ, departments |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | UI framework |
| React Router | 7.x | Client-side routing |
| Vite | 7.3 | Build tool and dev server |
| Tailwind CSS | 4.1 | Utility-first CSS |
| Framer Motion | 12.34 | Animations |
| Lucide React | 0.563 | Icons |
| Google Gemini AI | 2.5 Flash | AI chatbot |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | No | Google Gemini API key for the chatbot (fallback mode without it) |

Get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

> **Never commit `.env` files.** The `.gitignore` blocks them. Set secrets through your platform's dashboard or CI secrets.

---

## CI / CD

### Continuous Integration (every push and PR)

The **CI** workflow (`.github/workflows/ci.yml`) runs automatically:

1. **Lint** — ESLint checks
2. **Build** — Vite production build (artifact uploaded for 7 days)
3. **Docker Build** — validates the Dockerfile builds successfully
4. **Dependency Audit** — flags high-severity npm vulnerabilities

### Continuous Deployment (push to `main`)

The **Deploy** workflow (`.github/workflows/deploy.yml`) runs the full CI, then deploys to **Google Cloud Run**.

### Dependabot

Automated weekly PRs for npm and GitHub Actions version bumps.

### Required GitHub Secrets

| Secret | Purpose |
|--------|---------|
| `VITE_GEMINI_API_KEY` | Gemini API key (used at Docker build time) |
| `GCP_PROJECT_ID` | Google Cloud project ID |
| `GCP_SERVICE_ACCOUNT` | Service account email |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Workload Identity Federation provider |

Optional repository variable: `GCP_REGION` (defaults to `us-central1`).

---

## Deployment

### Vercel (recommended for previews)

1. Import the repo on [Vercel](https://vercel.com)
2. Set **Root Directory** to `ynm-drishti`
3. Add `VITE_GEMINI_API_KEY` in the Vercel dashboard
4. Deploy — `vercel.json` handles the rest

### Google Cloud Run (production)

Handled automatically by the deploy workflow on push to `main`. For manual deployment:

```bash
make docker-build
make docker-run       # → http://localhost:8080
```

### Any static host

Deploy the `ynm-drishti/dist/` folder to Netlify, Firebase Hosting, AWS S3 + CloudFront, etc. Configure your host to serve `index.html` for all routes (SPA).

---

## Security

- **`.env` is git-ignored** — secrets never reach the repo
- **`.env.example`** contains only placeholder values (safe to commit)
- **CI secrets** are stored in GitHub's encrypted secrets store
- **Vercel / GCP secrets** are configured in each platform's dashboard
- **No hardcoded keys** anywhere in the source code
- The Gemini API key is optional — the chatbot falls back to a local knowledge base

---

## License

Proprietary — all rights reserved. See [LICENSE](LICENSE) for details.

---

## Contact

- **Website**: [ynmdrishti.com](https://ynmdrishti.com)
- **Email**: info@ynmdrishti.com
- **Location**: Hyderabad, Telangana, India

---

<div align="center">

**Built by the YNM Drishti Team**

</div>
