import React, { ChangeEvent } from 'react';

import './custom-text-input.scss';

/* eslint-disable-next-line */
export interface CustomTextInputProps {
  title: string;
  value: string;
  fieldName: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hasErrors: boolean;
  errorMessage: string;
}

export const CustomTextInput = ({
  title,
  value,
  fieldName,
  onChange,
  hasErrors,
  errorMessage,
}: CustomTextInputProps) => {
  return (
    <div className="custom-text-input-container">
      <label className="custom-text-input-label" htmlFor={fieldName}>
        {title}
      </label>
      <input
        className={`custom-text-input input-border ${hasErrors ? 'error' : ''}`}
        id={fieldName}
        name={fieldName}
        type="text"
        value={value}
        onChange={onChange}
      />
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

export default CustomTextInput;
