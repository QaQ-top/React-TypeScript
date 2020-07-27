import axios from "axios";
import { isDev } from "@/utils";

const DEFAULT_PROXY = "/proxy";
// 自定义代理时,使用的代理前缀
const CUSTORM_PROXY_PREFIX = /^\/api-/;
const HTTP_REGX = /^http(s?):\/\//;

const withProxy = (url: string) => {
  // 如果以http或https协议开头,则不使用代理
  if (HTTP_REGX.test(url)) {
    return url;
  }

  // 检查url是否匹配自定义代理规则
  const hasCustomPrefix = CUSTORM_PROXY_PREFIX.test(url);

  if (hasCustomPrefix) {
    if (isDev) {
      return url;
    } else {
      // 生产模式下, 自动去除自定义proxy
      const urlArr = url.split("/");
      urlArr.splice(0, 2);
      const baseReqUrl = "/" + urlArr.join("/");

      return baseReqUrl;
    }
  } else {
    return isDev ? DEFAULT_PROXY + url : url;
  }
};

const axiosIns = axios.create({  // 创建一个规定好格式的 axios
  baseURL: "",
  timeout: 10000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

interface Token {
  Authorization:string
}

axiosIns.interceptors.request.use(
  (config) => {
    let { url = "", headers = {} as Token } = config;
    const token = window.localStorage.getItem("token");
    token && (headers.Authorization = token);
    url = withProxy(url);

    return { ...config, url, headers };
  },
  (error) => Promise.reject(error)
);

axiosIns.interceptors.response.use(
  (response) => {
    console.log("axios", response);
    return response.data;
  },
  (error) => Promise.reject(error)
);

const http = {
  get: (url: string, params = {}) => axiosIns.get(url, { params }),
  post: (url: string, params = {}) => axiosIns.post(url, params),
  delete: (url: string, params = {}) => axiosIns.delete(url, { params }),
  put: (url: string, params = {}) => axiosIns.put(url, params)
};

export default http;
