import axios from "axios";
import { IP_ENDPOINT } from "../../env";
import { getRefreshToken, logout } from "../apiClient/auth";

const httpInstance = axios.create({ baseURL: `${IP_ENDPOINT}/api/v1` });
let AsyncStorage;
let isRefresh = false;
let router;
let signOutClerk;

const handleLogout = () => {
  isRefresh = false;
  logout(AsyncStorage);
  signOutClerk();
  console.log("logout aixos");
};

export const injectRouter = (_signOutClerk, _AsyncStorage) => {
  signOutClerk = _signOutClerk;
  AsyncStorage = _AsyncStorage;
};

httpInstance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const publicKey = await AsyncStorage.getItem("publicKey");
    // const apiKey = await AsyncStorage.getItem("apiKey");

    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers["refresh-token"] = `Key ${refreshToken}`;
    config.headers["public-key"] = `Key ${publicKey}`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    if (error.code === "ERR_NETWORK") {
      console.log("Please check your network");
      return Promise.reject(error);
    }

    const response = error.response;
    if (!response) return Promise.reject(error);

    if (response.status === 500) {
      console.log("Error in server, please try again");
      return Promise.reject(error);
    }

    if (response.status === 403) {
      console.log("Forbidden, please login");

      return Promise.reject(error);
    }

    if (
      response.status === 404 &&
      response.data.message === "Not found key token"
    ) {
      handleLogout();
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (response.status === 401) {
      if (originalRequest.method === "post") {
        return Promise.reject(error);
      }

      if (!isRefresh && !originalRequest._retry) {
        isRefresh = true;

        const { status, payload } = await getRefreshToken();
        if (status === 200) {
          isRefresh = false;
          await AsyncStorage.setItem("accessToken", payload.newAccessToken);
          originalRequest._retry = true;
          console.log("refeshtoken_res1", payload, originalRequest);
          return Promise.resolve(httpInstance(originalRequest));
        }
      } else {
        handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

export default httpInstance;
