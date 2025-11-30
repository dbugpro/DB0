import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Safely make the API key available to the client-side code
      // We default to "" (empty string) to ensure the variable is always replaced
      // preventing "process.env.API_KEY" from remaining in the built code.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || ""),
    },
  };
});