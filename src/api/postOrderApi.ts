import instance from "./instanceApi";

export const postOrderApi = async (
  url: string,
  requestBody: PostOrderApiRequestBodyType
) => {
  try {
    const res = await instance.post(url, requestBody);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface OrderItemType {
  roomId: number;
  startDate: string;
  endDate: string;
  headCount: number;
  orderPrice: number;
}

interface PostOrderApiRequestBodyType {
  ageConsent: boolean;
  reservationPersonName: string;
  reservationPhoneNumber: string;
  totalPrice: number;
  orderItems: OrderItemType[];
}