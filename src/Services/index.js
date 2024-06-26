import axios from "axios";
import config from "../Views/Config";



const service = axios.create({
    BASE_URL: config.BASE_URL,
    timeout: 60000,
});

service.interceptors.request.use(
    (request) => {

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
