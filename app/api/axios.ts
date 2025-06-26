import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

import { USER_TOKEN } from "@/constants/cookies";

// import { PAGE_URL } from "@/constants/PageUrl";

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const onError = (
  error: Error & {
    response: { data: { errors: any; message: string }; status: number };
  }
) => {
  const e = error;
  const msg = e.response.data.message;

  toast.error(msg ?? "Error!");
  if (e.response.status === 401) {
    // window.location.href = PAGE_URL.auth.login;
    Cookies.remove(USER_TOKEN);
  }

  throw error;
};

// without token (for auth)
const normalFetcher = {
  get: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance.get<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  post: <T>(url: string, body: object, configs?: AxiosRequestConfig<any> | undefined) => {
    return AxiosInstance.post<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e));
  },
  put: <T>(url: string, body: object, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance.put<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  patch: <T>(url: string, body: object, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance.patch<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  delete: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance.delete<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
};

const AuthorizationConfig = () => {
  const token = Cookies.get(USER_TOKEN);
  AxiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
};

// with token
const fetcher = {
  get: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) => {
    AuthorizationConfig();
    return AxiosInstance.get<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e));
  },
  post: <T>(url: string, body: object, configs?: AxiosRequestConfig<any> | undefined) => {
    AuthorizationConfig();
    return AxiosInstance.post<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e));
  },
  put: <T>(url: string, body: object, configs?: AxiosRequestConfig<any> | undefined) => {
    AuthorizationConfig();
    return AxiosInstance.put<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e));
  },
  patch: <T>(url: string, body: object, configs?: AxiosRequestConfig<any> | undefined) => {
    AuthorizationConfig();

    return AxiosInstance.patch<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e));
  },
  delete: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) => {
    AuthorizationConfig();
    return AxiosInstance.delete<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e));
  },
};

export { fetcher, normalFetcher };
