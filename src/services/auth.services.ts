import { instance } from '@/helpers/axios/axiosInstance';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const AccessAuthInfo = () => {
    const [authInfo, setAuthInfo] = useState(null);

    useEffect(() => {
        const token = Cookies.get("refreshToken");
        console.log(token)
      
    }, []);

}


export const GenerateAccessToken=async()=>{
    return await  instance({
      url:process.env.NEXT_PUBLIC_API_URL+"/auth/refresh-token",
      method:"POST",
      headers:{"Content-Type":"application/json"},
      withCredentials:true
    })
}

