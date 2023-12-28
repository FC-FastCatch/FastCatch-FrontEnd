import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useCookies } from "react-cookie";

import { userInfoI, userState } from "@/states/userState";

export const useAuth = () => {

  const setUserInfo = useSetRecoilState(userState);
  const [, setCookie] = useCookies(["refreshToken"]);

  const setToken = (
    accessToken: string, refreshToken: string, memberRes: userInfoI
  ) => {
    localStorage.setItem("accessToken", accessToken);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    
    setCookie("refreshToken", refreshToken, { secure: true, httpOnly: true, expires: expirationDate, path: "/" });

    setUserInfo(memberRes)
  }
  return {
    setToken
  }
}

export async function refreshAccessToken () {

  const [cookies] = useCookies(["refreshToken"]);
  const refreshToken = cookies.refreshToken || null;
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

  const newAccessToken = response.data.data.accessToken;
  localStorage.setItem('accessToken', newAccessToken);

  return newAccessToken;
}
