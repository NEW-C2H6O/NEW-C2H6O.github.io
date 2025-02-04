import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  HomePage,
  MyPage,
  ReservationPage,
  ReservationHistoryPage,
  SeatSearchPage,
  CodeInputPage,
  AuthPage,
} from "./pages/index.js";
import { AppBar, NavigationBar, ProtectedRoute } from './widgets/index.js';

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faFile,
  faPlus,
  faMagnifyingGlass,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import { SeatSearchFilterPage } from 'pages/seatSearchFilter.js';

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
        <Route path="/" element={<HomePage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/my/code-input" element={<CodeInputPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/reservation-history" element={<ReservationHistoryPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/seat-search" element={<SeatSearchPage />} />
          <Route path="/seat-search-filter" element={<SeatSearchFilterPage />} />
        </Route>
      </Routes>
      <NavigationBar />
    </div>
  );
}

export default App;
