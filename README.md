# PulseLedger Finance Dashboard

A clean, responsive finance dashboard website built with plain HTML, CSS, and JavaScript. It uses mock transaction data, client-side state, and `localStorage` persistence to demonstrate dashboard behavior without a backend.

## What it includes

- Overview cards for total balance, income, and expenses
- Operating metrics for savings rate, average expense, latest income, and activity depth
- Time-based balance trend visualization built with SVG
- Categorical spending breakdown with a donut chart and legend
- Budget tracking section with user-defined category-level progress
- Recent activity feed for the latest transactions
- Transactions table with search, filtering, sorting, editing, and deletion in admin mode
- CSV/JSON import flow for transaction exports, with manual editing still available after import
- Currency switcher for viewing the dashboard in `USD`, `INR`, `EUR`, or `GBP`
- Account entry screen where a user signs in with username and email before entering the dashboard
- Single-session app flow so the dashboard opens directly into that user's workspace instead of offering in-app account switching
- Per-user budget setup so each account can define and update its own monthly category limits
- App-style tab navigation with dedicated `Dashboard`, `Goals`, `Profile`, and `Settings` sections
- Savings goals view with progress tracking across multiple targets
- Profile and settings pages with export and preference controls
- Simulated role-based UI:
  - `Viewer` can inspect the dashboard and transactions
  - `Admin` can add, edit, delete, import, and remove imported transactions
- Insight cards for highest spending category, comparison trend, and savings signal
- Responsive layout and graceful empty states
- Data reset action for quick demo recovery

## Project structure

- `index.html` contains the dashboard shell
- `styles.css` contains the full visual system and responsive rules
- `main.js` manages state, rendering, filtering, charts, and role-based behavior
- The app opens on a sign-in screen first, then unlocks the dashboard for that user after the credentials are entered

## How to run locally

Because the app is fully static, you can open `index.html` directly in a browser.

If you prefer a local server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

You can also use:

```bash
npm run dev
```

That command uses Python's built-in static server under the hood.

## How to publish it as a website

### Option 1: Netlify

1. Create a GitHub repository and upload this project.
2. Sign in to Netlify and choose **Add new project**.
3. Import the GitHub repo.
4. Set the publish directory to `.` if Netlify asks.
5. Deploy.

This project already includes `netlify.toml`, so Netlify can serve it as a static site immediately.

### Option 2: Vercel

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Keep the default static deployment settings.
4. Deploy.

This project includes `vercel.json`, so Vercel can host it without extra app framework setup.

### Option 3: GitHub Pages

1. Create a GitHub repo and push these files.
2. Open the repo on GitHub.
3. Go to **Settings** -> **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save.

GitHub will publish the site on a public URL like:

```text
https://your-username.github.io/your-repo-name/
```

## Suggested submission flow

If this is for an assignment, a strong handoff is:

1. Push the project to GitHub.
2. Deploy it on Netlify or Vercel.
3. Submit both:
   - Repository link
   - Live website link
4. Mention that the dashboard is intentionally frontend-only and uses mock data with local persistence.

## Approach

I kept the implementation intentionally lightweight and review-friendly:

- No backend dependency
- No external charting library
- Simple state container in `main.js`
- Derived dashboard insights computed from transaction data
- `localStorage` used to persist the selected role, filters, and edited transactions
- User profiles, imported batches, and active session state are also persisted in `localStorage`

## Notes for evaluation

- The UI is designed to make the role switch obvious during review
- Reviewers land on a lightweight sign-in screen first, which makes the experience feel closer to a real finance product
- Empty states appear when filters remove all transactions or when chart data is unavailable
- The layout is optimized for desktop, tablet, and mobile screen sizes
- Sample data is included so the dashboard feels complete on first load
- The project is deployment-ready as a static website for Netlify, Vercel, or GitHub Pages
