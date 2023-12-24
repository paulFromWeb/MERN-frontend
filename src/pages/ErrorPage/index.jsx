import React from "react";
import { Link } from "react-router-dom";
import iconError from "../../assets/img/icon-error.svg";
import iconBack from "../../assets/img/icon-back.svg";

export const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col w-full h-full  justify-center items-center mt-[55px] mb-[123px]">
      <p className="font-[Avenir Next] text-[64px] text-[black] leading-[1.5] font-black">
        Oops!
      </p>
      <p className="font-[Avenir Next] text-[black] text-[24px] leading-[1.5] font-bold mb-[42px]">
        {message || "Произошла ошибка"}
      </p>
      <img
        src={iconError}
        className="w-[740px] h-[515px] max-[640px]:w-[300px] max-[640px]:h-[210px]"
        alt=""
      />
      <div className="mt-[60px] font-[Helvetica] flex flex-row items-center text-[black] text-[24px] leading-[1.5] font-normal border-b-[2px] pb-[4px] border-[black]">
        <img src={iconBack} className="w-[25px] h-[15px] mr-[10px]" alt="" />
        <Link to="/">На Главную</Link>{" "}
      </div>
    </div>
  );
};
