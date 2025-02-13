import { instance } from '@/helpers/axios/axiosInstance';
import { useEffect, useState } from 'react';
import { jwtDecode} from "jwt-decode"


interface AuthProps {
  email: string;
  role: string;
  iat: number;
  exp: number;
}
export const  decodedToken=(token:string)=> jwtDecode<AuthProps>(token)

export const AccessAuthInfo = () => {
  const [authInfo, setAuthInfo] = useState<AuthProps>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthInfo(decodedToken(token));
    }
  }, []);

  return authInfo;
};
// export const AccessAuthInfo = () => {
//     const [authInfo, setAuthInfo] = useState<AuthProps | null>(null);
  
//     const memoizedAuthInfo = useMemo(() => {
//       const token = localStorage.getItem("accessToken");
//       if (token) {
//         return decodedToken(token);
//       }
//       return null;
//     }, []);
//     useEffect(() => {
//       if (memoizedAuthInfo) {
//         setAuthInfo(memoizedAuthInfo);
//       }
//     }, [memoizedAuthInfo]);
//     return authInfo;
//   };


export const GenerateAccessToken=async()=>{
    return await  instance({
      url:process.env.NEXT_PUBLIC_API_URL+"/auth/refresh-token",
      method:"POST",
      headers:{"Content-Type":"application/json"},
      withCredentials:true
    })
}

