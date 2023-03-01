import React, { useState, useEffect, useCallback } from 'react';
import SearchKeyword from '../../components/kakaomap/SearchKeyword';
import { FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, InputAdornment, Button } from '@mui/material';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { usePosts } from '../../hooks/usePosts'
import {useRouter} from 'next/router'
import { CreateTravelPostRequestDto } from '../../apis/post';

export default function TravlePostCreate() {
  const router = useRouter();
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [gender, setGender] = useState<'FEMALE' | 'MALE' | 'FREE' | null>(null)
  const [minAge, setMinAge] = useState<number | null>(null)
  const [maxAge, setMaxAge] = useState<number | null>(null)
  const [capacity, setCapacity] = useState(1)
  const [time, setTime] = useState<Date | null>(null)
  const [joinType, setJoinType] = useState<'IMMEDIATELY' | 'CONVERSATION' | null>(null)
  const [locationName, setLocationName] = useState('')
  const [position, setPosition] = useState<{lat: number, lng: number} | null>(null)
  
  const { addTravelPost } = usePosts();

  const onTitleChange = useCallback((e: any) => {
    setTitle(e.target.value)
    console.log('title', e.target.value)
  }, []);

  useEffect(() => console.log(contents), [contents])

  const onGenderChange = useCallback((e: any) => {
    setGender(e.target.value)
    console.log('gender', e.target.value)
  }, []);

  const onMinAgeChange = useCallback((e: any) => {
    const inputValue = Number(e.target.value)
    console.log('minAge', inputValue)
    if (inputValue !== Math.floor(inputValue) && inputValue < 0) {
      console.log('실수, 음수 는 안됨')
      return;
    }
    if (maxAge && maxAge < inputValue) {
      console.log('최대나이보다 클수 없음')
      return;
    }
    setMinAge(inputValue)
  }, []);

  const onMaxAgeChange = useCallback((e: any) => {
    const inputValue = Number(e.target.value)
    console.log('maxAge', inputValue)
    if (inputValue !== Math.floor(inputValue) && inputValue < 0) {
      console.log('실수, 음수 는 안됨')
      return;
    }
    if (minAge && minAge > inputValue) {
      console.log('최저나이보다 작을수 없음')
      return;
    }
    setMaxAge(inputValue)
  }, []);

  //정원 최대치가 있나?
  const onCapacityChange = useCallback((e: any) => {
    const inputValue = Number(e.target.value)
    console.log('Capacity', inputValue)
    if (inputValue !== Math.floor(inputValue) && inputValue < 1) {
      console.log('실수, 음수 는 안됨')
      return;
    }
    setCapacity(inputValue)
  }, []);

  const onTimeChange = useCallback((e: any) => {
    console.log('time', e.target.value)
    setTime(e.target.value)
  }, []);

  const onJoinTypeChange = useCallback((e: any) => {
    setJoinType(e.target.value)
    console.log('jointype', e.target.value)
  }, []);

  const submitClick = () => {
    const travlePost: CreateTravelPostRequestDto = {
      title,
      content: contents,
      category: 'TRAVEL',
      type: joinType ?? 'IMMEDIATELY',
      gender: gender ?? 'FREE',
      xPos: position ? position.lat : 0,
      yPos: position ? position.lng : 0,
      location: locationName,
      dateTime: time ?? new Date(),
      minAge: minAge ?? 0,
      maxAge: maxAge ?? 1,
      maxCnt: capacity,
    }
    addTravelPost.mutate(travlePost, {
      onSuccess: () => console.log('글 작성 성공!!!')
    });
    router.push('/');
  }
  

  return (
    <>
      <h1>여행동행 글 작성</h1>
      {/* 제목 */}
      <TextField fullWidth label='제목을 입력해주세요.' id='fullWidth' margin='normal' value={title} onChange={onTitleChange} />
    
      {/* 본문 */}
      <ReactQuill
        theme='snow'
        value={contents}
        onChange={setContents}
        style={{height: '400px', marginBottom: '50px'}}
      />

      {/* 성별 */}
      <FormControl margin='normal' >
        <FormLabel id='gender-radio-group-label' >성별</FormLabel>
        <RadioGroup
          row
          aria-labelledby='gender-radio-group-label'
          name='gender-radio-group'
          onChange={onGenderChange}
        >
          <FormControlLabel value='FEMALE' control={<Radio />} label='여성' />
          <FormControlLabel value='MALE' control={<Radio />} label='남성' />
          <FormControlLabel value='FREE' control={<Radio />} label='그외' />
        </RadioGroup>
      </FormControl>

      {/* 나이 */}
      <TextField
        label='최저나이'
        id='min-age'
        sx={{ m: 2, width: 100 }}
        type='number'
        onChange={onMinAgeChange}
      />
      <TextField
        label='최대나이'
        id='max-age'
        sx={{ m: 2, width: 100 }}
        type='number'
        onChange={onMaxAgeChange}
      />

      {/* 인원 */}
      <TextField
        label='참여정원'
        id='capacity'
        sx={{ m: 2, width: 100 }}
        type='number'
        onChange={onCapacityChange}
      />

      {/* 시간 */}
      <TextField
        id='time'
        sx={{ m: 2, width: 250 }}
        type='datetime-local'
        onChange={onTimeChange}
      />

      {/* 채팅참여유형 */}
      <FormControl margin='normal' >
        <FormLabel id='chat-join-type-radio-group-label' >채팅참여 방법</FormLabel>
        <RadioGroup
          row
          aria-labelledby='chat-join-type-radio-group-label'
          name='chat-join-type-group'
          onChange={onJoinTypeChange}
        >
          <FormControlLabel value='IMMEDIATELY' control={<Radio />} label='즉시참여' />
          <FormControlLabel value='CONVERSATION' control={<Radio />} label='대화 후 참여' />
        </RadioGroup>
      </FormControl>

      {/* 지도검색 */}
      <SearchKeyword locationName={locationName} setLocationName={setLocationName} setPosition={setPosition} ></SearchKeyword>

      {/* 글작성 버튼 */}
      <div style={{ display: 'flex' }}>
        <Button
          style={{ marginLeft: 'auto' }}
          sx={{ m: 2, width: 100 }}
          variant='contained'
          onClick={submitClick}
        >글 등록</Button>
      </div>
    </>
  );
}
