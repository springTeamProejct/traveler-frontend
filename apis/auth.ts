import axios from 'axios';
export type loginResponseDto = {
  grantType: 'Bearer',
  accessToken: string,
  refreshToken: string,
  accessTokenExpiresIn: number,
}

export async function login(loginDto: { email: string, password: string }): Promise<loginResponseDto> {
  return axios({
    method: 'post',
    url: `${process.env.BACKEND_ADDRESS}/users/login`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(loginDto)
  })
  .then(res => res.data)
  .catch(console.error);
}

export async function accessTokenRefresh(accessToken: string, refreshToken: string): Promise<loginResponseDto> {
  return axios({
    method: 'post',
    url: `${process.env.BACKEND_ADDRESS}/users/reissue`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ accessToken, refreshToken })
  })
  .then(res => res.data)
  .catch(console.error);
}

export async function logout() {

}