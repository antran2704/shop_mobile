import httpInstance from "../config/axios";

const getProducts = async (page = 1) => {
  return await httpInstance
    .get(`/products?page=${page}`)
    .then((res) => res.data);
};

const getProduct = async (slug) => {
  return await httpInstance.get(`/products/${slug}`).then((res) => res.data);
};

const getVariations = async (product_id) => {
  return await httpInstance.get(`/variations/all/${product_id}`).then((res) => res.data);
};

export { getProducts, getProduct, getVariations };
