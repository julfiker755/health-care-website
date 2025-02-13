import { authKey } from "@/contants";
import { getLocalStroage, setLocalStroage } from "@/lib/utils";
import setAccessToken from "@/services/actions/setAccessToken";
import { GenerateAccessToken } from "@/services/auth.services";
import { ResponseErrorProps, ResponseSuccessProps } from "@/types";
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
    if (error?.response?.status === 500 && !config?.sent) {
      config.sent = true;
      const response = await GenerateAccessToken();
      const accessToken = response?.data.accessToken;
      config.headers["Authorization"] = accessToken;
      setLocalStroage(authKey, accessToken);
      setAccessToken(authKey, accessToken);
      return instance(config);
    } else {
      const responseObject: ResponseErrorProps = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessages: error?.response?.data?.message,
      };
      return responseObject;
    }
  }
);

export { instance };
