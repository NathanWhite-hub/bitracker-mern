const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.bitracker.app/api/",
  timeout: 10000,
  withCredentials: true,
});

export async function login(data) {
  if (!data.username || !data.password) {
    return Promise.reject(new Error("Data is missing"));
  }

  return await instance.post("/login", data);
}

export async function validate() {
  return await instance.get("/protected-route");
}

export async function validatePrivledges() {
  return await instance.get("/is-admin");
}
