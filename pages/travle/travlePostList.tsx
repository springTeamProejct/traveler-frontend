import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFetchTravlePosts } from '../../apis';
import { usePosts } from '../../hooks/usePosts'

export default function TravlePostList() {
  const { isLoading, error, isSuccess, data } = usePosts().GetPostAll({
    page: 1,
    size: 10,
    category: 'TRAVEL',
  });

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>An error has occurred</p>

  return (
    <>
      <h1>리스트  조회</h1>
      <p>{JSON.stringify(data)}</p>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <colgroup>
            {[10, 50, 10, 10, 10, 10].map((size, i) => <col key={i} width={`${size}%`} />)}
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
      <div style={{ backgroundColor: 'gray', width: '100%', height: '30px', margin: '20px 0px' }}></div> */}
    </>
  );
}
