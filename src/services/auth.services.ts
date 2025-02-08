import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const AccessAuthInfo = () => {
    const [authInfo, setAuthInfo] = useState(null);

    useEffect(() => {
        const token = Cookies.get("refreshToken");
        console.log(token)
      
    }, []);

}
