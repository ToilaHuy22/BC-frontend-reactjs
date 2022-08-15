import { stringify } from "react-auth-wrapper/helpers";
import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

export { handleLoginApi };
