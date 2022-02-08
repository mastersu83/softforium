import React from "react";
import classes from "../Login/Login.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth_action";

const Register = ({ isAuth }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(registerThunk(data));
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
          <div className={classes.login__title}>Email</div>
          <input
            {...register("email")}
            type="email"
            className={classes.login__input}
            required
          />
          <div className={classes.login__title}>Имя пользователя</div>
          <input
            {...register("userName")}
            type="text"
            className={classes.login__input}
            required
          />
          <div className={classes.login__title}>Номер телефона</div>
          <input
            {...register("phone")}
            type="phone"
            className={classes.login__input}
            required
          />
          <div className={classes.login__title}>Пароль</div>
          <input
            {...register("password")}
            type="password"
            className={classes.login__input}
            required
          />
          <div className={classes.login__title}>Дата рождения</div>
          <div className={classes.date__input}>
            <input
              {...register("date")}
              type="text"
              className={classes.login__input}
              required
            />
            <input
              {...register("month")}
              type="text"
              className={classes.login__input}
              required
            />
            <input
              {...register("year")}
              type="text"
              className={classes.login__input}
              required
            />
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
