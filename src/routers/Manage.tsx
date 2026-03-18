import Loadable from "@/components/Loadable";
import { ROUTE_PATH } from "@/constants/routes";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = Loadable(lazy(() => import('@/views/Manage/Home/index')));
const Account = Loadable(lazy(() => import('@/views/Manage/Account/index')));
const Information = Loadable(lazy(() => import('@/views/Manage/Information/index')));
const Images = Loadable(lazy(() => import('@/views/Manage/Images/index')));
const Pets = Loadable(lazy(() => import('@/views/Manage/Pets/index')));
const Tasks = Loadable(lazy(() => import('@/views/Manage/Tasks/index')));

const manageRoutes: RouteObject[] = [
    { index: true, element: <Navigate to={ROUTE_PATH.MANAGE_HOME} replace/> },
    { path: ROUTE_PATH.MANAGE_HOME, element: <Home/> },
    { path: ROUTE_PATH.MANAGE_ACCOUNT, element: <Account/> },
    { path: ROUTE_PATH.MANAGE_INFORMATION, element: <Information/> },
    { path: ROUTE_PATH.MANAGE_IMAGE, element: <Images/> },
    { path: ROUTE_PATH.MANAGE_PET, element: <Pets/> },
    { path: ROUTE_PATH.MANAGE_TASK, element: <Tasks/> },
];

export default manageRoutes;