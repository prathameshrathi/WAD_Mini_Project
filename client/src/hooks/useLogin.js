import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/auth/slice";
import useAxios from "./useAxios";

const useLogin = () => {
    const dispatch = useDispatch();
    const AxiosInst = useAxios();
    return useMutation(async (loginInfo) => {
        let res = await AxiosInst.post("/auth/login", loginInfo);
        dispatch(setAuth(res.data));
        return res.data;
    });
};

export default useLogin;
