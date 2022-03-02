import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/v1/users", body);
};

export const login = (creds) => {
  return axios.post("/api/v1/auth", {}, { auth: creds });
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
