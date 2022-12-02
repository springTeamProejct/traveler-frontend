import React from 'react'
import { useRecoilState } from 'recoil';
import { textState } from './recoil-store';

export const Two = () => {
    const [text, setText] = useRecoilState(textState);

    const onChange = (event: any) => {
      setText(event.target.value);
    };
  
    return (
      <div>
        <input type="text" value={text} onChange={onChange} />
        <br />
        Echo: {text}
      </div>
    );
  }