import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ children, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            element={({ location }) =>
                isAuthenticated ? children : <Navigate to={"/login"} />
            }
        />
    );
}

export default PrivateRoute;
