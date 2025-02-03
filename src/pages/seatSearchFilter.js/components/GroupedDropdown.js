import '../style/index.css';
import React from 'react';
import Select from 'react-select';

const selectBoxStyle = {
  container: (provided) => ({
    ...provided,
    width: '100%',
  }),
  control: (provided) => ({
    ...provided,
    border: 'none',
  }),
};

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span style={{ fontSize: 16, width: 100 }}> {data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length - 1}</span>
  </div>
);

function GroupedDropdown({ groupedOptions, onSelectedOption }) {
  return (
    <Select
      options={groupedOptions}
      onChange={onSelectedOption}
      placeholder='선택'
      styles={selectBoxStyle}
      formatGroupLabel={formatGroupLabel}
      className='grouped-dropdown'
    />
  );
}

export { GroupedDropdown };
