// "use server"
import { FieldValues } from "react-hook-form"

export const loginAuth = async (data:FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials:"include"
        // cache:'no-store'
    })
    const loginInfo = await res.json()
    return  loginInfo
}