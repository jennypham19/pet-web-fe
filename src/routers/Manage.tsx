import Loadable from "@/components/Loadable";
import { ROUTE_PATH } from "@/constants/routes";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = Loadable(lazy(() => import('@/views/Manage/Home/index')));
const Information = Loadable(lazy(() => import('@/views/Manage/Information/index')));

const manageRoutes: RouteObject[] = [
    { index: true, element: <Navigate to={ROUTE_PATH.MANAGE_HOME} replace/> },
    { path: ROUTE_PATH.MANAGE_HOME, element: <Home/> },
    { path: ROUTE_PATH.MANAGE_INFORMATION, element: <Information/> },
];

export default manageRoutes;