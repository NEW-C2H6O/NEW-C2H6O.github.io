import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useMemberStore } from "features";
import { LoadingPage } from "pages";

function PrivateRoute() {
  const { member, fetchMember } = useMemberStore();
  useEffect(() => {
    fetchMember().then((res) => {
      if (res) return;
      document.location = "/auth";
    });
  }, []);

  if (member === null) {
    return <LoadingPage />;
  }

  if (member === undefined) {
    document.location = "/auth";
  }

  return <Outlet />;
}

export { PrivateRoute };
