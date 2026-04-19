# TrackMyJob

TrackMyJob is a React + Vite web app for managing job applications, tracking status, and analyzing job descriptions with an AI-powered analyzer.

## Features

- Add, edit, and delete job applications
- Filter jobs by status: All, Applied, Interview, Offer, Rejected
- Search by company or role
- Sort jobs by date or company name
- Dark mode support with site-wide styling
- Dashboard with application statistics and pie chart visualization
- AI Job Analyzer page powered by Gemini API for JD fit scoring and suggestions
- Local persistence using `localStorage`

## Built with

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Recharts

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Gemini API key

Create a `.env` file in the project root with:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Then restart the Vite dev server so `import.meta.env` picks up the value.

### 3. Run locally

```bash
npm run dev
```

Open the local URL shown in your terminal and start using the app.

## Usage

- Use the **Dashboard** to view totals and application breakdown
- Use the **Jobs** page to search, filter, and manage your applications
- Use the **+ Add job** button to save a new job entry
- Use the **AI Analyzer** page to paste a job description and get a fit score

## Notes

- The AI analyzer uses Google Gemini via a public API key. The free tier may return `429 Too Many Requests` if the rate limit is reached.
- If you receive a rate limit error, wait a short time and try again.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build the production bundle
- `npm run preview` — preview the build locally
- `npm run lint` — run ESLint checks

## Project structure

- `src/` — application source files
- `src/Context/JobContext.jsx` — shared job state and dark mode state
- `src/Pages/` — route pages: Dashboard, Jobs, AddJob, AIAnalyzer, NotFound
- `src/Components/` — reusable UI components and status badges
- `public/favicon.svg` — app favicon asset

## Troubleshooting

- If the AI analyzer fails, verify your `VITE_GEMINI_API_KEY` entry and restart the dev server.
- If the favicon does not update, clear your browser cache or hard refresh the page.
