import './style/index.css';
import { Navbar } from '../../widgets/index.js';
import { SeatItem } from './components/SeatItem';
import { SearchButton } from './components/SearchButton';
import { getSeats } from 'entities/thuckFuntion';

function formatDate(date) {
  const pad = (num) => num.toString().padStart(2, '0');
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${month}/${day}`;
}

function formatTimePair(start, end) {
  const formatTime = (momentObj) => momentObj.format('HH:mm');

  return `${formatTime(start)}-${formatTime(end)}`;
}

function formatOtt(otts) {
  const ottName = otts.ottName;
  const profileNum = otts.value;

  return `${ottName} ${profileNum}번`;
}

function SeatSearchPage({ date, start, end, ott }) {
  const seats = getSeats();

  return (
    <div className='seat-search-page'>
      <Navbar pageName='OTT 검색' />
      <div className='search-section'>
        <SearchButton
          date={formatDate(date)}
          time={formatTimePair(start, end)}
          ott={formatOtt(ott)}
          onClickButton={''}
        />
      </div>

      <div className='search-list'>
        {seats.map((seat) => {
          return <SeatItem seat={seat} />;
        })}
      </div>
    </div>
  );
}

export { SeatSearchPage };
