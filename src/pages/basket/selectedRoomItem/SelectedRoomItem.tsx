import { CartItemType, RoomDescriptionType } from "@/types/basket";
import numberFormat from "@/utils/numberFormat";
import "./selectedRoomItem.scss";
import instance from "@/api/instanceApi";
import { ApiResponseType } from "../Basket";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

interface RoomPropsType {
  pageType?: "basket" | "orderList";
  room: RoomDescriptionType;
  deleteRoom: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

const SelectedRoomItem = ({
  pageType = "basket",
  room,
  deleteRoom,
}: RoomPropsType) => {
  const {
    cartItemId,
    checkInTime,
    checkOutTime,
    endDate,
    headCount,
    maxHeadCount,
    price,
    roomName,
    startDate,
  } = room;
  const roomPrice = numberFormat(price);

  const deleteCartItem = async (cartItemId: number) => {
    try {
      const { data } = await instance.delete<ApiResponseType>(
        `/api/cart-items/${cartItemId}`
      );

      return data.data.cartItemResponseList;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
    }
  };

  const deleteCartItemMutation = useMutation({
    mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),
    onSuccess: data => {
      if (data) {
        deleteRoom(data);
      }
    },
  });
  return (
    <div className="room-list__item">
      <div className="item-content">
        <div className="item-content__left-box">
          <p className="text-subtitle4">{roomName}</p>
          <div>
            <p className="text-body1">
              {startDate} - {endDate}
            </p>
            <p className="text-body1">
              예약인원 {headCount}인 / 최대인원 {maxHeadCount}인
            </p>
            <div className="check-in-out">
              <div className="check-in-out__content">
                <span className="check-in__span">체크인</span>
                <span>{checkInTime}</span>
              </div>
              <div className="check-in-out__retangle">|</div>
              <div className="check-in-out__content">
                <span className="check-in__span">체크아웃</span>
                <span>{checkOutTime}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item-content__right-box">
          <span className="price text-subtitle5">{roomPrice}원</span>
          {pageType === "basket" && (
            <span
              className="delete-button text-body2"
              onClick={() => deleteCartItemMutation.mutate(cartItemId)}
            >
              삭제
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedRoomItem;
