import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

import { USER_TOKEN } from "@/constants/cookies";

// import { PAGE_URL } from "@/constants/PageUrl";

type ApiConfigsType = {
  token?: string | null | undefined;
  showToast?: boolean;
} & AxiosRequestConfig<any>;

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseBody = <T>(response: AxiosResponse<T>, showToast?: boolean) => {
  if (showToast) {
    const msg: any = response.data;

    toast.success(msg.message);
  }

  return response.data;
};

const onError = (
  error: Error & {
    response: { data: { errors: any; message: string; err?: string }; status: number };
  }
) => {
  const e = error;
  const msg = e.response.data.message;
  const errMsg = e.response.data.err ?? "";

  toast.error(msg ? `${msg} errMsg: ${errMsg}` : "Error!");
  if (e.response.status === 401) {
    // window.location.href = PAGE_URL.auth.login;
    Cookies.remove(USER_TOKEN);
  }

  throw error;
};

// without token (for auth)
const normalFetcher = {
  get: <T>(url: string, configs?: ApiConfigsType | undefined) =>
    AxiosInstance.get<T>(url, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e)),
  post: <T>(url: string, body: object, configs?: ApiConfigsType | undefined) => {
    return AxiosInstance.post<T>(url, body, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
  put: <T>(url: string, body: object, configs?: ApiConfigsType | undefined) =>
    AxiosInstance.put<T>(url, body, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e)),
  patch: <T>(url: string, body: object, configs?: ApiConfigsType | undefined) =>
    AxiosInstance.patch<T>(url, body, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e)),
  delete: <T>(url: string, configs?: ApiConfigsType | undefined) =>
    AxiosInstance.delete<T>(url, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e)),
};

const AuthorizationConfig = (token?: string | null | undefined) => {
  if (token) {
    AxiosInstance.defaults.headers.Authorization = `${token}`;
  } else {
    const client_token = Cookies.get(USER_TOKEN);
    AxiosInstance.defaults.headers.Authorization = `${client_token}`;
  }
};
// with token
const fetcher = {
  get: <T>(url: string, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig(configs?.token);
    return AxiosInstance.get<T>(url, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
  post: <T>(url: string, body: object, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig(configs?.token);
    return AxiosInstance.post<T>(url, body, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
  put: <T>(url: string, body: object, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig(configs?.token);
    return AxiosInstance.put<T>(url, body, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
  patch: <T>(url: string, body: object, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig(configs?.token);

    return AxiosInstance.patch<T>(url, body, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
  delete: <T>(url: string, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig(configs?.token);
    return AxiosInstance.delete<T>(url, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
};

export { fetcher, normalFetcher };
