import React, { Dispatch, useState, useCallback } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useEffect } from 'react';

type Search = {
  searchProp: string,
  setSerchProp: Dispatch<string>
};

export default function SearchKeyword(props: Search) {
  const { searchProp, setSerchProp } = props;
  const [ input, setInput ] = useState<string>(searchProp)

  const onKeywordChange = useCallback((e: any) => {
    setInput(e.target.value)
  }, []);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue={input}
        onChange={onKeywordChange}
      />
      <Button variant="contained" onClick={() => setSerchProp(input)}>search</Button>
    </Box>
  );
}
