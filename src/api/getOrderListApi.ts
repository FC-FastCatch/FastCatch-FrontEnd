import useAuthInterceptor from "@/hooks/useAuthInterceptor";
// import instance from "./instanceApi";

const pageNums = {
  reserved: 1,
  used: 1,
  canceled: 1,
};

export const getOrderListApi = async (
  status: "reserved" | "used" | "canceled"
) => {
  const instance = useAuthInterceptor();
  try {
    const res = await instance.get(
      `/api/orders/status/${status}?page=${pageNums[status]}`
    );
    pageNums[status] = pageNums[status] + 1;
    return res.data.data.orderResponses;
  } catch (error) {
    console.error(error);
    throw new Error("데이터를 불러올 수 없습니다.");
  }
};
