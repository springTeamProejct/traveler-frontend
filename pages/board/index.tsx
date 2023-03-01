import { Container } from '@mui/system'
import React from 'react'
import TravleBoardCreate from './travleBoardCreate'
import TravleBoardList from './travleBoardList'


export default function boardPageController() {
  return (
    <Container maxWidth='lg'>
      <TravleBoardList/>
      <div style={{ backgroundColor: 'gray', width: '100%', height: '30px', margin: '20px 0px' }}></div>
      <TravleBoardCreate/>
    </Container>
  )
}