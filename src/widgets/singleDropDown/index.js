import React, { useState } from 'react';
import Select from 'react-select';

function SingleDropDown({ label, placeholder, dropdownItems, setSelected }) {
  return (
    <div>
      <label>{label}</label>
      <Select
        options={dropdownItems}
        placeholder={placeholder}
        onChange={(selected) => setSelected(selected.value)}
      />
    </div>
  );
}

export { SingleDropDown };
