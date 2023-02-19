import React from 'react'
import { OAuthKakaoButton, OAuthNaverButton } from '../../components/oauth'

export default function Signin() {
    return (
        <div>
            <OAuthKakaoButton />
            <OAuthNaverButton />
        </div>
    )
}