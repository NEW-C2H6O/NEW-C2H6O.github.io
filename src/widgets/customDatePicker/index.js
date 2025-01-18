import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ defaultDate, onSelectDate, givenClassName }) {
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        onSelectDate(date);
      }}
      shouldCloseOnSelect
      dateFormat='yyyy-MM-dd'
      className={givenClassName}
    />
  );
}

export { CustomDatePicker };
