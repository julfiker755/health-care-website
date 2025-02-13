"use server"
import { cookies } from "next/headers"

export const getCookies = (keys: string[]) => {
    const cookieStore = cookies()
    const cookieValues: { [key: string]: string | undefined } = {}

    keys.forEach((key) => {
        cookieValues[key] = cookieStore.get(key)?.value
    })

    return cookieValues
}
