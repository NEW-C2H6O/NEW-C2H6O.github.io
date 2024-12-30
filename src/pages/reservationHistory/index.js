import './style/index.css';
import { useState } from 'react';
import { getOtts, getReservations } from '../../entities/thuckFuntion.js';
import {
  Navbar,
  DropDown,
  SingleButton,
  CustomDatePicker,
} from '../../widgets/index.js';
import ReservationItem from './componets/ReservationItem';

function getDate(target) {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const year = target.getFullYear();
  const month = String(target.getMonth() + 1).padStart(2, '0');
  const day = String(target.getDate()).padStart(2, '0');
  const dayOfWeek = daysOfWeek[target.getDay()];

  return `${year}.${month}.${day}. (${dayOfWeek})`;
}

function ReservationHistoryPage() {
  const reservations = getReservations();
  const ottInfo = getOtts().map((ott) => ({
    label: ott.name,
    value: ott.ottId,
  }));
  const sort = [
    { label: '시간순', value: 'reservation' },
    { label: '작성순', value: 'creation' },
  ];
  const [targetDate, setTargetDate] = useState(new Date());

  return (
    <div className='history-page'>
      <Navbar pageName='장부 조회' />

      <div className='search-date'>
        <CustomDatePicker
          defaultDate={targetDate}
          setTargetDate={setTargetDate}
        />
        {getDate(targetDate)}
      </div>

      <div className='search-filter'>
        <DropDown defaultLabel='OTT' dropdownItems={ottInfo} />
        <DropDown defaultLabel='정렬' dropdownItems={sort} />
        <SingleButton label='지난 예약 제외' />
        <SingleButton label='내 예약' />
      </div>

      <div className='history-area'>
        <ul className='list-view'>
          {reservations.map((reservation) => (
            <ReservationItem reservation={reservation} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export { ReservationHistoryPage };
