import Head from 'next/head'
import { useEffect } fr
import { Kakao } from '../apis/oauth/kakao';
import styles from '../styles/Home.module.css'
import { useMutation, useQuery } from '@tanstack/react-query';
import { MOauthKakao } from "../model/"


export default function Home() {
  // useEffect(() => {
  //   const queryString = new URL(window.location.href);
  //   const code: any = queryString.searchParams.get('code');
  //   // console.log(typeof(code));
  //   console.log(code);
  //   getKakaoTocken.mutate(code);
  // }, [])

  useEffect(() => {
    const queryString = new URL(window.location.href);
    const code: any = queryString.searchParams.get('code');
    console.log(code);
    if (code !== null) {
    }

  }, [])

  return;
  // if (getKakaoTocken.isLoading) return <p>Loading...</p>

  // if (getKakaoTocken.error) return <p>An error has occurred</p>

  // if (getKakaoTocken.isSuccess) {
  //   console.log(getKakaoTocken.data)
  //   return <p> Success </p>
  // }
  return (
    <>
    </>
  )
}
