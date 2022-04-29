import { lazy } from "react";

const routes = [
  {
    path: "new",
    component: lazy(() => import("../pages/Form")),
    exact: true,
  },
  {
    path: "responses/:formId",
    component: lazy(() => import("../pages/AllResponse")),
    exact: true,
  },
];

export default routes;
