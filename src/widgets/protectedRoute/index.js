import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMemberStore } from "features";
import { LoadingPage } from "pages";

function ProtectedRoute() {
  const navigate = useNavigate();
  const { member, fetchMember } = useMemberStore();

  useEffect(() => {
    fetchMember();
  }, []);

  useEffect(() => {
    if (member != null && !member.isActivated) {
      navigate("/my/code-input", true);    // 뒤로가기 금지
    }
  }, [member]);


  if (member == null) {
    return <LoadingPage />;
  }

  return <Outlet />;
}

export { ProtectedRoute };
