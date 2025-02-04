import { Navigate, Outlet } from 'react-router-dom';
import { useActiveStore } from 'features/member/activeStore';
import { useEffect } from 'react';

function ProtectedRoute() {
  const { isAvtice, fetchActive } = useActiveStore();
  useEffect(() => {
    fetchActive();
  }, []);

  return isAvtice ? <Outlet /> : <Navigate to='/' replace />;
}

export { ProtectedRoute };
