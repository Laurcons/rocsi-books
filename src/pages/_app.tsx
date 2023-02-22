import { queryClient } from '@/lib/queryClient';
import type { AppProps } from 'next/app'
import React from 'react';
import { QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </>;
}
