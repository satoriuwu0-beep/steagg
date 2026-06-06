<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a20d7ef2-f969-4864-acfe-44a2474fac07

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to Vercel

This is a static Vite + React single-page app, ready to deploy on Vercel.

**Option A – Dashboard:**
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New → Project** and import the repo.
3. Vercel auto-detects the settings from `vercel.json` (framework: Vite,
   build: `npm run build`, output: `dist`). Just click **Deploy**.

**Option B – CLI:**
```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

No environment variables are required to build or run this app.
