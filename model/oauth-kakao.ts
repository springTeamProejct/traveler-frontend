import React from 'react'

export class MOauthKakao {

  REST_API_KEY: string = "02ddaa97e21deb004a41e0f09dc46db1";
  REDIRECT_URI: string = "http://localhost:3000/";
  KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${this.REST_API_KEY}&redirect_uri=${this.REDIRECT_URI}&response_type=code`;

  constructor() {
  }
  GetRestApiKey(): string {
    return this.REST_API_KEY;
  }
}

