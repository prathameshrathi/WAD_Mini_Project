import { Route, Navigate } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";

function PublicRoute({
    children,
    isAuthenticated,
    path,
    ...rest
}) {
    return (
        <Route
            {...rest}
            element={({ location }) => (
                <AuthWrapper spinner={false}>
                    {children}
                    {isAuthenticated && location?.pathname === "/login" ? (
                        <Navigate
                            to={"/"}
                        />
                    ) : null}
                </AuthWrapper>
            )}
        />
    );
}

export default PublicRoute;
