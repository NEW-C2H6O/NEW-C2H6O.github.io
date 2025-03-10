import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  HomePage,
  MyPage,
  ReservationPage,
  ReservationHistoryPage,
  SeatSearchPage,
  SeatSearchFilterPage,
  CodeInputPage,
  AuthPage,
  NotFoundPage,
  ErrorPage,
} from "./pages/index.js";
import { AppBar, NavigationBar, ProtectedRoute, PrivateRoute } from "./widgets/index.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faFile,
  faPlus,
  faMagnifyingGlass,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHouse, faFile, faPlus, faMagnifyingGlass, faCircleUser);

function App() {
  const location = useLocation();
  if (location.pathname === "/auth")
    return (
      <div className="App" style={{ height: window.innerHeight }}>
        <AuthPage />
      </div>
    );

  return (
    <div className="App" style={{ height: window.innerHeight }}>
      <AppBar />
      <Routes>
        <Route path="/error" element={<ErrorPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/my/code-input" element={<CodeInputPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/reservation-history" element={<ReservationHistoryPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/seat-search" element={<SeatSearchPage />} />
            <Route path="/seat-search-filter" element={<SeatSearchFilterPage />} />
            <Route path="/my/code-input" element={<CodeInputPage />} />
          </Route>
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
      <NavigationBar />
    </div>
  );
}

export default App;
