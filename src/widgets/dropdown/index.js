import React, { useState } from 'react';
import Select from 'react-select';

function DropDown({ defaultLabel, dropdownItems }) {
  return (
    <Select
      options={dropdownItems}
      isMulti
      closeMenuOnSelect={false}
      placeholder={defaultLabel}
    />
  );
}

export { DropDown };
