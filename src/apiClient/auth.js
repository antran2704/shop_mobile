import httpInstance from "../config/axios";

const login = async (email) => {
  return await httpInstance
    .post("/users/login", { email })
    .then((res) => res.data);
};

const getUser = async (accessToken, publicKey) => {
  return await httpInstance.get("/users", {
    headers: {
      Authorization: accessToken,
      "public-key": publicKey,
    },
  });
};

const getUserByEmail = async (email) => {
  return await httpInstance.post("/users/email", {
    email,
  });
};

const createUser = async (payload) => {
  return await httpInstance.post("/users", payload).then((res) => res.data);
};

const getRefreshToken = async (refreshToken) => {
  return await httpInstance.get("/users/refreshToken", {
    headers: {
      "refresh-token": refreshToken,
    },
  });
};

export { login, getUser, getRefreshToken, getUserByEmail, createUser };
