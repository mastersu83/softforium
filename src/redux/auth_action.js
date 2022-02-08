import { authAPI, profileAPI } from "../api/api";

export const isUserAuthAction = (accessToken, tokenType) => ({
  type: "IS_USER_AUTH",
  payload: {
    accessToken,
    tokenType,
  },
});

export const setAuthUserData = (data) => ({
  type: "SET_USER_DATA",
  payload: {
    data,
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

export const loginThunk =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      if (email.length && password.length) {
        let response = await authAPI.login(email, password);
        localStorage.setItem("accessToken", response.data.access_token);
        dispatch(loginAction());
      }
    } catch (e) {
      console.log(e.message);
    }
  };
export const registerThunk =
  ({ phone, password, userName, email, date, month, year, avatar }) =>
  async (dispatch) => {
    let birthday = date + "-" + month + "-" + year;
    try {
      if (
        phone.length &&
        password.length &&
        userName.length &&
        email.length &&
        birthday.length &&
        avatar.length
      ) {
        await authAPI
          .register(phone, password, userName, email, birthday, avatar)
          .then((resp) => {
            dispatch(setAuthUserData(resp.data));
          });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
