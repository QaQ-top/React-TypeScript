import { lazy } from "react";
import { RouteProps } from "react-router-dom";

const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("@/pages/Home"))
  },
  {
    path: "/test-page",
    component: lazy(() => import("@/pages/TestPage"))
  },
  {
    path: "/main",
    component: lazy(() => import("@/pages/mian/main"))
  }
];

export default routes;
