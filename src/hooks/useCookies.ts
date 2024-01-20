import { useState, useEffect } from 'react';
import useAuthUser from "react-auth-kit/hooks/useAuthHeader";

const useCookies = () => {
    const auth = useAuthUser() as any;
    const [token, setToken] = useState(auth.token);

    useEffect(() => {
        setToken(auth.token);
    }, [auth.token]);

    return { token, setToken };
};

export default useCookies;
