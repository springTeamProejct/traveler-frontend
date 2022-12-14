import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'

export class VMOauthKakao {
  model: object;

  constructor(model: object) {
    this.model = model;
  }

  GetKakaoTocken() {
    useMutation({
      mutationFn: (authorization_code: string) => {
        const json_parameters = {
          "grant_type": "authorization_code",
          "client_id": "02ddaa97e21deb004a41e0f09dc46db1",
          "redirect_uri": "http://localhost:3000/",
          "code": authorization_code
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
  }
}
