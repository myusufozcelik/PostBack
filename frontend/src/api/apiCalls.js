import axios from "axios";

export const signup = (userBody) => {
  return axios.post("/api/v1/users", userBody);
};

export const login = (creds) => {
  // creds içerisine username ve password bilgisi var
  // 1.parametre request atılacak yer 2.parametre request body
  // 3.parametre configuration parametresi
  return axios.post("/api/v1/auth", {}, { auth: creds });
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
