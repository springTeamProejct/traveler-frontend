import { useMutation } from '@tanstack/react-query'
import { KakaoOAuthDatas } from '../../utils'

export const Kakao = () => {
    const KakaoOAuthDatas_ = KakaoOAuthDatas();

    const getKakaoTocken = useMutation({
        mutationFn: (authorizationCode: string) => {
            const json_parameters = {
                "grant_type": "authorization_code", // 고정
                "client_id": KakaoOAuthDatas_.REST_API_KEY,
                "redirect_uri": KakaoOAuthDatas_.REDIRECT_URI,
                "code": authorizationCode
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

    if (getKakaoTocken.isLoading) return "Loading...";

    if (getKakaoTocken.error) return "An error has occurred";

    if (getKakaoTocken.isSuccess) {
        console.log(getKakaoTocken.data)
        return "Success"
    }

    return;
}
