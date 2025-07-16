import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      provider: 'v8', // or 'c8' if you prefer
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
  envPrefix: 'VITE_', // optional but makes env variables accessible via import.meta.env
});
