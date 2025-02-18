import './style/index.css';
import { useEffect, useState } from 'react';
import { SeatItem } from './components/SeatItem';
import { SearchButton } from './components/SearchButton';
import { useNavigate } from 'react-router-dom';
import { useSeatStore, useFilterStore } from 'features';

function formatDate(date) {
  if (date == null) {
    return 'MM/DD';
  }
  const pad = (num) => num.toString().padStart(2, '0');
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${month}/${day}`;
}

function formatTimePair(start, end) {
  if (start == null || end == null) {
    return 'HH:MM - HH:MM';
  }

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
  const [conditionExist, setConditionExist] = useState(false);
  useEffect(() => {
    if ((start != null) & (end != null)) {
      setConditionExist(true);
    }
  }, []);

  const { seats, fetchSeats } = useSeatStore();
  useEffect(() => {
    if (conditionExist)
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
        {conditionExist ? (
          seats.map((seat) => {
            return <SeatItem seat={seat} />;
          })
        ) : (
          <div className='notFoundGuide'>
            <img src='images/pictogram/notFoundImage.png' width='50'></img>
            <label>아쉽게도 일치하는 여석이 없습니다.</label>
          </div>
        )}
      </div>
    </div>
  );
}

export { SeatSearchPage };
