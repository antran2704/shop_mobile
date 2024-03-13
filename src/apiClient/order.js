import httpInstance from "../config/axios";

const ORDER_KEY = {
  ORDERS_USER: "orders_user",
};

const getOrder = async (order_id) => {
  return await httpInstance
    .get(`/orders/order_id/${order_id}`)
    .then((res) => res.data);
};

const getOrdersByUserId = async (user_id, payload, page = 1) => {
  if (payload.status === "All") {
    delete payload.status;
  }

  return await httpInstance
    .post(`/orders/user/${user_id}?page=${page}`, payload)
    .then((res) => res.data);
};

const createOrder = async (data) => {
  return await httpInstance.post("/orders", data).then((res) => res.data);
};

const updateOrder = async (order_id, data) => {
  return await httpInstance
    .patch(`/orders/${order_id}`, data)
    .then((res) => res.data);
};

const updatePaymentStatusOrder = async (order_id, data) => {
  return await httpInstance
    .patch(`/orders/payment_status/${order_id}`, data)
    .then((res) => res.data);
};

export {
  getOrder,
  createOrder,
  updateOrder,
  updatePaymentStatusOrder,
  getOrdersByUserId,
  ORDER_KEY,
};
