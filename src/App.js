import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  MyPage,
  ReservationPage,
  ReservationHistoryPage,
  SeatSearchPage,
} from './pages/index.js';
import { Footer } from './widgets/index.js';

import { library } from '@fortawesome/fontawesome-svg-core';
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
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/reservation-history'
          element={<ReservationHistoryPage />}
        />
        <Route path='/reservation' element={<ReservationPage />} />
        <Route path='/seat-search' element={<SeatSearchPage />} />
        <Route path='/seat-search-filter' element={<SeatSearchFilterPage />} />
        <Route path='/my' element={<MyPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
