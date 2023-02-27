import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from '../context/AuthContext';
import Header from '../components/header';
import { Toolbar } from '@mui/material';
import Script from 'next/script';

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  const showHeader = router.pathname === '/login' ? false : true;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Script
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=18a1a779c03cd51dc421996208ed9e7b&libraries=services,clusterer&autoload=false"
            strategy="beforeInteractive"
            defer
          />
          {showHeader && <><Header /><Toolbar /></>}
          <Component {...pageProps} />
        </AuthContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}