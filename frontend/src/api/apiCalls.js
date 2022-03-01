import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/v1/users", body);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
