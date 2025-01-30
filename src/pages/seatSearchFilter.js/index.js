import './style/index.css';
import { useState } from 'react';
import { getOtts } from 'entities/thuckFuntion';
import { CustomDatePicker } from 'widgets';
import { GroupedDropdown } from './components/GroupedDropdown';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

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

function formatSearchTime(date, time) {
  const result = new Date(date);

  result.setHours(time.getHours());
  result.setMinutes(time.getMinutes());
  result.setSeconds(0);
  result.setMilliseconds(0);

  return result;
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

  const [start, setStart] = useState(null);
  const onSelectStart = (e) => {
    e.setMinutes(Math.floor(e.getMinutes() / 10) * 10);
    setStart(e);
  };
  const [end, setEnd] = useState(null);
  const onSelectEnd = (e) => {
    e.setMinutes(Math.floor(e.getMinutes() / 10) * 10);
    setEnd(e);
  };

  const [ott, setOtt] = useState(null);
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
            <DatePicker
              selected={start}
              onChange={onSelectStart}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              showTimeCaption={false}
              use12Hours={false}
              dateFormat='HH:mm'
              timeFormat='HH:mm'
              className='custom-timepicker'
            />

            <span> - </span>

            <DatePicker
              selected={end}
              onChange={onSelectEnd}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              showTimeCaption={false}
              use12Hours={false}
              dateFormat='HH:mm'
              timeFormat='HH:mm'
              className='custom-timepicker'
              editable={false}
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
        disabled={!date || !start || !end || !ott}
        onClick={() =>
          navigate('/seat-search', {
            state: {
              start: formatSearchTime(date, start),
              end: formatSearchTime(date, end),
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
