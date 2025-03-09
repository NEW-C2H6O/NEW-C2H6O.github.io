import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useMemberStore } from "features";
import { LoadingPage } from "pages";

function ProtectedRoute() {
  const { member } = useMemberStore();
  useEffect(() => {
    if (!member) return;
    if (!member.isActivated) document.location = "/my/code-input";
  }, [member]);

  if (member == null) return <LoadingPage />;
  return <Outlet />;
}

export { ProtectedRoute };
