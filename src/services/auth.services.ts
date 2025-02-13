import { instance } from "@/helpers/axios/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { AuthProps } from "@/types";

export const decodedToken = (token: string) => jwtDecode<AuthProps>(token);

export const GenerateAccessToken = async () => {
  return await instance({
    url: process.env.NEXT_PUBLIC_API_URL + "/auth/refresh-token",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
