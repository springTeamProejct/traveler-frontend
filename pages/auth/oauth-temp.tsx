import { Stack } from '@mui/system'
import React from 'react'
import { OAuthKakaoButton } from '../../components/oauth'
import { OAuthNaverButton } from '../../components/oauth'

const OAuthTemp = () => {
    return (
        <Stack>
            <OAuthKakaoButton />
            <OAuthNaverButton />
        </Stack>

    )
}

export default OAuthTemp;