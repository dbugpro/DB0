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

## 🚀 How to Deploy on Vercel (Step-by-Step)

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
2.  **Root Directory**: Leave as `./` (default).
3.  **Build Command**: `npm run build` (default).
4.  **Output Directory**: `dist` (default).

### Step 4: Environment Variables (CRITICAL)
**The app will not work without the API Key.**

1.  Expand the **"Environment Variables"** section in the deployment screen.
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

- **App says "Unable to connect to processing core"**:
  - This means your API Key is missing or invalid.
  - Go to your Vercel Project Settings -> Environment Variables.
  - Ensure `API_KEY` is set correctly.
  - **Important**: After changing variables, you must go to the **Deployments** tab and **Redeploy** the latest commit for changes to take effect.

- **White Screen on Load**:
  - If you see a blank screen, ensure you have removed any `importmap` scripts from `index.html` (this codebase handles that for you).
  - Check the browser console (F12) for errors.

- **"process is not defined" error**:
  - This project includes a polyfill in `index.html` to handle this automatically.
