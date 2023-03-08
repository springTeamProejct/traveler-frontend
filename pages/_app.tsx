import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from '../context/AuthContext';
import Header from '../components/header';
import { Button, Container, Toolbar } from '@mui/material';
import ChatController from '../components/Chat';

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  const showHeader = router.pathname === '/login' ? false : true;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Container maxWidth="lg">
            {showHeader && <><Header /><Toolbar /></>}
            <Component {...pageProps} />
          </Container>
          <ChatController />
        </AuthContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}