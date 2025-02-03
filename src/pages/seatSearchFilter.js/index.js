import './style/index.css';
import { useState, useEffect } from 'react';
import { CustomDatePicker } from 'widgets';
import { GroupedDropdown } from './components/GroupedDropdown';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useOttOptionStore } from 'features/ott/ottOptionStroe';

function formatSearchTime(date, time) {
  const result = new Date(date);

  result.setHours(time.getHours());
  result.setMinutes(time.getMinutes());
  result.setSeconds(0);
  result.setMilliseconds(0);

  return result;
}

function areAllSelected(date, start, end, otts) {
  return date !== null && start !== null && end !== null && otts !== null;
}

function startIsFasterThanEnd(start, end) {
  if (start instanceof Date && end instanceof Date) {
    return start.getTime() < end.getTime();
  }
  return false;
}

function SeatSearchFilterPage() {
  const { ottInfo, ottOptions, fetchOtts } = useOttOptionStore();
  useEffect(() => {
    fetchOtts();
    setLoading(false);
  }, []);

  const now = new Date(Date.now());
  const [date, setDate] = useState(now);
  const onSelectDate = (e) => {
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

  const [otts, setOtts] = useState([]);
  function onSelectOtt(options) {
    let formattedOtts = ottInfo.map((ott) => ({
      id: ott.ottId,
      name: ott.name,
      profiles: [],
    }));

    for (const option of options) {
      const ottId = Number(option.value.charAt(0));
      const profileId = Number(option.value.charAt(2));

      formattedOtts = formattedOtts.map((ott) => {
        if (ott.id === ottId) {
          return {
            ...ott,
            profiles:
              profileId === 0 ? [1, 2, 3, 4] : [...ott.profiles, profileId],
          };
        }
        return ott;
      });
    }

    const result = formattedOtts.filter((item) => item.profiles.length != 0);

    setOtts(result);
  }

  const [completeSelect, setCompleteSelect] = useState(false);
  useEffect(() => {
    if (!areAllSelected(date, start, end, otts)) {
      setCompleteSelect(false);
      return;
    }

    if (!startIsFasterThanEnd(start, end)) {
      setCompleteSelect(false);
      return;
    }

    setCompleteSelect(true);
  }, [date, start, end, otts]);

  function handleNavigationButtonClick() {
    if (!completeSelect) {
      if (!areAllSelected(date, start, end, otts)) {
        alert('모든 조건을 입력해야 합니다.');
        return;
      }

      if (!startIsFasterThanEnd(start, end)) {
        alert('시작 시간이 종료 시간보다 빨라야 합니다.');
        return;
      }

      alert('알 수 없는 오류 발생');
      return;
    }

    navigate('/seat-search', {
      state: {
        start: formatSearchTime(date, start),
        end: formatSearchTime(date, end),
        otts: otts,
      },
    });
  }

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  if (loading) {
    return <div>Loading...</div>;
  }

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
              placeholderText='시작'
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
              placeholderText='종료'
            />
          </div>
        </div>

        <div className='input-form'>
          <span>OTT 선택</span>
          <GroupedDropdown
            groupedOptions={ottOptions}
            onSelectedOption={onSelectOtt}
          />
        </div>
      </div>

      <button
        className='navigation-button'
        onClick={() => handleNavigationButtonClick()}>
        검색
      </button>
    </div>
  );
}

export { SeatSearchFilterPage };
