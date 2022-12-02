import { atom } from 'recoil';

let countState = atom({
    key: 'counter',
    default: 0,
});


export const textState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });


export default countState;
 