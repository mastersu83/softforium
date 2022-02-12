import React from "react";
import classes from "./Login.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth_action";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    phone: yup
      .string()
      .required("Это обязательное поле")
      .matches(/^(\s*)?(\+7)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, {
        message: "Должен начинаться +7",
        excludeEmptyString: false,
      })
      .min(3, "11 цифр")
      .max(12, "Не корректный номер"),
    password: yup
      .string()
      .min(3, "Минимум 3 символа")
      .required("Это обязательное поле"),
  })
  .required();

const Login = ({ isAuth }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dispatch(loginThunk(data.phone, data.password));
  };

  React.useEffect(() => {
    if (isAuth) {
      history.push("/profile");
    }
  }, [isAuth]);
  return (
    <div className={classes.login}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.login__container}
      >
        <div className={classes.input__box}>
          <div className={classes.login__title}>Номер телефона</div>
          <input
            {...register("phone")}
            type="phone"
            className={classes.login__input}
            placeholder="+7"
          />
          <span className={`${classes.login__title} ${classes.errors}`}>
            {errors.phone?.message}
          </span>
        </div>
        <div className={classes.login__title}>Пароль</div>
        <input
          {...register("password")}
          type="password"
          className={classes.login__input}
          placeholder="Пароль"
        />
        <button
          // onClick={handleSubmit(onSubmit)}
          className={classes.login__button}
        >
          Войти
        </button>
        <div className={classes.needAccount}>
          <span>Если не зарегистрированны:</span>
          <Link to="/register">Регистрация</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
