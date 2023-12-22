// import instance from "./instanceApi";
import { IAccommodationDetail } from "../types/accommodationDetail";
import useAuthInterceptor from "@/hooks/useAuthInterceptor";

export const getAccommodationDetailApi = async (id:string|null,startDate:string,endDate:string): Promise<IAccommodationDetail> => {
  const instance = useAuthInterceptor();
  try {
    const res = await instance.get(
      `/api/accommodations/${id}?startDate=${startDate}&endDate=${endDate}`
    );
    return res.data.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};