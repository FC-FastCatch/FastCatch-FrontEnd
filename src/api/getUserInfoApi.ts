import useAuthInterceptor from "@/hooks/useAuthInterceptor";
// import instance from "./instanceApi";

export const getUserInfoApi = async () => {
  const instance = useAuthInterceptor();
  try {
    const res = await instance.get("/api/members");

    return res.data;
  } catch (error) {
    throw new Error("유저 정보를 불러오지 못했습니다.");
  }
};
