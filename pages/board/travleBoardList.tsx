import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';

// function createData(
//   id: number,
//   title: string,
//   author: string,
//   createAt: Date,
//   view: number,
//   partyCount: number
// ) {
//   return { id, title, author, createAt, view, partyCount };
// }
// const rows = [
//   createData(1, 'keroro', 'kero', new Date(), 5, 5),
//   createData(2, 'giroro', 'giro', new Date(), 50, 4),
//   createData(3, 'zeroro', 'zero', new Date(), 15, 3),
//   createData(4, 'kiroro', 'kiro', new Date(), 1235, 2),
//   createData(5, 'ziroro', 'ziro', new Date(), 10005, 1),
//   createData(6, 'geroro', 'gero', new Date(), 5, 20),
// ];

const cellSizes = [10, 50, 10, 10, 10, 10]

export default function TravleBoardList() {
  const query = useQuery(
    //구분하기위한 키값
    ['articles'],

    //통신하는 함수
    () => fetch('http://localhost:4000/articles').then(res => res.json()),

    //그외 옵션 설정
    {
      select: data => data.map((row: any) => {
        return {
          id: row.id,
          title: row.contents, 
          author: row.userId,
          createAt: row.createAt,
          view: 1,
          partyCount: 5
        }
      })
    }
  )

  if (query.isLoading) return <p>Loading...</p>

  if (query.error) return <p>An error has occurred</p>

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <colgroup>
          {cellSizes.map((size) => <col width={`${size}%`} />)}
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell align='center'>글번호</TableCell>
            <TableCell align='center'>제목</TableCell>
            <TableCell align='center'>작성자</TableCell>
            <TableCell align='center'>작성일</TableCell>
            <TableCell align='center'>조회수</TableCell>
            <TableCell align='center'>참여자</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {query.data.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row' align='center'>{row.id}</TableCell>
              <TableCell align='left'>{row.title}</TableCell>
              <TableCell align='left'>{row.author}</TableCell>
              <TableCell align='center'>{new Intl.DateTimeFormat('ko', { dateStyle: 'short' }).format(row.createAt)}</TableCell>
              <TableCell align='center'>{row.view}</TableCell>
              <TableCell align='center'>{row.partyCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
