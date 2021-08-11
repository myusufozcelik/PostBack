import axios from "axios";

export const signup = (userBody) => {
  return axios.post("/api/v1/users", userBody);
};
