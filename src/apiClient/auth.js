import httpInstance from "../config/axios";

const login = async (email) => {
  return await httpInstance
    .post("/users/login", { email })
    .then((res) => res.data);
};

const logout = async (AsyncStorage) => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
  await AsyncStorage.removeItem("publicKey");
  await AsyncStorage.removeItem("apiKey");
};

const handleSetAsyncStorage = async (
  AsyncStorage,
  accessToken,
  refreshToken,
  publicKey,
  apiKey
) => {
  await AsyncStorage.setItem("accessToken", accessToken);
  await AsyncStorage.setItem("refreshToken", refreshToken);
  await AsyncStorage.setItem("publicKey", publicKey);
  await AsyncStorage.setItem("apiKey", apiKey);
};

const getUser = async () => {
  return await httpInstance.get("/users").then((res) => res.data);
};

const getUserByEmail = async (email) => {
  return await httpInstance
    .post("/users/email", {
      email,
    })
    .then((res) => res.data);
};

const createUser = async (payload) => {
  console.log("create new user");
  return await httpInstance.post("/users", payload).then((res) => res.data);
};

const getRefreshToken = async () => {
  return await httpInstance.get("/users/refreshToken").then((res) => res.data);
};

export {
  login,
  logout,
  getUser,
  getRefreshToken,
  getUserByEmail,
  createUser,
  handleSetAsyncStorage,
};
