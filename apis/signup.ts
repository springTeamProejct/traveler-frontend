import axios from "axios";
import { CONSTANTS } from "../utils";

// 폰 중복 1조회
export const mutationDuplicatePhone = (body: boolean) => axios({
  method: 'post',
  url: `${CONSTANTS.SERVER_URL}/`,
  headers: { 'Content-Type': 'application/json' },
  data: JSON.stringify(body)
})
  .then(res => res.data);