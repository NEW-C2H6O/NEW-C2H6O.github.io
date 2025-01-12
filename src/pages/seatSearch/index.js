import './style/index.css';
import { Navbar } from '../../widgets/index.js';
import { getSeats } from 'entities/thuckFuntion';

export default function SeatSearchPage() {
  const seat = getSeats();


  return (
    <div className='seat-search-page'>
      <Navbar pageName='OTT 검색' />

      <div className='search-section'>
        <button className='search-button'>
          {'검색 버튼'}
        </ button>
      </div>

      {/* <div className='search-result'>
        <SeatItem seat={}/>
      </div> */}
    </div>
  );
}

export { SeatSearchPage };
