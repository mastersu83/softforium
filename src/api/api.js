import axios from "axios";

const generateID = () => {
  const token = Math.random().toString(16).slice(2);
  localStorage.setItem("X-APP-ID", JSON.stringify(token));
  return token;
};
const XAPPID = localStorage.getItem("X-APP-ID") || generateID();

export const profileAPI = {
  me(accessToken) {
    return axios
      .get(`https://testtask.softorium.pro/users/me`, {
        headers: {
          "X-APP-ID": XAPPID,
          Authorization: "Bearer" + accessToken,
        },
      })
      .then((response) => {
        return response;
      });
  },
};

export const authAPI = {
  register(phone, password, userName, email, birthday, avatar) {
    return axios
      .post(`https://testtask.softorium.pro/signup`, {
        phone,
        password,
        userName,
        email,
        birthday,
        avatar,
      })
      .then((resp) => {
        return resp;
      });
  },
  login(email, password) {
    return axios
      .post(
        `https://testtask.softorium.pro/login`,
        { email, password },
        {
          headers: {
            "X-APP-ID": XAPPID,
          },
        }
      )
      .then((resp) => {
        return resp;
      });
  },
};
