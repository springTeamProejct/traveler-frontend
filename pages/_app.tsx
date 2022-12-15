import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VMOauthKakao } from '../view_model'
import { MOauthKakao } from '../model';
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
