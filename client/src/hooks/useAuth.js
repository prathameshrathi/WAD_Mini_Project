import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    logout,
    selectAuthState,
    selectTokens,
    selectUser,
} from "../redux/auth/slice";

const useAuth = () => {
    const authState = useSelector(selectAuthState);
    const tokens = useSelector(selectTokens);
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const isLoggedIn = authState === "LOGGEDIN";

    const isLoggedOut = authState === "LOGGEDOUT";

    const logOutUser = () => {
        dispatch(logout());
    };
    return { isLoggedIn, tokens, user, logOutUser, isLoggedOut };
};

export default useAuth;
