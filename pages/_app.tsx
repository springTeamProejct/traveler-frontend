import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from '../context/AuthContext';
import Header from '../components/header';
import { Toolbar } from '@mui/material';

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  const showHeader = router.pathname === '/login' ? false : true;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          {showHeader && <><Header /><Toolbar /></>}
          <Component {...pageProps} />
        </AuthContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
