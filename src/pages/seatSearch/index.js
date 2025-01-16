import './style/index.css';
import { Navbar } from '../../widgets/index.js';
import { getOtts, getSeats } from 'entities/thuckFuntion';
import { useState } from 'react';
import { FilterBottomSheet } from './components/FilterBottomSheet';
import { SeatItem } from './components/SeatItem';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchButton } from './components/SearchButton';

function formatProfileOptions(otts) {
  return otts.map((ott) => ({
    label: ott.name,
    options: ott.profile
      .map((profile) => ({
        label: profile.name,
        value: profile.profileId,
        ott: ott.ottId,
        ottName: ott.name,
      }))
      .concat({ label: 'ALL', value: 0, ott: ott.ottId }),
  }));
}

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

function SeatSearchPage() {
  const seats = getSeats();

  const otts = getOtts();
  const profileOptions = formatProfileOptions(otts);

  const now = new Date(Date.now());
  const [date, setDate] = useState(now);
  const handleDate = (e) => {
    console.log('date handle method called: ', e);
    setDate(e);
  };

  const [start, setStart] = useState(moment().hour(0).minute(0));
  const handleStart = (e) => {
    setStart(e);
  };
  const [end, setEnd] = useState(moment().hour(0).minute(0));
  const handleEnd = (e) => {
    setEnd(e);
  };

  const [ott, setOtt] = useState(profileOptions.at(0).options.at(0));
  function handleOtt(e) {
    console.log('ott handle method called: ', e);
    return setOtt(e);
  }

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleFilterButtonClick = (curr) => {
    setIsFilterOpen(true);
  };
  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className='seat-search-page'>
      <FilterBottomSheet
        isOpen={isFilterOpen}
        closeFilter={handleCloseFilter}
        defaultDate={now}
        handleDate={handleDate}
        defaultTime={start}
        handleStart={handleStart}
        handleEnd={handleEnd}
        groupedOptions={profileOptions}
        defaultOption={ott}
        handleOtt={handleOtt}
      />
      <Navbar pageName='OTT 검색' />
      <div className='search-section'>
        <SearchButton
          date={formatDate(date)}
          time={formatTimePair(start, end)}
          ott={formatOtt(ott)}
          onClickButton={handleFilterButtonClick}
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
