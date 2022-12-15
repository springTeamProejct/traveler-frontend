import Head from 'next/head'
import { useEffect } from 'react';
import { Kakao } from '../apis/oauth/kakao';

export default function Home() {

  useEffect(() => {
    const queryString = new URL(window.location.href);
    const code: any = queryString.searchParams.get('code');
    console.log(code);
    if (code !== null) {
    }

  }, [])

  return;
}
