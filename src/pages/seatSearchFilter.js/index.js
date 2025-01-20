import './style/index.css';
import { useState } from 'react';
import moment from 'moment';
import { getOtts } from 'entities/thuckFuntion';
import { CustomDatePicker } from 'widgets';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { GroupedDropdown } from './components/GroupedDropdown';
import { useNavigate } from 'react-router-dom';

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

function formatDate(date, time) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const hours = time.hours();
  const minutes = time.minutes();
  const seconds = time.seconds();

  return new Date(year, month, day, hours, minutes, seconds);
}

function SeatSearchFilterPage() {
  const otts = getOtts();
  const profileOptions = formatProfileOptions(otts);

  const now = new Date(Date.now());
  const [date, setDate] = useState(now);
  const onSelectDate = (e) => {
    console.log('date handle method called: ', e);
    setDate(e);
  };

  const nowMoment = moment();
  const [start, setStart] = useState(
    nowMoment
      .clone()
      .minutes(Math.floor(nowMoment.minutes() / 10) * 10)
      .seconds(0),
  );
  const onSelectStart = (e) => {
    setStart(e);
  };
  const [end, setEnd] = useState(
    nowMoment
      .clone()
      .minutes(Math.ceil(nowMoment.minutes() / 10) * 10)
      .seconds(0),
  );
  const onSelectEnd = (e) => {
    setEnd(e);
  };

  const [ott, setOtt] = useState(profileOptions.at(0).options.at(0));
  function onSelectOtt(e) {
    console.log('ott handle method called: ', e);
    return setOtt(e);
  }

  const navigate = useNavigate();

  return (
    <div className='seat-search-filter-page'>
      <div className='input-form-list'>
        <div className='input-form'>
          <span>날짜 선택</span>
          <CustomDatePicker
            defaultDate={now}
            onSelectDate={onSelectDate}
            givenClassName={'date-input'}
          />
        </div>

        <div className='input-form'>
          <span>시간 선택</span>
          <div className='time-picker-pair'>
            <TimePicker
              value={start}
              onChange={onSelectStart}
              placeholder='선택'
              showSecond={false}
              inputReadOnly={true}
              minuteStep={10}
            />

            <span> - </span>

            <TimePicker
              value={end}
              onChange={onSelectEnd}
              placeholder='선택'
              showSecond={false}
              inputReadOnly={true}
              minuteStep={10}
            />
          </div>
        </div>

        <div className='input-form'>
          <span>OTT 선택</span>
          <GroupedDropdown
            groupedOptions={profileOptions}
            onSelectedOption={onSelectOtt}
          />
        </div>
      </div>

      <button
        className='navigation-button'
        onClick={() =>
          navigate('/seat-search', {
            state: {
              start: formatDate(date, start),
              end: formatDate(date, end),
              ott: ott,
            },
          })
        }>
        검색
      </button>
    </div>
  );
}

export { SeatSearchFilterPage };
