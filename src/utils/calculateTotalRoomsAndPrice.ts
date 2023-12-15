import numberFormat from "@/utils/numberFormat";
import { CartItemType } from "../types/basket";

export const calculateTotalRoomsAndPrice = (
  data: CartItemType[]
): { totalRoomsCount: number; totalPrice: string } => {
  let totalRoomsCount = 0;
  let price = 0;
  data.forEach((accommodation: CartItemType) => {
    accommodation.rooms.forEach((room: { price: number }) => {
      totalRoomsCount++;
      price += room.price;
    });
  });
  const totalPrice = numberFormat(price);
  return { totalRoomsCount, totalPrice };
};
