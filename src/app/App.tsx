import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './routes';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'flag-icons/css/flag-icons.min.css';
import { ThemeProvider } from 'next-themes';
import './i18n';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 100,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
