import axios from "axios";
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil";

import { userInfoI, userState } from "@/states/userState";
import { tokenState } from "@/states/tokenState";

export const useAuth = () => {

  const setUserInfo = useSetRecoilState(userState);

  const [, setAccessToken] = useRecoilState(tokenState);

  const setToken = async (
    accessToken: string, refreshToken: string, memberRes: userInfoI
  ) => {
    localStorage.setItem("refreshToken", refreshToken);
    console.log('여기가 안되는건가', refreshToken);
    setUserInfo(memberRes);
    setAccessToken(accessToken);
  };

  return {
    setToken
  }
}

export async function refreshAccessToken () {

  const refreshToken = localStorage.getItem("refreshToken");
  const userDataString = localStorage.getItem("userState");

  if (!userDataString) {
    console.error('User data not found in localStorage');
    return
  }

  const userData = JSON.parse(userDataString);
  const userEmail = userData.email;

  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/members/re-token`,
    { email: userEmail },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('토큰 재발급 성공', response.data);
  const newAccessToken = response.data.data.accessToken;
  const setAccessToken = useSetRecoilState(tokenState);
  setAccessToken(newAccessToken);

  return newAccessToken;
}
