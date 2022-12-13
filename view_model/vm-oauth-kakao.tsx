import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'

export const Test = () => {
      
  const getKakaoTocken = useMutation({
    mutationFn: (code : string) => {
      const json_parameters = {
        "grant_type" : "authorization_code",
        "client_id" : "02ddaa97e21deb004a41e0f09dc46db1",
        "redirect_uri" : "http://localhost:3000/",
        "code" : code
      }
      return fetch(
        `https://kauth.kakao.com/oauth/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          body: new URLSearchParams(json_parameters),
        }
      ).then(res => res.json())
    }
  })

  useEffect(() => {
  const queryString = new URL(window.location.href);
    const code: any = queryString.searchParams.get('code');
    // console.log(typeof(code));
    console.log(code);
    getKakaoTocken.mutate(code); 
  }, [])
  
  if (getKakaoTocken.isLoading) return <p>Loading...</p>
  
  if (getKakaoTocken.error) return <p>An error has occurred</p>

  if (getKakaoTocken.isSuccess){
    console.log(getKakaoTocken.data)
    return  <p> Success </p>
  } 
 
  return (
    <div>Test</div>
  )
}
