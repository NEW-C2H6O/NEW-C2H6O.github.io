import '../style/index.css';
import React, { useEffect, useState } from 'react';
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
  const [options, setOptions] = useState(groupedOptions);
  const [selectedAllOptions, setSelectedAllOptions] = useState([]);
  const [selectedProfileOptions, setSelectedProfileOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const onChangeOption = (options) => {
    const newAllOptions =
      options == null ? [] : options.filter((option) => option.group === 0);
    const newProfileOptions =
      options == null ? [] : options.filter((option) => option.group !== 0);
    const newOptions = options == null ? [] : options;

    setSelectedAllOptions(newAllOptions);
    setSelectedProfileOptions(newProfileOptions);
    setSelectedOptions(newOptions);
  };

  useEffect(() => {
    setOptions(
      groupedOptions.map((group) => ({
        ...group,
        options: group.options.map((option) => ({
          ...option,
          isDisabled: getDisabled(option),
        })),
      })),
    );
  }, [selectedAllOptions, groupedOptions]);

  const getDisabled = (option) => {
    // 프로필 옵션이 하나라도 선택되어 있으면 ALL 옵션 선택 불가
    if (option.group === 0) {
      return selectedProfileOptions.some(
        (profileOption) => option.ott === profileOption.ott,
      );
    }

    // ALL 옵션이 선택되어 있으면 프로필 옵션 선택 불가
    return selectedAllOptions.some(
      (allOption) => allOption.ott === option.group,
    );
  };

  return (
    <Select
      options={options}
      value={selectedOptions}
      onChange={onChangeOption}
      isMulti
      placeholder='선택'
      styles={selectBoxStyle}
      formatGroupLabel={formatGroupLabel}
      className='grouped-dropdown'
      closeMenuOnSelect={false}
      onMenuClose={() => onSelectedOption(selectedOptions)}
    />
  );
}

export { GroupedDropdown };
