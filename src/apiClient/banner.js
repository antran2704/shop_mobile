import httpInstance from "../config/axios";

const getBanners = async () => {
  return await httpInstance.get("/banners").then((res) => res.data);
};

export { getBanners };
