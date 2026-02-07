import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const viteConfig = defineViteConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // react-query 가 루트/하위 패키지에 중복 설치되어도
    // 하나의 인스턴스만 사용하도록 강제
    dedupe: ['@tanstack/react-query'],
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});

export default mergeConfig(viteConfig, vitestConfig);
