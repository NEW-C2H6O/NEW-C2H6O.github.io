import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useMemberStore } from 'features';

function PrivateRoute() {
  const { member, fetchMember } = useMemberStore();
  useEffect(() => {
    fetchMember();
  }, []);

  if (member == null) return <div>Loading...</div>;

  return member == undefined ? <Navigate to='/auth' /> : <Outlet />;
}

export { PrivateRoute };
