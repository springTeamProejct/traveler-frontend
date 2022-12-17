import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError } from 'axios'
import { CONSTANTS } from "../utils";

type FetchPostResponse = {
  id: number,
  createdAt: string,
  updatedAt: string,
  deletedAt?: string,
  title: string,
  contents: string,
  userId: number
}
type createPost = { title: string, contents: string }

// 1건 조회
const fetchTravlePost = (postNo: number) => axios({
  method: CONSTANTS.HTTP_METHOD.GET,
  url: `${CONSTANTS.SERVER_URL}/article/${postNo}`,
  headers: { 'Content-Type': 'application/json' }
})
.then(res => res.data);

export const useFetchTravlePost = (
  postNo: number,
  options?: UseQueryOptions<FetchPostResponse, AxiosError, FetchPostResponse, ['fetchTravlePost']>
  ): UseQueryResult<FetchPostResponse, AxiosError> => useQuery(
    ['fetchTravlePost'],
    () => fetchTravlePost(postNo),
    options
  );


// 리스트 조회
const fetchTravlePosts = () => axios({
  method: CONSTANTS.HTTP_METHOD.GET,
  url: `${CONSTANTS.SERVER_URL}/articles`,
  headers: { 'Content-Type': 'application/json' }
})
.then(res => res.data);

export const useFetchTravlePosts = (
  options?: UseQueryOptions<FetchPostResponse[], AxiosError, FetchPostResponse[], ['fetchTravlePosts']>
): UseQueryResult<FetchPostResponse[], AxiosError> => useQuery(
  ['fetchTravlePosts'],
  () => fetchTravlePosts(),
  options
);


// 생성
export const mutationTravlePost = (body: createPost) => axios({
  method: CONSTANTS.HTTP_METHOD.POST,
  url: `${CONSTANTS.SERVER_URL}/users/${1}/articles`,
  headers: { 'Content-Type': 'application/json' },
  data: JSON.stringify(body)
})
.then(res => res.data);