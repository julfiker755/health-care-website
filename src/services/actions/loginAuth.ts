// "use server"
import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { decodedToken } from "../auth.services";
import { authKey } from "@/contants";




export const loginAuth = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
    // cache:'no-store'
  });
  const loginInfo = await res.json();
  if (loginInfo?.data?.accessToken) {
    const user = decodedToken(loginInfo.data.accessToken);
    setAccessToken(authKey,loginInfo.data.accessToken, {
      route:user.role,
    });
  }
  return loginInfo;
};
