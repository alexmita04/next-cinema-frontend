import axios from "axios";

const ApiClient = axios.create({
  baseURL: "https://next-cinema-api.onrender.com/api",
});

let currentToken: string | null = null;

export const setToken = (newToken: string | null) => {
  currentToken = newToken;
};

ApiClient.interceptors.request.use(
  (config) => {
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiClient;
