import React, { ChangeEvent } from 'react';

import './custom-time-picker.scss';

/* eslint-disable-next-line */
export interface CustomTimePickerProps {
  label: string;
  fieldName: string;
  hasErrors: boolean;
  value: string;
  errorMessage: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomTimePicker = ({
  label,
  fieldName,
  hasErrors,
  value,
  errorMessage,
  onChange,
}: CustomTimePickerProps) => {
  return (
    <div className="custom-time-picker-container">
      <label className="custom-time-picker-label">{label}</label>
      <input
        type="time"
        className="custom-time-picker"
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={onChange}
      />
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

export default CustomTimePicker;
