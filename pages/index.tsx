import Head from 'next/head'
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { tokenAtom, myPorfileAtom } from '../store/user';
import { useRecoilValue } from 'recoil';


export default function Home() {
  // useEffect(() => {
  //   const queryString = new URL(window.location.href);
  //   const code: any = queryString.searchParams.get('code');
  //   // console.log(typeof(code));
  //   console.log(code);
  //   getKakaoTocken.mutate(code);
  // }, [])
  // if (getKakaoTocken.isLoading) return <p>Loading...</p>

  // if (getKakaoTocken.error) return <p>An error has occurred</p>

  // if (getKakaoTocken.isSuccess) {
  //   console.log(getKakaoTocken.data)
  //   return <p> Success </p>
  // }
  useEffect(() => {
    const queryString = new URL(window.location.href);
    const code: any = queryString.searchParams.get('code');
    console.log(code);
    if (code !== null) {
    }

  }, [])
  const getToken = useRecoilValue(tokenAtom);
  const getProfile = useRecoilValue(myPorfileAtom);
  return (
    <>
      <p>메인페이지accessToken: {JSON.stringify(getToken)} </p>
      <br />
      <p>profile: {JSON.stringify(getProfile)} </p>
    </>
  )
}
