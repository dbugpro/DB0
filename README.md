# Polaris 0.0

Polaris is an advanced AI assistant visualized as a floating, interactive blue sphere. Built with React, Vite, and the Google Gemini 2.5 Flash API.

## Features

- **Real-time AI Chat**: Powered by Google's Gemini 2.5 Flash model.
- **Interactive Visuals**: A 3D-style CSS sphere that reacts to states (Idle, Listening, Thinking, Speaking).
- **Streaming Responses**: Real-time text generation.
- **Responsive Design**: Works on desktop and mobile.

## Prerequisites

- Node.js (v18 or higher)
- A Google Cloud Project with the [Gemini API enabled](https://aistudio.google.com/app/apikey)
- A GitHub, GitLab, or Bitbucket account (for Vercel deployment)

## Local Development

1.  **Clone the repository** (or download the source code).

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up your API Key**:
    Create a file named `.env` in the root directory and add your key:
    ```env
    API_KEY=your_google_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 How to Deploy on Vercel

Follow these steps to deploy Polaris 0.0 to the web for free using Vercel.

### Step 1: Push to Git
Push your code to a Git provider (GitHub, GitLab, or Bitbucket).

### Step 2: Import into Vercel
1.  Log in to [Vercel](https://vercel.com).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your repository and click **"Import"**.

### Step 3: Configure Project
Vercel should automatically detect that this is a **Vite** project.

1.  **Framework Preset**: Ensure it is set to `Vite`.
2.  **Root Directory**: Leave as `./`.
3.  **Build Command**: `npm run build` (default).
4.  **Output Directory**: `dist` (default).

### Step 4: Environment Variables (CRITICAL)
**The app will not work without the API Key.**

1.  Expand the **"Environment Variables"** section.
2.  Add a new variable:
    *   **Key**: `API_KEY`
    *   **Value**: Paste your Google Gemini API Key (starting with `AIza...`).
3.  Click **"Add"**.

### Step 5: Deploy
1.  Click the **"Deploy"** button.
2.  Wait for the build to finish.
3.  Once complete, your app will be live at a URL like `https://polaris00.vercel.app`.

---

## Troubleshooting Vercel Deployments

- **White Screen on Load**:
  - Ensure you added the `API_KEY` in the Environment Variables settings.
  - Redeploy (go to Deployments -> Redeploy) if you added the key *after* the initial build failed.

- **Process is not defined**:
  - This project includes a polyfill in `index.html` and configuration in `vite.config.ts` to handle this. Ensure `vite.config.ts` is present in the root.
