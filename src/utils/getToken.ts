// import { tokenState } from "@/states/tokenState";
// import { useRecoilValue } from "recoil";

// export const getToken = () => {
//   try {

//     const accessToken = useRecoilValue(tokenState);
//     console.log('토큰로직', accessToken);

//     if (accessToken) {
//       return accessToken;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     return null;
//   }
// };

export const getRefreshToken = () => {
  try {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
