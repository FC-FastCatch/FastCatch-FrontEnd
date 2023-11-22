import CommonButton from "components/commonButton/CommonButton";
import CommonFilter from "../CommonFilter";
import MyInfo from "./MyInfo";
import "./Header.scss";
import "styles/_theme.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <header className="header-container">
      <div className="header-container__inner">
        <section className="header-container__left">
          <div className="header-container__logo">빨리잡아!</div>
        </section>
        <section className="header-container__center">
          <CommonFilter></CommonFilter>
        </section>
        <section className="header-container__right">
          {isLoggedIn ? (
            <MyInfo></MyInfo> //
          ) : (
            <CommonButton text="로그인" buttonSize="small" shape="fill" colorName="coral500" onClick={loginHandler} />
          )}
        </section>
      </div>
    </header>
  );
};

export default Header;