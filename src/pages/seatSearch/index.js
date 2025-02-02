import './style/index.css';
import { useEffect } from 'react';
import { SeatItem } from './components/SeatItem';
import { SearchButton } from './components/SearchButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSeatStore } from 'features/seatSearch/seatStore';

function formatDate(date) {
  const pad = (num) => num.toString().padStart(2, '0');
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${month}/${day}`;
}

function formatTimePair(start, end) {
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const time1 = formatTime(start);
  const time2 = formatTime(end);

  return `${time1} - ${time2}`;
}

function formatOtt(otts) {
  const ottName = otts.ottName;
  const profileNum = otts.value;

  return `${ottName} ${profileNum}번`;
}

function SeatSearchPage() {
  const location = useLocation();
  const ott = location.state.ott;
  const start = location.state.start;
  const end = location.state.end;

  const { seats, fetchSeats } = useSeatStore();
  useEffect(() => {
    fetchSeats({ ott: ott, start: start, end: end });
  }, [ott, start, end]);

  const navigate = useNavigate();

  return (
    <div className='seat-search-page'>
      <div className='search-section'>
        <SearchButton
          date={formatDate(start)}
          time={formatTimePair(start, end)}
          ott={formatOtt(ott)}
          onClickButton={() => navigate(-1)}
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
