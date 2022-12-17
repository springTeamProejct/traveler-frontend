import React from 'react';
import { useFetchTravlePost } from '../../apis';

export default function TravlePostOne() {

  const query = useFetchTravlePost(1, {})

  // useEffect(() => console.log(JSON.stringify(query)), [query])

  if (query.isLoading) return <p>Loading...</p>

  if (query.error) return <p>An error has occurred</p>

  return (
    <>
      <h1>1건  조회</h1>
      <p>{JSON.stringify(query.data)}</p>
      <div style={{ backgroundColor: 'gray', width: '100%', height: '30px', margin: '20px 0px' }}></div>
    </>
  );
}
