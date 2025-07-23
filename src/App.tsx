import { routeConfig } from '@presentation/configs/routeConfig';
import { tanstackQueryClient } from '@presentation/configs/tanstackQueryConfig';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function AppRoutes() {
  return useRoutes(Object.values(routeConfig));
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={tanstackQueryClient}>
      <ScrollToTop />
      <AppRoutes />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
