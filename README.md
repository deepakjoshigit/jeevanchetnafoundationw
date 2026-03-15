# Jeevan Chetna Foundation

This project is a React application built with Vite and Tailwind CSS.

## Vercel Deployment

This project is ready for deployment on Vercel.

### Steps to Deploy:

1. **Push to GitHub/GitLab/Bitbucket:**
   - Ensure your code is pushed to a repository.

2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com) and click **"Add New"** -> **"Project"**.
   - Import your repository.

3. **Configure Project:**
   - **Framework Preset:** Vite (should be auto-detected).
   - **Build Command:** `npm run build`.
   - **Output Directory:** `dist`.

4. **Environment Variables:**
   - If you use any API keys (like `GEMINI_API_KEY`), add them in the Vercel dashboard under **Settings > Environment Variables**.

5. **Deploy:**
   - Click **"Deploy"**.

### Client-Side Routing
A `vercel.json` file has been included to handle client-side routing (SPA), ensuring that all paths redirect to `index.html`.
