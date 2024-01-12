import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../../assets/img/75204864543.svg";
import smallTeam from "../../assets/img/small-team.svg";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Input } from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema as schema } from "../../utils/yup";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import iconSpinner from "../../assets/img/icon-spinner.svg";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [isLoading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    setLoading(true);
    delete values.confirmPassword;
    console.log(values);
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      setLoading(false);
      return toast.error("К сожалению, регистрация не удалась!");
    }

    if ("token" in data.payload) {
      setLoading(false);
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false} />
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
        <div className="w-[40%] min-w-[320px] max-[700px]:w-full max-w-[550px] rounded-[15px] px-[40px] py-[25px] min-h-[760px] border-[1px] border-[#878787]">
          <p className="font-['Poppins'] text-[25px] leading-[38px] font-light">
            Привет!
          </p>
          <p className="font-['Poppins'] text-[31px] leading-[47px] font-medium">
            Зарегистрируйся
          </p>
          <p className="font-['Poppins'] text-[16px] leading-[24px] font-normal">
            Чтобы войти на сайт
          </p>
          <form className="mt-[26px]" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              name="email"
              placeholder="Введите свой email"
              register={register}
              required
              className="mb-[20px]"
              errorMessage={errors.email && errors.email.message}
            />
            <Input
              label="Имя пользователя"
              placeholder="Введите свое имя"
              register={register}
              required
              name="fullName"
              className="mb-[20px]"
              errorMessage={errors.fullName && errors.fullName.message}
            />
            <Input
              label="Пароль"
              placeholder="Введите свой пароль"
              register={register}
              required
              name="password"
              type="password"
              className="mb-[20px]"
              errorMessage={errors.password && errors.password.message}
            />
            <Input
              label="Подтвердите пароль"
              placeholder="Подтвердите свой пароль"
              register={register}
              required
              name="confirmPassword"
              className="mb-[32px]"
              errorMessage={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
            <button
              type="submit"
              className="w-full bg-black rounded-[4px] h-[60px] text-white font-['Poppins'] flex items-center justify-center text-[16px] font-medium"
            >
              {isLoading ? (
                <img
                  src={iconSpinner}
                  className="w-8 h-8 animate-spin stroke-[white]"
                  alt=""
                />
              ) : (
                "Регистрация"
              )}
            </button>
          </form>
          <div className="flex justify-center mt-[20px]">
            <p className="text-[#7D7D7D] font-['Poppins'] text-[16px] leading-[24px] font-light">
              Уже есть Аккаунт ?{" "}
              <Link className="text-black font-semibold" to="/login">
                Войти
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
