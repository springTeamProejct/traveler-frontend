import React from 'react'
import { OAuthKakaoButton, OAuthNaverButton } from '../../components/oauth'

export const Signin = () => {
    return (
        <div>
            <OAuthKakaoButton />
            <OAuthNaverButton />
        </div>
    )
}