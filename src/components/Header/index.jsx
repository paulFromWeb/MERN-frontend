import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/75204864543.svg";
import burger from "../../assets/img/icon-burder.svg";
import toast, { Toaster } from "react-hot-toast";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useState } from "react";
import { duration } from "@mui/material";

export const Header = ({ className }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-[1200px]:max-w-md  max-w-4xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-[70%] max-[1200px]:w-[60%] p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="mt-1 text-2xl max-[1200px]:text-sm text-gray-500">
                  Действительно хотите выйти?
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200 text-2xl max-[1200px]:text-sm w-[30%] max-[1200px]:w-[40%]">
            <button
              onClick={() => {
                toast.remove(t.id);
                dispatch(logout());
                window.localStorage.removeItem("token");
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Да
            </button>
            <button
              onClick={() => toast.remove(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Нет
            </button>
          </div>
        </div>
      ),
      {
        duration: 100,
      }
    );
    // if (window.confirm("Вы действительно хотите выйти?")) {

    //   dispatch(logout());
    //   window.localStorage.removeItem("token");
    // }
  };
  const [burgerVisible, setBurgerVisible] = useState(false);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={
          "bg-[#d4d4d4f1] flex items-center justify-center w-full h-screen fixed " +
          (burgerVisible === true
            ? "z-50 fixed overflow-hidden top-0 right-0"
            : "hidden")
        }
        onClick={() => setBurgerVisible(false)}
      >
        <div className="flex flex-col justify-between items-center h-[50%] leading-1.5 font-['Inter'] text-[24px] font-medium">
          <img src={logo} className="w-[160px] h-[80px] mb-6" alt="" />
          <Link to="/">
            <p>Блог</p>
          </Link>
          <Link to="/authors">
            <p>Авторы</p>
          </Link>
          <Link to="/profile">
            <p>Профиль</p>
          </Link>
          {isAuth ? (
            <>
              <Link to="/add-post">
                <button>Написать статью</button>
              </Link>
              <button onClick={onClickLogout}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="leading-1.5">Войти</button>
              </Link>
              <Link to="/register">
                <button className="leading-1.5">Создать аккаунт</button>
              </Link>
            </>
          )}
        </div>
      </div>

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
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "animate-pulse"
                : isActive
                ? "underline underline-offset-8"
                : ""
            }
            to="/"
          >
            <p className="leading-1.5 hover:underline hover:underline-offset-8">
              Блог
            </p>
          </NavLink>
          <NavLink
            to="/authors"
            className={({ isActive, isPending }) =>
              isPending
                ? "animate-pulse"
                : isActive
                ? "underline underline-offset-8"
                : ""
            }
          >
            <p className="leading-1.5 hover:underline hover:underline-offset-8">
              Авторы
            </p>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive, isPending }) =>
              isPending
                ? "animate-pulse"
                : isActive
                ? "underline underline-offset-8"
                : ""
            }
          >
            <p className="leading-1.5 hover:underline hover:underline-offset-8">
              Профиль
            </p>
          </NavLink>
          {isAuth ? (
            <>
              <NavLink
                to="/add-post"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "animate-pulse"
                    : isActive
                    ? "underline underline-offset-8"
                    : ""
                }
              >
                <p className="leading-1.5 hover:underline hover:underline-offset-8">
                  Написать статью
                </p>
              </NavLink>
              <button
                className="leading-1.5 hover:underline hover:underline-offset-8"
                onClick={onClickLogout}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <button className="leading-1.5 hover:underline hover:underline-offset-8">
                  Войти
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="leading-1.5 hover:underline hover:underline-offset-8">
                  Создать аккаунт
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};
