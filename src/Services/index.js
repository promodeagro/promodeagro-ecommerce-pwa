import axios from "axios";
import config from "../Views/Config";
import { ErrorMessages, loginDetails } from "../Views/Utills/helperFunctions";

const service = axios.create({
  BASE_URL: config.BASE_URL,
  timeout: 60000,
});

service.interceptors.request.use(
  (request) => {
    const token = loginDetails(); // Fetch token from local storage or state
    if (token) {
      request.headers["Authorization"] = `Bearer ${token.token}`;
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error?.response?.status == 404 &&
      error?.response?.data?.message == "User not found"
    ) {
      localStorage.removeItem("login");
      ErrorMessages.error(error?.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

const authService = axios.create({
  BASE_URL: config.BASE_URL,
  timeout: 60000,
});

authService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { service as postLoginService };
export { authService as preLoginService };
