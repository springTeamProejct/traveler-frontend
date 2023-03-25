import React, { useState, useEffect, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMutation } from '@tanstack/react-query';
import { title } from 'process';


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


export default function TravleBoardCreate() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const mutation = useMutation((newArticle : { title: string, contents: string }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const userId = 1
    const body = JSON.stringify(newArticle);

    return fetch(
      `http://localhost:4000/users/${userId}/articles`,
      {
        method: 'POST',
        headers,
        body,
      }
    ).then(res => res.json())
  });

  const onTitleChange = useCallback((e: any) => {
    setTitle(e.target.value)
  }, []);

  const onContentsChange = useCallback((e: any) => {
    setContents(e.target.value)
  }, []);

  return (
    <div>
      {mutation.isLoading ? (
        'creating article...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {JSON.stringify(mutation?.error)}</div>
          ) : null}

          {mutation.isSuccess ? <div>article created!</div> : null}

          <input value={title} onChange={onTitleChange} />
          <input value={contents} onChange={onContentsChange} />
          <button
            onClick={() => mutation.mutate({ title, contents })}
          >
            Create Article
          </button>
        </>
      )}
    </div>
  );
}
