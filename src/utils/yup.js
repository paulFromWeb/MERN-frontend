import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email обязателен")
    .email("Введите корректный e-mail"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(5, "Пароль должен быть не менее 5 символов"),
});
export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email обязателен")
    .email("Введите корректный e-mail"),
  fullName: yup
    .string()
    .required("Имя пользователя обязательно")
    .min(3, "Имя пользователя должно быть не менее 3 символов"),

  password: yup
    .string()
    .required("Пароль обязателен")
    .min(5, "Пароль должен быть не менее 5 символов"),
  confirmPassword: yup
    .string()
    .required("Пароль обязателен")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});
export const postSchema = yup.object().shape({
  title: yup
    .string()
    .required("Введите заголовок")
    .min(3, "Заголовок должен быть не менее 3 символов"),
  theme: yup
    .string()
    .required("Введите название темы")
    .min(3, "Название темы должно быть не менее 3 символов"),
  text: yup
    .string()
    .required("Введите текст")
    .min(250, "Текст должен быть не менее 250 символов"),
});
