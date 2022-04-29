import AxiosInst from "../axios";
import useAuth from "./useAuth";

const useAxios = () => {
    const { tokens, isLoggedIn } = useAuth();
    if (isLoggedIn)
        AxiosInst.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${tokens.accessToken}`;
    return AxiosInst;
};

export default useAxios;
