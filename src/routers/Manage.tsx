import Loadable from "@/components/Loadable";
import { ROLE } from "@/constants/roles";
import { ROUTE_PATH } from "@/constants/routes";
import { useAppSelector } from "@/store";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = Loadable(lazy(() => import('@/views/Manage/Home/index')));
const Account = Loadable(lazy(() => import('@/views/Manage/Account/index')));
const Information = Loadable(lazy(() => import('@/views/Manage/Information/index')));
const Images = Loadable(lazy(() => import('@/views/Manage/Images/index')));
const Pets = Loadable(lazy(() => import('@/views/Manage/Pets/index')));
const Tasks = Loadable(lazy(() => import('@/views/Manage/Tasks/index')));

const ManageRedirect = () => {
  const { profile } = useAppSelector((state) => state.auth);

  if (!profile) return null; // hoặc loading

  if (profile.role === ROLE.SPECIALIST) {
    return <Navigate to={ROUTE_PATH.MANAGE_TASK} replace />;
  }

  if (profile.role === ROLE.EMPLOYEE) {
    return <Navigate to={ROUTE_PATH.MANAGE_IMAGE} replace />;
  }

  return <Navigate to={ROUTE_PATH.MANAGE_HOME} replace />;
};

const manageRoutes: RouteObject[] = [
    { index: true, element: <ManageRedirect/> },
    { path: ROUTE_PATH.MANAGE_HOME, element: <Home/> },
    { path: ROUTE_PATH.MANAGE_ACCOUNT, element: <Account/> },
    { path: ROUTE_PATH.MANAGE_INFORMATION, element: <Information/> },
    { path: ROUTE_PATH.MANAGE_IMAGE, element: <Images/> },
    { path: ROUTE_PATH.MANAGE_PET, element: <Pets/> },
    { path: ROUTE_PATH.MANAGE_TASK, element: <Tasks/> },
];

export default manageRoutes;