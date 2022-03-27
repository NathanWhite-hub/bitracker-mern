const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.bitracker.app/api/",
  timeout: 10000,
  withCredentials: true,
});

export async function createRoundedCart(data) {
  if (!data.cartSerialNumber || !data.hospitalRoundedAt) {
    return Promise.reject(new Error("Data is missing"));
  }

  return await instance.post("/rounding_cart_save", data);
}

export async function userCartsRounded() {
  return await instance.get("/get_rounding_carts");
}

export async function viewRoundedCart(cartSerialNum) {
  return await instance.get(
    `/view_rounded_cart?cart_serial_num=${cartSerialNum}`
  );
}

export async function updateCart(data) {
  if (!data.cartSerialNumber || !data.hospitalRoundedAt) {
    return Promise.reject(new Error("Data is missing"));
  }

  return await instance.post("/update_cart", data);
}
