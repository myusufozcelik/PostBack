import axios from "axios";

const signup = (body) => {
  return axios.post("/api/v1/users", body);
};

export default signup;
