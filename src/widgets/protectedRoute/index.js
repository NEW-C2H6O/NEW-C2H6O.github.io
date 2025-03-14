import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ member }) {
  if (!member.isActivated) {
    return <Navigate to="/my/code-input" replace={true} />;
  }

  return <Outlet />;
}

export { ProtectedRoute };
