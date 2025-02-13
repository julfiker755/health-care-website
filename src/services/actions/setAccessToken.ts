"use server";
import { PathRoute } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const setAccessToken = (key:string,token: string, option?: any) => {
  cookies().set(key, token);
  if (option?.route) {
    redirect(`${PathRoute(option?.route)}`);
  }
};

export default setAccessToken;
