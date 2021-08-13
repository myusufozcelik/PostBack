import axios from "axios";

export const signup = (userBody) => {
  return axios.post("/api/v1/users", userBody);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
