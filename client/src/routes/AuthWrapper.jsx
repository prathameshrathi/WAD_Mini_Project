import { Box, CircularProgress } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import useAxios from "../hooks/useAxios";
import {
    logout,
    selectAuthState,
    selectTokens,
    setAuth,
} from "../redux/auth/slice";

const AuthWrapper = ({ children, spinner = true }) => {
    const authState = useSelector(selectAuthState);
    const tokens = useSelector(selectTokens);
    const dispatch = useDispatch();
    const AxiosInst = useAxios()

    const { isLoading, isError } = useQuery(
        "user",
        async () => {
            if (authState !== "LOGGINGIN") return;
            const res = await AxiosInst.post("/auth/refreshToken", {
                refreshToken: tokens.refreshToken,
            });

            dispatch(
                setAuth({
                    ...res.data,
                    authState: "LOGGEDIN",
                })
            );
            return {
                ...res.data,
            };
        },
        {
            retry: false,
        }
    );

    useEffect(() => {
        console.log(isError);
        if (isError) {
            dispatch(logout());
        }
        return () => {};
    }, [isError]);

    if ((authState === "LOGGINGIN" || isLoading) && spinner) {
        return (
            <Box
                flexGrow={1}
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress isIndeterminate color="green.300" />
            </Box>
        );
    }
    return <>{children}</>;
};

export default AuthWrapper;
