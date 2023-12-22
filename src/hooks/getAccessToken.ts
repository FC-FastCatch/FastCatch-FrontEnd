import { useRecoilValue } from "recoil";
import { tokenState } from "@/states/tokenState";

const getAccessToken = () => {
  return useRecoilValue(tokenState);
};

export default getAccessToken;