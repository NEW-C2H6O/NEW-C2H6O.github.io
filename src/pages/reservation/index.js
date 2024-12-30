import './style/index.css';
import { getOtts } from '../../entities/thuckFuntion.js';
import { Navbar, SingleDropDown } from '../../widgets/index.js';
import { useState } from 'react';

function ReservationPage() {
  const otts = getOtts();
  const ottInfo = otts.map((ott) => ({
    label: ott.name,
    value: ott.ottId,
  }));
  const [selectedOtt, setSelectedOtt] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(1);

  console.log(selectedOtt);

  return (
    <div className='reservation-page'>
      <Navbar pageName='예약' />

      <div>
        <SingleDropDown
          label='OTT'
          placeholder='선택'
          dropdownItems={ottInfo}
          setSelected={setSelectedOtt}
        />
        <SingleDropDown
          label='프로필'
          placeholder='선택'
          dropdownItems={otts
            .find((ott) => ott.ottId === selectedOtt)
            .profile.map((profile) => ({
              label: profile.name,
              value: profile.profileId,
            }))}
          setSelected={setSelectedProfile}
        />
      </div>
    </div>
  );
}

export { ReservationPage };
