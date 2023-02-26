import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from '../context/AuthContext';
import Header from '../components/header';
import { Container, Toolbar } from '@mui/material';
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  const showHeader = router.pathname === '/login' ? false : true;

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Container maxWidth="lg">
              {showHeader && <><Header /><Toolbar /></>}
              <Component {...pageProps} />
            </Container>
          </AuthContextProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}