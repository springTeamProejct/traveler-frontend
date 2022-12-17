import React, { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { mutationTravlePost } from '../../apis';


export default function TravlePostCreate() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const mutation = useMutation(mutationTravlePost);

  const onTitleChange = useCallback((e: any) => {
    setTitle(e.target.value)
  }, []);

  const onContentsChange = useCallback((e: any) => {
    setContents(e.target.value)
  }, []);

  return (
    <>
      <h1>1건 입력</h1>
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
      <div style={{ backgroundColor: 'gray', width: '100%', height: '30px', margin: '20px 0px' }}></div>
    </>
  );
}
