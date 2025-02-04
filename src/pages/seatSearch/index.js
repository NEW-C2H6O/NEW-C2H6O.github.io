import './style/index.css';
import { useEffect } from 'react';
import { SeatItem } from './components/SeatItem';
import { SearchButton } from './components/SearchButton';
import { useNavigate } from 'react-router-dom';
import { useSeatStore } from 'features/seatSearch/seatStore';
import { useFilterStore } from 'features/seatSearchFitler/filterStore';

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
  if (otts == null || otts.length === 0) {
    return '모든 OTT';
  }

  if (otts.length === 1) {
    return `${otts[0].name} ${otts[0].profiles.join(', ')}번`;
  }

  return `${otts[0].name} ${otts[0].profiles.join(', ')}번 외 ${
    otts.length - 1
  }`;
}

function SeatSearchPage() {
  const { start, end, selectedOttInfo } = useFilterStore();

  const { seats, fetchSeats } = useSeatStore();
  useEffect(() => {
    fetchSeats({ otts: selectedOttInfo, start: start, end: end });
  }, [selectedOttInfo, start, end]);

  const navigate = useNavigate();

  return (
    <div className='seat-search-page'>
      <div className='search-section'>
        <SearchButton
          date={formatDate(start)}
          time={formatTimePair(start, end)}
          ott={formatOtt(selectedOttInfo)}
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
