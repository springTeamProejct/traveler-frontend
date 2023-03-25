type TravelDto = {
  location: string,
  gatherYn: boolean,
  dateTime: Date,
  travelType: null | 'IMMEDIATELY' | 'CONVERSATION',
  travelGender: null | 'MALE' | 'FEMALE' | 'FREE',
  minAge: number,
  maxAge: number,

  maxCnt: number,
  nowCnt: number,
  xpos: number,
  ypos: number,
}

type CommentDto = {
  writerId: number,
  content: string,
  createAt: Date,
  children: CommentDto[],
  deleted: boolean,

  writerName: string,
  mine: boolean,
}

type SelectPostQueryParamDto = {
  page?: number,
  size?: number,
  category?: 'NORMAL' | 'TRAVEL',
  keywordType?: 'TITLE' | 'CONTENT' | 'LOCATION' | 'ALL',
  keyword?: string,
  gatherYn?: boolean,
  gender?: 'MALE' | 'FEMALE' | 'FREE',
  minAge?: number,
  maxAge?: number,
}

type SelectPostResponseDto = {
  postId: number,
  title: string,
  content: string,
  views: number,
  writerId: number,
  writerName: string,
  travel: TravelDto,
  createAt: Date,
  comments: CommentDto[],
  mine: boolean,
}
// 게시글 전체 조회
// 게시글조회 reponse타입이 있어야 뭔가 작업이 더 진행될 수 있음!!!!!!!!!!!!!!!!!
export async function getPostAll(accessToken: string, selectPostQueryParamDto: SelectPostQueryParamDto): Promise<{ status: number, data: any }> {
  const queryParam = Object
    .entries(selectPostQueryParamDto)
    .map(entry => `${entry[0]}=${entry[1]}`)
    .join('&');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${accessToken}`);
  return fetch(`${process.env.BACKEND_ADDRESS}/posts?${queryParam}`, {
    method: 'GET',
    headers,
  })
  .then(async (res) => {
    const result = JSON.parse(await res.text()).data;
    console.log('getPostAll result: ', result);
    return result;
  })
  .catch(console.error);
}


// 게시글 상세 조회
export async function getPostById(accessToken: string, postId: number): Promise<{ status: number, data: SelectPostResponseDto }> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${accessToken}`);
  return fetch(`${process.env.BACKEND_ADDRESS}/posts/${postId}`, {
    method: 'GET',
    headers,
  })
  .then(async (res) => {
    const result = JSON.parse(await res.text()).data;
    console.log('getPostById result: ', result);
    return result;
  })
  .catch(console.error);
}


export type CreateNormalPostRequestDto = {
  title: string,
  content: string,
  category: 'NORMAL',
}
type CreateNormalPostResponseDto = {
  postId: number,
  title: string,
  content: string,
  category: 'NORMAL',
  views: number,
  writerId: number,
  writerName: string,
  travel: null,
  createAt: Date,
  comments: [],
  mine: true,
}
// 일반 게시글 작성
export async function addNormalPost(accessToken: string, createNormalPostRequestDto: CreateNormalPostRequestDto): Promise<{ status: number, data: CreateNormalPostResponseDto}> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${accessToken}`);
  return fetch(`${process.env.BACKEND_ADDRESS}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(createNormalPostRequestDto),
  })
  .then(async (res) => {
    const result = JSON.parse(await res.text()).data;
    console.log('addPost result: ', result);
    return result;
  })
  .catch(console.error);
}


export type CreateTravelPostRequestDto = {
  title: string,
  content: string,
  category: 'TRAVEL',
  type: 'IMMEDIATELY' | 'CONVERSATION',
  gender: 'MALE' | 'FEMALE' | 'FREE',
  xPos: number,
  yPos: number,
  location: string,
  dateTime: Date,
  minAge: number,
  maxAge: number,
  maxCnt: number,
}
type CreateTravelPostResponseDto = {
  postId: number,
  title: string,
  content: string,
  category: 'TRAVEL',
  views: number,
  writerId: number,
  writerName: string,
  travel: TravelDto,
  createAt: Date,
  comments: [],
  mine: true,
}
// 여행 게시글 작성
export async function addTravlePost(accessToken: string, createTravelPostRequestDto: CreateTravelPostRequestDto): Promise<{ status: number, data: CreateTravelPostResponseDto}> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${accessToken}`);

  return fetch(`${process.env.BACKEND_ADDRESS}/posts/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(createTravelPostRequestDto),
  })
  .then(async (res) => {
    const result = JSON.parse(await res.text()).data;
    console.log('addTravlePost result: ', result);
    return result;
  })
  .catch(console.error);
}

type UpdateTravelPostRequestDto = {
  title?: string,
  content?: string,
  travelType?: null | 'IMMEDIATELY' | 'CONVERSATION',
  travelGender?: null | 'MALE' | 'FEMALE' | 'FREE',
  xPos?: number,
  yPos?: number,
  location?: string,
  dateTime?: Date,
  minAge?: number,
  maxAge?: number,
  maxCnt?: number,
  gatherYn?: boolean,
}
// 여행 게시글 수정
export async function updatePost(accessToken: string, postId: number, updateTravelPostRequestDto: UpdateTravelPostRequestDto): Promise<void> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${accessToken}`);
  return fetch(`${process.env.BACKEND_ADDRESS}/posts/${postId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(updateTravelPostRequestDto),
  })
  .then(async (res) => {
    const result = JSON.parse(await res.text());
    console.log('updatePost result: ', result);
  })
  .catch(console.error);
}

// 여행 게시글 삭제
export async function removePost(accessToken: string, postId: number): Promise<void> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${accessToken}`);
  return fetch(`${process.env.BACKEND_ADDRESS}/posts/${postId}`, {
    method: 'DELETE',
    headers,
  })
  .then(async (res) => {
    const result = JSON.parse(await res.text());
    console.log('removePost result: ', result);
  })
  .catch(console.error);
}