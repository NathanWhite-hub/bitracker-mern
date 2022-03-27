const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.bitracker.app/api/",
  timeout: 10000,
  withCredentials: true,
});

export async function createNewUser(data) {
  if (
    !data.userName ||
    !data.password ||
    !data.firstName ||
    !data.lastName ||
    !data.team
  ) {
    return Promise.reject(new Error("Data is missing"));
  }

  //return await instance.post("/rounding_cart_save", data);
}

export async function cartsRoundedForMonth(currentYear, currentMonth) {
  return await instance.get(
    `/get_month_rounding?currentMonth=${currentMonth}&currentYear=${currentYear}`
  );
}

export async function roundingViewByQuarter(currentQuarter) {
  return await instance.get(
    `/get_rounding_by?startDate=${currentQuarter.startDate}&endDate=${currentQuarter.endDate}`
  );
}

export async function getAllUsers() {
  return await instance.get(`/get_all_users`);
}

export async function viewUser(userID) {
  return await instance.get(`/user?user_id=${userID}`);
}

export async function updateUser(data) {
  return await instance.post("/update_user", data);
}

export async function createUser(data) {
  return await instance.post("/create_user", data);
}
