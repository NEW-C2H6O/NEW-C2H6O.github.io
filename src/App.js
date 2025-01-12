import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  MyPage,
  ReservationPage,
  ReservationHistoryPage,
  SeatSearchPage,
  CodeInputPage,
} from "./pages/index.js";
import { Footer } from "./widgets/index.js";

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
  const height = window.innerHeight;

  return (
    <div className="App" style={{ height: height }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation-history" element={<ReservationHistoryPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/seat-search" element={<SeatSearchPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/my/code-input" element={<CodeInputPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
