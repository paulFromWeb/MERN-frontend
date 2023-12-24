import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/img/75204864543.svg";
import burger from "../../assets/img/icon-burder.svg";

import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useState } from "react";

export const Header = ({ className, setBurgerVisible }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div
      className={
        "flex justify-between flex-row items-center w-full " + className
      }
    >
      <Link className="" to="/">
        <img
          src={logo}
          alt="logo"
          className="w-[160px] h-[80px] max-[640px]:w-[120px] max-[640px]:h-[60px]"
        />
      </Link>

      <img
        src={burger}
        onClick={() => setBurgerVisible(true)}
        className="w-10 h-10 min-[1200px]:hidden"
        alt=""
      />

      <div className="flex flex-row justify-between items-center  w-[35%]  max-[1200px]:hidden font-['Inter'] text-[20px] font-normal ">
        <Link to="/">
          <p className="leading-1.5 hover:underline hover:underline-offset-8">
            Блог
          </p>
        </Link>
        <Link to="/authors">
          <p className="leading-1.5 hover:underline hover:underline-offset-8">
            Авторы
          </p>
        </Link>
        <Link to="/profile">
          <p className="leading-1.5 hover:underline hover:underline-offset-8">
            Профиль
          </p>
        </Link>
        {isAuth ? (
          <>
            <Link to="/add-post">
              <button className="leading-1.5 hover:underline hover:underline-offset-8">
                Написать статью
              </button>
            </Link>
            <button
              className="leading-1.5 hover:underline hover:underline-offset-8"
              onClick={onClickLogout}
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="leading-1.5 hover:underline hover:underline-offset-8">
                Войти
              </button>
            </Link>
            <Link to="/register">
              <button className="leading-1.5 hover:underline hover:underline-offset-8">
                Создать аккаунт
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
