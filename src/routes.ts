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
  },
  {
    path:'/myTest',
    component: lazy(() => import("@/pages/myTest/index"))
  },
  {
    path:'/mobx',
    component: lazy(() => import("@/pages/mobx/index"))
  },
];

export default routes;
