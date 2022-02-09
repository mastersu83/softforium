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

export const loginThunk = (email, password) => async (dispatch) => {
  try {
    if (email.length && password.length) {
      let response = await authAPI.login(email, password);
      console.log(response);
      localStorage.setItem("accessToken", response.data.access_token);
      dispatch(loginAction());
    }
  } catch (e) {
    console.log(e.message);
  }
};
export const registerThunk =
  ({ phone, password, name, email, date, month, year }, base64Img) =>
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
          .register(phone, password, name, email, birthday, base64Img)
          .then((resp) => {
            dispatch(setAuthUserData(resp.data));
            alert("Вы зарегистрировались, теперь можете войти");
          });
      }
    } catch (e) {
      alert(
        "Пользователь с указанным номером телефона уже существует в системе."
      );
    }
  };
