"use server"
import { cookies } from "next/headers"

export const getCookies = (keys: string[]) => {
    keys.forEach((key)=>{
        cookies().get(key)
    })
}
