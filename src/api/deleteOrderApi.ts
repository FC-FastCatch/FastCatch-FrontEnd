import useAuthInterceptor from "@/hooks/useAuthInterceptor";
// import instance from "./instanceApi";

export const deleteOrderApi = async (orderId: number) => {
  const instance = useAuthInterceptor();
  try {
    const res = await instance.delete(`/api/orders/${orderId}`);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("주문을 삭제하지 못했습니다.");
  }
};
