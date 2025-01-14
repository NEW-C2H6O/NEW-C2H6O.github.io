import '../style/bottomSheet.css';
import { BottomSheet, CustomDatePicker } from 'widgets';
import { useState } from 'react';
import { GroupedDropdown } from './GroupedDropdown';
import TimePicker from 'rc-time-picker';

function FilterBottomSheet({
  isOpen,
  closeFilter,
  defaultDate,
  handleDate,
  defaultTime,
  handleStart,
  handleEnd,
  groupedOptions,
  defaultOption,
  handleOtt,
}) {
  const [date, setDate] = useState(defaultDate);
  const onSelectedDate = (e) => {
    console.log('date was selected', e);
    setDate(e);
  };

  const [start, setStart] = useState(defaultTime);
  const onSelectedStart = (e) => {
    console.log('start was selected', e);
    setStart(e);
  };

  const [end, setEnd] = useState(defaultTime);
  const onSelectedEnd = (e) => {
    console.log('end was selected', e);
    setEnd(e);
  };

  const [ott, setOtt] = useState(defaultOption);
  const onSelectedOption = (e) => {
    console.log('ott was selected', e);
    setOtt(e);
  };

  return (
    <BottomSheet
      className='container'
      isOpen={isOpen}
      closeBottomSheet={closeFilter}
      Content={() => (
        <div>
          <CustomDatePicker
            defaultDate={defaultDate}
            onSelectDate={onSelectedDate}
            givenClassName={''}
          />

          <div className='time-picker'>
            <TimePicker value={start} onChange={onSelectedStart} placeholder='선택'/>

            <TimePicker value={end} onChange={onSelectedEnd} placeholder='선택'/>
          </div>

          <GroupedDropdown
            groupedOptions={groupedOptions}
            onSelectedOption={onSelectedOption}
          />

          <div
            className='submit-button'
            onClick={() => {
              handleDate(date);
              handleStart(start);
              handleEnd(end);
              handleOtt(ott);
              closeFilter();
            }}>{`적용하기`}</div>
        </div>
      )}
    />
  );
}

export { FilterBottomSheet };
