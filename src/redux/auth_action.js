import { authAPI, profileAPI } from "../api/api";

export const isUserAuthAction = (accessToken, tokenType) => ({
  type: "IS_USER_AUTH",
  payload: {
    accessToken,
    tokenType,
  },
});

export const setAuthUserData = (profile) => ({
  type: "SET_USER_DATA",
  payload: {
    profile,
  },
});
export const loginAction = () => ({
  type: "LOG_IN",
});
export const logOutAction = () => ({
  type: "LOG_OUT",
});

export const getProfileThunk = () => async (dispatch) => {
  try {
    let access_token = localStorage.getItem("accessToken");
    let response = await profileAPI.me(access_token);
    if (response) {
      dispatch(setAuthUserData(response.data));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const loginThunk = (phone, password) => async (dispatch) => {
  try {
    if (phone.length && password.length) {
      let response = await authAPI.login(phone, password);
      localStorage.setItem("accessToken", response.data.access_token);
      dispatch(loginAction());
    }
  } catch (e) {
    alert("Указано некорректное значение логина или пароля.");
  }
};
export const registerThunk =
  (
    { phone, password, name, email, date, month, year },
    avatar_img,
    time_zone
  ) =>
  async (dispatch) => {
    let birthday = year + "-" + month + "-" + date;
    try {
      if (
        phone.length &&
        password.length &&
        name.length &&
        email.length &&
        birthday.length
      ) {
        await authAPI
          .register(
            phone,
            password,
            name,
            email,
            birthday,
            avatar_img,
            time_zone
          )
          .then((resp) => {
            dispatch(setAuthUserData(resp.data));
            alert("Вы зарегистрировались, теперь можете войти");
          });
      }
    } catch (e) {
      alert("Указано некорректное значение номера телефона.");
    }
  };
