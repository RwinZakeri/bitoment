import { getToken } from "@/lib/utils";
import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 5000 ,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default instance;
