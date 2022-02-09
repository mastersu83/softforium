import React from "react";
import classes from "./Login.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth_action";

const Login = ({ isAuth }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginThunk(data.email, data.password));
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
        <div className={classes.login__title}>Email или номер телефона</div>
        <input
          {...register("email")}
          type="text"
          className={classes.login__input}
        />
        <div className={classes.login__title}>Пароль</div>
        <input
          {...register("password")}
          type="password"
          className={classes.login__input}
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
