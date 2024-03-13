import httpInstance from "../config/axios";

const CART_KEY = {
  CART_USER: "cart_user",
};

const getCart = async (user_id) => {
  return await httpInstance.get(`/carts/${user_id}`).then((res) => res.data);
};

const updateCart = async (user_id, data) => {
  return await httpInstance
    .post(`/carts/update/${user_id}`, data)
    .then((res) => res.data);
};

const increaseCart = async (user_id, data) => {
  return await httpInstance
    .post(`/carts/increase/${user_id}`, data)
    .then((res) => res.data);
};

const checkInventoryItems = async (user_id, data) => {
  return await httpInstance
    .post(`/carts/check_inventory/${user_id}`, data)
    .then((res) => res.data);
};

const deleteItemCart = async (user_id, data) => {
  return await httpInstance
    .post(`/carts/item/${user_id}`, data)
    .then((res) => res.data);
};

const deleteAllItemsCart = async (user_id) => {
  return await httpInstance
    .post(`/carts/items/${user_id}`, {})
    .then((res) => res.data);
};

export {
  getCart,
  updateCart,
  increaseCart,
  checkInventoryItems,
  deleteItemCart,
  deleteAllItemsCart,
  CART_KEY,
};
