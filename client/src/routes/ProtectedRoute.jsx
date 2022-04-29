import { CircularProgress } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Outlet } from "react-router";
import AuthWrapper from "./AuthWrapper";

const ProtectedRoute = () => (
    <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>
        <AuthWrapper>
            <Outlet />
        </AuthWrapper>
    </Suspense>
);

export default ProtectedRoute;
