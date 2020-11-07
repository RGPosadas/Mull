import React, { ChangeEvent } from 'react';

import './custom-time-picker.scss';

export interface CustomTimePickerProps {
  label: string;
  fieldName: string;
  hasErrors: boolean;
  value: string;
  errorMessage: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * This component renders a time input with a label. It supports validations
 * based on the values of hasErrors and errorMessage.
 * @param {string} label Label of the input
 * @param {string} fieldName String to identify input
 * @param {boolean} hasErrors
 * @param {string} value
 * @param {string} errorMessage
 * @param {(event: ChangeEvent<HTMLInputElement>) => void} onChange Handler for when time is changed
 */
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
      <label className="custom-time-picker-label" htmlFor={fieldName}>
        {label}
      </label>
      <input
        type="time"
        className="custom-time-picker"
        data-testid="custom-time-input"
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
