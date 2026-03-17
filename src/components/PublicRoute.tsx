import { Navigate, Outlet } from 'react-router-dom';
import type { FCC } from '@/types/react';
import { useAppSelector } from '@/store';
import { ROUTE_PATH } from '@/constants/routes';

const PublicRoute: FCC = ({  }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={`/pet/${ROUTE_PATH.MANAGE}`} />;
  }

  return <Outlet />;
};

export default PublicRoute;
