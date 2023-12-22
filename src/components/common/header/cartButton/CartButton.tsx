// import instance from "@/api/instanceApi";
import { FiShoppingCart } from "react-icons/fi";
import "./cartbutton.scss";
import { useEffect, useState /*, useEffect */ } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useAuthInterceptor from "@/hooks/useAuthInterceptor";

export interface RoomDescriptionType {
  cartItemId: number;
  checkInTime: string;
  checkOutTime: string;
  endDate: string;
  headCount: number;
  maxHeadCount: number;
  price: number;
  roomId: number;
  roomName: string;
  startDate: string;
}

export interface CartItemType {
  accommodationName: string;
  accommodationId: number;
  rooms: RoomDescriptionType[];
}

interface ApiResponseType {
  data: { cartItemResponseList: CartItemType[] };
  status?: "SUCCESS" | "FAIL" | "ERROR";
}

const CartButton = () => {
  const getCartItems = async () => {
    const instance = useAuthInterceptor();
    try {
      const { data } = await instance.get<ApiResponseType>("/api/carts");
      return data.data.cartItemResponseList;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("에러", axiosError);
    }
  };

  useEffect(() => {
    getCartItems().then(res => {
      if (res !== undefined) {
        setCartItems(res.length);
      }
    });
  }, []);

  const [cartItems, setCartItems] = useState(0);
  const navigate = useNavigate();

  const moveToBasketHandler = () => {
    navigate("/basket");
  };

  return (
    <button className="header__cart-button" onClick={moveToBasketHandler}>
      <FiShoppingCart className="cart-button__icon" />
      {cartItems && <div className="alert-dot"></div>}
    </button>
  );
};

export default CartButton;
