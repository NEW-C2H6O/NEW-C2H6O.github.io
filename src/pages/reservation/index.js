import './style/index.css';
import { getOtts } from '../../entities/thuckFuntion.js';
import { NavigationBar, CustomDatePicker } from '../../widgets/index.js';
import { useState } from 'react';
import { GroupedDropdown } from './components/GroupedDropdown.js';
import { TimeTable } from './components/TimeTable.js';

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

function ReservationPage() {
  const otts = getOtts();
  const profileOptions = formatProfileOptions(otts);

  const [selectedOttProfile, setSelectedOttProfile] = useState(
    profileOptions.at(0).options.at(0),
  );
  function onSelectOttProfile(e) {
    return setSelectedOttProfile(e);
  }

  const [selectedDate, setSelectedDate] = useState(Date.now());
  function onSelectDate(e) {
    return setSelectedDate(e);
  }

  const [selectedTimes, setSelectedTimes] = useState([]);
  function onSelectTimes(selectedTimes) {
    return setSelectedTimes(selectedTimes);
  }

  return (
    <div className='reservation-page'>
      <NavigationBar pageName='예약' />

      <div className='input-form-list'>
        <div className='input-form'>
          <span> OTT와 프로필 선택 </span>
          <GroupedDropdown
            groupedOptions={profileOptions}
            onSelectedOption={onSelectOttProfile}
          />
        </div>
        <div className='input-form'>
          <span> 날짜 선택 </span>
          <CustomDatePicker
            defaultDate={selectedDate}
            onSelectDate={onSelectDate}
            givenClassName='date-input'
          />
        </div>
        <div className='input-form'>
          <span> 시간 선택 </span>
          <TimeTable onSelectTimes={onSelectTimes} />
        </div>
      </div>
    </div>
  );
}

export { ReservationPage };
