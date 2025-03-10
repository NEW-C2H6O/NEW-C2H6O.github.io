import './style/index.css';
import { useState, useEffect } from 'react';
import { CustomDatePicker } from 'widgets';
import { GroupedDropdown } from './components/GroupedDropdown';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useOttOptionStore, useFilterStore } from 'features';

const getAlertMessage = (date, start, end, otts) => {
  if (!areAllSelected(date, start, end, otts)) {
    return '모든 조건을 입력해야 합니다.';
  }

  if (!startIsFasterThanEnd(start, end)) {
    return '시작 시간이 종료 시간보다 빨라야 합니다.';
  }

  return null;
};

function areAllSelected(date, start, end, otts) {
  return date != null && start != null && end != null && otts != null;
}

function startIsFasterThanEnd(start, end) {
  if (start instanceof Date && end instanceof Date) {
    return start.getTime() < end.getTime();
  }
  return false;
}

function SeatSearchFilterPage() {
  const { ottInfo, ottOptions, fetchOtts } = useOttOptionStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchOtts();
    setLoading(false);
  }, []);

  const {
    getStart,
    getEnd,
    selectedOttOptions,
    setDate,
    setStart,
    setEnd,
    setOttOptionAndInfo,
    getDate
  } = useFilterStore();
  const onSelectDate = (e) => setDate(e);
  const onSelectStart = (e) => setStart(e);
  const onSelectEnd = (e) => setEnd(e);
  const onSelectOtt = (options) => setOttOptionAndInfo(options, ottInfo);

  function onClickNavigationButton() {
    const message = getAlertMessage(getDate(), getStart(), getEnd(), selectedOttOptions);
    if (message != null) {
      alert(message);
      return;
    }

    navigate('/seat-search');
  }

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='seat-search-filter-page'>
      <div className='input-form-list'>
        <div className='input-form'>
          <span>날짜 선택</span>
          <CustomDatePicker
            defaultDate={getDate()}
            onSelectDate={onSelectDate}
            givenClassName={'date-input'}
          />
        </div>

        <div className='input-form'>
          <span>시간 선택</span>
          <div className='time-picker-pair'>
            <div className='custom-timepicker-wrapper'>
              <DatePicker
                selected={getStart()}
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
            </div>

            <span> - </span>

            <div className='custom-timepicker-wrapper'>
              <DatePicker
                selected={getEnd()}
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
        </div>

        <div className='input-form'>
          <span>OTT 선택</span>
          <GroupedDropdown
            groupedOptions={ottOptions}
            onSelectedOption={onSelectOtt}
            defaultOptions={selectedOttOptions}
          />
        </div>
      </div>

      <button className='navigation-button' onClick={onClickNavigationButton}>
        검색
      </button>
    </div>
  );
}

export { SeatSearchFilterPage };
