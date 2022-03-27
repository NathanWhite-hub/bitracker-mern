const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.bitracker.app/api/",
  timeout: 10000,
  withCredentials: true,
});

export async function getUserName() {
  return await instance.get("/get_user_name");
}
