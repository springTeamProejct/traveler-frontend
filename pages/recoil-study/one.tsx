import React from 'react'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { textState } from './recoil-store';

export const One = () => {
    const [text, setText] = useRecoilState(textState);
    return (
        <div>One Page {text}</div>
    )
}
