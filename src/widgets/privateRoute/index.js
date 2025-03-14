import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute({ member }) {
  if (member === null) {
    return <Navigate to="/auth" replace={true} />;
  }
  
  return <Outlet />;
}

export { PrivateRoute };
