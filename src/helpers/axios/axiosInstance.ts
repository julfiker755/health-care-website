import { authKey } from "@/contants";
import { getLocalStroage, setLocalStroage } from "@/lib/utils";
import { GenerateAccessToken } from "@/services/auth.services";
import { ResponseSuccessProps } from "@/types";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.withCredentials = true;
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getLocalStroage("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessProps = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    const config = error.config;
    const exp = error?.response.data.errors.scretCode === "R1lCfyF3XN";
    if (exp && !config?.sent) {
      config.sent = true;
      const response = await GenerateAccessToken();
      const accessToken = response?.data.accessToken;
      config.headers["Authorization"] = accessToken;
      setLocalStroage(authKey, accessToken);
      return instance(config);
    }
    return error?.response;
  }
);

export { instance };
