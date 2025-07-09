import React from 'react';
import ReactSelect, { StylesConfig, SingleValue } from 'react-select';

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: Option;
  onChange: (option: Option) => void;
  placeholder?: string;
  isSearchable?: boolean;
  styles?: StylesConfig<Option>;
  id?: string;
  classNamePrefix?: string;
  instanceId?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '',
  isSearchable = false,
  styles,
  id,
  classNamePrefix,
  instanceId,
}) => {
  // Type guard for react-select single value
  function isOption(option: Option | unknown): option is Option {
    return option !== null && typeof option === 'object' && 'value' in (option as Option) && 'label' in (option as Option);
  }

  return (
    <ReactSelect
      id={id}
      classNamePrefix={classNamePrefix}
      options={options}
      value={value}
      onChange={(option) => {
        if (isOption(option)) onChange(option);
      }}
      styles={styles}
      isSearchable={isSearchable}
      placeholder={placeholder}
      instanceId={instanceId}
    />
  );
};

export default Select;