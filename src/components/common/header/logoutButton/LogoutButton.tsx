import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ModalLayout, ModalPortal } from "../..";
import { MdLogout } from "react-icons/md";

import { userState } from "@/states/userState";
import instance from "@/api/instanceApi";
import { getRefreshToken, getToken } from "@/utils/getToken";

import "../cartButton/cartbutton.scss";

const LogoutButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const setUserInfo = useSetRecoilState(userState);
  const navigate = useNavigate();
  const accessToken = getToken();
  const refreshToken = getRefreshToken();

  const modalProps = {
    title: "로그아웃",
    content: "로그아웃 하시겠습니까?",
    buttons: [
      {
        text: "확인",
        size: "small",
        colorName: "coral500",
        onClick: () => {
          
          const logOut = async () => {
            try {

              const body = {
                accessToken,
                refreshToken
              }
          
              const res = await instance.post(`/api/members/signout`, 
                body
              );
          
              localStorage.removeItem('accessToken');
              setUserInfo(null);
              navigate('/');
              
              return res;
            } catch (error) {
              console.log(error);
            }
          };

          logOut();
          setModalVisible(false);
        },
      },
      {
        text: "취소",
        size: "small",
        colorName: "coral200",
        onClick: () => {
          setModalVisible(false);
        },
      },
    ],
  };

  const logoutHandler = () => {
    setModalVisible(true);
  };

  return (
    <>
      <button className="header__cart-button" onClick={logoutHandler}>
        <MdLogout className="cart-button__icon" />
      </button>
      {modalVisible && (
        <ModalPortal>
          <ModalLayout
            {...modalProps}
            isVisible={modalVisible}
            setIsVisible={setModalVisible}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default LogoutButton;
