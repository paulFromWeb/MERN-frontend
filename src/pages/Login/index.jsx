import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import logo from "../../assets/img/75204864543.svg";
import smallTeam from "../../assets/img/small-team.svg";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Input } from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema as schema } from "../../utils/yup";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log(values);
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="">
      <div className="flex py-10 pl-12 max-[640px]:py-[20px] max-[640px]:pl-[26px]">
        <Link to={`/`}>
          <img
            src={logo}
            alt="logo"
            className="w-[160px] h-[80px] max-[640px]:w-[120px] max-[640px]:h-[60px]"
          />
        </Link>
      </div>
      <div className="flex flex-row justify-between items-center mx-[150px] max-[1280px]:mx-[26px] mb-[54px]">
        <div className="w-[40%] min-w-[320px] max-[700px]:w-full max-w-[550px] rounded-[15px] px-[36px] py-[36px] min-h-[600px] border-[1px] border-[#878787]">
          <p className="font-['Poppins'] mb-[30px] text-[25px] leading-[38px] font-light">
            Привет!
          </p>
          <p className="font-['Poppins'] text-[31px] leading-[47px] font-medium">
            Авторизуйся
          </p>
          <p className="font-['Poppins'] text-[16px] leading-[24px] font-normal">
            Чтобы войти на сайт
          </p>
          <form className="mt-[48px]" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              name="email"
              placeholder="Введите свой email"
              register={register}
              required
              className="mb-[38px]"
              errorMessage={errors.email && errors.email.message}
            />
            <Input
              label="Пароль"
              placeholder="Введите свой пароль"
              register={register}
              required
              name="password"
              type="password"
              className="mb-[68px]"
              errorMessage={errors.password && errors.password.message}
            />
            <button
              type="submit"
              className="w-full bg-black rounded-[4px] h-[60px] text-white font-['Poppins'] text-[16px] font-medium"
            >
              Авторизоваться
            </button>
          </form>
          <div className="flex justify-center mt-[76px]">
            <p className="text-[#7D7D7D] font-['Poppins'] text-[16px] leading-[24px] font-light">
              Нет Аккаунта ?{" "}
              <Link className="text-black font-semibold" to="/register">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
        <div className="w-[45%] flex flex-col justify-center max-[700px]:hidden">
          <img src={smallTeam} alt="img" className="w-full" />
        </div>
      </div>
    </div>
  );
};
