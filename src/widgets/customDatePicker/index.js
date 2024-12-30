import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ defaultDate, setTargetDate }) {
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setTargetDate(date);
        }}
        shouldCloseOnSelect
        dateFormat='yyyy-MM-dd'
      />
    </div>
  );
}

export { CustomDatePicker };
