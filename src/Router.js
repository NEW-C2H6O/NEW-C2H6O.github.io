import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  MyPage,
  ReservationPage,
  ReservationHistoryPage,
  SeatSearchPage,
  SeatSearchFilterPage,
  CodeInputPage,
  NotFoundPage,
  ErrorPage,
  AuthPage,
} from "./pages/index.js";
import { ProtectedRoute, PrivateRoute } from "./widgets/index.js";


import { useEffect } from "react";
import { useMemberStore } from "features";

function Router() {
  const { member, fetchMember } = useMemberStore();

  useEffect(() => {
    fetchMember();
  }, [member, fetchMember]);

  // 로그인 하지 않으면 /auth 제외 모든 페이지 접근 불가
  // 로그인을 했을 때 member.isActivated가 false이면 /my를 제외하고 /my/code-input으로 이동

  return <Routes>
    <Route path={"*"} element={<NotFoundPage />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route path="/" element={<HomePage />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route element={<PrivateRoute member={member}/>}>
      <Route path="/my" element={<MyPage />} />
      <Route path="/my/code-input" element={<CodeInputPage />} />
      <Route element={<ProtectedRoute member={member}/>}>
        <Route path="/reservation-history" element={<ReservationHistoryPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/seat-search" element={<SeatSearchPage />} />
        <Route path="/seat-search-filter" element={<SeatSearchFilterPage />} />
      </Route>
    </Route>;
  </Routes>
}

export default Router;
