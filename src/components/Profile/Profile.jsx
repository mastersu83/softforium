import React from "react";
import classes from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk, logOutAction } from "../../redux/auth_action";
import { useHistory } from "react-router-dom";

export const Profile = () => {
  let profile = useSelector((state) => state.profile);
  const history = useHistory();
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logOutAction());
    history.push("/login");
  };
  React.useEffect(() => {
    dispatch(getProfileThunk());
  }, []);
  return (
    <div className={classes.profile}>
      <div className={classes.profile__container}>
        <div className={classes.profile__header}>
          <img
            className={classes.profile__avatar}
            src={profile.avatar}
            alt="avatar"
          />
          <span onClick={logOut}>Выход</span>
        </div>
        <div className={classes.profile__info}>
          <div className={classes.profile__data}>
            <label>Имя</label> <span>{profile.name}</span>
          </div>
          <div className={classes.profile__data}>
            <label>Email</label> <span>{profile.email}</span>
          </div>
          <div className={classes.profile__data}>
            <label>Телефон</label>
            <span>{profile.phone}</span>
          </div>
          <div className={classes.profile__data}>
            <label>День рождения</label> <span>{profile.birthday}</span>
          </div>
          <div className={classes.profile__data}>
            <label>Дата регистрации</label>
            <span>{profile.dt_create}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
