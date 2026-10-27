import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site:
//   https://omarmahmoudgames2010-coder.github.io/Portofolio.Omar/
// The base path must match the repository name exactly (it is case-sensitive).
// Override for local experiments with:  VITE_BASE=/ npm run dev
const base = process.env.VITE_BASE ?? '/Portofolio.Omar/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
