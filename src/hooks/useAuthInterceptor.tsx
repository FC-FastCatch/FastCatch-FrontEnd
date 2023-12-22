import axios, { AxiosInstance } from "axios";
import { refreshAccessToken } from "@/hooks/useAuth";
import { isAccessTokenExpired } from "@/utils/checkToken";
import { tokenState } from "@/states/tokenState";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import getAccessToken from "./getAccessToken";

const useAuthInterceptor = () => {
  const accessToken = getAccessToken();
  // console.log(accessToken);
  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
  });

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      async (config) => {
        config.headers["Content-Type"] = "application/json";
        
  
        console.log('왜여기', accessToken);
  
        if (accessToken) {
          const isTokenExpired = isAccessTokenExpired(accessToken);
          console.log(2);
          if (isTokenExpired) {
            try {
              const newAccessToken = await refreshAccessToken();
              config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            } catch (refreshError) {
              console.error('accessToken 재발급 실패', refreshError);
            }
          } else {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
        }
        console.log(3);
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  
    const responseInterceptor = instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // localStorage.removeItem('accessToken');
          // localStorage.removeItem('refreshToken');
          alert('인증이 만료되어 재 로그인이 필요합니다.');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Clean up the interceptors when the component unmounts
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken])


  return instance; 
}

export default useAuthInterceptor;
