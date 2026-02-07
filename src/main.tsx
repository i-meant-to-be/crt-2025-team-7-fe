import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { GlobalPortal } from './utils/GlobalPortal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './routes/routes.tsx';

if (import.meta.env.VITE_ENABLE_MOCKS === 'true') {
  // If mocking is enabled, dynamically import the mock worker
  import('./mocks/browser.ts').then(({ worker }) => {
    worker
      .start({
        onUnhandledRequest: (request, print) => {
          // Let worker dismiss non-api calls by check whether url includes '/api'
          if (!request.url.includes('/api')) {
            console.log(
              "Dismissed request that doesn't include /api/: " + request.url,
            );
          }

          print.warning();
        },
      })
      .then(() => {
        // After all jobs are done, initialize main React app
        initializeApp();
      });
  });
} else {
  // If mocking is disabled, directly initialize main React app
  initializeApp();
}

function initializeApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
      },
      mutations: {
        throwOnError: true,
      },
    },
  });

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GlobalPortal.Provider>
          <RouterProvider router={router} />
        </GlobalPortal.Provider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
