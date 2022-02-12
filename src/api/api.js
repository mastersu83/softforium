import axios from "axios";
import { utils } from "../utils/utils";

const XAPPID = localStorage.getItem("X-APP-ID") || utils.generateID();

export const profileAPI = {
  me(accessToken) {
    return axios
      .get(`https://testtask.softorium.pro/users/me`, {
        headers: {
          token_type: "bearer",
          "X-APP-ID": XAPPID,
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        return response;
      });
  },
};

export const authAPI = {
  register(phone, password, name, email, birthday, avatar_img, time_zone) {
    return axios
      .post(
        `https://testtask.softorium.pro/signup`,
        {
          phone,
          password,
          name,
          email,
          birthday,
          avatar_img,
          time_zone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-APP-ID": XAPPID,
          },
        }
      )
      .then((resp) => {
        return resp;
      });
  },
  login(phone, password) {
    let formData = new FormData();
    formData.append("username", phone);
    formData.append("password", password);

    return axios
      .post(`https://testtask.softorium.pro/signin`, formData, {
        headers: {
          "X-APP-ID": XAPPID,
        },
      })
      .then((resp) => {
        return resp;
      });
  },
};
