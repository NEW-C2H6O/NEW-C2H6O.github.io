import { Outlet, Navigate } from 'react-router-dom';

function UnprotectedRoute({ member }) {
  if (member.isActivated) {
    return <Navigate to='/' replace={true} />;
  }

  return <Outlet />;
}

export { UnprotectedRoute };
