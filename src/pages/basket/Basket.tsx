import instance from "@/api/instanceApi";
import { Button } from "@/components/common";
import { OrderItemTypes, orderState } from "@/states/orderState";
import { CartItemType } from "@/types/basket";
import { calculateTotalRoomsAndPrice } from "@/utils/calculateTotalRoomsAndPrice";
import { flattenCartItemsData } from "@/utils/flattenCartItemsData";
import { AxiosError } from "axios";
import { useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import "./basket.scss";
import SelectedAccomodation from "./selectedAccomodation/SelectedAccomodation";

export interface ApiResponseType {
  data: { cartItemResponseList: CartItemType[] };
  status?: "SUCCESS" | "FAIL" | "ERROR";
}

const Basket = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const navigate = useNavigate();
  const setOrderData: SetterOrUpdater<OrderItemTypes[]> =
    useSetRecoilState(orderState);
  const totalData =
    cartItems.length !== 0 ? calculateTotalRoomsAndPrice(cartItems) : null;

  const getCartItems = async () => {
    try {
      const { data } = await instance.get<ApiResponseType>("/api/carts");
      return data.data.cartItemResponseList;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
    }
  };

  const deleteAllCartItems = async () => {
    try {
      const { data } = await instance.delete<ApiResponseType>("/api/carts");
      return data.data.cartItemResponseList;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
    }
  };

  const handlePaymentClick = () => {
    const flattenedData = flattenCartItemsData(cartItems);
    setOrderData(flattenedData);
    navigate("/order?cart=true");
  };

  const handleDeleteAllClick = () => {
    if (window.confirm("장바구니를 비우시겠습니까?")) {
      deleteCartMutation.mutate();
    }
  };

  useQuery("getCartitems", getCartItems, {
    onSuccess: data => {
      if (data) setCartItems(data);
    },
  });

  const deleteCartMutation = useMutation({
    mutationFn: deleteAllCartItems,
    onSuccess: data => {
      if (data) {
        setCartItems(data);
      }
    },
  });

  return (
    <div className="basket-container">
      <div className="basket-container__header">
        <h1 className="basket-container__header-title text-subtitle2">
          장바구니
        </h1>
        {cartItems.length !== 0 && (
          <Button
            text="장바구니 비우기"
            shape="line"
            onClick={handleDeleteAllClick}
          />
        )}
      </div>
      {cartItems.length !== 0 ? (
        <div className="basket-container__body">
          {cartItems.map((item: CartItemType, index: number) => (
            <section key={item.accommodationId}>
              <SelectedAccomodation
                accomdationItems={item}
                deleteRoom={setCartItems}
              />
              {index !== cartItems.length - 1 && (
                <hr className="basket-container__hr" />
              )}
            </section>
          ))}
          <div className="basket-container__bottom">
            <div className="total-info">
              <span className="text-subtitle5 total-info__count">
                총 {totalData?.totalRoomsCount}건
              </span>
            </div>
            <Button
              text={`${totalData?.totalPrice}원 결제하기`}
              buttonSize="large"
              onClick={handlePaymentClick}
            />
          </div>
        </div>
      ) : (
        <div className="empty-basket">
          <CiShoppingBasket />
          <p>장바구니가 비어있어요.</p>
        </div>
      )}
    </div>
  );
};

export default Basket;
