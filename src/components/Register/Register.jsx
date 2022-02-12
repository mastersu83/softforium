import React from "react";
import classes from "../Login/Login.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth_action";
import { utils } from "../../utils/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Неверная почта")
      .required("Это обязательное поле"),
    name: yup
      .string()
      .min(3, "Минимум 3 символа")
      .required("Это обязательное поле"),
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
    date: yup
      .number()
      .min(1)
      .max(31)
      .positive()
      .integer()
      .required("Это обязательное поле"),
    month: yup
      .number()
      .min(1)
      .max(12)
      .positive()
      .integer()
      .required("Это обязательное поле"),
    year: yup.number().positive().integer().required("Это обязательное поле"),
  })
  .required();

const Register = ({ isAuth }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let time_zone = "+" + JSON.stringify(-(new Date().getTimezoneOffset() / 60));
  const onSubmit = async (data) => {
    const base64Img = await utils.convertBase64(data.avatar[0]);
    let img = base64Img.split(",");
    dispatch(registerThunk(data, img[1], time_zone));
  };

  React.useEffect(() => {
    if (isAuth) {
      alert("Вы зарегистрировались, теперь можете войти");
      history.push("/profile");
    }
  }, [isAuth]);

  return (
    <div className={classes.login}>
      <div className={classes.login__container}>
        <div>
          <div className={classes.input__box}>
            <div className={classes.login__title}>Email</div>
            <span className={`${classes.login__title} ${classes.errors}`}>
              {errors.email?.message}
            </span>
            <input
              {...register("email")}
              type="email"
              className={classes.login__input}
            />
          </div>
          <div className={classes.input__box}>
            <div className={classes.login__title}>Имя пользователя</div>
            <span className={`${classes.login__title} ${classes.errors}`}>
              {errors.name?.message}
            </span>
            <input
              {...register("name")}
              type="text"
              className={classes.login__input}
            />
          </div>
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

          <div className={classes.input__box}>
            <div className={classes.login__title}>Пароль</div>
            <input
              {...register("password")}
              type="password"
              className={classes.login__input}
            />
            <span className={`${classes.login__title} ${classes.errors}`}>
              {errors.password?.message}
            </span>
          </div>
          <div className={classes.login__title}>Дата рождения</div>
          <div className={classes.date__input}>
            <div className={classes.input__box}>
              <input
                {...register("date")}
                type="text"
                className={classes.login__input}
              />
              {/*<span className={`${classes.login__title} ${classes.errors}`}>*/}
              {/*  {errors.date?.message}*/}
              {/*</span>*/}
            </div>
            <div className={classes.input__box}>
              <input
                {...register("month")}
                type="text"
                className={classes.login__input}
              />
              {/*<span className={`${classes.login__title} ${classes.errors}`}>*/}
              {/*  {errors.month?.message}*/}
              {/*</span>*/}
            </div>
            <div className={classes.input__box}>
              <input
                {...register("year")}
                type="text"
                className={classes.login__input}
              />
              {/*<span className={`${classes.login__title} ${classes.errors}`}>*/}
              {/*  {errors.year?.message}*/}
              {/*</span>*/}
            </div>
          </div>
          <input
            {...register("avatar")}
            type="file"
            className={classes.login__input}
          />
          <button
            onClick={handleSubmit(onSubmit)}
            className={classes.login__button}
          >
            Зарегистрироваться
          </button>
        </div>
        <div className={classes.needAccount}>
          <span>Если зарегистрированны:</span>
          <Link to="/login">Войдите</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
