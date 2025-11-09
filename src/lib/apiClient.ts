import axios, { AxiosError } from "axios";

const ApiClient = axios.create({
  baseURL: "https://next-cinema-api.onrender.com/api",
  withCredentials: true,
});

// Access Token
let currentToken: string | null = null;
let tokenRefreshCallback: ((token: string | null) => void) | null = null;

export const setToken = (newToken: string | null) => {
  currentToken = newToken;
};

export const setTokenRefreshCallback = (
  callback: ((token: string | null) => void) | null
) => {
  tokenRefreshCallback = callback;
};

// UserId
// let currentUserId: string | null = null;
let userIdCallback: ((userId: string | null) => void) | null = null;

// export const setUserIdApiClient = (userId: string | null) => {
//   currentUserId = userId;
// };

export const setUserIdCallback = (
  callback: ((userId: string | null) => void) | null
) => {
  userIdCallback = callback;
};

ApiClient.interceptors.request.use(
  (config) => {
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const errorData = error.response?.data as { message?: string };

    if (
      error.response?.status === 401 &&
      errorData?.message === "Expired Token" &&
      originalRequest
    ) {
      try {
        const response = await ApiClient.post("/users/refresh");

        const newAccessToken = response.data.accessToken;
        const userId = response.data.data.id;

        setToken(newAccessToken);
        // setUserIdApiClient(userId);

        if (tokenRefreshCallback) tokenRefreshCallback(newAccessToken);
        if (userIdCallback) userIdCallback(userId);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return ApiClient(originalRequest);
      } catch (refreshError) {
        setToken(null);

        if (tokenRefreshCallback) {
          tokenRefreshCallback(null);
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default ApiClient;
