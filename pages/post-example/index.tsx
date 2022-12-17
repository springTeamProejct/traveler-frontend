import { Container } from '@mui/system'
import React from 'react'
import TravlePostCreate from './travlePostCreate'
import TravlePostList from './travlePostList'
import TravlePost from './travlePostOne'


export default function boardPageController() {
  return (
    <Container maxWidth='lg'>
      <TravlePost />
      <TravlePostList/>
      <TravlePostCreate/>
    </Container>
  )
}